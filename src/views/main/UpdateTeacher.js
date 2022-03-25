import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useMutation, useQueryClient } from "react-query";
import Loader from "react-loader-spinner";

import renassance_Logo from "../../assets/img/renassance_Logo.png";
import "../../assets/css/style.css";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { removeTeacher, updateTeacher } from "../../api";
import { toast } from "react-toastify";

const UpdateTeacher = () => {
  const history = useHistory();
  const location = useLocation();
 
  const [checkboxes, setCheckBoxes] = useState([]);

  const queryClient = useQueryClient();


  if(location.state===undefined)
  {
    window.location.reload();
    history.replace("/welcomeAdmin")
  }
  const teacher_id = location.state.state.id;
  const user = location.state.state.user;
  const revision = location.state.state.rev;

  // access checking code
  const checking = (data) => {
    if (user.access !== [] && user.access !== undefined) {
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
      username: user.userName,
      email: user.email,
      gendar: user.gendar,
      classes: checking("classes"),
      announcements: checking("announcements"),
      notifications: checking("notifications"),
      class_work: checking("class_work"),
      attendance: checking("attendance"),
      fee_section: checking("fee_section"),
      promotion: checking("promotion"),
     
    },
  });

  // updating the teacher
  const { mutateAsync: updateMutate, isLoading: updateLoading } =
    useMutation(updateTeacher,{
      onSuccess: () =>{
        queryClient.invalidateQueries(["allTeachers", { teacher_id }]);
        history.goBack("/teacherAdmin", {state: {id: user.schoolId}})
        toast.success("successfully updated the data")
      },
      onError: () =>{
        toast.error("sorry couldnt update the teacher")
      }
    });

  const onHandleSubmit = async (data) => {
    try{
    if (data.classes === true) setCheckBoxes(checkboxes.push("classes"));
    if (data.announcements === true) setCheckBoxes(checkboxes.push("announcements"));
    if (data.notifications === true) setCheckBoxes(checkboxes.push("notifications"));
    if (data.class_work === true) setCheckBoxes(checkboxes.push("class_work"));
    if (data.attendance === true) setCheckBoxes(checkboxes.push("attendance"));
    if (data.fee_section === true) setCheckBoxes(checkboxes.push("fee_section"));
    if (data.promotion === true) setCheckBoxes(checkboxes.push("promotion"));
    console.log(checkboxes)

    await updateMutate({ ...data, teacher_id, revision, checkboxes });
    }catch(err){
      toast.error("sorry cant update the data problem in the server")
      console.log("you are offline" + err)
    }
    
    setCheckBoxes([]);
  };

  // to delete an organization

  const { mutateAsync: removeMutate, isLoading } = useMutation(removeTeacher,{
    onSuccess: () =>{
      queryClient.invalidateQueries("allTeachers");
      history.goBack("/teacherAdmin", {state: {id: user.schoolId}})
      toast.success("teacher is deleted")
    },
    onError: () =>{
      toast.error("sorry couldnt delete your organization")
    }
  } );
  

  const remove = async () => {
    try{
    await removeMutate(teacher_id);
  }catch(err){
    toast.error("you are offline")
    console.log("you are offline" + err)
  }
    
  };

  // design code

  return (
    <Container fluid className="update_Container  my-0 mx-0 px-0 py-0">
      <Row className="h-100 px-0 py-0 mx-0 my-0">
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
              className="organization_Logo  align-self-center"
              src={renassance_Logo}
              alt="Logo"
            />
            <h2 className="text-white font-weight-light align-self-center">Update Teacher</h2>

            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className=" mt-4 w-lg-25  w-xl-25 d-flex flex-column align-items-center align-self-center"
            >
              <input
              className="mb-2"
                type="text"
                {...register("username")}
                placeholder="Username"
              />

              <input className="mb-2" type="email" {...register("email")} placeholder="Email" />

              <input className="mb-2" type="text" {...register("gendar")} placeholder="Gender" />

              <Row className="w-100 flex-column">
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Classes</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche1"
                      {...register("classes")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche1"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Announcements</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche2"
                      
                      {...register("announcements")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche2"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Notification</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche3"
                      {...register("notifications")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche3"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Class Work</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche4"
                      {...register("class_work")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche4"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Attendence</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche5"
                      {...register("attendance")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche5"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Fee_Section</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche6"
                      {...register("fee_section")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche6"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Promotion</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche7"
                      {...register("promotion")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche7"
                    ></label>
                  </div>
                </Col>
               
                <Col className="d-flex justify-content-between px-0">
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

export default UpdateTeacher;
