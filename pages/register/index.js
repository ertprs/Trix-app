import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import firebase from "../../services/firebase";
import store from "../../store/store";
import { useProxy } from "valtio";
import { useRouter } from "next/router";
import { formatNumber } from "../../services/userService";

const Index = () => {
  const router = useRouter();
  const snapshot = useProxy(store);

  const [userInfo, setInfo] = useState({
    phone: "",
  });

  const handleRegister = () => {
    store.loading = true;
    const appVerifier = window.appVerifier;
    const phoneNumber = formatNumber(userInfo.phone);
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        console.log("Success");
        store.showPass = true;
        store.phone = userInfo.phone;
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        router.push("/login");
        store.loading = false;
      })
      .catch(function (error) {
        console.log("Error:" + error.code);
        store.loading = false;
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= 11) {
      setInfo({
        ...userInfo,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    window.appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.user = user;
        router.push("/dashboard");
      } else {
        store.showLogin = true;
      }
    });
  }, []);
  return (
    <Layout>
      
      <div className="register">
        <div id="recaptcha-container"></div>
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
            <button className="btn btn-primary" onClick={handleRegister}>
              Proceed
            </button>
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
