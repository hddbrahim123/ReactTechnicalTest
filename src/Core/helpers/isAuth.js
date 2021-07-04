function isAuth() {
    let token = localStorage.getItem('token')

    if(token){
        return JSON.parse(token)
    }
    return false
}

export default isAuth
