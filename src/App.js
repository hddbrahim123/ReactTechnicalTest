import React from "react";
import { BrowserRouter as Router , Switch} from "react-router-dom";

import './assets/scss/App.scss'

//imports Layouts
import AdminLayout from "./Components/AdminLayout";
import FullLayout from "./Components/FullLayout";


//imports Routes
import { adminRoutes, authAdmin } from "./routes/allRouters";

//imports middleware
import AdminMiddleware from "./routes/middleware/AdminMiddleware";
import AuthAdminMiddleware from "./routes/middleware/AuthAdminMiddleware";

const App = ()=>{
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {adminRoutes.map((route , i)=>(
            <AdminMiddleware 
              component={route.component}
              path={route.path}
              layout={AdminLayout}
              key={i}
              exact
            />
          ))}

          {authAdmin.map((route , i)=>(
            <AuthAdminMiddleware
              component={route.component}
              path={route.path}
              layout={FullLayout}
              key={i}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
      
  );
}

export default App;
