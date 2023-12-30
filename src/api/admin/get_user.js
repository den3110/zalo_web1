import axios from "axios"
import { SERVER_URL } from "../../config/config"
import Cookies from "js-cookie"

const get_user= async ()=> {
    const res= await axios({
        url: SERVER_URL+ "/api/admin/user",
        method: "get",
        headers: {
            "authorization": Cookies.get("uid")
        }
    })
    const result= await res.data
    return result
}

export default get_user