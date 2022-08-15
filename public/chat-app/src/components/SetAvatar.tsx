import React, { useEffect, useState } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
// @ts-expect-error TS(2307): Cannot find module '../assets/loader.gif' or its c... Remove this comment to see the full error message
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`
    const navigate = useNavigate()
    //可选头像信息
    const [avatars, setAvatars] = useState([])
    //是否还在请求随机头像
    const [isLoading, setIsLoading] = useState(true)
    //选中头像
    const [selectedAvatar, setSelectedAvatar] = useState<string|any>(undefined)
    //提示样式
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(() => {
        async function fn() {
            // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
                navigate('/login')
            const data = []
            //获取随机头像
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                )
                const buffer = new Buffer(image.data)
                data.push(buffer.toString('base64'))  
            }
            // @ts-expect-error TS(2345): Argument of type 'string[]' is not assignable to p... Remove this comment to see the full error message
            setAvatars(data)
            setIsLoading(false)
        }
        fn()
    }, [])

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            // @ts-expect-error TS(2345): Argument of type '{ position: string; autoClose: n... Remove this comment to see the full error message
            toast.error('请选择一个头像', toastOptions)
        } else {
            const user = await JSON.parse(
                // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
            //post选择的头像
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })
            //设置成功，进入聊天室
            if (data.isSet) {
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem(
                    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(user)
                )
                navigate('/')
            } else {
                // @ts-expect-error TS(2345): Argument of type '{ position: string; autoClose: n... Remove this comment to see the full error message
                toast.error('设置头像错误，请重试', toastOptions)
            }
        }
    }

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt='loader' className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>请选择一个头像</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
                                    // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" key={avatar} onClick={() => setSelectedAvatar(index)} />
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={setProfilePicture} className='submit-btn'>
                        设置头像
                    </button>
                    <ToastContainer />
                </Container>
            )}
        </>
    )
}

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 gap: 3rem;
 background-color: skyblue;
 height: 100vh;
 width: 100vw;

 .loader {
  max-inline-size: 100%;
 }

 .title-container {
  h1 {
   color: white;
  }
 }

 .avatars {
  display: flex;
  gap: 2rem;

  .avatar {
   border: 0.4rem solid transparent;
   padding: 0.4rem;
   border-radius: 5rem;
   display: flex;
   justify-content: center;
   align-items: center;
   transition: 0.5s ease-in-out;
   img {
    height: 6rem;
    transition: 0.5s ease-in-out;
   }
  }

  .selected {
   border: 0.4rem solid yellow;
  }
 }

 .submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
   background-color: #4e0eff;
  }
 }
`