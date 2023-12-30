import { useContext } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AppContext } from "../../App"
import NotFound from "../NotFound/NotFound"
import ChatPage from "./ChatPage"
// import DefaultPage from "./DefaultPage"
import FriendPage from "./FriendPage"

const MainScreen = () => {
  const {auth, data }= useContext(AppContext)
  return (
    <div className={"fdjkdaklsklasasas"} style={{flex: "1 1 0", height: "100vh", maxHeight: "100vh"}}>
      <Routes>
        <Route path={"/*"} element={<Navigate to={"/"} replace={true} />} />
        {
          data?.lastConversationId?.length> 0 &&
          <>
            { 
            auth=== true && <Route path={"/"} element={<Navigate to={"/chat/"+data?.lastConversationId} replace={true} />} />
          }
          </>
        }
        {
          (!data?.lastConversationId || data?.lastConversationId?.length <= 0) &&
          <>
            { 
            auth=== true && <Route path={"/"} element={<Navigate to={"/chat/t"} replace={true} />} />
          }
          </>
        }
        <Route path={"/chat/:idConversation"} element={<ChatPage />} />
        <Route path={"/friends/*"} element={<FriendPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default MainScreen
