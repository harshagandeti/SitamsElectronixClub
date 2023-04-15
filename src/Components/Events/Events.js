import React, { useContext, useEffect, useState } from "react";
import SectionHeading from "../Section-Heading/SectionHeading";
import "./Events.scss";
import { MdPlace } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";
import { BsDoorOpen } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase config &libraries
import { db } from "../../Config";
import {
  collection,
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { AdminCheckContext } from "../Context/AdminCheckContext";
import { useNavigate } from "react-router-dom";


const Events = (props) => {
  // const [show, setShow] = useState(true);
  const [eventsData, setEventsData] = useState();
  const [cardColor, setColor] = useState("");
  const [index, setindex] = useState(0);
const {AdminCheck}=useContext(AdminCheckContext)
const Navigate=useNavigate()

  useEffect(() => {
    const eventSnapshots = onSnapshot(
      collection(db, "Admin-Add-Events"),
      (Snapshots) => {
        const filterData = Snapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEventsData(filterData);
        console.log("filterdata:", filterData);
        console.log("Events", eventsData);
      },
      (error) => console.log(error)
    );

    return () => eventSnapshots();
  }, []);


  const deleteHandler = async(ID) => {
    console.log(ID)
    const {id}=ID
    const eventDeleteDoc = doc(db, "Admin-Add-Events", id);
    await deleteDoc(eventDeleteDoc);
    toast.warning("Event Details deleted successfully",{
      position:toast.POSITION.TOP_CENTER,
      theme:"colored"
    })
  };

  return (
    <div className="Events-Main-Div">
      <SectionHeading heading="Upcoming-Events" />
      <div className="Events-section">
        {eventsData  != null ? (
          eventsData &&
          eventsData.map((eventEach) => {
            console.log("event-data", eventsData.length);
            const { event, id } = eventEach;
            return (
              <div
                key={id}
                className={
                  "Event-card " +
                  (eventEach.cardColor === "red"
                    ? "red"
                    : eventEach.cardColor === "blue"
                    ? "blue"
                    : eventEach.cardColor === "green"
                    ? "green"
                    : eventEach.cardColor === "purple-dark"
                    ? "purple-dark"
                    : eventEach.cardColor === "blue-dark"
                    ? "blue-dark"
                    : eventEach.cardColor === "maroon"
                    ? "maroon"
                    : eventEach.cardColor === "orange"
                    ? "orange"
                    : "red")
                }
              >
                <div className="Event-date">
                  <h5>Date:</h5>
                  <span>{event.month}</span>
                  <h1>{event.day}</h1>
                </div>
                <div className="box">
                  <div className="box-content">
                    <h4 className="title">{event.name}</h4>
                    <div className="content-below">
                      <div>
                        <IoMdTimer color="black" />
                        <p>Time :</p> {event.time}
                      </div>
                      <div>
                        <BsDoorOpen color="black" />
                        <p>Room :</p> {event.room}
                      </div>
                      <div>
                        <MdPlace color="black" /> <p>Venue:</p> {event.block}
                      </div>
                    </div>
                  </div>
                  <div className="box-button">
                    <a
                      href={event.register_link}
                      target="_balnk"
                      className={
                        "btn-1  " +
                        (eventEach.cardColor === "red"
                          ? "red"
                          : eventEach.cardColor === "blue"
                          ? "blue"
                          : eventEach.cardColor === "green"
                          ? "green"
                          : eventEach.cardColor === "purple-dark"
                          ? "purple-dark"
                          : eventEach.cardColor === "pink-blue"
                          ? "pink-blue"
                          : eventEach.cardColor === "blue-dark"
                          ? "blue-dark"
                          : eventEach.cardColor === "maroon"
                          ? "maroon"
                          : eventEach.cardColor === "orange"
                          ? "orange"
                          : "red")
                      }
                    >
                      Register Now
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      deleteHandler({ id });
                    }}
                    className={AdminCheck ? "active" : "disable"}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No Upcoming Events</h2>
        )}
      </div>
    </div>
  );
};

export default Events;
