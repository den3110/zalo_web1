import axios from "axios"
import { SERVER_URL } from "../config/config"

const confirm_code= async (email, code_verify, setStatus)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/auth/confirm_code",
        method: "post", 
        data: {
            email, code_verify: code_verify?.toString()
        }
    })
    const result= await res.data
    return setStatus(result)
}

export default confirm_code