import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as APIPATHS from "../../../API/path";
import APIRequest from "../../../API";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../Redux/slices/userSlice";
import * as common from "../../../common";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [formData] = useState({
    email: "",
    password: "",
  });

  const LoginpValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email address"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue) {
      setRememberMe(rememberMeValue === "true");
    }
  }, []);

  const handleSetRememberMe = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    localStorage.setItem("rememberMe", String(newValue));
  };

  const handlerUserAfterLogin = (user, data) => {
    const { access, refresh } = data.data.tokens;
    common.updateToken(access.token, refresh.token);
    dispatch(updateUser(user));
    navigate("/dashboard");
    return `Welcome back ${user.fullname} !`;
  };

  const handleLogin = async (values, { setSubmitting, validateForm }) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length > 0) {
      setSubmitting(false);
      return;
    }

    const promise = APIRequest(APIPATHS.login, values);

    toast.promise(promise, {
      loading: "Signing in...",
      success: (data) => {
        if (data.error) throw new Error(data.error.message);
        const user = data.data.user;
        return handlerUserAfterLogin(user, data);
      },
      error: (err) => {
        setSubmitting(false);
        return err?.message || "";
      },
    });
  };

  useEffect(() => {
    if (common.getSessionToken()) navigate("/dashboard");
  }, [navigate]);

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <Formik initialValues={formData} validationSchema={LoginpValidation} onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, validateForm }) => (
          <Form>
            <SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="text-white mt-0.5">{errors.email && touched.email && errors.email}</p>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Password
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="text-white mt-0.5">
                  {errors.password && touched.password && errors.password}
                </p>
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} /> */}
                {/* <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none" }}
                >
                  &nbsp;&nbsp;Remember me
                </SoftTypography> */}
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  sign in
                </SoftButton>
              </SoftBox>
              <SoftBox mt={3} textAlign="center"></SoftBox>
            </SoftBox>
          </Form>
        )}
      </Formik>
    </CoverLayout>
  );
}

export default SignIn;
