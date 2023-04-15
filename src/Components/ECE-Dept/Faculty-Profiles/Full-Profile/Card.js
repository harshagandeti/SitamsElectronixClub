import React, { useEffect, useState } from "react";
import "./Card.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { About, PhD_, UG_PG, Other_Details } from "./Assets/Components";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { db } from "../../../../Config";
import { collection, getDoc, doc, ref, onSnapshot } from "firebase/firestore";

const FullProfile = () => {
  // const [id, setId] = useState("");
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    const getSingleProfile = async () => {
      const ref = doc(db, "Admin-Add-Faculty-Profiles", id);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const doc = docSnap.data();
        setProfile(doc);
      } else {
        console.log("No such document!");
      }
    };
    id && getSingleProfile();
  }, [id]);

  const { about } = profile;

  return (
    <div className="Card-Full">
      {profile && (
        <div className="Container">
          <Link to="/ece-dept">
            <button className="button">
              <AiOutlineArrowLeft size={20} />
              Back
            </button>
          </Link>
          <div className="upper-container">
            <div className="img-div">
              <img src={about?.imgUrl}></img>
            </div>
            <div className="section-right">
              <div className="upper-content">
                <div className="text-div Name">{about?.name}</div>
                <div className="text-div desigination">
                  {about?.designation}
                </div>
                <div className="text-div dept">ECE,Sitams</div>
              </div>
              {console.log("about", about)}
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    About
                  </button>
                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    UG & PG
                  </button>
                  <button
                    className="nav-link"
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    PhD & Other
                  </button>
                  <button
                    className="nav-link"
                    id="nav-disabled-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-disabled"
                    type="button"
                    role="tab"
                    aria-controls="nav-disabled"
                    aria-selected="false"
                  >
                    Other
                  </button>
                </div>
              </nav>
            </div>
          </div>

          <div className="lower-container tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <About data={about} />
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <UG_PG data={about} />
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <PhD_ data={about} />
            </div>
            <div
              className="tab-pane fade"
              id="nav-disabled"
              role="tabpanel"
              aria-labelledby="nav-disabled-tab"
            >
              <Other_Details data={about} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullProfile;
