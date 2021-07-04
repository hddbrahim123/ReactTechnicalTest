import React from 'react'
import { useState } from 'react'
import { createUser } from '../../../Core/ApiCore/User'

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import _ from 'lodash'

const CreateUser = (props) => {

    const [user , setUser] = useState({
        "name":"user",
        "email":"user@user.com",
        "password":"123456789",
        "r_password":"123456789",
    })
    
    const handleUser = e => setUser({...user , [e.target.id]:e.target.value})

    const submitUser = e =>{
        e.preventDefault()

        createUser(user)
            .then(res=>{
                if(res.success){
                    toastr.options.progressBar = true
                    toastr.success(res.message,"success")
                    props.history.push(`/admin/users`)
                }else{
                    _.forEach(res.errors , function(error){
                        toastr.options.progressBar = true
                        toastr.error(error,"error")
                    })
                    
                }
            })
    }

    return (
        <div>
            <form onSubmit={submitUser}>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    onChange={handleUser}
                                    placeholder="Your Name"
                                    value={user.name}
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    onChange={handleUser}
                                    placeholder="Your Email"
                                    value={user.email}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    onChange={handleUser}
                                    placeholder="Your Password"
                                    value={user.password}
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="r_password" className="form-label">Repeat Password</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    id="r_password"
                                    onChange={handleUser}
                                    placeholder="Reapet Your Password"
                                    value={user.password}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">save User</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateUser
