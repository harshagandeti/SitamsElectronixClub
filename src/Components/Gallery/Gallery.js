import { useContext, useEffect, useState } from "react";

import { db } from "../../Config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import { FaBackward, FaForward, FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Gallery.scss";
import SectionHeading from "../Section-Heading/SectionHeading";
import { AdminCheckContext } from "../Context/AdminCheckContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const WSPGallery = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState();
  const { AdminCheck } = useContext(AdminCheckContext);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
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
        onClick={() => deletefunc(id)}
        className="p-button-success"
        autoFocus
      />
    </div>
  );

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };
  useEffect(() => {
    const eventSnapshots = onSnapshot(
      collection(db, "Admin-Add-Gallery-Images"),
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
  }, []);
  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(data.length - 1)
      : setSlideNumber(slideNumber - 1);
  };
  const deleteHandler = (ID) => {
    const { id } = ID;
    setId(id);
    setVisible(true);

    console.log(ID);
  };
  const deletefunc = async (id) => {
    setVisible(false);
    const eventDeleteDoc = doc(db, "Admin-Add-Gallery-Images", id);
    await deleteDoc(eventDeleteDoc);
    toast.warning("Image deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
    });
  };

  // Next Image
  const nextSlide = () => {
    slideNumber + 1 === data.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return (
    <div className="GalleryMainDiv">
      <div className="GalleryHeading">
        <SectionHeading heading="Gallery" />
      </div>

      {openModal && (
        <div className="sliderWrap">
          <FaRegTimesCircle
            size={45}
            className="btnClose"
            onClick={handleCloseModal}
          />
          <FaBackward size={45} className="btnPrev" onClick={prevSlide} />
          <FaForward size={45} className="btnNext" onClick={nextSlide} />
          <div className="fullScreenImage">
            <img src={data[slideNumber].imgUrl} alt="" />

            <span>{data[slideNumber].title}</span>
          </div>
        </div>
      )}

      <div className="galleryWrap">
        {data &&
          data.map((slide, index) => {
            {
              /* const { id } = slide; */
            }
            return (
              <div className="single" key={slide.id}>
                <img
                  src={slide.imgUrl}
                  onClick={() => handleOpenModal(index)}
                  alt=""
                />
                <button
                  onClick={() => {
                    deleteHandler({ id: slide.id });
                  }}
                  className={AdminCheck ? "delete" : "disable"}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
      <div className="card flex justify-content-center">
        <Dialog
          header="Delete"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          footer={footerContent}
        >
          <p className="m-0">Are you sure you want to delete this image ?</p>
        </Dialog>
      </div>
    </div>
  );
};

export default WSPGallery;
