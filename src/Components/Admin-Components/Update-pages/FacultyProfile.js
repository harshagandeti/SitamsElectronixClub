import React, { useState, useEffect, useRef } from "react";
import "../Add-Faculty/AddFacutly.scss";
import SectionHeading from "../../Section-Heading/SectionHeading";

//react prime
import { ProgressSpinner } from "primereact/progressspinner";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase config & libraries
import { db, Storage } from "../../../Config";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UpdateProfile = () => {
  const [progress, setProgress] = useState("");
  const [spinner, setSpinner] = useState(false);
  const aRef = useRef(null);
  const Navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  const [about, setAbout] = useState({
    faculty_id: "",
    name: "",
    designation: "",
    dept: "ECE",
    DOJ: "",
    phone: "",
    email: "",
    specialization: "",
    Exp_teach: "",
    Exp_ind: "",
    UG_course: "",
    UG_special: "",
    UG_Yoc: "",
    UG_clg: "",
    PG_course: "",
    PG_special: "",
    PG_Yoc: "",
    PG_clg: "",
    PhD_course: "",
    PhD_special: "",
    PhD_Yoc: "",
    PhD_clg: "",
    OE_course: "",
    OE_special: "",
    OE_Yoc: "",
    OE_clg: "",
    journals_national: "",
    journals_international: "",
    papers_national: "",
    papers_international: "",
    memberships: "",
    projects: "",
    pantents: "",
    awards: "",
  });
  const resetInput = () => {
    aRef.current.value = null;
  };

  const [file, setFile] = useState(null);

  const {
    faculty_id,
    name,
    designation,
    DOJ,
    phone,
    email,
    specialization,
    Exp_teach,
    Exp_ind,
    journals_national,
    journals_international,
    papers_national,
    papers_international,
    memberships,
    projects,
    pantents,
    awards,
    OE_course,
    OE_special,
    OE_Yoc,
    OE_clg,
    UG_course,
    UG_special,
    UG_Yoc,
    UG_clg,
    PG_course,
    PG_special,
    PG_Yoc,
    PG_clg,
    PhD_course,
    PhD_special,
    PhD_Yoc,
    PhD_clg,
  } = about;
  useEffect(() => {
    id && getSingleProfile();
  }, [id]);
  const getSingleProfile = async () => {
    const docRef = doc(db, "Admin-Add-Faculty-Profiles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      setAbout({ ...data.about });
      console.log("Profile", data);
    } else {
      console.log("No such document!");
    }
  };

  const changeHandler = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
    console.log(e.target.value)
    // setOtherDetails({ ...otherDetails, [e.target.name]: e.target.value });
  };

  // console.log("id:", id);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(Storage, `faculty/${file.name}`);
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

  const submitHandler = async (e) => {
    e.preventDefault();
   
    console.log("e.target.value",e.target.value)
    const {id}=e.target.value
     console.log("inside func id:", id);
    try {
      // await db.collection("NewFaculty").doc(id).update({
      //   ...about, timeStamp: serverTimestamp(),
      // })
      // const doc =await db.collection("NewFaculty").doc(id).get()
      // const user={
      //   ...doc.data(),id:doc.id
      // }
      // console.log(user)
      const docRef = await   updateDoc(doc(collection(db, "Admin-Add-Faculty-Profiles", id)), {
        ...about,
        timeStamp: serverTimestamp(),
      });
      toast.success("Updated Faculty Profile Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } catch (e) {
      console.error("Error updating doc: ", e);
    }

    cancelHandler();
    resetInput();
    // Navigate("/ece-dept");
  };

  const cancelHandler = (e) => {
    resetInput();
    setAbout({
      faculty_id: "",
      name: "",
      designation: "",
      DOJ: "",
      phone: "",
      email: "",
      specialization: "",
      Exp_teach: "",
      Exp_ind: "",
      UG_course: "",
      UG_special: "",
      UG_Yoc: "",
      UG_clg: "",
      journals_national: "",
      journals_international: "",
      papers_national: "",
      papers_international: "",
      memberships: "",
      projects: "",
      pantents: "",
      awards: "",
      OE_course: "",
      OE_special: "",
      OE_Yoc: "",
      OE_clg: "",
      PhD_course: "",
      PhD_special: "",
      PhD_Yoc: "",
      PhD_clg: "",
      PG_course: "",
      PG_special: "",
      PG_Yoc: "",
      PG_clg: "",
    });
    // Navigate("/faculty-profiles");
  };

  return (
    <div className="Add-Faculty">
      <div className="heading ">
        <SectionHeading heading="Update-Profile"></SectionHeading>
      </div>
      <div className="Container">
        <div
          className={
            spinner ? " Spinner flex justify-content-center" : "disable"
          }
        >
          <ProgressSpinner />
          <h4> Image uploading {Math.floor(progress)}%</h4>
          <h5>
            After Completion of mage uploading <span>Click Submit Button</span>
          </h5>
        </div>
        <div className="Form">
          <form onSubmit={submitHandler}>
            <h2>Personal Details</h2>
            <section className="about">
              <section>
                <label className="label">Choose profile pic</label>
                <input
                  type="file"
                  name="file"
                  ref={aRef}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                ></input>
                <label className="label">Faculty-id</label>
                <input
                  className="input"
                  name="faculty_id"
                  value={faculty_id}
                  onChange={changeHandler}
                  type="text"
                  placeholder="1975ECC450"
                ></input>
                <label className="label">Faculty-Name</label>
                <input
                  className="input"
                  name="name"
                  value={name}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Dr.E.N.Thompson"
                ></input>
                <label className="label">Designation</label>
                <input
                  className="input"
                  name="designation"
                  value={designation}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Professor & HOD"
                ></input>
                <label className="label">Date of Joining</label>
                <input
                  className="input"
                  name="DOJ"
                  value={DOJ}
                  onChange={changeHandler}
                  type="date"
                ></input>
              </section>
              <section>
                <label className="label">Phone No</label>
                <input
                  className="input"
                  name="phone"
                  value={phone}
                  onChange={changeHandler}
                  type="text"
                  placeholder="9010901090"
                ></input>
                <label className="label">Email</label>
                <input
                  className="input"
                  name="email"
                  value={email}
                  onChange={changeHandler}
                  type="email"
                  placeholder="example@gmail.com"
                ></input>
                <label className="label">Specialization</label>
                <input
                  className="input"
                  type="text"
                  value={specialization}
                  onChange={changeHandler}
                  name="specialization"
                  placeholder="Electronics and Communication Engineering"
                ></input>
                <label className="label">Experiences in teaching</label>
                <input
                  className="input"
                  type="text"
                  value={Exp_teach}
                  onChange={changeHandler}
                  name="Exp_teach"
                  placeholder="5"
                ></input>
                <label className="label">Experiences in industry</label>
                <input
                  className="input"
                  type="text"
                  value={Exp_ind}
                  name="Exp_ind"
                  onChange={changeHandler}
                  accept="years"
                  placeholder="5"
                ></input>
              </section>
            </section>
            <section>
              <h2>Education Details</h2>
              <section className="education">
                <section>
                  <h4>Under Graduation</h4>
                  <label className="label">Course </label>
                  <input
                    className="input"
                    name="UG_course"
                    value={UG_course}
                    onChange={changeHandler}
                    type="text"
                    placeholder="B.Tech"
                  ></input>
                  <label className="label">Specialization</label>
                  <input
                    className="input"
                    name="UG_special"
                    value={UG_special}
                    onChange={changeHandler}
                    type="text"
                    placeholder="ECE"
                  ></input>
                  <label className="label">Year of completion</label>
                  <input
                    className="input"
                    name="UG_Yoc"
                    value={UG_Yoc}
                    onChange={changeHandler}
                    type="date"
                    accept="years"
                    placeholder=""
                  ></input>
                  <label className="label">College / University</label>
                  <input
                    className="input"
                    name="UG_clg"
                    value={UG_clg}
                    onChange={changeHandler}
                    type="text"
                    accept="years"
                    placeholder="university"
                  ></input>
                </section>
                <section>
                  <h4>Post Graduation</h4>
                  <label className="label">Course </label>
                  <input
                    className="input"
                    name="PG_course"
                    value={PG_course}
                    onChange={changeHandler}
                    type="text"
                    placeholder="M.Tech"
                  ></input>
                  <label className="label">Specialization</label>
                  <input
                    className="input"
                    name="PG_special"
                    value={PG_special}
                    onChange={changeHandler}
                    type="text"
                    placeholder="VLSI"
                  ></input>
                  <label className="label">Year of completion</label>
                  <input
                    className="input"
                    name="PG_Yoc"
                    value={PG_Yoc}
                    onChange={changeHandler}
                    type="date"
                    accept="years"
                    placeholder=""
                  ></input>
                  <label className="label">College / University</label>
                  <input
                    className="input"
                    name="PG_clg"
                    value={PG_clg}
                    onChange={changeHandler}
                    type="text"
                    accept="years"
                    placeholder="university"
                  ></input>
                </section>{" "}
                <section>
                  <h4>Doctor of Philosophy (PhD)</h4>
                  <label className="label">Course </label>
                  <input
                    className="input"
                    name="PhD_course"
                    value={PhD_course}
                    onChange={changeHandler}
                    type="text"
                    placeholder="PhD"
                  ></input>
                  <label className="label">Specialization</label>
                  <input
                    className="input"
                    name="PhD_special"
                    value={PhD_special}
                    onChange={changeHandler}
                    type="text"
                    placeholder="ECE"
                  ></input>
                  <label className="label">Year of completion</label>
                  <input
                    className="input"
                    name="PhD_Yoc"
                    value={PhD_Yoc}
                    onChange={changeHandler}
                    type="date"
                    accept="years"
                    placeholder=""
                  ></input>
                  <label className="label">College / University</label>
                  <input
                    className="input"
                    name="PhD_clg"
                    value={PhD_clg}
                    onChange={changeHandler}
                    type="text"
                    accept="years"
                    placeholder="university"
                  ></input>
                </section>{" "}
                <section>
                  <h4>Any Other</h4>
                  <label className="label">Course </label>
                  <input
                    className="input"
                    name="OE_course"
                    value={OE_course}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Degree"
                  ></input>
                  <label className="label">Specialization</label>
                  <input
                    className="input"
                    name="OE_special"
                    value={OE_special}
                    onChange={changeHandler}
                    type="text"
                    placeholder="ECE"
                  ></input>
                  <label className="label">Year of completion</label>
                  <input
                    className="input"
                    name="OE_Yoc"
                    value={OE_Yoc}
                    onChange={changeHandler}
                    type="date"
                    accept="years"
                    placeholder=""
                  ></input>
                  <label className="label">College / University</label>
                  <input
                    className="input"
                    name="OE_clg"
                    value={OE_clg}
                    onChange={changeHandler}
                    type="text"
                    accept="years"
                    placeholder="university"
                  ></input>
                </section>
              </section>
            </section>
            <section className="other-section">
              <h2>Other Details </h2>

              <section className="other">
                <section>
                  <label className="label">Papers Published in Journals </label>
                  <label>National</label>
                  <input
                    className="input"
                    name="journals_national"
                    value={journals_national}
                    onChange={changeHandler}
                    type="text"
                    placeholder="5"
                  ></input>
                  <label>International </label>
                  <input
                    className="input"
                    name="journals_international"
                    value={journals_international}
                    onChange={changeHandler}
                    type="text"
                    placeholder="5"
                  ></input>
                  <label className="label">
                    Papers Presented in Conferences{" "}
                  </label>
                  <label>National</label>
                  <input
                    className="input"
                    name="papers_national"
                    value={papers_national}
                    onChange={changeHandler}
                    type="text"
                    placeholder="5"
                  ></input>
                  <label>International </label>
                  <input
                    className="input"
                    name="papers_international"
                    value={papers_international}
                    onChange={changeHandler}
                    type="text"
                    placeholder="5"
                  ></input>
                </section>
                <section>
                  <label className="label">Professional Membership </label>
                  <input
                    className="input"
                    name="memberships"
                    value={memberships}
                    onChange={changeHandler}
                    type="text"
                    placeholder="MITEE"
                  ></input>
                  <label className="label">Awards / Achievements</label>
                  <input
                    className="input"
                    name="awards"
                    value={awards}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Awards"
                  ></input>
                  <label className="label">Projects</label>
                  <input
                    className="input"
                    name="projects"
                    value={projects}
                    onChange={changeHandler}
                    type="text"
                    placeholder="5"
                  ></input>
                  <label className="label">Patents</label>
                  <input
                    className="input"
                    name="pantents"
                    value={pantents}
                    onChange={changeHandler}
                    type="text"
                    placeholder="5"
                  ></input>
                </section>
              </section>
            </section>
          </form>
          <section className="Btn-section">
            <button onClick={submitHandler}>Update</button>
            <button onClick={cancelHandler}>Cancel</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
