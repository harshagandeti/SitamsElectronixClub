import React, { useState, useEffect ,useRef} from "react";
import "./AddImages.scss";
import AddImage from "./Add-image.jpg";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//react prime
import { ProgressSpinner } from 'primereact/progressspinner';
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

// firebase config &libraries
import { db, Storage } from "../../../Config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddImages = () => {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState("");
  const [spinner,setSpinner]=useState(false)
  const aRef = useRef(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(Storage, `Gallery/${file.name}+${new Date()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + Math.floor(progress) + "% done");
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
            toast.info("Image upload to firebase successfully");
            setImgUrl(downloadUrl);
            setSpinner(false)
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Admin-Add-Gallery-Images"), {
        title,
        imgUrl,
        timeStamp:serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("New Image Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    resetInput()
    cancelHandler()

  };

  const resetInput = () => {
    aRef.current.value = null;
  };
  const cancelHandler = (e) => {
    setTitle("");
  };
  return (
    <div className="AI-Main-Div">

      <div className="Container-box">
      <div className={spinner?" Spinner flex justify-content-center" :"disable"}>
            <ProgressSpinner />
            <h4> Image uploading to firebase {Math.floor(progress)}%</h4>
        </div>
        <div className="Left">
          <img src={AddImage}></img>
        </div>
        <div className="border">
          <div className="Right">
            <span>Upload Image to gallery</span>
            <div className="form">
              <form onSubmit={submitHandler}>
                <label className="label">Enter Title </label>
                <input
                  className="input"
                  type="text"
                  value={title}
                  placeholder="Enter title"
                  name="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
                <label className="label">Choose image </label>
                <input
                  className="input-file"
                  type="file"
                  name="file"
                  ref={aRef}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                ></input>
              </form>
              <button className="btn-1" onClick={submitHandler}>
                Upload
              </button>
              <button className="btn-2" onClick={cancelHandler}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImages;
