import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { getUsers, removeUsers } from '../../../Core/ApiCore/User'


//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const Users = () => {

    const [users ,setUsers] = useState([])

    const deleteUser = (id) => {
        removeUsers(id)
            .then(res=>{
                let usersList = users
                usersList = usersList.filter(user=>user.id !== id)

                setUsers(usersList)

                toastr.options.progressBar = true
                toastr.success(res.message,"success")
            })
    }

    useEffect(()=>{
        getUsers()
            .then(res=>setUsers(res.data))
            
    },[])

    return (
        <div>
            <table className="table table-responsive">
                <thead className="table-light">
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>date</th>
                        <th>roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!isEmpty(users) ? users.map((user,i)=>(
                    <tr key={i}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.created_at}</td>
                        <td>
                            {user.roles.map((role,i)=>(
                                <div key={i}>
                                    {role.name}
                                </div>
                            ))}
                        </td>
                        <td>
                            <Link to="#" onClick={()=>deleteUser(user.id)} className="text-danger  fw-bold">
                            <i className='bx bx-trash'></i>
                            </Link>
                        </td>
                    </tr>
                    )) : 
                    <>
                    <tr>
                        <th colSpan="6"><h6 className="text-center">users not exist</h6></th>
                    </tr>
                    </>
                    }                    
                </tbody>
            </table>
        </div>
    )
}

export default Users
