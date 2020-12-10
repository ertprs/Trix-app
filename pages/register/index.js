import React, { useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";

const Index = () => {
  const [userInfo, setInfo] = useState({
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= 11) {
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
          <h1 className="heading">Create an account</h1>
          <p>Sign up with your phone number</p>
          <div className="phone-input">
            <p>+234</p>
            <input
              type="number"
              placeholder="Enter phone number"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
            />
          </div>
          <div className="terms">
            <input type="checkbox" />
            <p>
              Accept our <a>terms & conditions</a>
            </p>
          </div>
          <div>
            <button className="btn btn-primary">Proceed</button>
          </div>
          <p className="text-small">
            You will receive an OTP to verify your phone number
          </p>
          <p className="text-small switch">
            Already have an account?{" "}
            <Link href="/login">
              <a>
                <b>Log in</b>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
