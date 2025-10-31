import React from "react";
import AppNavbar from ".//AppNavbar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <AppNavbar />
      {props.children}
      <Footer  />
    </>
  );
};

export default Layout;
