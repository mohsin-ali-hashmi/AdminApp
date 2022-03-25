import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useMutation, useQueryClient } from "react-query";
import renassance_Logo from "../../assets/img/renassance_Logo.png";
import "../../assets/css/style.css";
import { useHistory, useLocation } from "react-router";
import { removePrincipal, updatePrincipal } from "../../api";
import { toast } from "react-toastify";

const UpdatePrincipal = () => {
  const history = useHistory();
  const location = useLocation();
  // const [myPrincipal_id , setMyPrincipal_id] = useState("")
  // const [user , setUser] = useState("")
  // const [revision , setRevision] = useState("")
  const [checkboxes, setCheckBoxes] = useState([]);

  const queryClient = useQueryClient();
  
  
  
  // useEffect(() => {
    
  //   if (location.state===undefined) 
  //   {
  //     history.push("/welcomeAdmin")
      
  //   }
    // else{
    //   setMyPrincipal_id(location.state.state.id)
    //   setUser(location.state.state.user)
    //   setRevision(location.state.state.rev)
    // }
  // }, [])
  
  if(location.state===undefined)
  {
    window.location.reload();
    history.replace("/welcomeAdmin")
  }
  const myPrincipal_id = location.state.state.id;
  const user = location.state.state.user;
  const revision = location.state.state.rev;
   

 
  
 

  // updating the Principal
  const { mutateAsync: updateMutate, isLoading: updateLoading } =
    useMutation(updatePrincipal, {
      onSuccess: () =>{
        queryClient.invalidateQueries("allPrincipal");
        history.goBack("/principalAdmin", { state: { id: user.schoolId } })
        toast.success("successfully updated the data")
      },
      onError: () =>{
        toast.error("sorry couldnt update the principal try again")
      }
    });

  const onHandleSubmit = async (data) => {

    try{
    if (data.fees === true) setCheckBoxes(checkboxes.push("fees"));
    if (data.inventory === true) setCheckBoxes(checkboxes.push("inventory"));
    if (data.classes === true) setCheckBoxes(checkboxes.push("classes"));
    if (data.employee === true) setCheckBoxes(checkboxes.push("employee"));
    if (data.students === true) setCheckBoxes(checkboxes.push("students"));
    if (data.fee_register === true)
      setCheckBoxes(checkboxes.push("fee_register"));
    if (data.tests === true) setCheckBoxes(checkboxes.push("tests"));
    if (data.announcements === true)
      setCheckBoxes(checkboxes.push("announcements"));
    if (data.expenditure === true)
      setCheckBoxes(checkboxes.push("expenditure"));
    if (data.teacher_requests === true)
      setCheckBoxes(checkboxes.push("teacher_requests"));
    console.log(checkboxes);
    
    await updateMutate({ ...data, myPrincipal_id, revision, checkboxes });
    }catch(err){
      toast.error("sorry cant update the data no internet available")
  console.log("you are offline" + err)
    }
    setCheckBoxes([]);
  };

  // to delete an organization

  const { mutateAsync: removeMutate, isLoading } = useMutation(removePrincipal,{
    onSuccess: () =>{
      queryClient.invalidateQueries("allPrincipal");
      history.goBack("/principalAdmin", { state: { id: user.schoolId } });
      toast.success("Principal is deleted")
    },
    onError: () =>{
      toast.error("sorry couldnt delete the principal")
    }
   
  });

  const remove = async () => {
    try{
    await removeMutate(myPrincipal_id);
  }catch(err){
    toast.error("you are offline")
    console.log("you are offline" + err)
  }
  };

 

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
      fees: checking("fees"),
      inventory: checking("inventory"),
      classes: checking("classes"),
      employee: checking("employee"),
      students: checking("students"),
      fee_register: checking("fee_register"),
      tests: checking("tests"),
      announcements: checking("announcements"),
      expenditure: checking("expenditure"),
      teacher_requests: checking("teacher_requests"),
    },
  });

  
  
  // design code

 

  return (
    
    <Container fluid className="update_Container my-0 mx-0 px-0 py-0">
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
              className="organization_Logo  align-self-center"
              src={renassance_Logo}
              alt="Logo"
            />
            <h2 className="text-white font-weight-light  align-self-center">Update Principal</h2>

            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="mt-4 w-lg-25  w-xl-25 d-flex flex-column align-items-center align-self-center"
            >
              <input
              className="mb-2"
                type="text"
                {...register("username")}
                placeholder="Username"
              />

              <input className="mb-2" type="email" {...register("email")} placeholder="email" />

              <Row className="w-100 flex-column">
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Fees</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche1"
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
                  <p className="text-white">Students</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche5"
                      {...register("students")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche5"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Fee Register</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche6"
                      {...register("fee_register")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche6"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Tests</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche7"
                      {...register("tests")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche7"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Announcements</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche8"
                      {...register("announcements")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche8"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Expenditure</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche9"
                      {...register("expenditure")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche9"
                    ></label>
                  </div>
                </Col>
                <Col className="d-flex justify-content-between px-0">
                  <p className="text-white">Teacher Requests</p>
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitche10"
                      {...register("teacher_requests")}
                    />
                    <label
                      className="custom-control-label checkBoxCursor"
                      htmlFor="customSwitche10"
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
                  <Button className="btn btn-md btn-danger btn-block  mt-2" onClick={remove}>
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


export default UpdatePrincipal;
