import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';


// layouts 
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';

// components 
import { NioButton, NioField, NioToaster, NioBrand, NioCard ,NioSection} from '../../../components';

export default function ForgotPassword() {

  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    'mode': 'onBlur',
    defaultValues: {
      email: '',
    }
  });

 
  const onSubmit = async (data) => {
    try {
      // Send a POST request to your backend endpoint
      const response = await axios.post('http://localhost:5000/user/forget', data);

      // If request is successful (status code 200), save the email in local storage and navigate to verification page
      if (response.status === 200) {
        localStorage.setItem('resetEmail', data.email);
        setShowSuccess(true);
        navigate('/auth/verif-password'); // Navigate to the verification page
      } else {
        // Handle other status codes if needed
        console.error('Password reset request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
      // Handle error appropriately, e.g., show error message to user
    }
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
    <AuthLayout1 title="Forgot Password" rootClass="layout-1">
      {
        showSuccess && (
          <NioToaster
            variant="success"
            title="Success"
            message='Your Password sent it to your email'

          />
        )
      }

      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" >
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-1 pb-1">
             </div>
            <h3 className="title mb-2">Password Forgotten?</h3>
            <p className="text">Shouldn't Be Here <Link to="/auth/login" className="btn-link text-indigo">Login</Link>.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4">
              <Col xs={12}>
                <NioField label="Email" htmlFor="email">
                  <NioField.Input type="email" id="email" placeholder="Enter your email" errors={errors.email} {...register("email", {
                    required: "field is required",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "invalid email address"
                    }
                  })} />
                </NioField>
              </Col>
              <Col xs={12}>
                <div className="form-group">
                  <NioButton className="btn-indigo btn-block" label="Send Reset Link" />
                </div>
              </Col>
            </Row>
          </Form>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1></NioSection>
  )
}
