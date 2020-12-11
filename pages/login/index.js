import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import firebase from "../../services/firebase";

const Index = () => {
  const [userInfo, setInfo] = useState({
    phone: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      // if (value.length <= 11) {
      setInfo({
        ...userInfo,
        [name]: value,
      });
      // }
    } else {
      setInfo({
        ...userInfo,
        [name]: value,
      });
    }
  };

  const handleLogin = () => {
    const appVerifier = window.appVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(userInfo.phone, appVerifier)
      .then(function (confirmationResult) {
        console.log("Success");
        setShowPass(true)
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch(function (error) {
        console.log("Error:" + error.code);
      });
  };

  const verifyNumber = () => {
    
    const verificationId = userInfo.password;
    window.confirmationResult
      .confirm(verificationId)
      .then(function(result) {
        // User signed in successfully.
        var user = result.user;
        user.getIdToken().then(idToken => {
             console.log(idToken);
          });
      })
      .catch(function(error) {
        // User couldn't sign in (bad verification code?)
        console.error("Error while checking the verification code", error);
        window.alert(
          "Error while checking the verification code:\n\n" +
            error.code +
            "\n\n" +
            error.message
        );
      });

  useEffect(() => {
    window.appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }, []);

  return (
    <Layout>
      <div className="register">
        <div className="reg-form">
          <h1 className="heading">Log in to continue</h1>
          <p>Log in with your phone number</p>
          <div className="phone-input">
            <p>+234</p>
            <input
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          {showPass && (
            <div className="phone-password">
              <input
                type="password"
                placeholder="Enter OTP"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                className={userInfo.password != "" ? "pass-size" : null}
              />
            </div>
          )}
          <div id="recaptcha-container"></div>

          <div>
            <button
              id="sign-in-btn"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
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
