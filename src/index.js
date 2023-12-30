import React, { Suspense } from 'react';
import './index.css';
import "./a.sass"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spring-bottom-sheet/dist/style.css'
import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import  { AliveScope, KeepAlive } from 'react-activation';
import Image from './Component/Media/Image';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';

const App= lazy(()=> import("./App"))
const EntryApp= ()=> {

  return (
    <>
      {/* <AliveScope> */}
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
          <Router>
            <Routes>
              <Route path={"/*"} element={
                // <KeepAlive id={"123456789"} when={()=> true}>
                  <Suspense fallback={<div style={{width: "100%", height: "100%", position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: "center", alignItems: 'center'}}>Loading</div>}>
                    <App />
                  </Suspense>
                // </KeepAlive>
              
              } />
              <Route path={"/media/:image_id"} element={
              // <KeepAlive when={true}>
                <Image />
              // </KeepAlive>
              } />
            </Routes>
          </Router>
        </SnackbarProvider>
      {/* </AliveScope> */}
    </>
  )
}

createRoot(document.getElementById('root')).render(<EntryApp />);





