import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';
import { NioButton, NioCard, NioSection } from '../../../components';
import NioField from '../../../components/NioField/NioField';
axios.defaults.withCredentials = true;

export default function Login() {
  const [formErrors, setFormErrors] = useState([]);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setIsCaptchaValid(!!value);
  };

  const onSubmit = async (data) => {
    try {
      if (!isCaptchaValid) {
        setFormErrors([{ field: "captcha", message: "Please verify the captcha!" }]);
        return;
      }
  
      const response = await axios.post("http://localhost:5000/user/login", data, {
        withCredentials: true,
      });
  
      console.log("Login Response:", response);
  
      if (response.data.role) {
        document.cookie = `role=${response.data.role}; path=/`; // Store the role in a cookie
  
        // Redirect based on the user's role
        switch (response.data.role) {
          case "farmer":
            navigate("/index-company-home-page");
            break;
          case "distributor":
            navigate("/index-distributor-home-page");
            break;
          case "transporter":
            navigate("/index-transporter-home-page");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        navigate("/");
      }
  
      setLoginAttempts(0);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setLoginAttempts((prev) => prev + 1);
      if (loginAttempts >= 2) {
        navigate("/careers");
      } else {
        setFormErrors([{ field: "login", message: "Login failed. Please check your credentials." }]);
      }
    }
  };
  



  return (
    <NioSection className="bg-green-100" masks={["shape-10"]}>
      <AuthLayout1 title="Login" rootClass="layout-1">
        <NioCard className="nk-form-card rounded-3 card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
          <NioCard.Body className="p-4">
            <div className="nk-form-card-head text-center pb-4">
              <h3 className="title mb-2">Login to your account</h3>
              <p>If you don’t have an account? <Link to="/BeforeSignup" className="btn-link text-indigo">Sign-up</Link>.</p>
            </div>
            <FormProvider>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-3">
                  <Col xs={12}>
                    {formErrors.length > 0 && <p className="text-danger">{formErrors[0].message}</p>}
                  </Col>
                  <Col xs={12}>
                    <NioField htmlFor="email" label="Email">
                      <NioField.Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: "Email is required" })}
                      />
                      {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </NioField>
                  </Col>
                  <Col xs={12}>
                    <NioField htmlFor="password" label="Password">
                      <NioField.Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: "Password is required" })}
                      />
                      {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </NioField>
                  </Col>
                  <Col xs={12}>
                    <ReCAPTCHA sitekey="6Ldl_IopAAAAAGqFfTC7gEmxqOhoLnPidP96OeGN" onChange={handleCaptchaChange} />
                  </Col>
                  <Col xs={12}>
                    <NioButton type="submit" label="Login to Your Account" className="btn-block btn-success" disabled={!isCaptchaValid} />
                  </Col>
                  <Col xs={12} className="pt-2">
                    <NioButton  label="Login With Google" className="border border-lighter text-dark w-100" />
                  </Col>
                  {loginAttempts >= 2 && (
                    <Col xs={12}>
                      <p className="text-danger">You have reached the maximum login attempts. Please try again later.</p>
                    </Col>
                  )}
                </Row>
              </form>
            </FormProvider>
          </NioCard.Body>
        </NioCard>
      </AuthLayout1>
    </NioSection>
  );
}
