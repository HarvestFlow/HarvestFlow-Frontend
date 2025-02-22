import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';
import { countries } from 'countries-list'; // Import countries object directly

const PageOneFarmer = ({ formData, setFormData, onButtonClick }) => {

 
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');

  

  useEffect(() => {
    const previousScrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, previousScrollPosition);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




 
  


  const handleNext = () => {
    // Validate required fields
    if (!formData.firstname.trim()) {
      setFirstnameError('First name is required');
      return;
    } else {
      setFirstnameError('');
    }

    if (!formData.lastname.trim()) {
      setLastnameError('Last name is required');
      return;
    } else {
      setLastnameError('');
    }
   
  

    

    // Proceed to the next step
    onButtonClick('PageTwoFarmer');
  };

  return (
    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '100px' }}>
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" style={{ marginTop: '50px' }}>
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <h3 className="title mb-2" style={{ marginTop: '70px' }}>Sign up to your account</h3>
            <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo">Login</Link>.</p>
          </div>

          <Row className="g-gs" style={{ marginTop: '0px' }}>
            <Col xs={12} md={6}>
              <NioField htmlFor="firstname">
                <NioField.Input
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </NioField>
              {firstnameError && <span className="text-danger">{firstnameError}</span>}
            </Col>

            <Col xs={12} md={6}>
              <NioField htmlFor="lastname">
                <NioField.Input
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </NioField>
              {lastnameError && <span className="text-danger">{lastnameError}</span>}
            </Col>

            {/* New Company Name Input */}
            <Col xs={12} md={12}>
              <NioField htmlFor="companyname">
                <NioField.Input
                  id="companyname"
                  name="companyname"
                  placeholder="Buisness Name"
                  value={formData.companyname}
                  onChange={handleInputChange}
                />
              </NioField>
            </Col>

          


            <Col lg={12}></Col>
          </Row>

          <Row>
            <Col lg={12} className="d-flex justify-content-end">
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

export default PageOneFarmer;
