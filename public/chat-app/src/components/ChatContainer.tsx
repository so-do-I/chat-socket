import React, { useState, useEffect, useRef } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'uuid... Remove this comment to see the full error message
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({
  currentChat,
  socket
}: any) {
  const [messages, setMessages] = useState([])//聊天框内信息
  const scrollRef = useRef()
  const [arrivalMessage, setArrivalMessage] = useState(null)//接收的信息

  useEffect(() => {
    async function getCurrentChat() {
      //有聊天对象，获取当前用户id
      if (currentChat) {
        await JSON.parse(
          // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id
      }
    }
    //获取当前用户发送的信息
    async function fn() {
      const data = await JSON.parse(
        // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id
      })
      //更新聊天内容
      setMessages(response.data)
    }
    fn()
    getCurrentChat()
  }, [currentChat])
  useEffect(() => {
    //触发接收事件
    if (socket.current) {
      socket.current.on('msg-receive', (msg: any) => {
        // @ts-expect-error TS(2345): Argument of type '{ fromSelf: boolean; message: an... Remove this comment to see the full error message
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  }, [])
  useEffect(() => {
    //接收对方发送信息，更新聊天内容
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])
  //更新滚轮状态
  useEffect(() => {
    // @ts-expect-error TS(2339): Property 'scrollIntoView' does not exist on type '... Remove this comment to see the full error message
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMsg = async (msg: any) => {
    const data = await JSON.parse(
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )
    //触发发送信息事件
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: data._id,
      msg
    })
    //post信息
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg
    })

    //更新聊天内容
    const msgs = [...messages]
    // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'never'.
    msgs.push({ fromSelf: true, message: msg })
    setMessages(msgs)
  }

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((msg:any) => {
          return (
            // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
            <div ref={scrollRef} key={uuidv4()}>
              // @ts-expect-error TS(2339): Property 'fromSelf' does not exist on type 'never'... Remove this comment to see the full error message
              <div className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
                <div className="content">
                  // @ts-expect-error TS(2339): Property 'message' does not exist on type 'never'.
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;