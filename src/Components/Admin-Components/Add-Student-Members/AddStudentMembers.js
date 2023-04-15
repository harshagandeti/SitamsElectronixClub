import React, { useState, useEffect, useRef } from "react";
import "./AddStudentMembers.scss";
import SectionHeading from "../../Section-Heading/SectionHeading";
import { BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";
import { RiContactsLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react prime
import { ProgressSpinner } from "primereact/progressspinner";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

//firebase config & libraries
import { db, Storage } from "../../../Config";
import {
  collection,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const AddStudentMembers = () => {
  const aRef = useRef(null);
  const [progress, setProgress] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    Class: "",
    Insta: "",
    LinKedIn: "",
    Github: "",
  });
  const [file, setFile] = useState("");
  const { name, Class, Insta, LinKedIn, Github } = profile;

  const changeHandler = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(Storage, `student/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setSpinner(true);
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setSpinner(false);
            setProfile((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Admin-Add-Student-Members"), {
        profile,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("New Faculty Profile Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    cancelHandler();
  };
  const reset = (e) => {
    aRef.current.value = null;
  };
  const cancelHandler = (e) => {
    reset();
    setProfile({
      name: "",
      Class: "",
      Insta: "",
      LinKedIn: "",
      Github: "",
    });
  };

  return (
    <div className="Main-Student-Div">
      <SectionHeading heading="Student-Members" />
      <div className="container">
        <form>
          <label className="label">Choose Profile </label>
          <input
            className="input-file"
            name="file"
            ref={aRef}
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/png"
          ></input>
          <label>
            <RiContactsLine />
            <input
              type="text"
              name="name"
              value={name}
              onChange={changeHandler}
              placeholder="Full Name"
            ></input>
          </label>
          <label>
            <TbListDetails />
            <input
              type="text"
              name="Class"
              value={Class}
              onChange={changeHandler}
              placeholder="Year-Branch-sec"
            ></input>
          </label>
          <label>
            <BsInstagram color="rgb( 214,41,118)" />
            <input
              type="text"
              name="Insta"
              value={Insta}
              onChange={changeHandler}
              placeholder="Paste your Instagram link"
            ></input>
          </label>
          <label>
            <BsLinkedin color="rgb(0, 160, 220)" />
            <input
              type="text"
              name="LinKedIn"
              value={LinKedIn}
              onChange={changeHandler}
              placeholder="Paste your Linkedin link "
            ></input>
          </label>
          <label>
            <BsGithub color="#171515" />
            <input
              type="text"
              name="Github"
              value={Github}
              onChange={changeHandler}
              placeholder="Paste your GitHub link (Optional)"
            ></input>
          </label>
        </form>
        <div className="btn-class">
          <button onClick={submitHandler}>Submit</button>
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      </div>
      <div
        className={spinner ? " Spinner flex justify-content-center" : "disable"}
      >
        <ProgressSpinner />
        <h4> Imaging uploading to firebase {Math.floor(progress)}%</h4>
        <span>Wait for sometime </span>
      </div>
    </div>
  );
};

export default AddStudentMembers;
