import React, { useState, useEffect, useContext } from "react";
// import { useTable } from "react-table";
import { FaSearch } from "react-icons/fa";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RiDeleteBin6Line } from "react-icons/ri";
import SectionHeading from "../Section-Heading/SectionHeading";
import "./ProjectsPage.scss";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const ProjectsPage = () => {
  const [project, setProject] = useState();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const { AdminCheck } = useContext(AdminCheckContext);

  const [visible, setVisible] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id:"",
    url:"",
  });
  const{id,url}=deleteData
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
        onClick={() => deleteFunc(id,url)}
        className="p-button-success"
        autoFocus
      />
    </div>
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const eventSnapshots = onSnapshot(
      collection(db, "Admin-Add-Projects"),
      (Snapshots) => {
        const filterData = Snapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProject(filterData);
      },
      (error) => console.log(error)
    );

    return () => eventSnapshots();
  };
  // Searching & Sorting

  const filterHandler = async (Click) => {
    const Type = Click.click;
    const q = query(
      collection(db, "Admin-Add-Projects"),
      where("project.type", "==", Type)
    );
    const querySnapshot = await getDocs(q);
    const filterData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProject(filterData);
  };

  const deleteFile = (id) => {
    const desertRef = ref(Storage, id);
    deleteObject(desertRef)
      .then(() => {
        console.log("Deleteed file also along with project ");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletHandler = async (ID) => {
    setVisible(true)
    const id = ID.id;
    const img = ID.img;
    setDeleteData({...deleteData,id:id,url:img})

  };
  const deleteFunc= async(id,url)=>{
  
    deleteFile(url);
    const eventDeleteDoc = doc(db, "Admin-Add-Projects", id);
    await deleteDoc(eventDeleteDoc);
    setVisible(true)
    toast.warning("Event Details deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
    });

  }

  return (
    <div className="PPMainDiv">
      <SectionHeading heading="Projects" />
      <div className="searchMainContainer">
        <div className="searchContainer">
          <form>
            <input
              type="search"
              value={globalFilterValue}
              placeholder="Search keys "
            ></input>
          </form>
        </div>
        <div className="sortContainer">
          <button
            className="all-btn"
            onClick={() => {
              getData();
            }}
          >
            All
          </button>
          <button
            className="nth-1"
            onClick={() => {
              filterHandler({ click: "Mini project" });
            }}
          >
            Mini Project
          </button>
          <button
            className="nth-2"
            onClick={() => {
              filterHandler({ click: "Final year project" });
            }}
          >
            Final Year Project
          </button>
          <button
            className="nth-3"
            onClick={() => {
              filterHandler({ click: "Personal project" });
            }}
          >
            Personal Project
          </button>
        </div>
      </div>

      <div className="Table">
        <table>
          <tbody>
            <tr className="head">
              <td className="title">Title</td>
              <td>Project year</td>
              <td>Type of project</td>
              <td>Download document</td>
              <td className={AdminCheck ? "active" : "disable"}>
                Delete project
              </td>
            </tr>
            {project &&
              project.map((item, index) => (
                <tr className="body" key={item.id}>
                  <td>{item.project.title}</td>
                  <td>{item.project.year}</td>
                  <td>{item.project.type}</td>
                  <td>
                    <a
                      className="download-div"
                      download={item.project.docUrl}
                      href={item.project.docUrl}
                    >
                      <i className="pi pi-download"></i>
                      <span>Download</span>
                    </a>
                  </td>
                  <td>
                    <button
                      className={AdminCheck ? "delete-div" : "disable"}
                      onClick={() => {
                        deletHandler({ id: item.id, img: item.project.docUrl });
                      }}
                    >
                      <RiDeleteBin6Line className="delete" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mobile">
        <span>This page not support in mobile phone</span>
        <br />
        <span>Otherwise Your mobile keep in Desktop Mode</span>
      </div>
      <div className="card flex justify-content-center">
        <Dialog
          header="Delete"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          footer={footerContent}
        >
          <p className="m-0">Are you sure you want to delete this project ?</p>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectsPage;
