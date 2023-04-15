import React, { useState, useEffect, useContext } from "react";
import "./FacultyProfile.scss";
import { Link, useNavigate } from "react-router-dom";
//icons
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
//recat prime
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//firebase
import { auth, db } from "../../../Config";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { AdminCheckContext } from "../../Context/AdminCheckContext";

const FacultyProfile = () => {
  const [getData, setGetData] = useState([]);
  const Navigate = useNavigate();
  const { AdminCheck } = useContext(AdminCheckContext);

 

    const [visible, setVisible] = useState(false);
    const [deleteData, setDeleteData] = useState({
      id: "",
      url: "",
    });
    const { id, url } = deleteData;
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
          onClick={() => deleteFunc(id, url)}
          className="p-button-success"
          autoFocus
        />
      </div>
    );

    useEffect(() => {
      const profileSnapshots = onSnapshot(
        collection(db, "Admin-Add-Faculty-Profiles"),
        (Snapshots) => {
          const filterData = Snapshots.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setGetData(filterData);
        },
        (error) => console.log(error)
      );
      return () => profileSnapshots();
    }, []);

    const DeleteHandler = async (ID) => {
      setVisible(true);
      const { id } = ID;
      setDeleteData({ ...deleteData, id: id, url: "" });
    };
    const deleteFunc = async (id, url) => {
      const eventDeleteDoc = doc(db, "Admin-Add-Faculty-Profiles", id);
      await deleteDoc(eventDeleteDoc);
      setVisible(false);
      toast.warning("Profile deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    };
    return (
      <div className="Main-Div">
        {getData &&
          getData.map((item, index) => {
            const { id } = item;
            return (
              <div className="Card-Main-Div" key={item.id}>
                <div className="Upper-Container">
                  <div className="img-div">
                    <img src={item.about.imgUrl}></img>
                  </div>
                </div>
                <div className="lower-container">
                  <div className="lower-content">
                    <div className="Name-Div">
                      <h4 className="Name">{item.about.name}</h4>
                    </div>

                    <h6 className="Desigination">{item.about.designation}</h6>
                    <h6 className="clg">Sitams</h6>
                  </div>
                </div>
                <div className="Btn-div">
                  <button
                    onClick={() =>
                      Navigate("/faculty-full-profile", { state: item.id })
                    }
                    className="btn btn-primary"
                  >
                    View Profile
                  </button>
                  {AdminCheck && (
                    <button
                      className={AdminCheck ? "btn btn-info" : "disable"}
                      onClick={() =>
                        Navigate("/admin-update-faculty", { state: item.id })
                      }
                    >
                      <FaEdit />
                    </button>
                  )}
                  {AdminCheck && (
                    <button
                      className={AdminCheck ? "btn btn-warning" : "disable"}
                      onClick={() => {
                        DeleteHandler({ id });
                      }}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        <div className="card flex justify-content-center">
          <Dialog
            header="Delete"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
            footer={footerContent}
          >
            <p className="m-0">
              Are you sure you want to delete this profile ?
            </p>
          </Dialog>
        </div>
      </div>
    );
  
};

export default FacultyProfile;
