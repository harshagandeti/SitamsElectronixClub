import React, { useState, useEffect, useRef } from "react";
import "./AdminAbout.scss";
import SectionHeading from "../../Section-Heading/SectionHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase config & libraries
import { db,Storage } from "../../../Config";
import {
  collection,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const AdminAbout = () => {
  const [progress, setProgress] = useState("");
  const aRef = useRef(null);
  const [spinner, setSpinner] = useState(false);
  const [about, setAbout] = useState({
    name: "",
    desgination: "",
    description: "",
  });
  const { name, description, desgination } = about;
  const [file, setFile] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(Storage, `About/${file.name}`);
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
            setAbout((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };


    file && uploadFile();
  }, [file]);


  const changeHandler = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "AboutFaculty"), {
        about,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Abouts Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    cancelHandler();
  };
  const resetInput = () => {
    aRef.current.value = null;
  };
  const cancelHandler = () => {
    setAbout({ name: "", desgination: "", description: "" });
    resetInput();
  };
  return (
    <div className="About-Main-div">
      <SectionHeading heading="Abouts" />
      <div className="Container">
        <form onSubmit={submitHandler}>
          <label>
            <input
              id="input-file"
              name="file"
              ref={aRef}
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            ></input>
          </label>
          <label>
            Name{" "}
            <input
              type="text"
              className="input"
              placeholder="name"
              name="name"
              value={name}
              onChange={changeHandler}
            ></input>
          </label>
          <label>
            Designation{" "}
            <input
              type="text"
              className="input"
              placeholder="desgination"
              name="desgination"
              value={desgination}
              onChange={changeHandler}
            ></input>
          </label>
          <textarea
            className="textArea"
            name="description"
            value={description}
            onChange={changeHandler}
          ></textarea>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAbout;
