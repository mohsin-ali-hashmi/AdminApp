import { useUserAuth } from "../config/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const Auth = props => {
	const {user} = useUserAuth()
	if (user) {
		return <Redirect to="/welcomeAdmin" />
	  }
	
	
	return (
		<>
			
			{props.children}
			
		</>
	);
};

export default Auth;
