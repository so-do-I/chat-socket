import React, { useState, useEffect } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
// @ts-expect-error TS(2307): Cannot find module '../assets/robot.gif' or its co... Remove this comment to see the full error message
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
    useEffect(() => {
        async function fn() {
            setUserName(
                await JSON.parse(
                    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                ).username
            );
        }
        fn()
    }, []);
    
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>请选择一个联系人开始聊天</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
