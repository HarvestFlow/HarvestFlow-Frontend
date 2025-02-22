import React, { useState ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

// layouts
import AuthLayout1 from '../../../layouts/AuthLayout/AuthLayout1';

// components
import { NioButton, NioField, NioToaster, NioBrand, NioCard , NioSection} from '../../../components';

export default function VerifPassword() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // Array to store each digit of the code
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      codeForget: '',
    },
  });
  
  const onSubmit = async (data) => {
    try {
      const combinedCode = verificationCode.join('');
      const response = await axios.post('http://localhost:5000/user/reset', {
        codeForget: combinedCode,
        email: localStorage.getItem('resetEmail') || '', // Include the email from local storage
      });
  
      // If request is successful (status code 200), navigate to reset password page
      if (response.status === 200) {
        localStorage.setItem('codeForget', combinedCode); // Store codeForget in local storage
        navigate('/auth/reset-password');
      } else {
        // Handle other status codes if needed
        console.error('Verification code request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Verification code request failed:', error);
      // Handle error appropriately, e.g., show error message to user
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
      <AuthLayout1 title="Forgot Password" rootClass="layout-1" >
        {showSuccess && (
          <NioToaster variant="success" title="Success" message="Your Password sent it to your email" />
        )}

        <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto" style={{ marginTop: '150px' }}>
          <NioCard.Body>
            <div className="nk-form-card-head text-center pb-5">
              <div className="form-logo mb-1 pb-1"  >
              </div>
              <h3 className="title mb-2">Password Forgotten?</h3>
              <p className="text">
                Shouldn't Be Here <Link to="/auth/login" className="btn-link text-indigo"  style={{ marginTop: '30px' }}>Login</Link>.
              </p>
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
                  <div className="form-group "   style={{ marginTop: '30px' }}>
                    <NioButton type="submit" className="btn-indigo btn-block" label="Verify Code" style={{ marginTop: '30px' }} />
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
