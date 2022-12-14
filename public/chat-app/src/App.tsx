import React, { useEffect }from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SetAvatar from './components/SetAvatar'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import { frontEndExceptionRoute } from "./utils/APIRoutes"
import {postRequest} from './utils/api'

export default function App() {
  useEffect(() => {
    window.addEventListener('error', (event) => {
      let numA = 2
      const element = event.target as HTMLElement
      if (element?.tagName.toUpperCase() === 'IMG') {
        numA = 1
      }    
      postRequest(frontEndExceptionRoute, {
        event:"front_end_exception",
        type:"error_message",
        params:{
          type:numA,
          time:new Date().getTime(),
          message:event
        }
        
      })

    }, true)
    window.addEventListener('unhandledrejection', (event) => {
      event.preventDefault()
      postRequest(frontEndExceptionRoute, {
        event:"front_end_exception",
        type:"error_message",
        params:{
          type:3,
          time:new Date().getTime(),
          message:event
        }
        
       })
    })
  },[])
  return (
    //路由配置
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setavatar' element={<SetAvatar/>}/>
        <Route path='/' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

