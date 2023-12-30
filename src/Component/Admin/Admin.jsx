import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import User from './User/User'
import Stats from './Stats/Stats'

const Admin = () => {
  return (
    <div style={{width: "100%", display: "flex"}}>
      <Sidebar />        
      <div style={{flex: "1 1 0"}}>
        <Routes>
            <Route path={"/"} element={<User />} />
            <Route path={"/stats"} element={<Stats />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin