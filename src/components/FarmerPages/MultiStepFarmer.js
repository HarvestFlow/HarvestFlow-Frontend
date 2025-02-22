import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepFarmer = ({ page}) => {
  let stepPercentage = 0;
  if (page === "PageOneFarmer") {
    stepPercentage = 16.67;
  } else if (page === "PageTwoFarmer") {
    stepPercentage = 33.33;
  } else if (page === "PageThreeFarmer") {
    stepPercentage = 50;
  } else if (page === "PageFourFarmer") {
    stepPercentage = 66.67;
  } else if (page === "PageFiveFarmer") {
    stepPercentage = 83.33;
  } else if (page === "PageSixFarmer") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }
  return (
    <div className="ProgressBar">    
      <ProgressBar percent={stepPercentage}>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >             
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default MultiStepFarmer;
