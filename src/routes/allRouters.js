import { Redirect } from "react-router"

//imports Admin Pages
import Login from "../Pages/Admin/Authentication/Login"
import Documents from "../Pages/Admin/Documents"
import Create from "../Pages/Admin/Documents/Create"
import Users from "../Pages/Admin/User/index"
import CreateUser from "../Pages/Admin/User/CreateUser"

const adminRoutes = [
  
  { path:'/admin/users/create' , component: CreateUser }, 
  { path:'/admin/users' , component: Users }, 

  
  { path:'/admin/documents' , component: Documents }, 
  { path:'/admin/documents/create' , component: Create }, 
  { path:'/admin/documents/edit/:id' , component: Create }, 



  { path: "/", exact: true, component: () => <Redirect to="/admin/documents" /> },

]
const authAdmin = [
  { path:'/admin/login' , component: Login },
]

export { adminRoutes , authAdmin}