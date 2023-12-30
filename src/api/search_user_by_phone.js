import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../config/config"
const search_user_by_phone= async (phoneNumber, setData)=> {
    const res= await axios({
        url: `${SERVER_URL}/api/users/phone/${phoneNumber}`,
        headers: {
            "authorization": "Bearer "+Cookies.get("accessToken")
        },
        method: "get"
    })
    const result= await res.data
    return setData(result)
}

export default search_user_by_phone