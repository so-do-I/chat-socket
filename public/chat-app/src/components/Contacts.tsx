import React, { useState, useEffect } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
// @ts-expect-error TS(2307): Cannot find module '../assets/logo.svg' or its cor... Remove this comment to see the full error message
import Logo from "../assets/logo.svg";

export default function Contacts(
  this: any,
  {
    contacts,
    changeChat
  }: any
) {
  //用户名
  const [currentUserName, setCurrentUserName] = useState(undefined)
  //头像
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  //当前选中聊天对象
  const [currentSelected, setCurrentSelected] = useState(undefined)
  //搜索内容
  const [searchText, setSearchText] = useState('')
  //搜索结果
  const [searchRes,setSearchRes] = useState([])

  //设置当前用户名与头像
  useEffect(() => {
    async function fn() {
      const data = await JSON.parse(
        // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
      setCurrentUserName(data.username)
      setCurrentUserImage(data.avatarImage)
    }
    fn()
  }, [])

  useEffect(() => {
    if (searchText !== '') {
      console.log(searchText)
      setSearchRes(contacts.filter((res: any) => res.username.indexOf(searchText) !== -1 ))
    } else {
      setSearchRes(contacts)
    }
  },[searchText,contacts])

  //改变聊天对象
  const changeCurrentChat = (index: any, contact: any) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  const debounce = (fn: any, delay: any) => {
    let timer: any = null
    let that = this
    return (args: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(that,args)
      }, delay)
    };
  }
  const changeSearch = (e: any) => {
    debounceSet(e.target.value)
  }
  const debounceSet=debounce(setSearchText,1000)

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chat OL</h3>
          </div>
          <input className="search" type='text' placeholder="查找联系人" onChange={e=>changeSearch(e)} />
          <div className="contacts">
            {
              searchRes.map((contact:any, index) => {
                return (
                  <div key={contact._id} className={`contact ${index === currentSelected ? "selected" : ""}`} onClick={() => changeCurrentChat(index, contact)}>
                    <div className="avatar">
                      // @ts-expect-error TS(2339): Property 'avatarImage' does not exist on type 'nev... Remove this comment to see the full error message
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                    </div>
                    <div className="username">
                      // @ts-expect-error TS(2339): Property 'username' does not exist on type 'never'... Remove this comment to see the full error message
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 5% 70% 15%;
  overflow: hidden;
  background-color: #080420;
  .search {
    height:1.5rem;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;