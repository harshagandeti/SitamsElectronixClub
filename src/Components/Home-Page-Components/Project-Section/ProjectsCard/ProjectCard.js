import React from "react";
import "./ProjectCard.scss";
import Img from "./LandingImg.ecde1f8a.webp";
import { Link } from "react-router-dom";

const ProjectCard = () => {
  return (
    <div className="flipCard">
      <div className="flipCardInner">
        <div className="flipCardFront">
          <img src={Img} alt="Avatar" />
          <div className="flipCardTextFront">
            <h4>Drowsiness Detection with Machine Learning</h4>
            <span> 16-01-2023</span>
            <button> Read More</button>
          </div>
        </div>
        <div className="flipCardBack">
          <p>
            Drowsiness detection is a safety technology that can prevent
            accidents that are caused by drivers who fell asleep while driving.
            The objective of this intermediate Python project is to build a
            drowsiness detection system that will detect that a person’s eyes
            are closed for a few seconds. This system will alert the driver when
            drowsiness is detected
          </p>
          <Link className="link" to="/projects">
            <button>Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
