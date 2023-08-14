import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";




const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";


  function Register() {
    const [cookies] = useCookies(["cookie-name"]);
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
      const jsonString = JSON.stringify(values);

      alert(jsonString)
      event.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/register",
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
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register with
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={2}>
          <Socials />
        </ArgonBox>
        <ArgonBox px={12}>
          <Separator />
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form" action="POST">
            <ArgonBox mb={2}>
              <ArgonInput 
            type="email"
            name="email"
            placeholder="Email"
             onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            } />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput 
            type="password"
            placeholder="Password"
            name="password" 
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            } />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="dark" fullWidth onClick={(e) => handleSubmit(e)}>
                sign up
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
    <ToastContainer />
    </div>







  )
}

export default Register