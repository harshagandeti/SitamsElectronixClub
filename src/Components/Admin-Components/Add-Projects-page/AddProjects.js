import React, { useState, useEffect,useRef } from "react";
import "./AddProjects.scss";
import projectImage from "../Admin-DashBoard-Page/innovation.png";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react prime
import { ProgressSpinner } from 'primereact/progressspinner';
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// firebase config &libraries
import { db, Storage } from "../../../Config";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const AddProjects = () => {
  const aRef = useRef(null);
  const [project, setProject] = useState({
    title: "",
    year: "",
    type: "",
  });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState("");
  const [spinner,setSpinner]=useState(false)

  const changeHandler = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    const uploadFile = () => {
      const metadata = {
        contentType: 'file/doc'|| "file/docx" || "file/pdf" 
      };
      const storageRef = ref(Storage, `Projects/${file.name}+${new Date()}`);
      const uploadTask = uploadBytesResumable(storageRef, file,metadata );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          setSpinner(true)
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
            toast.info("Document upload to firebase successfully");
            setSpinner(false)
            setProject((prev) => ({ ...prev, docUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Admin-Add-Projects"), {
        project,
      });
      toast.success("New Project Added Successfully",{
        position:toast.POSITION.TOP_CENTER,
        theme:"colored"})
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    cancelHandler();
    resetInput()
  };
  
  const resetInput = () => {
    aRef.current.value = null;
  };
  const cancelHandler = (e) => {
    setProject({
      title: "",
      year: "",
      type: "",
    });
    resetInput()
   
  };

  return (
    <div className="AP-Main-Div">
      <div className="container-box">
      <div className={spinner?" Spinner flex justify-content-center" :"disable"}>
            <ProgressSpinner />
            <h4> Document uploading {Math.floor(progress)}%</h4>
            <h5>After Completion of document uploading <span>Click Submit Button</span></h5>
        </div>
        <div className="imgDiv">
          <img className="img" src={projectImage}></img>
        </div>

        <div className="container">
          <span className="H1">Add New Projects</span>
          <div className="form">
            <form>
              <label className="label">Enter project title</label>
              <input
                className="input"
                type="text"
                name="title"
                value={project.title}
                onChange={changeHandler}
                placeholder="enter project title"
              ></input>
              <label className="label">Enter passed out year</label>
              <input
                className="input"
                type="text"
                name="year"
                maxLength={4}
                value={project.year}
                onChange={changeHandler}
                placeholder="enter passed out year"
              ></input>
              <label className="label">Select type of project</label>

              <label className="label-radio">
                {" "}
                <input
                  className="input-radio"
                  type="radio"
                  name="type"
                  value="Final year project"
                  onChange={changeHandler}
                ></input>
                Final year project
              </label>
              <br />

              <label className="label-radio">
                <input
                  className="input-radio"
                  type="radio"
                  name="type"
                  value="Mini Project"
                  onChange={changeHandler}
                ></input>
                Mini project
              </label>
              <br />

              <label className="label-radio">
                {" "}
                <input
                  className="input-radio"
                  type="radio"
                  name="type"
                  value="Personal project"
                  onChange={changeHandler}
                ></input>
                Personal project
              </label>

              <label className="label">Choose project document</label>
              <input
                className="input-file"
                type="file"
                name="file"
                ref={aRef}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              ></input>
              <section className="section">
                <button onClick={submitHandler}>Submit</button>
                <button onClick={cancelHandler}>Cancel</button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjects;
