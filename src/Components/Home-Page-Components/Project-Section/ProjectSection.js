import React from "react";
import ProjectCard from "./ProjectsCard/ProjectCard";
import "./ProjectSection.scss";
import SectionHeading from "../Section-Heading/SectionHeading";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Link } from "react-router-dom";
const ProjectSection = () => {
  return (
    <div className="ProjectSectionMainDiv">
      <SectionHeading heading={"Projects"} />
      <div className="ProjectSectionInner">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <div className="btnPrs">
        <Link className="link" to="/projects">
          <span>See More </span>
        </Link>
        <RxDoubleArrowRight className="rightArrow" size={20} />
      </div>
    </div>
  );
};

export default ProjectSection;
