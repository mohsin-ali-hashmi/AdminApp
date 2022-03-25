import React from 'react'
import { Container , Row , Col, Button } from 'reactstrap'
import { useQuery } from 'react-query';
import { getAllPrincipals } from '../../api';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

const PrincipalAdmin = () => {

    
    const history=useHistory();
    const location = useLocation();
    // const [allPrincipal , setAllPrincipal] = useState()
    // const [isLoading, setLoading] = useState(true)
    const principal_id =  location.state.state.id;

    const { data, isLoading, isError } = useQuery(["allPrincipal", {principal_id}],() => getAllPrincipals(principal_id));

    // useEffect(() => {
       
    //     async function fetchData() {
            
    //         const _data = {
    //             "request": {
    //               "method": "getPrincipalsBySchool",
    //               "data": {
    //                 "school_id": principal_id },
    //               }
    //             }
    //     const response = await fetch('https://naseem-java.herokuapp.com/principal',
    //         {
    //             method: "POST",
    //             headers: {
    //                 'Accept': '*/*',
    //                 'Content-Type': 'application/json',
    //                 },
    //                 body:JSON.stringify(_data),
    //         })
    //         const data = await response.json();
    //         setAllPrincipal(data.response.data.principals);
    //         setLoading(false)
    //         console.log(data)
    //         //.then((data) => {const mydata =data.response.data.organizations ; setAllOrg(mydata); console.log(mydata);}
    //         //).catch(err => console.log(err))
    //     }
    //     fetchData();
        
    // }, [setAllPrincipal])
    return (
        <Container  fluid className="update_Container px-0 py-0 ">
            <Row className="mx-0 my-0">
                <Col className="px-5 py-4">
                    <div className="float-left text-white mt-2" role="button" onClick={()=>history.goBack()} >  
                        &lt; Back 
                    </div>
                    <h3 className="text-white font-weight-light text-center">Naseem Admin</h3>
                    
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
                ) :
                
                    isError ?
                    (
                        toast.error("sorry internet is down"),
                        <h2>Sorry No Principal to Show</h2>
                    ) : 
                    (
                        data.response.data.principals.map((myprincipal,index)=>(
                            <Row className="w-100 border-bottom mx-0 my-0">
                            <Col
                              key={index}
                              className="py-4 w-100"
                            >
                        <h4 className=" text-start font-weight-bold">{myprincipal.userName}</h4>
                        </Col>
                        <Col className="w-100 d-flex justify-content-end mb-1">
                        <div className="d-flex flex-row align-items-center pr-0 py-0">
                            <Button className="btn-dark mr-3" onClick={()=>history.push('/updatePrincipal' ,{
                      state: {
                        id: myprincipal._id,
                        user: myprincipal,
                        rev: myprincipal._rev,
                      },
                    })}>Update</Button>
                        
                        </div>
                    
                    </Col>
                    </Row>
                    ))
                    )
                
            }
            </Row>
        </Container>
    )
}

export default PrincipalAdmin
