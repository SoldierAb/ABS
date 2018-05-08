import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/banner/Banner.jsx';
// import Body from '../../components/body/Body.jsx';

const Wrapper= styled.div``;

const Home = ()=>(
    <Wrapper>
        <div className="banner">
            <Banner/>
        </div>
    </Wrapper>
)

export default Home;