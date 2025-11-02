import React from "react";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <>
      <AppNavbar />
      {props.children}
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
};

export default Layout;
