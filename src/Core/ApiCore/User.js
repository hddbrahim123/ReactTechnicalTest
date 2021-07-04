import { API_URL } from "../../config"
import isAuth from "../helpers/isAuth"


export const createUser = (user)=>{
    const { token } = isAuth()
    return fetch(`${API_URL}/admin/users`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const getUsers = ()=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/users`,{
        method:"GET",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}
export const removeUsers = (id)=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/users/${id}`,{
        method:"DELETE",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}