import Raact from "react";
import Nav from "./header/nav";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
