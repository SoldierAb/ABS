import React from 'react';
import TweenOne from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;



export default class BannerBak extends React.Component {

    state={
        imgArray:[
            'http://localhost:3099/img_bg_1.jpg',
            'http://localhost:3099/img_bg_2.jpg',
            'http://localhost:3099/img_bg_3.jpg',
            'http://localhost:3099/img_bg_4.jpg',
        ]
    }


    render() {
        
        const {imgArray} = this.state;

        return (
            <BannerAnim>
                <Element key="demo1">
                    <BgElement
                        style={{
                            backgroundImage:`url(${imgArray[0]})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center'
                        
                        }}
                    />
                    <TweenOne animation={{ x: -30, type: 'from' }}>Ant Motion Demo</TweenOne>
                </Element>
                <Element key="demo2">
                <BgElement
                        style={{
                            backgroundImage:`url(${imgArray[1]})`,
                            backgroundSize:'cover',
                            backgroundPosition:'center'
                        
                        }}
                    />
                    <TweenOne animation={{ x: -30, type: 'from' }}>Ant Motion Demo</TweenOne>
                </Element>
            </BannerAnim>
        );
    }
}
