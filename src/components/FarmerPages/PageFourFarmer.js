import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import { useNavigate } from 'react-router-dom';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';
import axios from 'axios';
import { countries } from 'countries-list'; // Import countries object directly
import { Link } from 'react-router-dom';

const PageFourFarmer = ({ formData, setFormData, onButtonClick }) => {
  const allCountryNames = Object.values(countries).map(country => country.name);
  const [phoneNumber1, setPhoneNumber1] = useState('+216525444');
  const [selectedCountry1, setSelectedCountry1] = useState('United States'); // Default to United States
  const navigate = useNavigate();

  useEffect(() => {
    const previousScrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, previousScrollPosition);
    };
  }, []);

  const handleSecurityQuestionChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedSecurityQuestions = [...(prevData.securityQuestions || [])]; // Copy existing array or initialize as empty array
      updatedSecurityQuestions[index] = value; // Update the value at the specified index
      return {
        ...prevData,
        securityQuestions: updatedSecurityQuestions // Set the updated array as the new value for securityQuestions
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // Validate title and description fields

    // Proceed to the next step
    onButtonClick('PageFiveFarmer');
  };

  return (
    <AuthLayout1 title="Farmer Signup" rootClass="layout-1" style={{ marginTop: '20px' }}>
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body>
        <div className="nk-form-card-head text-center pb-5">
          <h4 className="title mb-2"  style={{ marginTop: '70px' }}  >Ensure The Security Of Your Account </h4>
        </div>
          <Row style={{ marginTop: '0px' }}>
          {Array.from({ length: 3 }).map((_, index) => (
  <Col key={index} xs={12} style={{ marginBottom: '20px' }}>
    <NioField htmlFor={`question${index + 1}`}>
      <NioField.Input
        id={`question${index + 1}`}
        placeholder={["Your mother's maiden name", "Name of your first pet", " City where you were born"][index]}
        value={formData.securityQuestions && formData.securityQuestions[index]}
        onChange={(e) => handleSecurityQuestionChange(e, index)}
      />
    </NioField>
  </Col>
))}


<Col lg={12} className="d-flex justify-content-end" style={{ marginTop: '20px' }}>
              <div className="form-group">
                <NioButton
                  onClick={handleNext}
                  label=">>"
                  className="f6 grow br2 ph3 pv2 mb2 dib white"
                  style={{ width: "100%", backgroundColor: '#664DE5', border: 'none', color: 'white' }}
                />
              </div>
            </Col>
          </Row>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageFourFarmer;
