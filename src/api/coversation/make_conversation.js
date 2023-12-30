import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const make_conversation= async (label, member, createdBy, imageGroup,setData, navigate)=> {
    const res= await axios({
        url: `${SERVER_URL}/api/conversations`,
        method: "post",
        headers: {
            "authorization": "Bearer "+Cookies.get("accessToken")
        },
         data: {
            label, member, createdBy, imageGroup
        }
    })
    const result= await res.data
    navigate("/chat/"+ result?._id)
    return setData(result)

}

export default make_conversation