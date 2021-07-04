import { API_URL } from "../../config"
import isAuth from "../helpers/isAuth"


export const createDocument = (document)=>{
    const  token  = isAuth().token
    return fetch(`${API_URL}/admin/documents`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(document)
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const getDocuments = ()=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/documents`,{
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
export const getDocument = (document)=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/documents/${document}`,{
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

export const searchDocuments = (keywords)=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/documents/search/${keywords}`,{
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

export const updateDocuments = (id ,document)=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/documents/${id}`,{
        method:"PUT",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(document)

    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

export const removeDocuments = (document)=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/documents/${document}`,{
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
export const uploadFile = (file,id)=>{
    const { token } = isAuth()

    return fetch(`${API_URL}/admin/upload/file/${id}`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:file
    })
    .then(res=>res.json())
    .then(res=>res)
    .catch(err=>console.error(err))
}

