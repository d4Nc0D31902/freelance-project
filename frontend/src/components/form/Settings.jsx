import React, { useState } from "react";
import FormStepper from "../Stepper/FormStepper";
import { GoChevronLeft } from "react-icons/go";
import { Switch } from "antd";

const Settings = () => {
  const [rightPanel, setRightPanel] = useState(false);

  const emailToggle = () => {
    setRightPanel(!rightPanel);
  };

  return (
    <div className="flex flex-col bg-white h-screen">
      {/* Navbar */}
      <div className="flex flex-row items-center justify-between p-4 border-b border-neutral-900">
        <div className="flex flex-row items-center gap-1">
          <GoChevronLeft size={38} />
          <p className="text-3xl">Create</p>
        </div>

        <div>
          <FormStepper />
        </div>

        <div className="flex items-center bg-neutral-400 px-10 py-2 rounded-full">
          <p className="">Next</p>
        </div>
      </div>

      <div className="flex flex-row flex-grow">
        {/* left panel */}
        <div className="w-full py-8 container mx-auto px-[14rem] space-y-10">
          <div className="flex flex-col gap-4">
            <p className="">System Actions</p>
            <div className="grid grid-cols-3 grid-rows-1 gap-8">
              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      onChange={() => emailToggle()}
                      size="large"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Email Participant</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Create an emailer to your participant
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch className="custom-switch" />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Record Submission</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Send a success message to your user
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      // checkedChildren="ON"
                      // unCheckedChildren="OFF"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Success Message</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Write a success message to users who completed the form
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      // checkedChildren="ON"
                      // unCheckedChildren="OFF"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Send Email to Admin</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Send a notification email to admin accounts
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      // checkedChildren="ON"
                      // unCheckedChildren="OFF"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Insert to Google Sheets</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Insert your participants data to Google Sheets
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="">On-Page Actions</p>
            <div className="grid grid-cols-3 grid-rows-1 gap-8">
              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      onChange={() => emailToggle()}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Generate QR</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Create a unique QR that will be shown on the website
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch className="custom-switch" />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Generate ID</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Create a survey form for your latest event or quiz
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      // checkedChildren="ON"
                      // unCheckedChildren="OFF"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Redirect to a Webpage</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Redirect user to a webpage after submission
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      // checkedChildren="ON"
                      // unCheckedChildren="OFF"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Reveal a File</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Make user download a file after completing the form
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-3xl p-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <div className="bg-neutral-200 h-14 w-14 rounded-xl"></div>
                  <div>
                    <Switch
                      className="custom-switch"
                      // checkedChildren="ON"
                      // unCheckedChildren="OFF"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xl">Payment Gateway</p>
                </div>

                <div className="h-8">
                  <p className="text-xs text-neutral-400">
                    Activate a payment portal on your form
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right panel */}

        {rightPanel && (
          <div className="w-1/5 border-l border-neutral-900 h-full"></div>
        )}
      </div>
    </div>
  );
};

export default Settings;
