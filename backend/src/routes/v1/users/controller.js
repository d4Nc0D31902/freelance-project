import asyncHandler from "express-async-handler";
import createError from "http-errors";
import bcrypt from "bcrypt";
import service from "./service.js";
import { ENV } from "../../../config/index.js";
import { RESOURCE, STATUSCODE } from "../../../constants/index.js";
import {
  upload,
  responseHandler,
  multipleImages,
} from "../../../utils/index.js";
import {
  setToken,
  getToken,
  blacklistToken,
  generateAccess,
} from "../../../middlewares/index.js";
import { sendEmail, generateRandomCode } from "../../../utils/index.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const data = await service.getAll();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Users found"
      : "All Users retrieved successfully",
  );
});

const getAllUsersDeleted = asyncHandler(async (req, res) => {
  const data = await service.getAllDeleted();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Deleted Users found"
      : "All Deleted Users retrieved successfully",
  );
});

const getSingleUser = asyncHandler(async (req, res) => {
  const data = await service.getById(req.params.id);

  responseHandler(
    res,
    data,
    !data ? "No User found" : "User retrieved successfully",
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const data = await service.getEmail(req.body.email);

  if (!data) throw createError(STATUSCODE.NOT_FOUND, "No User found");

  if (!(await bcrypt.compare(req.body.password, data.password)))
    throw createError(STATUSCODE.UNAUTHORIZED, "Password does not match");

  const accessToken = generateAccess({
    id: data._id,
    role: data[RESOURCE.ROLE],
  });

  setToken(accessToken.access);

  responseHandler(res, data, "User Login successfully", accessToken);
});

const logoutUser = asyncHandler(async (req, res) => {
  const savedToken = getToken();

  if (savedToken) blacklistToken();

  responseHandler(res, [], "User Logout successfully");
});

const createNewUser = [
  upload.array("image"),
  asyncHandler(async (req, res) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(req.body.password))
      throw createError(
        STATUSCODE.BAD_REQUEST,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      );

    const hashed = await bcrypt.hash(req.body.password, ENV.SALT_NUMBER);

    const uploadedImages = await multipleImages(req.files, []);
    if (uploadedImages.length === STATUSCODE.ZERO) {
      throw createError(STATUSCODE.BAD_REQUEST, "Image is required");
    }

    const data = await service.add(
      {
        ...req.body,
        password: hashed,
        image: uploadedImages,
      },
      req.session,
    );

    responseHandler(res, [data], "User created successfully");
  }),
];

const updateUser = [
  upload.array("image"),
  asyncHandler(async (req, res) => {
    const oldData = await service.getById(req.params.id);

    const uploadNewImages = await multipleImages(
      req.files,
      oldData?.image.map((image) => image.public_id),
    );

    const data = await service.update(
      req.params.id,
      {
        ...req.body,
        image: uploadNewImages,
      },
      req.session,
    );

    responseHandler(res, [data], "User updated successfully");
  }),
];

const deleteUser = asyncHandler(async (req, res) => {
  const data = await service.deleteById(req.params.id, req.session);

  responseHandler(
    res,
    data?.deleted ? [] : [data],
    data?.deleted ? "User is already deleted" : "User deleted successfully",
  );
});

const restoreUser = asyncHandler(async (req, res) => {
  const data = await service.restoreById(req.params.id, req.session);

  responseHandler(
    res,
    !data?.deleted ? [] : [data],
    !data?.deleted ? "User is not deleted" : "User restored successfully",
  );
});

const forceDeleteUser = asyncHandler(async (req, res) => {
  const data = await service.forceDelete(req.params.id, req.session);

  const message = !data ? "No User found" : "User force deleted successfully";

  const imagePublicIds = [
    ...(data.userData?.image).map((image) => image.public_id),
    ...data.imagesDeleted.flatMap((imgRecord) =>
      imgRecord.image.map((image) => image.public_id),
    ),
  ];

  if (imagePublicIds.length) await multipleImages([], imagePublicIds);

  responseHandler(res, [data], message);
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(req.body.newPassword))
    throw createError(
      STATUSCODE.BAD_REQUEST,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    );

  if (!req.body.newPassword || !req.body.confirmPassword)
    throw createError(STATUSCODE.BAD_REQUEST, "Both passwords are required");

  if (req.body.newPassword !== req.body.confirmPassword)
    throw createError(STATUSCODE.BAD_REQUEST, "Passwords do not match");

  const data = await service.changePassword(
    req.params.id,
    req.body.newPassword,
    req.session,
  );

  responseHandler(res, [data], "Password changed successfully");
});

const sendUserEmailOTP = asyncHandler(async (req, res) => {
  const email = await service.getEmail(req.body.email);

  if (new Date() - new Date(email.verificationCode.createdAt) < 5 * 60 * 1000) {
    throw new createError(
      "Please wait 5 minutes before requesting a new verification code",
    );
  }

  const code = generateRandomCode();
  await sendEmail(req.body.email, code);

  const data = await service.sendEmailOTP(req.body.email, code, req.session);

  responseHandler(res, [data], "Email OTP sent successfully");
});

const resetUserEmailPassword = asyncHandler(async (req, res) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(req.body.newPassword))
    throw createError(
      STATUSCODE.BAD_REQUEST,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    );

  if (
    !req.body.newPassword ||
    !req.body.confirmPassword ||
    req.body.newPassword !== req.body.confirmPassword
  )
    throw createError(
      STATUSCODE.BAD_REQUEST,
      "Passwords are required and must match",
    );

  const code = await service.getCode(req.body.verificationCode);

  if (
    Date.now() - new Date(code.verificationCode.createdAt).getTime() >
    5 * 60 * 1000
  ) {
    code.verificationCode = null;
    await code.save();
    throw createError("Verification code has expired");
  }

  const data = await service.resetPassword(
    req.body.verificationCode,
    req.body.newPassword,
    req.session,
  );

  if (!data)
    throw createError(STATUSCODE.BAD_REQUEST, "Invalid verification code");

  responseHandler(res, [data], "Password Successfully Reset");
});

const getUserProfile = asyncHandler(async (req, res) => {
  const data = await service.getById(req.user.id);
  if (!data) {
    res.status(STATUSCODE.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
    return;
  }
  res.status(STATUSCODE.OK).json({
    success: true,
    user: data,
  });
});

export {
  getAllUsers,
  getAllUsersDeleted,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  restoreUser,
  forceDeleteUser,
  loginUser,
  logoutUser,
  changeUserPassword,
  sendUserEmailOTP,
  resetUserEmailPassword,
  getUserProfile,
};
