import React, { useEffect, useState } from "react";
import firebase from "../../services/firebase";
import { useRouter } from "next/router";
import store from "../../store/store"

const Nav = () => {
  const router = useRouter()
  const [login, setLogin] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const signOut = () => {
    store.loading = true
    firebase.auth().signOut()
    console.log("signed out");
    
    store.loading = false
    router.push("/login")
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLogin(true);
      }
      setShowNav(true);
    });
  }, []);
  return showNav ? (
    <nav className="navbar">
      <div className="burger-icon">
        <span>&#9776;</span>
      </div>
      <div className="cash-btn">
        {login ? (
          <button className="btn btn-outline" onClick={signOut}>Sign Out!</button>
        ) : (
          <button className="btn btn-outline">Cashout</button>
        )}
      </div>
    </nav>
  ) : null;
};

export default Nav;
