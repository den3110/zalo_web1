import axios from "axios";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import { SERVER_URL } from "./config/config";
import Cookies from "js-cookie";
import { useState } from "react";
import { createContext } from "react";
import Home from "./Component/Home/Home";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
import NotFound from "./Component/NotFound/NotFound";
import Container from "./Component/Container/Container";
import Admin from "./Component/Admin/Admin";
// import KeepAlive from "react-activation";

export function useIsMediaPath() {
  const { pathname } = useLocation();

  return pathname.startsWith("/media");
}
export const AppContext= createContext()
const App = () => {
  const [data, setData] = useState();
  const [auth, setAuth] = useState();
  const [change, setChange]= useState(false)
  useEffect(() => {
    (async () => {
      if(Cookies.get("uid")) {
        const res = await axios({
          url: `${SERVER_URL}/api/users/${Cookies.get("uid")}`,
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          method: "get",
          params: {
            id: Cookies.get("uid"),
          },
        });
        const result = await res.data;
        if (res.status === 200) {
          setAuth(() => true);
        } else {
          setAuth(() => false);
        }
        return setData(result);
      }
      else {
        setAuth(()=> false)
      }
    })();
  }, [change]);
  return (
      // <KeepAlive id="1234567888" when={()=> false}>
        <Container>
          <AppContext.Provider value={{data, auth,setData, setChange}}>
            <Routes>
              {
                auth=== true && <>
                  <Route path={"/*"} element={<Home />} />
                  <Route path={"/signup"} element={<Navigate to={"/"} />} />
                  <Route path={"/login"} element={<Navigate to={"/"} />} />
                  <Route path={"/admin/*"} element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                 
                </>
              }
              {
                auth=== false && <>
                  <Route path={"/*"} element=<Navigate to={"/login"} /> />
                  <Route path={"/signup"} element={<Signup />} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/forgot-password"} element={<ForgotPassword />} />
                  <Route path="*" element={<NotFound />} />
                </>
              }
            </Routes>
          </AppContext.Provider>
        </Container>
      // </KeepAlive>

  );
};

export default App;
