import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  letter-spacing:0.2px;
  padding-right: 15px;
  padding-left: 15px;
  margin: 100px 30px;
  
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
      .address{
        width: 25%;
        font-size: 12px;
        background: #C9C9C9;
        text-align: center;
        color: #fff;
        padding: 3px 10px;
      }
      .head{
        width:150px;
        height:150px;
        border:1px solid #eee;
        border-radius:50%;
        position:absolute;
        bottom:-20;
        left:40%;
        overflow:hidden;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .cvContent{
      padding:100px 0;
      .cvLeft{
        width:60%;
        div[class*='left']{
          padding:30px;
          margin-bottom:30px;
        }
        .bgGreen{
          background: #2ecc71;
        }
        .bgRed{
          background: #ea6153;
        }
        .bgGray{
          background: #ecf0f1;
        }
      }
      .cvRight{
        width:38%;
        border:1px solid #eee;
        height:600px;
      }
    }
    .cvBottom{
      position:relative;
      border-top: 1px solid #eee;
      padding:20px 0;
    }
`;

const Simplecv = ({ location }) => {
  console.log(location.state);
  let { address, age, college, evaluation, head, name, phone, price, sex, subject, time, type } = location.state;
  return (
    <Wrapper>
      <div className="cvTop clearfix">
        <div className="fl topLeft">
          <h2>Name: {name}</h2>
          <p>Age: {age}  -  Sex:{sex == 1 ? ' 男' : ' 女'}</p>
        </div>
        <div className="fr topRight clearfix">
          <div className="fl address">COLLEGE</div>
          <div className="fr">
            {college}
          </div>
        </div>
        <div className="head">
          <img src={head} alt="" />
        </div>
      </div>
      <div className="cvContent clearfix">
        <div className="cvLeft fl">
          <div className="leftbox bgGreen">
            <h3>Personal Statement</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          </div>
          <div className="leftbox bgRed">
            <h3>Experience</h3>
            <p></p>
          </div>
          <div className="leftbox bgGray">
            <h3>Evaluation</h3>
            <p>{evaluation}</p>
          </div>
        </div>
        <div className="cvRight fr"></div>
      </div>
      <div className="cvBottom">

      </div>
    </Wrapper>
  )
}

export default Simplecv;