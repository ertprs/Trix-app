import Raact, { useEffect, useState } from "react";
import Nav from "./header/nav";

import store from "../store/store";
import { useProxy } from "valtio";
import Spinner from "./loader/spinner";

const Layout = ({ children }) => {
  const snapshot = useProxy(store);
  
  return (
    <div className="layout">
      <Nav />
      <div>{children}</div>
      {snapshot.loading && <Spinner />}
    </div>
  );
};

export default Layout;
