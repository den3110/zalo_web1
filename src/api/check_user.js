import axios from "axios"
import { SERVER_URL } from "../config/config"

const check_user = async (email, phoneNumber)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/auth/check-user",
        method: "post", 
        data: {
            email, phoneNumber: phoneNumber?.toString()
        }
    })
    const result= await res.data
    return result
}

export default check_user 