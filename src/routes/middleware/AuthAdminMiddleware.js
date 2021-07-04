import React from "react"
import { Route, Redirect } from "react-router-dom"
import isAuth from "../../Core/helpers/isAuth"

const AuthAdminMiddleware = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
    <Route
    {...rest}
    render={props=>(
        !isAuth() ? (
            <Layout><Component {...props}  /></Layout>
            ):(
            <Redirect 
              to={{
                pathname:'/admin'
              }}
            />
        )
    )} 
    />
)

export default AuthAdminMiddleware
