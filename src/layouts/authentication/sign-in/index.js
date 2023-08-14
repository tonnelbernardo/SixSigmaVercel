import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";


// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";



// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";


  function Login() {
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
      if (cookies.jwt) {
        navigate("/");
      }
    }, [cookies, navigate]);
  
    const [values, setValues] = useState({ email: "", password: "" });
    const generateError = (error) =>
      toast.error(error, {
        position: "bottom-right",
      });
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/login",
          {
            ...values,
          },
          { withCredentials: true }
        );
        if (data) {
          if (data.errors) {
            const { email, password } = data.errors;
            if (email) generateError(email);
            else if (password) generateError(password);
          } else {
            navigate("/");
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    };
  
    return (
      <div className='container'>
        <IllustrationLayout
          title="Sign In"
          description="Enter your email and password to sign in"
          illustration={{
            image: bgImage,
            title: '"Attention is the new currency"',
            description:
              "The more effortless the writing looks, the more effort the writer actually put into the process.",
          }}
        >
          <form action="POST" onSubmit={handleSubmit}> {/* Usar onSubmit aqui */}
            <ArgonBox mb={2}>
              <ArgonInput
                type="email"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="Email"
                size="large"
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="Password"
                size="large"
              />
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton type="submit" color="info" size="large" fullWidth> {/* Remover o onClick */}
                Sign In
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={3} textAlign="center">
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Don&apos;t have an account?{" "}
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                >
                  Sign up
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </form>
        </IllustrationLayout>
        <ToastContainer />
      </div>
    );
  }
  
  export default Login




