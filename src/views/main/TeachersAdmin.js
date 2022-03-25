import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useQuery } from "react-query";
import { getAllTeachers } from "../../api";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const TeachersAdmin = () => {
  const history = useHistory();
  const location = useLocation();
  // const [allTeacher , setAllTeacher] = useState()
  // const [isLoading, setLoading] = useState(true)
  const myTeacher_id = location.state.state.id;

  const { data, isLoading, isError } = useQuery(
    ["allTeachers", { myTeacher_id }],
    () => getAllTeachers(myTeacher_id)
  );

  return (
    <Container fluid className="update_Container px-0 py-0 ">
      <Row className="mx-0 my-0">
        <Col className="px-5 py-4">
          <div
            className="float-left text-white mt-2"
            role="button"
            onClick={() => history.goBack()}
          >
            &lt; Back
          </div>
          <h3 className="text-white font-weight-light text-center">
            Naseem Admin
          </h3>
        </Col>
      </Row>
      <Row className=" bg-white mx-0 my-0">
        {isLoading ? (
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
          toast.error("sorry internet is down"),
          <h2>Sorry No Teachers to Show</h2>
        ) : (
          data.response.data.teachers.map((myteacher, index) => (
            <Row key={index} className="w-100 border-bottom pl-4 mx-0 my-0">
            <Col
            
              
              className="py-4 w-100"
            >
              <h4 className=" text-start font-weight-bold">
                {myteacher.userName}
              </h4>
            </Col>
            <Col  className="d-flex justify-content-end mb-1">
              <div className="d-flex flex-row align-items-center pr-0 py-0 mx-0 my-0">
                <Button
                  className="btn-dark mr-3"
                  onClick={() =>
                    history.push("./updateTeacher", {
                      state: {
                        id: myteacher._id,
                        user: myteacher,
                        rev: myteacher._rev,
                      },
                    })
                  }
                >
                  Update
                </Button>
              </div>
            </Col>
            </Row>
          ))
        )}
      </Row>
    </Container>
  );
};

export default TeachersAdmin;
