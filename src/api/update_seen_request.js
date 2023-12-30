import axios from "axios"
import { SERVER_URL } from "../config/config"
import Cookies from "js-cookie"

const update_seen_request= async(id, un_seen)=> {
        const res= await axios({
            url: `${SERVER_URL}/api/users/update_seen_request/${id}`,
            method: "post",
            headers: {
                'authorization': `Bearer ${Cookies.get("accessToken")}`
            },
            data: {
                un_seen
            }
        })
        const result= await res.data
        return result
    }

export default update_seen_request