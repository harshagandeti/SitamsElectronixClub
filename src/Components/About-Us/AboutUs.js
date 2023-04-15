import React, { useContext, useEffect, useState } from "react";
import "./AboutUs.scss";
import {
  Line,
  Circle,
} from "../Home-Page-Components/Back-Ground-Objects/BackGroundObj";
import SectionHeading from "../Section-Heading/SectionHeading";
import Profile from "../Images/Profile-1.png";
import StudentSection from "../StudentMembers/StudentSection";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AdminCheckContext } from "../Context/AdminCheckContext";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//db
import { db } from "../../Config";
import { collection, onSnapshot ,deleteDoc,doc} from "firebase/firestore";
const AboutUs = () => {
  const { AdminCheck } = useContext(AdminCheckContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const eventSnapshots = onSnapshot(
        collection(db, "AboutFaculty"),
        (Snapshots) => {
          const filterData = Snapshots.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setData(filterData);
        },
        (error) => console.log(error)
      );

      return () => eventSnapshots();
    };
    getData();
  }, []);
  console.log(data);
  const editHandler = (ID) => {
    console.log(ID);
  };
  const deleteHandler = async(ID) => {
    const id=ID.id
    console.log(id)
    const eventDeleteDoc = doc(db, "AboutFaculty", id);
    await deleteDoc(eventDeleteDoc);
    toast.warning("deleted successfully",{
      position:toast.POSITION.TOP_CENTER,
      theme:"colored"
    })
  };
  return (
    <div className="Abtus-Main-Div">
      <SectionHeading heading="About us" />

      <div className="Abt-Containers">
        {data &&
          data.map((item, index) => {
            return (
              <div key={item.id} className="Container">
                <div className={AdminCheck ? "edit-icon" : "disable"}>
                  <RiDeleteBinLine
                    className="icon"
                    onClick={() => {
                      deleteHandler ({ id: item.id });
                    }}
                    size={25}
                    color="rgb(237, 43, 42)"
                  
                  />
                </div>
                <div className={AdminCheck ? "delete-icon" : "disable"}>
                  <FiEdit
                    size={25}
                    onClick={()=>editHandler({ id: item.id })}
                    color=" rgb(0, 86, 139)"
                  />
                </div>

                <div className="header">
                  <div className="profile-img">
                    <img src={item.about.imgUrl}></img>
                  </div>
                  <div className="profile-details">
                    <span className="profile-name">{item.about.name}</span>
                    <span className="profile-role">
                      {item.about.desgination} , Sitams
                    </span>
                    <span className="profile-"></span>
                  </div>
                </div>
                <div className="content">
                  <p>{item.about.description}</p>
                </div>
              </div>
            );
          })}
        <div className="Container">
          <div className={AdminCheck ? "edit-icon" : "disable"}>
            <FiEdit
              className="icon"
              onClick={editHandler}
              size={25}
              color=" rgb(0, 86, 139)"
            />
          </div>
          <div className="header">
            <div className="profile-img">
              <img src={Profile}></img>
            </div>
            <div className="profile-details">
              <span className="profile-name">Dr. E.N. Thompson Forum</span>
              <span className="profile-role"> Principal , Sitams</span>
              <span className="profile-"></span>
            </div>
          </div>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="Container">
          <div className={AdminCheck ? "edit-icon" : "disable"}>
            <FiEdit
              className="icon"
              onClick={editHandler}
              size={25}
              color=" rgb(0, 86, 139)"
            />
          </div>
          <div className="header">
            <div className="profile-img">
              <img src={Profile}></img>
            </div>
            <div className="profile-details">
              <span className="profile-name">Dr. E.N. Thompson Forum</span>
              <span className="profile-role"> Principal , Sitams</span>
              <span className="profile-"></span>
            </div>
          </div>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        {/* <div className='Container'>
    <div className='header'>
        <div className='profile-img'>
            <img src={Profile}></img>
        </div>
        <div className='profile-details'>
            <span className='profile-name'>Dr. E.N. Thompson Forum</span>
            <span className='profile-role'> Principal , Sitams</span>
            <span className='profile-'></span>
        </div>
    </div>
    <div className='content'>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    </div> */}
      </div>

      <div className="Board">
        <StudentSection />
      </div>
      <div className="line">
        <Line />
      </div>
      <div className="Circle">
        <Circle />
      </div>
      <div className="Circle-1">
        <Circle />
      </div>
    </div>
  );
};

export default AboutUs;
