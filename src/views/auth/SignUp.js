import React, { useState } from "react";
import { Button, Container, Row, Col, Label } from "reactstrap";
import  Loader  from "react-loader-spinner";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import login_page from "../../assets/img/login_page.png";
import renassance_Logo from "../../assets/img/renassance_Logo.png";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../config/auth";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signUp } = useUserAuth();
  const onHandleSubmit = async (data) => {
    try {
      setLoading(true);
      await signUp(data.email, data.password);
      setLoading(false);
      toast.success("successfully signed up")
      reset();
    } catch (err) {
        setLoading(false);
        if(err.code ==="auth/invalid-email")
        {
          toast.error("sorry invalid email type")
        }
        else if(err.code ==="auth/invalid-password")
        {
          toast.error("sorry invalid password it must meet the requirements")
        }
        else if(err.code === "auth/email-already-in-use")
        {
          toast.error("user with this email already exists")
        }
        else{
          console.log(err)
          toast.error("sorry error in signup try again")
        }
      
      reset();
    }
  };

  return (
    <Container fluid className="main_Container px-0 py-0">
      <Row className="mx-0 my-0 px-0 py-0 h-100">
        <Col
          className="text-center px-0 py-0 h-100"
        >
          <img className="w-lg-20 w-sm-25 w-xs-25 mt-5" src={renassance_Logo} alt="Logo" />
          <h1 className="text-center text-white mt-4 mb-5 font-weight-light">
            Signup
          </h1>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit(onHandleSubmit)} className="w-50 ">
              <input
                className=' mb-2'
                type="email"
                {...register("email")}
                placeholder="Username or email"
              />
              <p className="text-danger">{errors.email?.message}</p>
              <input
                className=' mb-2'
                name="password"
                type="password"
                {...register("password")}
                placeholder="password"
              />
              <p className="text-danger">{errors.password?.message}</p>
              <input
                className=' mb-2'
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm password"
              />
              <p className="text-danger">{errors.confirmPassword?.message}</p>

              <Button
                className="btn btn-lg btn-dark btn-block mb-3 mt-4"
                type="submit"
              >
                {loading ? (
                <Loader type="ThreeDots" color="#fff" height={10} />) : ( "Signup" )}
              </Button>
              <Label className="text-white">
                Already a user? <Link to="/">login</Link>
              </Label>
            </form>
          </div>
        </Col>
        <Col className="px-0 py-0 pic-display h-100">
          <img className="img-fluid h-100 w-100" src={login_page} alt="icon" />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
