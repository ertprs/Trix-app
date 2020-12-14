import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import firebase from "../services/firebase"

const Dashboard = () => {
    const [showDash, setShowDash] = useState(false)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }else{
        setShowDash(true)
      }
      
    });
  }, []);
  return showDash ? (
    <Layout>
      <div></div>
    </Layout>
  ) : null;
};

export default Dashboard;
