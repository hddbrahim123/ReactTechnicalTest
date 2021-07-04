import React, { useState } from "react"
import { withRouter} from "react-router-dom"
import { Signin } from "../../../Core/ApiCore/Auth"

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const Login = (props) => {

  const [user , setUser] = useState({
    "email":"admin@admin.com",
    "password":"123456789"
  })

  const handleUser = e => setUser({...user,[e.target.id]:e.target.value})
  
  const submitUser = e =>{
    e.preventDefault()

    Signin(user)
      .then(res=>{
        if(res.success){
          console.log(res)
          localStorage.setItem('token',JSON.stringify(res.data))

          toastr.options.progressBar = true
          toastr.success(res.message,"success")
          props.history.push(`/admin/documents`)

        }else{

        }
      })
  }
  return (
    <React.Fragment>
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h5 className="text-center">Login</h5>
              </div>
              <div className="card-body">
                <form onSubmit={submitUser}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      onChange={handleUser}
                      value={user.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      onChange={handleUser}
                      value={user.password}
                    />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100">login</button> 
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  )
}

export default withRouter(Login)