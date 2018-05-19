import React from 'react';
import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';

const aboutBg = `http://localhost:3000/img_bg_3.jpg`;

const Wrapper = styled.div`
  box-sizing:border-box;
  letter-spacing:0.2px;
  .aboutHeader{
    height:600px;
    width:100%;
    background-size:cover;
    .aboutBox{
        height:100%;
        width:100%;
        background:rgba(0,0,0,0.6);
        text-align:center;
        h1{
            color:white;
            line-height: 500px;
            font-family: "Work Sans", Arial, sans-serif;
            font-weight: 400;
            font-size: 48px;
        }
    }
  }
`;


export const AboutHeader = () => (
  <Wrapper>
    <div
      className="aboutHeader"
      style={{ background: 'url(http://localhost:3000/tm-bg-slide-2.jpg)  no-repeat', backgroundSize: 'cover' }}
    >
      <QueueAnim
        key="headerabout"
        leaveReverse
        delay={300}
        className="aboutBox">
        <h1 key="abusH">关于我们</h1>
      </QueueAnim>
    </div>
  </Wrapper>
)

export const TeaHeader = () => (
  <Wrapper>
    <div
      className="aboutHeader"
      style={{ background: 'url(http://localhost:3000/upload_744cad2ddca65c81f9f1ae407423bc49.jpg)  no-repeat', backgroundSize: 'cover' }}
    >
      <QueueAnim key="headerabout"
        leaveReverse
        delay={300} className="aboutBox">
        <h1 key="youH">优秀教员</h1>
      </QueueAnim>
    </div>
  </Wrapper>
)


export const OrderHeader = () => (
  <Wrapper>

    <div
      className="aboutHeader"
      style={{ background: 'url(http://localhost:3000/tm-bg-slide-3.jpg)  no-repeat', backgroundSize: 'cover' }}
    >
      <QueueAnim
        key="headerabout"
        leaveReverse
        delay={300}
        className="aboutBox">
        <h1 key="zpH">招聘信息</h1>
      </QueueAnim>
    </div>
  </Wrapper>
)