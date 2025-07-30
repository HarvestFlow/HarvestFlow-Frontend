import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

// layouts
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';

// components
import { NioButton, NioField, NioToaster, NioBrand, NioCard , NioSection} from '../../../components';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
  try {
    // Send a POST request to your backend endpoint to reset the password
    const response = await axios.post('http://localhost:5000/user/change', {
      password: data.password,
      email: localStorage.getItem('resetEmail') || '',
      codeForget: localStorage.getItem('codeForget') || '',
    });

    // If request is successful (status code 200), navigate to home page or show success message
    if (response.status === 200) {
      setShowSuccess(true);
      reset();
      
      // Assume that the token is returned in the response
      const { accessToken } = response.data;

      // Store the access token in localStorage
      localStorage.setItem('token', accessToken);
      
      navigate('/index-challenged-home-page');
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
    <NioSection className="bg-green-100" masks={["shape-18"]}  >
    <AuthLayout1 title="Reset Password" rootClass="layout-1">
      {showSuccess && (
        <NioToaster variant="success" title="Success" message="Your password has been reset" />
      )}

      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-1 pb-1">
                  </div>
            <h3 className="title mb-2">Reset Password</h3>
            <p className="text">
              Shouldn't Be Here <Link to="/auth/login" className="btn-link text-indigo">Login</Link>.
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4">
              <Col xs={12}>
                <NioField label="Password" htmlFor="password">
                  <NioField.Input
                    type="password"
                    id="password"
                    placeholder="Enter your new password"
                    errors={errors.password}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                      },
                    })}
                  />
                </NioField>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Col>
              <Col xs={12}>
                <NioField label="Confirm Password" htmlFor="confirmPassword">
                  <NioField.Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    errors={errors.confirmPassword}
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                  />
                </NioField>
                {errors.confirmPassword && (
                  <p className="text-danger">{errors.confirmPassword.message}</p>
                )}
              </Col>
              <Col xs={12}>
                <div className="form-group">
                  <NioButton type="submit" className="btn-success btn-block" label="Reset Password" />
                </div>
              </Col>
            </Row>
          </Form>
        </NioCard.Body>
      </NioCard>
    </AuthLayout1></NioSection>
  );
}
