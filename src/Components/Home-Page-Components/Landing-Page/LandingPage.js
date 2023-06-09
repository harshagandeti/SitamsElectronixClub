import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import TypewritterEffect from "typewriter-effect";
import { RxDoubleArrowRight } from "react-icons/rx";
import { ScrollTop } from "primereact/scrolltop";

const LandingPage = () => {
  return (
    <div className="landingPageDiv">
      <div className="landingPageText">
        <div className="landingPageClubName">
          Sitams Electroni<span>X</span> Club
        </div>
        <span>
          <TypewritterEffect
            options={{
              autoStart: true,
              delay: 40,
              loop: true,
              strings: [
                "Sreenivasa Institute of Technology and Management Studies",
                "Department of Electronics and Communication Engineering",
              ],
            }}
          />
        </span>
      </div>

      <a className="Btn" href="/about-us">
        Know About Us <RxDoubleArrowRight className="rightArrow" />
      </a>
    </div>
  );
};

export default LandingPage;
