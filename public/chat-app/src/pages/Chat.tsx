import React, { useEffect, useState, useRef } from "react";
import {getRequest} from "../utils/api";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate()
  const socket = useRef()
  //联系人
  const [contacts, setContacts] = useState([])
  //当前聊天对象
  const [currentChat, setCurrentChat] = useState(undefined)
  //当前用户
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    async function fn() {
      //为登录返回登录页面
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/login')
      } else {
        //读取当前用户信息
        setCurrentUser(
          await JSON.parse(
            // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        )
      }
    }
    fn()
  }, [])
  useEffect(() => {
    async function fn1() {
      if (currentUser) {
        // @ts-expect-error TS(2322): Type 'Socket<DefaultEventsMap, DefaultEventsMap>' ... Remove this comment to see the full error message
        socket.current = io(host)//连接服务器
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        socket.current.emit('add-user', currentUser._id)//触发添加用户事件
        // @ts-expect-error TS(2339): Property 'isAvatarImageSet' does not exist on type... Remove this comment to see the full error message
        if (currentUser.isAvatarImageSet) {
          //获取当前在线用户
          // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
          const data = await getRequest(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        } else {
          navigate('/setavatar')
        }
      }
    }
    fn1()
  }, [currentUser])

  const handleChatChange = (chat: any) => {
    //更新聊天内容
    setCurrentChat(chat)
  }

  return (
    <>
      <Container>
        <div className="container" onLoad={()=>{performance.mark('meaningful');}}>
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {
            currentChat === undefined ?
              (<Welcome />) :
              //ref传入子组件
              (<ChatContainer currentChat={currentChat} socket={socket} />)
          }
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;