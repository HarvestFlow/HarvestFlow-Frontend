import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { NioButton, NioBrand, NioCard, NioField } from '../../components';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout1 from '../../layouts/AuthLayout/AuthLayout1';
import { countries } from 'countries-list'; // Import countries object directly
import Select from "react-select";

const PageTwoFarmer = ({ formData, setFormData, onButtonClick }) => {
  const allCountryNames = Object.values(countries).map(country => country.name);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [productionTypeError, setProductionTypeError] = useState('');
  const [productionMethodError, setProductionMethodError] = useState('');

  const handlePhoneNumberChange1 = (value) => {
    setPhoneNumber1(value);
  };
 



  const [phoneNumber1, setPhoneNumber1] = useState('+216525444');

  const handleCountryChange1 = (value) => {
    setSelectedCountry1(value);
  };
  const [selectedCountry1, setSelectedCountry1] = useState('United States'); // Default to United States

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 const handleSelectChange = (selectedItems) => {
    setFormData({ 
      ...formData, 
      productionType: selectedItems.map(item => item.value)
    });
  };
  const navigate = useNavigate();

  const handleNext = () => {
    // Validate the necessary fields
    if (!formData.phoneNumber1?.trim()) {
      setPhoneNumberError('Phone number is required');
      return;
    } else {
      setPhoneNumberError('');
    }

    if (!formData.selectedCountry1) {
      setCountryError('Country is required');
      return;
    } else {
      setCountryError('');
    }

    if (!formData.address?.trim()) {
      setAddressError('Address is required');
      return;
    } else {
      setAddressError('');
    }

   

    // If everything is valid, proceed to the next step
    onButtonClick('PageThreeFarmer');
  };

  return (
    <AuthLayout1 title="Signup" rootClass="layout-1" style={{ marginTop: '70px' }}>
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <h3 className="title mb-2" style={{ marginTop: '70px' }}>Sign up to your account</h3>
            <p className="text">Already a member? <Link to="/auth/login" className="btn-link text-indigo">Login</Link>.</p>
          </div>

          <Row style={{ marginTop: '70px' }}>
            <Col xs={12} md={6}>
              <ReactFlagsSelect
                countries={Object.keys(countries)}
                customLabels={allCountryNames}
                selectedSize={20}
                optionsSize={14}
                onSelect={(code) => handleInputChange({ target: { name: 'selectedCountry1', value: code } })}
                selected={formData.selectedCountry1}
                placeholder="Select a country"
                inputStyle={{
                  height: "55px",
                  width: "150%",
                  borderTopRightRadius: "10px",
                  paddingLeft: "45px",
                }}
              />
              {countryError && <span className="text-danger">{countryError}</span>}
            </Col>

            <Col xs={12} md={6}>
              <PhoneInput
                placeholder="Enter phone number"
                value={formData.phoneNumber1}
                inputStyle={{
                  height: "52px",
                  width: "100%",
                  borderTopRightRadius: "10px",
                  paddingLeft: "45px",
                }}
                onChange={(value) => handleInputChange({ target: { name: 'phoneNumber1', value: value } })}
              />
              {phoneNumberError && <span className="text-danger">{phoneNumberError}</span>}
            </Col>

            <Col xs={12} md={12}style={{ marginTop: '60px' }}>
              <NioField htmlFor="address">
                <NioField.Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </NioField>
              {addressError && <span className="text-danger">{addressError}</span>}
            </Col>

           



          </Row>

          <Col lg={12} className="d-flex justify-content-end" style={{ marginTop: '70px' }}>
            <div className="form-group">
              <NioButton
                onClick={handleNext}
                label=">>"
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{ width: "100%", backgroundColor: '#664DE5', border: 'none', color: 'white' }}
              />
            </div>
          </Col>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
  );
};

export default PageTwoFarmer;
