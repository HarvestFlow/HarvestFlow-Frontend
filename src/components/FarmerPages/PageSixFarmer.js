import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import ReactFlagsSelect from "react-flags-select";
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';
import ReCAPTCHA from "react-google-recaptcha";
import { countries } from 'countries-list'; // Import countries object directly

import axios from 'axios';

const PageSixFarmer = ({ formData, setFormData, onButtonClick }) => {
  const allCountryNames = Object.values(countries).map(country => country.name);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const handleChangeCaptcha = (value) => {
    setIsCaptchaValid(!!value); // Met à jour l'état avec la validité du captcha
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
  console.log("Description:", formData.description);
  console.log("email:", formData.emailCom);

  const handleSubmit = async () => {
    try {
      console.log('Form Data:', formData);

      // Vérifier si les termes ont été acceptés avant de soumettre les données
      if (!termsAccepted) {
        // Afficher un message d'erreur ou une alerte si les termes n'ont pas été acceptés
        alert("Please accept the Terms and Conditions to proceed.");
        return;
      }

      const farmerData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        companyname:formData.companyname,
        //certification:formData.certification,




        country: formData.selectedCountry1,
        phone: formData.phoneNumber1,
        productionMethod: formData.productionMethod,
        productionType: formData.productionType,
        address: formData.address,


        email: formData.email,
        password: formData.password,
       
        securityQuestions: formData.securityQuestions,
        role: "farmer",
        isActivated:false,
      };

      const forgetdata = {
        email: formData.email,
      };

      const response = await axios.post('http://localhost:5000/user/CodeVerif', forgetdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response from server:', response.formData);

      if (response.status === 200) {
        // Save the form data in local storage
        localStorage.setItem('formData', JSON.stringify(farmerData));
        localStorage.setItem('resetEmail', farmerData.email);

        // Navigate to verification page
        navigate('/auth/code-forget');
      } else {
        // Handle other status codes if needed
        console.error('Password reset request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  return (
    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '70px' }}  >

      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto  " >
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">

            <h3 className="title mb-2"  style={{ marginTop: '70px' }}  >Sign up to your account</h3>
            <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
          </div>

          {/* Terms and Conditions */}
          <div className="privacy-policy" style={{ maxHeight: '50vh', overflowY: 'auto' , marginTop: '-15px'}}>
            {/* Insert privacy policy text here */}
          </div>

          {/* Terms and Conditions checkbox */}
          <div className="privacy-policy" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
            <h4>Privacy Policy</h4>
            <p>Information Collection: We collect personal and non-personal information to improve our services.</p>
            <p>Use of Information: We use collected data to provide, maintain, and improve our services.</p>
            <p>Data Security: We implement security measures to protect user data from unauthorized access.</p>
            <p>Third-Party Services: We may use third-party services that collect information used to identify users.</p>
            <p>Changes to Policy: We reserve the right to update our privacy policy without prior notice.</p>
            <p>Cookies: We use cookies to improve user experience and track usage patterns.</p>
            <p>Opt-Out: Users can opt-out of certain data collection and processing activities.</p>
            <p>Data Retention: We retain user data as long as necessary for the purposes outlined in this policy.</p>
            <p>User Rights: Users have the right to access, update, and delete their personal information.</p>
            <p>Compliance: We comply with applicable data protection laws and regulations.</p>
            <p>By checking the box below, you acknowledge that you have read and agree to our Privacy Policy.</p>
          </div>

          <div className="row " style={{ marginTop: '15px' }}>
            <div className="col-auto">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="form-check-input-lg"
              />
            </div>
            <div className="col">
              <label htmlFor="termsAccepted" style={{ fontWeight: 'bold' , marginTop: 'px'}}>I accept the Privacy Policy</label>
            </div>

            <div className="row" style={{   marginTop: '10px'}}>
              <ReCAPTCHA
                sitekey="6Ldl_IopAAAAAGqFfTC7gEmxqOhoLnPidP96OeGN"
                onChange={handleChangeCaptcha} // Met à jour l'état du captcha
              />
            </div>
          </div>

          <Col lg={12} className="d-flex justify-content-center">
            <div className="form-group">
              <NioButton
                onClick={handleSubmit}
                label="Submit"
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{ width: '100%', backgroundColor: '#664DE5', border: 'none', color: 'white' }}
                disabled={!termsAccepted || !isCaptchaValid} // Désactiver le bouton si les termes ne sont pas acceptés
              />
            </div>
          </Col>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageSixFarmer;
