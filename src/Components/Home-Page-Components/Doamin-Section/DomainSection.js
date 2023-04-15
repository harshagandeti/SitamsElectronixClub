import React, { Component } from "react";
import SectionHeading from "../Section-Heading/SectionHeading";
// import { Link } from "react-router-dom";
import {
  MachineLearning,
  AppDevelopment,
  WebDevelopment,
  Iot,
  Electronics,
  ComputerVision,
  Design,
  VLSI,
  Antenna
} from "./Assets/DomainCardAssets";
import "./DomainSection.scss";

const DomainSection = () => {
  const Face_1 = (component) => {
    return (
      <div className="face face1">
        <div className="content">{<MachineLearning />}</div>
      </div>
    );
  };
  const Face_2 = (p, Link) => {
    return (
      <div className="face face2">
        <div className="content">
          <p>
            Machine Learning involves the use of Artificial Intelligence to
            enable machines to learn a task from experience without programming
            them specifically about that task.....
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    );
  };
  return (
    <div className="DomainMainDiv">
      <SectionHeading heading="Domains" center dark></SectionHeading>
      <div id="marquee" className="DomainContainer">
        <div className="marquee-item">
          <div className="mainCard">
            {Face_1()}
            <div className="face face2">
              <div className="content">
                <p>
                  Machine Learning involves the use of Artificial Intelligence
                  to enable machines to learn a task from experience without
                  programming .....
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <AppDevelopment />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <Antenna />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <VLSI />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <ComputerVision />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">{<WebDevelopment />}</div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  The word Web Development is made up of two words, that is:
                  Web:It refers to websites, web pages or anything that works
                  over the internet.....
                </p>
                <a href="/domain-web-development">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">{<Design />}</div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">{<Electronics />}</div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <Iot />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <MachineLearning />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Machine Learning involves the use of Artificial Intelligence
                  to enable machines to learn a task from experience without
                  programming .....
                </p>
                <a href="/domain-machine-learning">Read More</a>
              </div>
            </div>
          </div>

          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <AppDevelopment />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Love.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <ComputerVision />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  computer is computer 
                 which we can swee
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <WebDevelopment />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <Design />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <Electronics />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <Iot />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <VLSI />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
          <div className="mainCard">
            <div className="face face1">
              <div className="content">
                <Antenna />
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  cum cumque minus iste veritatis provident at.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSection;
