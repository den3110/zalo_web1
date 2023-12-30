import axios from "axios"
import { SERVER_URL } from "../config/config"

const reset_password= async (email, password, navigate)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/auth/reset-password",
        method: "post", 
        data: {
            email, password: password?.toString()
        }
    })
    const result= await res.data
    return result
}

export default reset_password