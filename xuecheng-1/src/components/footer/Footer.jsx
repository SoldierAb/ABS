import React from 'react';
import styled from 'styled-components';

const footerBottom = 'http://localhost:3000/img_bg_4.jpg';

const Wrapper = styled.div`
      height:400px;
      width:100%;
      background:url(${footerBottom}) no-repeat;
      background-size:cover;
      .footerBottomBox{
          height:100%;
          width:100%;
          background:rgba(0,0,0,0.8);
          padding:5%;
          .footerbox{
              height:100%;
              width:20%;
              margin-left:5%;
              word-wrap:break-word;
              h1{
                  color:rgba(255,255,255,0.8);
                  text-align:left;
                  font-family: "Work Sans", Arial, sans-serif;
                  font-weight: 400;
                  font-size: 24px;
                  margin: 0 0 20px 0;
                  margin-bottom: 20px;
                  line-height: 1.5;
                }
                p{
                  text-align:left;
                  font-size: 18px;
                  line-height: 1.5;
                  color: #828282;
                }
          }
      }
`;


const Footer = () => (
  <Wrapper className="footerBottom">
    <div className="footerBottomBox clearfix">
      <div className="fl footerbox">
        <h1>About Education</h1>
        <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpaamet.</p>
      </div>
      <div className="fl footerbox">
        <h1>About Education</h1>
        <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpaamet.</p>
      </div>
      <div className="fl footerbox">
        <h1>About Education</h1>
        <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpaamet.</p>
      </div>
      <div className="fl footerbox">
        <h1>About Education</h1>
        <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit. Eos cumque dicta adipisci architecto culpaamet.</p>
      </div>
    </div>
  </Wrapper>
)


export default Footer;