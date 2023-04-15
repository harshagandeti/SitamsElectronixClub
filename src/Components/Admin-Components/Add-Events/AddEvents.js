import React, { useEffect, useState } from "react";
import "./AddEvents.scss";
import SectionHeading from "../../Section-Heading/SectionHeading";
import { Api } from "../../Api/Api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//firebase config & libraries
import { db } from "../../../Config";
import { collection, addDoc } from "firebase/firestore";

const AddEvents = (props) => {
  const [cardColor, setColor] = useState("");
  const [event, setEvent] = useState({
    name: "",
    room: "",
    block: "",
    month: "",
    day: "",
    time: "",
    register_Link: "",
  });

  const { name, room, block, day, month, time, register_Link } = event;
  const changeHandler = async (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    const getRandomColor = () => {
      const arr = [
        "red",
        "blue",
        "green",
        "orange",
        "purple-dark",
        "maroon",
        "blue-dark",
      ];
      const randomIndex = Math.floor(Math.random() * arr.length);
  
      const item = arr[randomIndex];
      setColor(item);
      return item;
    };
    getRandomColor()
  })


  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const postHandler = async () => {
    try {
      const docRef = await addDoc(collection(db, "Admin-Add-Events"), {
        event,
        cardColor,
      });
      toast.info("New Event Added Successfully",{
        position:toast.POSITION.TOP_CENTER,
        theme:"colored"
      })
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    postHandler();
 
    // cancel handler for clear form after submit
    cancelHandler();
  };
  const cancelHandler = () => {
    setEvent({
      name: "",
      room: "",
      block: "",
      month: "",
      day: "",
      time: "",
      register_Link: "",
    });
  };
  return (
    <div className="Add-Events-Main-Div">
      <SectionHeading heading="Add-Events" />
      <div className="container">
        <form>
          <label>Enter Event Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
            placeholder="event name"
          ></input>
          <label>Enter Event Room No</label>
          <input
            type="text"
            name="room"
            value={room}
            onChange={changeHandler}
            placeholder="event Room No"
          ></input>
          <label>Enter Event Venue-Block</label>
          <input
            type="text"
            name="block"
            value={block}
            onChange={changeHandler}
            placeholder="event venu block"
          ></input>
          <label>Event Date</label>
          <select name="month" required onChange={changeHandler}>
            <option value="Jan">january</option>
            <option value="Feb">Febraury</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>
          <select name="day" required onChange={changeHandler}>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <label> Event Time</label>
          <input
            type="time"
            name="time"
            value={time}
            onChange={changeHandler}
            placeholder="event name"
          ></input>
          <label>Registration Google Form Link</label>
          <input
            type="text"
            name="register_Link"
            value={register_Link}
            onChange={changeHandler}
            placeholder="Paste here ........."
          ></input>
          <section className="section">
            <button onClick={submitHandler}>Submit</button>
            <button onClick={cancelHandler}>Cancel</button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
