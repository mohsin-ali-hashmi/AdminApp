import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useQuery } from "react-query";
import { disableOrganization, enableOrganization, getAllOrganizations } from "../../api";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useUserAuth } from "../../config/auth";
import { toast } from "react-toastify";



import menu_bg from "../../assets/img/menu_bg.jpg";




const WelcomeAdmin = () => {
  const history = useHistory();
  const {logOut} = useUserAuth();
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery("allorg", getAllOrganizations , {
  onError: ()=>{
    toast.error("can't load the page internet is down");
  }
}) 
    const {mutateAsync:enableMutate } = useMutation(enableOrganization,{
      onSuccess: () =>{
        queryClient.invalidateQueries("allorg");
        
        
      },
     
    })
    const {mutateAsync:disableMutate } = useMutation(disableOrganization,{
      onSuccess: () =>{
        queryClient.invalidateQueries("allorg");
        
       
      },
      
    })
    

  const getDefaulter = (data)=>{
      if(data === undefined)
      {
        return true
      }
    else
    {
        return false
    }  
  }

  const changeHandle = async (e) => {
    if (e.target.checked === true) {
        const eid = e.target.id
        try{
        await toast.promise(
          enableMutate(eid),
          {
            pending: 'enabling',
            success: 'enabled successfully ',
            error: "can't enable the internet is down 🤯"
          }
      )
    }catch(err){
      console.log(err)
    }
        
        
    }

    if (e.target.checked === false) {
        const did = e.target.id
        try{
        await toast.promise(
          disableMutate(did),
          {
            pending: 'disabling',
            success: 'disabled successfully ',
            error: "can't disable the internet is down 🤯"
          }
        )
        }catch(err){
          console.log(err)
        }
        
    }
  };

  const handleLogout =async () =>{
    try {
      await logOut();
      toast.success("You are Logged out")
      history.replace("/")
    } catch (error) {
      toast.error("sorry error logging you out")
    }
  }

  

  return (
    <Container fluid className="update_Container px-0 py-0 ">
      <Row className="flex-column w-100 mx-0 my-0">
        <Col className="flex-column w-100 px-0 py-0 mx-0 my-0">
          
            <img className="menu-pic w-100 " src={menu_bg} alt="Logo" />
            <Button className="logoutBtn btn-danger" onClick={handleLogout}>Logout</Button>
           
          
          <Row className="d-flex justify-content-between py-3 mx-0 my-0">
            <Col className="">
              <h4 className="text-white  font-weight-normal">
                Organization List
              </h4>
              
            </Col>
            <Col className="mt-md-0 mt-sm-0 mt-xs-1">
              <Button
                className="btn btn-light float-right font-weight-bold py-2"
                onClick={() => history.push("./registerOrganization")}
              >
                <span className="color-dark">&#8853;</span> Add New Organization
              </Button>
            </Col>
          </Row>
        </Col>
        <Row xm={6} className="bg-white mx-0 my-0 ">
          {
            isLoading ? (
              <div className="w-100 d-flex align-items-center justify-content-center">
                <Loader
                  className="align-items-center"
                  type="TailSpin"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
              </div>
            ) : isError ? (
                <h3 className="text-danger">
                  Error : Sorry the server is not responding at the moment
                </h3>
              
            ) : (
              
              data.response.data.organizations.map((myorg, index) => (
                <Row className="w-100 border-bottom mx-0 my-0">
                <Col
                  key={index}
                  className="py-4 w-100"
                >
                  <h5 className=" text-start font-weight-boldder">
                    {myorg.organizationName}
                  </h5>
              </Col>
              <Col className="w-100 d-flex justify-content-end mb-1">
                  <div className="d-flex flex-row align-items-center pr-0 py-0">
                    <Button
                      className="btn-dark mr-3 px-md-5 px-sm-3 px-xs-1 py-md-2 py-lg-2 py-sm-1"
                      onClick={() =>
                        history.push("./updateOrganization", {
                          state: {
                            id: myorg._id,
                            user: myorg,
                            rev: myorg._rev,
                          },
                        })
                      }
                    >
                      Update
                    </Button>
                    <Button
                      className=" btn-dark mr-3 px-md-5 px-sm-3 px-xs-1 py-md-2 py-lg-2 py-sm-1"
                      onClick={() => {
                        history.push("/schoolAdmin", {
                          state: { id: myorg._id },
                        });
                      }}
                    >
                      School
                    </Button>
                    <div className=" custom-control custom-switch pe-auto ">
                      <input
                        type="checkbox"
                        className="custom-control-input "
                        id={myorg._id}
                        defaultChecked={getDefaulter(myorg.disabled)}
                        
                        onChange={changeHandle}
                      />
                      <label
                        className="custom-control-label checkBoxCursor"
                        htmlFor={myorg._id}
                      ></label>
                    </div>
                  </div>
                </Col>
                </Row>
              ))
            )

            // )
          }
        </Row>
      </Row>
    </Container>
  );
};

export default WelcomeAdmin;
