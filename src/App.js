// import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Auth from "./layout/Auth";
import Main from "./layout/Main";
import routes from "./routes";
import { useUserAuth } from "./config/auth";
import { ReactQueryDevtools } from "react-query/devtools";
// import store from './store/store';
import { QueryClientProvider, QueryClient } from "react-query";

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { user } = useUserAuth();
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
    
        <BrowserRouter>
          <Switch>
            {routes.map((route) => {
              switch (route.layout) {
                case "main":
					{
                  if (!user) {
                    return <Redirect to="/" />
                  }
                  return (
                    <Route exact path={route.path}>
                      <Main>
                        <route.component />
                      </Main>
                    </Route>
                  );
				  }
                case "auth": 
				
                  return (
                    <Route exact path={route.path}>
                      <Auth>
                        <route.component />
                      </Auth>
                    </Route>
                  );
				
                default:
                  return <Redirect to="/" />;
              }
            })}
          </Switch>
          <ToastContainer/>
        </BrowserRouter>

        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* </Provider> */}
    </>
  );
}

export default App;
