import React, { useEffect, useState } from 'react'
import {postRequest} from '../utils/api'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import style from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
// @ts-expect-error TS(2307): Cannot find module '../assets/logo.svg' or its cor... Remove this comment to see the full error message
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from "../utils/APIRoutes"
import {getFMP} from "../utils/webPerformance"

export default function Login() {
    const navigate = useNavigate()
    //设置提示样式
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme:'dark'
    }
    //登录信息
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    useEffect(() => {
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate('/')
        }
    }, [])

    const handleChange = (e: any) => {
        setValues({...values,[e.target.name]:e.target.value})
    }
    //验证输入
    const handleValidation = () => {
        const { password, username } = values
        if (username === '') {
            // @ts-expect-error TS(2345): Argument of type '{ position: string; autoClose: n... Remove this comment to see the full error message
            toast.error("请输入用户名", toastOptions)
            return false
        }
        else if (password === '') {
            // @ts-expect-error TS(2345): Argument of type '{ position: string; autoClose: n... Remove this comment to see the full error message
            toast.error("请输入密码", toastOptions)
            return false
        }
        return true
    }
    const handleSubmit = async (e: any) => {
        //阻止默认事件
        e.preventDefault()
        if (handleValidation()) {
            const { username, password } = values
            //post登录信息
            const { data } = await postRequest(loginRoute, {
                username,
                password
            })
            if (data.status === false) {//登录失败
                // @ts-expect-error TS(2345): Argument of type '{ position: string; autoClose: n... Remove this comment to see the full error message
                toast.error(data.msg,toastOptions)
            }
            if (data.status === true) {//登录成功
                //保存登录信息
                localStorage.setItem(
                    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                )
                navigate('/')
            }
        }
    }

    return (
        <>
            <FormContainer>
                <form action='' 
                      onSubmit={e => handleSubmit(e)}
                      onLoad={()=>{performance.mark('meaningful'); console.log(getFMP());}}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>Chat OL</h1>
                    </div>
                    <input type="text" placeholder='用户名/usernaem' name='username' onChange={e=>handleChange(e)} min='3'/>
                    <input type="password" placeholder='密码/password' name='password' onChange={e=>handleChange(e)}/>
                    <button type='submit'>登录/Log In</button>
                    <span>
                        未拥有账号？<Link to='/register'>注册</Link>
                    </span>
                </form> 
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = style.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:skyblue;
    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }

    form{
        width:30vw;
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#20202080;
        border-radius:2rem;
        padding: 3rem 5rem;
    }

    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #00a0a0;
        bord-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
        ::placeholder {
            color: rgba(1,1,1,.5);
        }
    }

    button{
        background-color:#ff9090;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        &:hover{
            background-color:#ffb0b0;
            transform:scale(1.01);
        }
    }

    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#00e080;
            text-decoration:none;
            font-weight:bold;
        }
    }
`
