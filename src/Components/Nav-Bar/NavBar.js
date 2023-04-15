import React, { useContext, useState } from "react";
import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { FaRegTimesCircle } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { auth } from "../../Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AdminCheckContext } from "../Context/AdminCheckContext";

const NavBar = () => {
  const [clicked, setClicked] = useState(true);
  const Navigate = useNavigate();
  const { AdminCheck } = useContext(AdminCheckContext);
  const openClick = () => {
    setClicked({ clicked: !clicked });
  };
  const closeClick = () => {
    setClicked(false);
  };

  const LoginHandler = () => {

      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      if (username !== null && password !== null) {
        const authCheck = signInWithEmailAndPassword(
          auth,
          username,
          password
        ).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Login Successfully", {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
          });
          Navigate("/admin-dash-board");
        });
      }
          Navigate("/admin-auth");
    
  };

  return (
    <nav className="navBarMainDiv">
      <div id="Mobile" className="Mobile">
        {clicked ? (
          <TfiMenu
            className="menuIcon"
            onClick={closeClick}
            color="white"
            size={30}
          />
        ) : (
          <FaRegTimesCircle
            onClick={openClick}
            size={30}
            className="closeIcon"
            color="red"
          />
        )}
      </div>

      <div id="navbar" className={clicked ? "#navbar close" : "navbar"}>
        <Link
          className="link"
          onClick={() => {
            setClicked(true);
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          className="link"
          onClick={() => {
            setClicked(true);
          }}
          to="/about-us"
        >
          About us
        </Link>
        <Link
          className="link"
          onClick={() => {
            setClicked(true);
          }}
          to="/gallery"
        >
          Gallery
        </Link>
        <Link
          className="link"
          onClick={() => {
            setClicked(true);
          }}
          to="/projects"
        >
          Projects
        </Link>
        <Link
          className="link"
          onClick={() => {
            setClicked(true);
          }}
          to="/domain-page"
        >
          Domains
        </Link>
        <Link
          className="link"
          onClick={() => {
            setClicked(true);
          }}
          to="/events"
        >
          Events
        </Link>
        <Link
          className="link"
          onClick={() => {
            setClicked(true);
          }}
          to="/ece-dept"
        >
          ECE Dept
        </Link>
      </div>
      <div className="navBarRight">
        <Link className="button" onClick={LoginHandler} to="/admin-auth" >
          <RiAdminLine />
          <span>Admin</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
