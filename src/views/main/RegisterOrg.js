import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {Loader} from 'react-loader-spinner'
import { createOrganization } from "../../api/index";
import register_organization from "../../assets/img/registr_organization.png";
import renassance_Logo from "../../assets/img/renassance_Logo.png";
import "../../assets/css/style.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  organization: yup.string().required("organization is required"),
  location: yup.string().required("location is required"),
});


const RegisterOrg = () => {
  const queryClient = useQueryClient()
  const history = useHistory();

  const { register, handleSubmit , formState:{errors} , reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation(createOrganization);

  const onHandleSubmit = async (data) => {
    try{
    await mutateAsync({ ...data });
    
    queryClient.invalidateQueries("allorg")
    toast.success("successfully created the organization")
    history.push("/welcomeAdmin");
      window.location.reload();
      
   
    
    }catch(err){
      toast.error("something went wrong")
      reset();
      
    }
    
  };
  return (
    <Container fluid className="main_Container px-0 py-0 mx-0 my-0">
      <Row className="mx-0 my-0 px-0 py-0 h-100">
        <Col
         
          className="text-center px-0 py-0 h-100"
        >
          <div
            className="text-white ml-4 mt-4 float-left"
            role="button"
            onClick={() => history.goBack()}
          >
            &lt; Back
          </div>

          <img className="w-lg-20 w-sm-25 w-xs-25 mt-5" src={renassance_Logo} alt="Logo" />
          <h2 className="text-center text-white mt-4 mb-5 font-weight-light">
            Register Organization
          </h2>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit(onHandleSubmit)} className="w-50 ">
              <input
                className="mb-2"
                type="email"
                placeholder="Username or email"
                {...register("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
              <input
                className="mb-2"
                type="text"
                placeholder="Organization"
                {...register("organization")}
              />
              <p className="text-danger">{errors.organization?.message}</p>
              <input
                className="mb-2"
                type="text"
                placeholder="Location"
                {...register("location")}
              />
              <p className="text-danger">{errors.location?.message}</p>
              <button
                className="btn btn-lg btn-dark btn-block mb-3 mt-4"
                type="submit"
              >
              {isLoading ? (
                      <Loader type="ThreeDots" color="#fff" height={10} />
                    ) : (
                      "Add Organization"
                    )}
              </button>
            </form>
          </div>
        </Col>
        <Col className="px-0 py-0 pic-display h-100">
          <img
            className="img-fluid h-100 w-100"
            src={register_organization}
            alt="icon"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterOrg;
