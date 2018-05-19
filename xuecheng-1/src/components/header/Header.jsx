import React from 'react';
import styled from 'styled-components';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';


const Wrapper = styled.div`
  height: 200px;
  text-align: center;
  padding-top: 60px;
  h1{
    font-family: "Work Sans", Arial, sans-serif;
    font-weight: 400;
    font-size: 32px;
    margin: 0 0 20px 0;
    margin-bottom: 20px;
    line-height: 1.5;
    color: #000;
  }
  p{
    font-size: 18px;
    line-height: 1.5;
    color: #828282;
  }
`;


const Header = ({ text }) => (
  // <TweenOne key="tweenheader"
  //   animation={{ opacity: 1 }}
  //   style={{ opacity: 0, marginBottom: 10 }}
  // >
  <QueueAnim
    key="queueHeaderha"
    leaveReverse
    delay={300}>
    <Wrapper key="headerTextHa">
      <h1>JUST FOR YOU</h1>
      <p>{text ? text : 'recruitment information'} </p>
    </Wrapper>
  </QueueAnim>
  // </TweenOne>
)

export default Header;