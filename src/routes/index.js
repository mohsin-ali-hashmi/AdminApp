import AuthView from '../views/auth/AuthView';
// import MainView from '../views/main/MainView';
import Login from '../views/auth/Login';
import UpdateOrgranization from '../views/main/UpdateOrgranization'
import SignUp from '../views/auth/SignUp';
import SchoolAdmin from '../views/main/SchoolAdmin';
import TeachersAdmin from '../views/main/TeachersAdmin'
import WelcomeAdmin from '../views/main/WelcomeAdmin';
import RegisterOrg from '../views/main/RegisterOrg';
import PrincipalAdmin from '../views/main/PrincipalAdmin'
import UpdateTeacher from '../views/main/UpdateTeacher';
import UpdatePrincipal from '../views/main/UpdatePrincipal';

let routes = [
	{
		path: '/auth',
		component: AuthView,
		layout: 'auth',
	},
	{
		path: '/',
		component:Login,
		layout: 'auth',
	},
	{
		path: '/signup',
		component:SignUp,
		layout: 'auth',
	},
	{
		path: '/registerOrganization',
		component:RegisterOrg,
		layout: 'main',
	},
	// {
	// 	path: '/dashboard',
	// 	component: MainView,
	// 	layout: 'main',
	// },
	{
		path: '/updateOrganization',
		component: UpdateOrgranization,
		layout: 'main',
	},
	{
		path: '/updateTeacher',
		component: UpdateTeacher,
		layout: 'main',
	},
	{
		path: '/updatePrincipal',
		component: UpdatePrincipal,
		layout: 'main',
	},
	{
		path: '/schoolAdmin',
		component: SchoolAdmin,
		layout: 'main',
	},
	{
		path: '/teacherAdmin',
		component: TeachersAdmin,
		layout: 'main',
	},
	{
		path: '/principalAdmin',
		component: PrincipalAdmin,
		layout: 'main',
	},
	{
		path: '/welcomeAdmin',
		component: WelcomeAdmin,
		layout: 'main',
	},
	
];
export default routes;