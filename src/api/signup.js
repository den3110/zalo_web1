import axios from "axios"
import {SERVER_URL } from "../config/config"

const signup= async (username, phoneNumber, password, email, setData)=> {
    const res= await axios({
        url: `${SERVER_URL}/user/register`,
        method: "post",
        data: {
            username, phoneNumber, password, email
        }

    })
    const result= await res.data
    if(res.status=== 200) {
        window.location.href= window.location.origin+"/login"
    }
    return setData(result)
}

export default signup