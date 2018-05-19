import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer/Footer.jsx';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import * as Header from '../../components/headerImg/headerImg.jsx';
import ScrollAnim from 'rc-scroll-anim';

const AboutHeader = Header.AboutHeader;

const OverPack = ScrollAnim.OverPack;
const Parallax = ScrollAnim.Parallax;

const aboutBg = `http://localhost:3000/img_bg_3.jpg`;
const abcontent = `http://localhost:3000/img_bg_2.jpg`;

const Wrapper = styled.div`

    .aboutContentBox{
        height:100%;
        width:100%;
        padding:8%;
        .aboutContentBoxLeft{
            width:42%;
            height:100%;
            h2{
                color: #000;
                font-family: "Roboto Slab", serif;
                font-weight: 400;
                margin: 0 0 20px 0;
                font-size:30px;
            }
            p{
                font-family: "Source Sans Pro", Arial, sans-serif;
                font-weight: 400;
                font-size: 15px;
                line-height: 1.7;
                color: #828282;
            }
        }
        .aboutContentBoxRight{
            width:42%;
            height:100%;
            background:url(${abcontent}) no-repeat;
            background-size:cover;
            .innerRight{
                width:100%;
                height:100%;
            }
        }
    }
`;

const About = () => (
    <Wrapper>
        {/* <QueueAnim
            key="hhh"
            leaveReverse
            delay={300}
            className="aboutHeader"
        >
            <div key="headerabout" className="aboutBox">
                <h1>关于我们</h1>
                <p></p>
            </div>
        </QueueAnim> */}
        <AboutHeader />
        <OverPack style={{ overflow: 'hidden', height: 550 }}>
            {/* <TweenOne key="aboutTweenOne"
                animation={{ opacity: 1 }}
                style={{ opacity: 0, marginBottom: 10 }}
                className="aboutContentBox clearfix"
            > */}
            <QueueAnim key="aboutqueue"
                leaveReverse
                className="aboutContentBox clearfix"
                delay={300}>
                <div key="aboutLeft" className="fl aboutContentBoxLeft">
                    <p>About Our University</p>
                    <h2>Welcome to Education Website</h2>
                    <p>Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat cauctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per Mauris in erat justo.</p>
                    <p>Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat cauctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per Mauris in erat justo.</p>
                </div>
                <div key="aboutRight" className="fr aboutContentBoxRight">
                    <div className="innerRight"></div>
                </div>
            </QueueAnim>
            {/* </TweenOne> */}
        </OverPack>

        <Footer />
    </Wrapper>
)

export default About;