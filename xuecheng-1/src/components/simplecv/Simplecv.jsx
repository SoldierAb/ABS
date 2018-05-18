import React, { Component } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

const skill = 'http://localhost:3099/skills.jpg'

const Wrapper = styled.div`
  letter-spacing:0.2px;
  width: 100%;
  .simpleCvHeader{
    height:200px;
    line-height: 150px;
    padding:20px;
    text-align:center;
    background:#eee;
  }
  .simpleCvBox{
    width:1000px;
    margin: 100px auto;
    .cvTop{
      position:relative;
      padding-top: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .topLeft{
        width:40%;
      }
      .topRight{
        width:30%  
      }
      .college{
        width: 30%;
        font-size: 12px;
        background: #576fdf;
        text-align: center;
        color: #fff;
        padding: 8px 20px;
      }
      .head{
        width:320px;
        height:320px;
        border:1px solid #eee;
        border-radius:50%;
        position:absolute;
        bottom:-140px;
        left:330px;
        overflow:hidden;
        z-index:200;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .cvContentBox{
      border:1px solid #dedede;
      margin-top:200px;
      .cvContentHeader{
        text-align:center;
        h2{
          font-size: 30px;
          line-height: 67px;
          color: #3b3a3a;
          letter-spacing: -0.4px;
          margin-bottom: 60px;
          padding: 0 20px;
        }
      }
      
    }
    .cvBottom{
      position:relative;
      border-top: 1px solid #eee;
      padding:20px 0;
    }
  }

  .simpleCvSkill{
    position:relative;
    background:url(${skill}) no-repeat;
    height:600px;
    background-size: cover !important;
    .skillBox{
      padding:100px 0 100px 300px;
      h2{
        font-size: 36px;
        color: #000;
        margin-bottom: 15px;
        letter-spacing: -0.4px;
        display:inline-block;
      }
      p{
        display:inline-block;
        font-size:36px;
        font-family: 'Old Standard TT', serif;
        margin-bottom: 60px;
        padding-left: 80px;
      }
    }
    .simpleCvQrcode{
      position:absolute;
      right:300px;
      bottom:100px;
    }
  }
`;

const Simplecv = ({ location }) => {
  console.log(location.state);
  let { address, age, college, evaluation, head, name, phone, price, sex, subject, time, type } = location.state;
  return (
    <Wrapper>
      <div className="simpleCvHeader">
        <h1>SIMPLE CV</h1>
      </div>
      <div className="simpleCvBox">
        <div className="cvTop clearfix">
          <div className="fl topLeft">
            <h1>NAME: {name}</h1>
            <h3>AGE: {age}  - SEX:{sex == 1 ? ' 男' : ' 女'}</h3>
          </div>
          <div className="fr topRight clearfix">
            <div className="fl college">COLLEGE</div>
            <div className="fr">
              <h1>{college}</h1>
            </div>
          </div>
          <div className="head">
            <img src={head} alt="" />
          </div>
        </div>
        <div className="cvContentBox clearfix">
          <div className="cvContentHeader">
            <h2>
              您好，我是{name},今年{age}岁，就读于{college},目前住在
          </h2>
            <h2>
              {address.city.join('')}{address.address}
            </h2>
          </div>


        </div>
        <div className="cvBottom">

        </div>
      </div>
      <div className="simpleCvSkill">
        <div className="skillBox">
          <span>
            <h2>擅长科目：</h2>
          </span>
          <span>
            <p>{subject}</p>
          </span><br />
          <span>
            <h2>空闲时间：</h2>
          </span>
          <span>
            <p>{time}</p>
          </span><br />
          <span>
            <h2>期望时薪：</h2>
          </span>
          <span>
            <p>&yen;{price}</p>
          </span><br />
          <span>
            <h2>自我评价</h2>
          </span>
          <span>
            <p>{evaluation}</p>
          </span><br />
        </div>
        <div className="simpleCvQrcode">
          <QRCode value={phone} />
        </div>
      </div>

    </Wrapper>
  )
}

export default Simplecv;