import axios from "axios"
import { SERVER_URL } from "../../config/config"

const delete_user= async (data)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/admin/user",
        method: "delete",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default delete_user