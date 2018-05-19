import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/banner/Banner.jsx';
// import Body from '../../components/body/Body.jsx';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';


const Wrapper = styled.div`

`;

const Home = () => (
    <Wrapper>
        <div className="banner">
            <Banner />
        </div>
        <div className="">
            <OverPack style={{ overflow: 'hidden', height: 200 }} >
                <TweenOne key="0" animation={{ opacity: 1 }}
                    className="code-box-shape"
                    style={{ opacity: 0, marginBottom: 10 }}
                />
                <QueueAnim key="queue"
                    leaveReverse
                    style={{ float: 'left', position: 'relative', left: '50%', marginLeft: -165 }}
                >
                    {[1, 2, 3, 4, 5].map(item =>
                        <div key={item}>{item}</div>
                    )}
                </QueueAnim>
            </OverPack>
        </div>
    </Wrapper>
)

export default Home;