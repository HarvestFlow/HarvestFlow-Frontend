import React, { useState } from "react";
import axios from 'axios';
import PageOneFarmer from "./PageOneFarmer";
import PageThreeFarmer from "./PageThreeFarmer";
import PageFourFarmer from "./PageFourFarmer";
import PageFiveFarmer from "./PageFiveFarmer";
import PageSixFarmer from "./PageSixFarmer";
import PageTwoFarmer from "./PageTwoFarmer";
import NioSection from "../NioSection/NioSection";
import MultiStepFarmer from "./MultiStepFarmer";

function FarmerForm() {
  const [page, setPage] = useState("PageOneFarmer");
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone : '',
    email: '',
    password: '',
    confirmPassword: '',
    productionType:  [],
    productionMethod: [],

    
    companyname: '',
    country : '',
    address: '',
    status: '',
    securityQuestions: ['', '', ''],
    role:"farmer",
  });

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const nextPage = (page) => {
    setPage(page);
  };
  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("PageOneFarmer");
        break;
      case "2":
        setPage("PageTwoFarmer");
        break;
      case "3":
        setPage("PageThreeFarmer");
        break;
      case "4":
        setPage("PageFourFarmer");
        break;
      case "5":
        setPage("PageFiveFarmer");
        break;
      case "6":
        setPage("PageSixFarmer");
        break;
      default:
        setPage("PageOneFarmer");
    }
  };
  
  const handleNextButtonClick = (pageName) => {
    nextPage(pageName);
  };
  const submitForm = async (formData) => {
    try {
      const response = await axios.post('/your-backend-route', formData);
      console.log('Response from backend:', response.data);
      // Optionally, you can handle success behavior such as redirecting the user or showing a success message.
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, such as displaying an error message to the user.
    }
  };
  return (
    <NioSection className="bg-green-100" masks={["shape-19"]}  >
        <MultiStepFarmer page={page}  />
        {page === "PageOneFarmer" && (
    <PageOneFarmer
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageTwoFarmer" && (
    <PageTwoFarmer
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageThreeFarmer" && (
    <PageThreeFarmer
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageFourFarmer" && (
    <PageFourFarmer
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageFiveFarmer" && (
    <PageFiveFarmer
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

  {page === "PageSixFarmer" && (
    <PageSixFarmer
      formData={formData}
      setFormData={setFormData}
      onButtonClick={handleNextButtonClick}
    />
  )}

      </NioSection>
  );
}

export default FarmerForm;
