import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import firebase from "../services/firebase";
import Borrow from "../components/dashboard/borrow/borrow";
import store from "../store/store"
import { useRouter } from "next/router"

const Dashboard = () => {
  const router = useRouter()
  const [showDash, setShowDash] = useState(false);
  const [activeTab, setActive] = useState("borrow");
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }else{
        store.user = user
        setShowDash(true)
      }

    });
    // setShowDash(true);
  }, []);
  return showDash ? (
    <Layout>
      <div className="dashboard">
        <div className="tabs">
          <span className={activeTab === "borrow" ? "active" : null} onClick={() => setActive("borrow") }>
            Borrow
          </span>
          <span className={activeTab === "invest" ? "active" : null} onClick={() => setActive("invest") }>
            Invest
          </span>
        </div>
        <div className="content">
        {
          activeTab === "borrow" ? <Borrow /> : null
        }
        </div>
      </div>
    </Layout>
  ) : null;
};

export default Dashboard;
