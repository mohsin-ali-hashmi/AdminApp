import React, { useState } from "react";
import { Button, Container, Row, Col, Label } from "reactstrap";
import login_page from "../../assets/img/login_page.png";
import renassance_Logo from "../../assets/img/renassance_Logo.png";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserAuth } from "../../config/auth";
import Loader from "react-loader-spinner";
import {toast} from 'react-toastify'



const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { logIn } = useUserAuth();
  const onHandleSubmit = async (data) => {
    try {
      setLoading(true);
      await logIn(data.email, data.password);
      setLoading(false);
      reset();
      history.replace("/welcomeAdmin");
    } catch (err) {
      setLoading(false);
      if(err.code ==="auth/user-not-found")
      {
        toast.error("sorry user is not found")
      }
        else if(err.code ==="auth/too-many-requests")
        {
          toast.error("Too many wrong attempts try again later")
        }
        else if(err.code ==="auth/account-exists-with-different-credential")
        {
          toast.error("user has different credentials")
        }
        else if(err.code ==="auth/wrong-password")
        {
          toast.error("email or password is wrong try again")
        }
        else if(err.code === "auth/internal-error")
        {
          toast.error("There seems to be a problem from our side sorry")
        }
        else
        {
          console.log(err)
          toast.error("error please check your internet connection")
        }
    }
  };
  return (
    <Container fluid className="main_Container px-0 py-0">
      <Row className="mx-0 my-0 px-0 py-0 h-100">
        <Col className="text-center px-0 py-0 h-100">
          <img
            className="w-lg-20 w-sm-25 w-xs-25 mt-5"
            src={renassance_Logo}
            alt="Logo"
          />

          <h1 className="text-center text-white mt-4 mb-5 font-weight-light">
            Login
          </h1>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit(onHandleSubmit)} className="w-50 ">
              <input
                className=" mb-2"
                type="email"
                {...register("email")}
                placeholder="username or email"
              />
              <p className="text-danger">{errors.email?.message}</p>
              <input
                className="mb-2"
                type="password"
                {...register("password")}
                placeholder="password"
              />
              <p className="text-danger">{errors.password?.message}</p>
              <Button
                className="btn btn-lg btn-dark btn-block mb-3 mt-4"
                type="submit"
              >
                {loading ? (
                  <Loader type="ThreeDots" color="#fff" height={10} />
                ) : (
                  "Login"
                )}
              </Button>
              <Label className="text-white">
                Dont have an account? <Link to="./signup">signup</Link>
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

export default Login;
