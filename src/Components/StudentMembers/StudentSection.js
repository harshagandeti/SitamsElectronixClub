import React, { useEffect, useState } from "react";

// Sections
import StudentMemberCard from "./StudentMemberCard";
import SectionHeading from "../Section-Heading/SectionHeading";
import { Circle } from "../Home-Page-Components/Back-Ground-Objects/BackGroundObj";

// Data
import StudentsData from "./StudentsData";
import { BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
// Styles
import "./StudentSection.scss";
// import "./StudentMemberCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

// firebase config &libraries
import { db, Storage } from "../../Config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { AdminCheckContext } from "../Context/AdminCheckContext";

const StudentSection = () => {
  const [boardMembers, setBoardMembers] = useState(StudentsData);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [Delete, setDelete] = useState(false);
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-warning"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setDelete(true)}
        className="p-button-success"
        autoFocus
      />
    </div>
  );
  useEffect(() => {
    // getData();
  }, []);

  const getData = () => {
    const eventSnapshots = onSnapshot(
      collection(db, "Admin-Add-Projects"),
      (Snapshots) => {
        const filterData = Snapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBoardMembers(filterData);
      },
      (error) => console.log(error)
    );

    return () => eventSnapshots();
  };

  const deleteHandler = ({ Boolean, id }) => {
    setVisible(Boolean);
    if (Delete === true) {
      console.log("if-working");
      setVisible(false);
    } else {
      console.log("else-working");
      setDelete(false);
    }
  };

  return (
    <section className="board-section">
      <SectionHeading heading="Student-Members" center />
      <div className="board-list">
        <div className="circle">
          <Circle />
        </div>
        {boardMembers &&
          boardMembers.map((member) => (
            <div key={member.id} className="board-member-card">
              <figure className="img-container" data-aos="zoom-in">
                <div className="border">
                  <img src={member.image} alt={member.name} className="img" />
                  <figcaption className="links">
                    <a
                      className="linkedin"
                      href={member.links.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsLinkedin />
                    </a>
                    <a
                      className="instagram"
                      href={member.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsInstagram />
                    </a>
                    <a
                      className="github"
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsGithub />
                    </a>
                    <a
                      className="delete"
                      onClick={() => deleteHandler({ Boolean: true })}
                      rel="noopener noreferrer"
                    >
                      <RiDeleteBinLine />
                    </a>
                  </figcaption>
                </div>
                <img src={member.image} alt={member.name} className="out-img" />
              </figure>
              <p className="name">{member.name}</p>
              <p className="post">{member.post}</p>
            </div>
          ))}
      </div>
      <div className="card flex justify-content-center">
        <Dialog
          header="Delete"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          footer={footerContent}
        >
          <p className="m-0">Are you sure you want to delete this profile ?</p>
        </Dialog>
      </div>
    </section>
  );
};

export default StudentSection;
