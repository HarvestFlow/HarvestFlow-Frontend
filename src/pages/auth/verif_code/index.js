import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


// layouts
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';
import { NioButton, NioToaster, NioBrand, NioCard, NioSection } from '../../../components';

export default function VerifCode() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // Array to store each digit of the code
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      codeForget: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Combine the code digits to form the complete code
      const combinedCode = verificationCode.join('');
  
      console.log('Combined code:', combinedCode); // Log the combined code for verification
  
      // Send a POST request to your backend endpoint to verify the code
      console.log('Sending verification request...');
      const response = await axios.post('http://localhost:5000/user/VerifNewUser', {
        codeForget: combinedCode,
        email: localStorage.getItem('resetEmail') || '', // Include the email from local storage
      });
  
      console.log('Verification response:', response.data); // Log the verification response
  
      if (response.status === 200) {
        // Verification code is correct, retrieve the form data from localStorage
        const formData = JSON.parse(localStorage.getItem('formData'));
        console.log('Form data:', formData); // Log the form data
  
        // Send a POST request to create the user
        console.log('Sending create user request...');
        const createUserResponse = await axios.post('http://localhost:5000/user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  // Important for file uploads
          },
          withCredentials: true,
        });
  
        if (createUserResponse.status === 200) {
          console.log("User created successfully:", createUserResponse.data);
  
          if (createUserResponse.data.role) {
            // Store role in a secure cookie (using HttpOnly, Secure flags in production)
            document.cookie = `role=${createUserResponse.data.role}; path=/; Secure; HttpOnly`;
  
            // Redirect based on role
            switch (createUserResponse.data.role) {
              case 'farmer':
                navigate("/index-company-home-page");
                break;
              case 'distributor':
                navigate("/index-distributor-home-page");
                break;
              case 'transporter':
                navigate("/index-transporter-home-page");
                break;
              default:
                navigate("/");
                break;
            }
          } else {
            navigate("/");
          }
        } else {
          console.error('Error creating user:', createUserResponse);
          // Handle the user creation failure
        }
      } else {
        console.error('Invalid verification code');
        // Handle the case where the verification code is invalid
      }
    } catch (error) {
      console.error('Verification failed:', error);
      // Handle verification failure, such as network or server errors
    }
  };
  
  
  

  const handleChange = (index, value) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = value;
    setVerificationCode(updatedCode);
  };
  useEffect(() => {
    const previousScrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  
    return () => {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, previousScrollPosition);
    };
  }, []);

  return (
    <NioSection className="bg-purple-100" masks={["shape-18"]}  >
    <AuthLayout1 title="Forgot Password" rootClass="layout-1" style={{ marginTop: '50px' }}>
      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body>

          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-1 pb-1">
             
            </div>
            <h3 className="title mb-2" style={{ marginTop: '100px' }}>Verify Your Email</h3>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4">
              {verificationCode.map((digit, index) => (
                <Col xs={3} key={index}>
                  <Form.Control
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </Col>
              ))}
              <Col xs={12}>
                <div className="form-group"  style={{ marginTop: '100px' }}>
                  <NioButton type="submit" className="btn-indigo btn-block" label="Verify Code" />
                </div>
              </Col>
            </Row>
          </Form>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1>
    </NioSection>
  );
}
