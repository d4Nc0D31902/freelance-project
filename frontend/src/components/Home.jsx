import React from "react";
import { Box } from "@mui/material";
import MetaData from "./layout/MetaData";

const Home = () => {
  return (
    <Box sx={{ height: "100vh" }} >
      <MetaData title={"Home"} />
      <p className="text-red-500">Home</p>
    </Box>
  );
};

export default Home;
