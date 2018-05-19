import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/banner/Banner.jsx';
// import Body from '../../components/body/Body.jsx';

import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
const Parallax = ScrollAnim.Parallax;
const OverPack = ScrollAnim.OverPack;

const Wrapper = styled.div`
    .code-box-shape{
        width:100px;
        height:100px;
        background:red;
        margin:10px;
    }
`;

const Home = () => (
    <Wrapper>
        <div className="banner">
            <Banner />
        </div>
        <div className="">
            <OverPack style={{ overflow: 'hidden', height: 1200 }} >
                <TweenOne key="0" animation={{ opacity: 1 }}
                    className="code-box-shape"
                    style={{ opacity: 0, marginBottom: 10 }}
                />
                <QueueAnim key="queue"
                    leaveReverse
                    className="clearfix"
                // style={{ float: 'left', position: 'relative'}}
                >
                    <div key="a" className="code-box-shape fl" />
                    <div key="b" className="code-box-shape fl" />
                    <div key="c" className="code-box-shape fl" />
                    <div key="d" className="code-box-shape fl" />
                    <div key="e" className="code-box-shape fl" />
                    <div key="f" className="code-box-shape fl" />
                </QueueAnim>
            </OverPack>
        </div>
    </Wrapper>
)

export default Home;