import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/banner/Banner.jsx';
import Footer from '../../components/footer/Footer.jsx';
import { Avatar } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ScrollAnim from 'rc-scroll-anim';
const OverPack = ScrollAnim.OverPack;
const Parallax = ScrollAnim.Parallax;

const school = `http://localhost:3000/school.jpg`;
const creator = `http://localhost:3000/upload_22d5051138699646776a597d98712e52.jpg`;
const footer = ['http://localhost:3000/project-5.jpg', 'http://localhost:3000/project-2.jpg', 'http://localhost:3000/project-3.jpg', 'http://localhost:3000/project-4.jpg'];
const footerBottom = 'http://localhost:3000/img_bg_4.jpg';

const Wrapper = styled.div`
  *{
      box-sizing:border-box;
      margin:0;
      padding:0;
  }
    .code-box-shape{
        width:100px;
        height:100px;
        background:red;
        margin:10px;
    }
    .cultureHeader{
        height:300px;
        text-align:center;
        line-height:300px;
        padding:20px;
        h1{
            font-family: "Work Sans", Arial, sans-serif;
            font-weight: 400;
            font-size: 48px;
            margin: 0 0 20px 0;
            margin-bottom: 20px;
            line-height: 1.5;
            color: #000;
          }
          p{
            font-size: 36px;
            line-height: 1.5;
            color: #828282;
          }
    }
    .cultureBoxContainer{
        width:90%;
        height:600px;
        text-align:center;
        margin:0 auto;    
        .cultureBox{
            width:45%;
            height:280px;
            margin:2%;
            .cultureBoxLeft{
                width:50%;
                height:100%;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .cultureBoxRight{
                padding: 1.7em;
                background: #fafafa;
                width:50%;
                height:100%;
                h2{
                    font-size: 18px;
                    font-weight: 400;
                    color: #000;
                    margin: 0 0 20px 0;
                }
                p{
                    font-family: "Source Sans Pro", Arial, sans-serif;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #828282;
                }
            }
        }
    }

    .schoolContainer{   
        height:600px;
        background:url(${school}) repeat;
        width:100%;
        .schoolBox{
            height:100%;
            background-color: rgba(31, 95, 139, 0.67);
            text-align:center;
            padding:100px;
            .imgBox{
                height:130px;
                width:130px;
                display:inline-block;
                img{
                    border-radius:50%;
                    width:100%;
                    height:100%;
                }
            }
            h1{
                font-family: "Work Sans", Arial, sans-serif;
                font-weight: 400;
                font-size: 36px;
                margin: 0 0 20px 0;
                margin-bottom: 20px;
                line-height: 1.5;
                color:rgba(255,255,255,0.8);
              }
            h3{
                font-family: "Work Sans", Arial, sans-serif;
                font-weight: 400;
                font-size: 24px;
                margin: 0 0 20px 0;
                margin-bottom: 20px;
                line-height: 1.5;
                color:rgba(255,255,255,0.8);
            }    
            h4{
                font-family: "Work Sans", Arial, sans-serif;
                font-weight: 400;
                font-size: 18px;
                margin: 0 0 20px 0;
                margin-bottom: 20px;
                line-height: 1.5;
                color:rgba(255,255,255,0.8);
            }  
            p{
                font-size: 16px;
                line-height: 1.5;
                color:rgba(255,255,255,0.8);
              }
        }
    }

    .homeFooter{
        height:300px;
        div{
            width:25%
            height:100%;
            img{
                width:100%;
                height:100%;
            }
        }
        
    }
`;

const Home = () => (
    <Wrapper>
        <div className="banner">
            <Banner />
        </div>
        <div className="">
            <OverPack style={{ overflow: 'hidden', height: 1100 }} >
                <TweenOne key="tweenheader"
                    animation={{ opacity: 1 }}
                    style={{ opacity: 0, marginBottom: 10 }}
                >
                    <div className="cultureHeader">
                        <h1>our culture</h1>
                        <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
                    </div>
                </TweenOne>
                <QueueAnim key="queue"
                    leaveReverse
                    className="cultureBoxContainer clearfix"
                    delay={800}>
                    <div key="a" className="fl cultureBox clearfix">
                        <div className="cultureBoxLeft fl">
                            <img src="http://localhost:3000/project-1.jpg" alt="" />
                        </div>
                        <div className="cultureBoxRight fr">
                            <h2>Web Master</h2>
                            <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor
									eius molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
                        </div>
                    </div>
                    <div key='b' className="fr cultureBox clearfix">
                        <div className="cultureBoxLeft fl">
                            <img src="http://localhost:3000/project-2.jpg" alt="" />
                        </div>
                        <div className="cultureBoxRight fr">
                            <h2>Web Master</h2>
                            <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor
									eius molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
                        </div>
                    </div>
                    <div key="c" className="fl cultureBox clearfix">
                        <div className="cultureBoxLeft fl">
                            <img src="http://localhost:3000/project-3.jpg" alt="" />
                        </div>
                        <div className="cultureBoxRight fr">
                            <h2>Web Master</h2>
                            <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor
									eius molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
                        </div>
                    </div>
                    <div key="d" className="fr cultureBox clearfix">
                        <div className="cultureBoxLeft fl">
                            <img src="http://localhost:3000/project-4.jpg" alt="" />
                        </div>
                        <div className="cultureBoxRight fr">
                            <h2>Web Master</h2>
                            <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor
									eius molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
                        </div>
                    </div>
                </QueueAnim>
            </OverPack>
            <OverPack>
                <TweenOne key="0"
                    animation={{ opacity: 1 }}
                    style={{ opacity: 0, marginBottom: 10 }}
                    className="schoolContainer"
                >

                    <div key="creator" className="schoolBox">
                        <h1>--CREATOR--</h1>
                        <div className="imgBox">
                            <img src={creator} />
                        </div>
                        <h4>CHEN</h4>
                        <h3>
                            Be an engineer instead of a coder
                        </h3>
                    </div>
                </TweenOne>
            </OverPack>
            <OverPack>
                <TweenOne key="tweenfooter"
                    animation={{ opacity: 1 }}
                    style={{ opacity: 0, marginBottom: 10 }}
                >
                    <div className="cultureHeader">
                        <h1>our culture</h1>
                        <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
                    </div>
                </TweenOne>
                <QueueAnim
                    className="homeFooter clearfix"
                    delay={300}
                    type="bottom"
                    key="queuefooter"
                >
                    {
                        [1, 2, 3, 4].map((item, index) =>
                            <div key={item + 1} className="footerImg fl">
                                <img src={footer[index]} alt="" />
                            </div>
                        )
                    }

                </QueueAnim>
            </OverPack>
            <Footer />
        </div>
    </Wrapper>
)

export default Home;