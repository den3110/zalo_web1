import Cookies from "js-cookie"

const logout= ()=> {
    Cookies.remove("uid")
    Cookies.remove("accessToken")
    window.location.reload()
}

export default logout