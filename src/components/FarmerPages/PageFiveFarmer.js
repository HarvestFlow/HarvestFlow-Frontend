import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Importer les icônes de l'œil
import { useForm } from 'react-hook-form'; // Importer useForm depuis react-hook-form
import { countries } from 'countries-list'; // Import countries object directly
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';

const PageFiveFarmer = ({ formData, setFormData, onButtonClick }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm(); // Initialiser React Hook Form

  useEffect(() => {
    const previousScrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  
    return () => {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, previousScrollPosition);
    };
  }, []);
  
  const [descriptionError, setDescriptionError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Définissez la variable showPassword à l'aide du hook useState
  const [passwordError, setPasswordError] = useState(null); // Définissez la variable passwordError à l'aide du hook useState
  const [showPassword1, setShowPassword1] = useState(false); // État pour afficher ou masquer le mot de passe
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States
  const allCountryNames = Object.values(countries).map(country => country.name);
  const [privacyAccepted, setPrivacyAccepted] = useState(false); // State to track if privacy is accepted
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const handleNext = () => {
    if (!privacyAccepted) {
      // If privacy is not accepted, do not proceed
      alert("Please accept the privacy policy to proceed.");
      return;
    }
    // Proceed to the next step
    onButtonClick('PageSixFarmer');
  };

  const handlePrivacyChange = (e) => {
    setPrivacyAccepted(e.target.checked);
  };

  return (
    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '70px' }}  >
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto  " >
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <h3 className="title mb-2"  style={{ marginTop: '70px' }}  >Sign up to your account</h3>
            <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
          </div>
  
          {/* Privacy Policy */}
          <div className="privacy-policy" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <h4>Terms and Conditions</h4>
            <p>Acceptance of Terms: By using the HarvestFlow platform, you automatically agree to these terms and conditions. If you do not agree with these terms, please do not use the platform.</p>
            <p>Use of Service: HarvestFlow offers collaboration, challenge submission, and data analysis services. Users are responsible for the appropriate use of these services in accordance with applicable laws and regulations.</p>
            <p>Registration and User Account: To access certain features of the platform, you must create a user account. You are responsible for the confidentiality of your login credentials and activity associated with your account.</p>
            <p>Intellectual Property: All content created or submitted by users remains their intellectual property. By using the platform, you grant HarvestFlow a limited license to use this content within the scope of its services.</p>
            <p>User Responsibilities: Users agree not to use the HarvestFlow platform for illegal, fraudulent, or harmful purposes. You are responsible for the content you post and share on the platform.</p>
            <p>Data Privacy: HarvestFlow is committed to protecting the privacy of user data. Personal information will not be shared with third parties without prior consent, except as required by law.</p>
            <p>Modification and Termination Rights: HarvestFlow reserves the right to modify, suspend, or terminate your access to the platform for non-compliance with the terms and conditions or inappropriate behavior.</p>
            <p>Limitation of Liability: HarvestFlow shall not be liable for any direct, indirect, special, or consequential damages arising from the use or inability to use the platform.</p>
            <p>Service Availability: HarvestFlow endeavors to maintain the availability and reliability of its services but does not guarantee uninterrupted access to the platform.</p>
            <p>Applicable Law: These terms and conditions are governed by the applicable laws of your jurisdiction, and any dispute shall be subject to the competent courts of that jurisdiction.</p>
          </div>
  
          {/* Privacy Policy Checkbox */}
          <div className="row " style={{ marginTop: '15px' }}>
            <div className="col-auto">
              <input
                type="checkbox"
                id="privacyAccepted"
                checked={privacyAccepted}
                onChange={handlePrivacyChange}
              />
            </div>
            <div className="col">
              <label htmlFor="privacyAccepted" style={{ fontWeight: 'bold' }}>I accept the Terms and Conditions</label>
            </div>
          </div>
          
          <Col lg={12} className="d-flex justify-content-end">
            <div className="form-group">
              <NioButton
                onClick={handleNext}
                label=">>"
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                  style={{ width: "100%", backgroundColor: '#57b42e', border: 'none', color: 'white' }}
              />
            </div>
          </Col>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageFiveFarmer;
