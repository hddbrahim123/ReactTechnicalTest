function isAdmin() {
    let token = JSON.parse(localStorage.getItem('token'))

    if(token){
        return token.user.roles['0'].name == "admin"
    }
    return false
}

export default isAdmin
