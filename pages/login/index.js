import React, { useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";

const Index = () => {
  const [userInfo, setInfo] = useState({
    phone: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      if (value.length <= 11) {
        setInfo({
          ...userInfo,
          [name]: value,
        });
      }
    } else {
      setInfo({
        ...userInfo,
        [name]: value,
      });
    }
  };
  return (
    <Layout>
      <div className="register">
        <div className="reg-form">
          <h1 className="heading">Log in to continue</h1>
          <p>Log in with your phone number</p>
          <div className="phone-input">
            <p>+234</p>
            <input
              type="number"
              placeholder="Enter phone number"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="phone-password">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              className={userInfo.password != "" ? "pass-size" : null}
            />
          </div>

          <div>
            <button className="btn btn-primary">Login</button>
          </div>
          <p className="text-small switch">
            Don’t have an account?{" "}
            <Link href="/register">
              <a>Sign up</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
