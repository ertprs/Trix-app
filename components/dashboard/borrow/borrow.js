import React, { useState } from "react";
import Setup from "../setup/setup";
import store from "../../../store/store";
import useProxy from "valtio";

const Borrow = () => {
  const [show, setShow] = useState({
    setup: false,
    process: false,
    welcome: true,
  });
  const [userInfo, setUserInfo] = useState({
    amountBorrowed: 0,
    BVN: null,
  });
  const handleApply = () => {
    if (!userInfo.BVN) {
      setShow({
        ...show,
        setup: true,
        welcome: false,
      });
    } else {
      setShow({
        ...show,
        process: true,
        welcome: fal,
      });
    }
  };
  return (
    <div className="container">
      <div className="borrow">
        {!show.welcome ? null : (
          <div>
            <h5 className="heading">
              Take control <br />
              with a business loan.
            </h5>
            <p className="text-gray">
              Vestibulum id ligula porta felis euismod semper. Maecenas sed diam
              eget risus varius blandit sit amet non magna.
            </p>
            <div className="btn-holder">
              <button className="btn btn-primary" onClick={handleApply}>
                Apply Now
              </button>
            </div>
          </div>
        )}

        {show.setup && (
          <div className="loan-process"><Setup /></div>
        )}
      </div>
    </div>
  );
};

export default Borrow;
