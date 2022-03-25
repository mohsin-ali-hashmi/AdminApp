import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useMutation, useQueryClient } from "react-query";
import Loader from "react-loader-spinner";
import { removeOrganization, updateOrganization } from "../../api";
import renassance_Logo from "../../assets/img/renassance_Logo.png";
import "../../assets/css/style.css";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const UpdateOrgranization = () => {
  const history = useHistory();
  const location = useLocation();

  const [checkboxes, setCheckBoxes] = useState([]);

  const queryClient = useQueryClient();


  // organization id and default data
  if(location.state===undefined)
  {
    window.location.reload();
    history.replace("/welcomeAdmin")
  }
  const organization_id = location.state.state.id;
  const user = location.state.state.user;
  const revision = location.state.state.rev;
  
  // the updation code

  const checking = (data) => {
    if ((user.access) !== [] && (user.access) !== undefined) {
      const strUser = user.access.toString();

      if (strUser.includes(data)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: user.email,
      organization: user.organizationName,
      location: user.location,
      fees: checking("fees"),
      inventory: checking("inventory"),
      classes: checking("classes"),
      employee: checking("employee"),
      manager: checking("manager"),
      results: checking("results"),
      expenditure: checking("expenditure"),
      principal_requests: checking("principal_requests"),
    },
  });

  // to update the organization

  const { mutateAsync: updateMutate, isLoading:updateLoading } = useMutation(updateOrganization,{
    onSuccess: () =>{
      queryClient.invalidateQueries("allorg");
      history.replace("/welcomeAdmin")
      toast.success("successfully updated the data")
    },
    onError: () =>{
      toast.error("sorry couldnt update your organization")
    }
  });

  const onHandleSubmit =async (data) => {
   
    try{
    if(data.fees === true) setCheckBoxes(checkboxes.push("fees"));
    if(data.inventory === true) setCheckBoxes(checkboxes.push("inventory"));
    if(data.classes === true) setCheckBoxes(checkboxes.push("classes"));
    if(data.employee === true) setCheckBoxes(checkboxes.push("employee"));
    if(data.manager === true) setCheckBoxes(checkboxes.push("manager"));
    if(data.results === true) setCheckBoxes(checkboxes.push("results"));
    if(data.principal_requests === true) setCheckBoxes(checkboxes.push("principal_requests"));
    if(data.expenditure === true) setCheckBoxes(checkboxes.push("expenditure"));
  

  await updateMutate({...data , organization_id , revision , checkboxes });
}catch(err){
  toast.error("sorry cant update the data problem in the server")
  console.log("you are offline" + err)
}
    setCheckBoxes([]);
  };

   // to delete an organization

   const { mutateAsync: removeMutate, isLoading } = useMutation(removeOrganization,{
    onSuccess: () =>{
      queryClient.invalidateQueries("allorg");
      history.replace("/welcomeAdmin")
      toast.success("organization is deleted")
    },
    onError: () =>{
      toast.error("sorry couldnt delete your organization")
    }
   });
   const remove = async () => {
    try{
     await removeMutate(organization_id);
    }catch(err){
      toast.error("you are offline")
      console.log("you are offline" + err)
    }
   };


  return (
    <Container fluid className="update_Container h-sm-110 my-0 mx-0 px-0 py-0">
      <Row className="px-0 py-0 mx-0 my-0">
        <Col
          
          className="px-4 py-4 mx-0 mt-0 w-100"
        >
         
          <div className="d-flex flex-column">
          <div
            className="d-flex float-left text-white"
            role="button"
            onClick={() => history.goBack()}
          >
            &lt; Back
          </div>
            <img
              className="organization_Logo align-self-center"
              src={renassance_Logo}
              alt="Logo"
            />
            <h3 className="text-white font-weight-light align-self-center">
              Update Organization
            </h3>

            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className=" mt-4 w-lg-25  w-xl-25 d-flex flex-column align-items-center align-self-center"
            >
              <input
              className="mb-2"
                type="email"
                {...register("email")}
                placeholder="Username or email"
              />

              <input
              className="mb-2"
                type="text"
                {...register("organization")}
                placeholder="Organization"
              />

              <input
              className="mb-2"
                type="text"
                {...register("location")}
                placeholder="Location"
              />

              <Row className="w-100 flex-column">
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Fees</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche1"
                      // checked={checking('fees')}
                      {...register("fees")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche1"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Inventory</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche2"
                      {...register("inventory")}
                      //   checked={checking("inventory")}
                      //   readOnly
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche2"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Classes</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche3"
                      {...register("classes")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche3"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Employee</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche4"
                      {...register("employee")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche4"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Manager</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche5"
                      {...register("manager")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche5"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Results</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche6"
                      {...register("results")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche6"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Expenditure</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche7"
                      {...register("expenditure")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche7"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Principal_requests</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche8"
                      {...register("principal_requests")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche8"
                    ></label>
                  </div>
                </Col>
                <Col className="px-0">
                  <Button
                    className="btn btn-md btn-dark btn-block "
                    type="submit"
                  >
                     {updateLoading ? (
                      <Loader type="ThreeDots" color="#fff" height={10} />
                    ) : (
                      "Update"
                    )}
                    
                  </Button>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <Button
                    className="btn btn-md btn-danger btn-block  mt-2"
                    onClick={remove}
                  >
                    {isLoading ? (
                      <Loader type="ThreeDots" color="#fff" height={10} />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateOrgranization;
