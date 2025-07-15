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

const PageThreeFarmer = ({ formData, setFormData, onButtonClick }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm(); // Initialiser React Hook Form
  
  const [descriptionError, setDescriptionError] = useState('');
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Définissez la variable showPassword à l'aide du hook useState
  const [passwordError, setPasswordError] = useState(''); // Définissez la variable passwordError à l'aide du hook useState
  const [phoneNumberError, setPhoneNumberError] = useState(''); // State for phone number error

  const [companyNameError, setCompanyNameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const password = watch('formData.password');

  useEffect(() => {
    const previousScrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  
    return () => {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, previousScrollPosition);
    };
  }, []);
  const [showPassword1, setShowPassword1] = useState(false); // État pour afficher ou masquer le mot de passe
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowPassword1(!showPassword1);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, confirmPassword: value });
  
    if (value !== formData.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(""); // Clear the error message if passwords match
    }
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States
  const allCountryNames = Object.values(countries).map(country => country.name);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    // Perform validation check for email field
    if (!value.includes('@')) {
      setemailError('Email is not valid');
    } else {
      setemailError('');
    }
    setFormData((prevData) => ({ ...prevData, email: value }));
  };

  const handleNext = () => {
    if (!formData.email.trim()) {
      setemailError('Email is required');
      return;
    } else {
      setemailError('');
    }

    if (!formData.password.trim()) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError('');
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    } else {
      setConfirmPasswordError('');
    }
    
    onButtonClick('PageFourFarmer');
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError(null);
    }
  };

  console.log("emailpany:", formData.email);

  return (
    <AuthLayout1 title="Farmer Signup" rootClass="layout-1" style={{ marginTop: '100px' }}  >
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <h3 className="title mb-2"  style={{ marginTop: '70px' }} >Sign up to your account as a Farmer</h3>
            <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo" >Login</Link>.</p>
          </div>

          <Row className="g-gs">
            <Col xs={12}>
              <NioField htmlFor="email">
                <NioField.Input
                  id="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                />
              </NioField>
              {emailError && <span className="text-danger">{emailError}</span>}
            </Col>

            <Col xs={12} md={6}>
              <NioField htmlFor="password">
                <div style={{ position: 'relative' }}>
                  <NioField.Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </div>
                </div>
                {passwordError && <div style={{ fontSize: '12px', color: 'red' }}>{passwordError}</div>}
              </NioField>
            </Col>

            <Col xs={12} md={6}>
              <NioField htmlFor="confirmPassword">
                <div style={{ position: 'relative' }}>
                  <NioField.Input
                    type={showPassword1 ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    {showPassword1 ? <EyeSlash /> : <Eye />}
                  </div>
                </div>
                {passwordError && <div style={{ fontSize: '12px', color: 'red' }}>{passwordError}</div>}
              </NioField>
            </Col>

            <Col lg={12} className="d-flex justify-content-end" style={{ marginTop: '70px' }}>
              <div className="form-group">
                <NioButton
                  onClick={handleNext}
                  label=">>"
                  className="f6 grow br2 ph3 pv2 mb2 dib white"
                  style={{ width: "100%", backgroundColor: '#57b42e', border: 'none', color: 'white' }}
                />
              </div>
            </Col>
          </Row>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageThreeFarmer;
