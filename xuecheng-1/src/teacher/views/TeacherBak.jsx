import React from 'react';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import Icon from 'antd/lib/icon';
import { injectGlobal } from 'styled-components';

injectGlobal`
  .pic-details-demo-wrapper {
    position: relative;
    background: #DEEDCC;
    overflow: hidden;
    height: 500px;
  }
  
  .pic-details-demo {
    margin: 40px auto;
    box-shadow: 0 10px 40px #C7D7B5;
    width: 95%;
    min-width: 960px;
    height: 420px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .pic-details-demo-header {
    height: 32px;
    line-height: 32px;
    background: #000;
  }
  
  .pic-details-demo-header ul li {
    list-style: none;
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 4px;
    margin: 0 5px 0 0;
  }
  
  .pic-details-demo-header ul li:nth-child(1) {
    background: #CF3333;
    margin-left: 3%;
  }
  
  .pic-details-demo-header ul li:nth-child(2) {
    background: #DEC811;
  }
  
  .pic-details-demo-header ul li:nth-child(3) {
    background: #28C026;
  }
  
  .pic-details-demo-header ul li:nth-child(4) {
    background: #fff;
    width: 80%;
    height: 16px;
    vertical-align: middle;
    margin: 0 10px;
  }
  
  .pic-details-demo-header ul li:nth-child(5),
  .pic-details-demo-header ul li:nth-child(5):before,
  .pic-details-demo-header ul li:nth-child(5):after {
    width: 20px;
    height: 2px;
    background: #BABABA;
    border-radius: 2px;
  }
  
  .pic-details-demo-header ul li:nth-child(5) {
    vertical-align: middle;
    margin-left: 5px;
    position: relative;
  }
  
  .pic-details-demo-header ul li:nth-child(5):before,
  .pic-details-demo-header ul li:nth-child(5):after {
    content: '';
    display: block;
    position: absolute;
  }
  
  .pic-details-demo-header ul li:nth-child(5):before {
    top: -6px;
  }
  
  .pic-details-demo-header ul li:nth-child(5):after {
    top: 6px;
  }
  
  /* 外壳 end */
  /* 标题 */
  .pic-details-demo-title {
    width: 95%;
    margin: 20px auto;
    text-align: center;
  }
  
  .pic-details-demo-title h1 {
    color: #666666;
    font-size: 26px;
  }
  
  .pic-details-demo-title p {
    color: #878787;
    font-size: 12px;
  }
  
  /* 图片 */
  .pic-details-demo-image-wrapper {
    position: relative;
    list-style: none;
    width: 500px;
    height: 290px;
    margin: auto;
  }
  
  .pic-details-demo-image-wrapper li {
    width: 110px;
    height: 76px;
    position: absolute;
  }
  
  .pic-details-demo-image-box-shadow {
    box-shadow: 0 0 0 rgba(140, 140, 140, 0);
    height: 100%;
    transition: box-shadow .3s;
  }
  
  .pic-details-demo-image-wrapper li.open .pic-details-demo-image-box-shadow {
    box-shadow: 0 2px 8px rgba(140, 140, 140, 50);
  }
  
  .pic-details-demo-image-wrapper li a {
    width: 110px;
    z-index: 1;
    display: inline-block;
    position: absolute;
  }
  
  .pic-details-demo-image-wrapper li a, .pic-details-demo-image-wrapper li a img {
    display: block;
  }
  
  .pic-details-demo-text-wrapper {
    width: 50%;
    background: #fff;
    padding: 10px 15px;
    height: 175px;
    vertical-align: top;
    display: inline-block;
    position: absolute;
  }
  
  .pic-details-demo-text-wrapper h1 {
    font-size: 18px;
    margin: 5px auto;
  }
  
  .pic-details-demo-text-wrapper i {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  
  .pic-details-demo-text-wrapper em {
    height: 2px;
    width: 60px;
    background: #FA1F4E;
    border-radius: 2px;
    display: block;
  }
  
  .pic-details-demo-text-wrapper p {
    font-size: 12px;
    margin-top: 10px;
    line-height: 16px;
  }
  @media screen and (max-width: 414px) {
    .pic-details-demo{
      transform: scale(.65) translateX(12px);
      transform-origin: left center;
    }
  }
  @media screen and (max-width: 375px) {
    .pic-details-demo{
      transform: scale(.6) translateX(7px);
    }
  }
  @media screen and (max-width: 320px) {
    .pic-details-demo{
      transform: scale(.5) translateX(12px);
    }
  }


`;

const textData = [
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle1',
    },
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle2',
    },
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle3',
    }
    , {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle4',
    },
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle5',
    },
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle6',
    },
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle7',
    }
    , {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle8',
    }, {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle9',
    },
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle10',
    },
    {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle11',
    }
    , {
        content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
            ' the motorcycle referred to in the mainland, Hong Kong and Southeast' +
            ' Asia known as motorcycles.',
        title: 'Motorcycle12',
    }

]

let dataArray = [
    { image: 'https://zos.alipayobjects.com/rmsportal/BXJNKCeUSkhQoSS.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/SDLiKqyfBvnKMrA.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/QJmGZYJBRLkxFSy.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png' },
    { image: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png' },
];

dataArray = dataArray.map((item, i) => ({ ...item, ...textData[i] }));


export default class PicDetailsDemo extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'pic-details-demo',
    };

    constructor(props) {
        super(props);
        this.state = {
            picOpen: {},
        };
    }

    componentDidMount() {

    }

    /**
     * 点击设置当前打开的state.picOpen
     * 
     * @param {any} e 
     * @param {any} i 
     */
    onImgClick = (e, i) => {
        const { picOpen } = this.state;
        Object.keys(picOpen).forEach((key) => {
            if (key !== i && picOpen[key]) {
                picOpen[key] = false;
            }
        });
        picOpen[i] = true;
        this.setState({
            picOpen,
        });
    };

    /**
     * 关闭操作
     * 
     * @param {any} e 
     * @param {any} i 
     */
    onClose = (e, i) => {
        const { picOpen } = this.state;
        picOpen[i] = false;
        this.setState({
            picOpen,
        });
    };

    /**
     * 动画结束后
     * 
     * @param {any} i 
     */
    onTweenEnd = (i) => {
        const { picOpen } = this.state;
        delete picOpen[i];
        this.setState({
            picOpen,
        });
    };

    /**
     * 时间延迟设置
     * 
     * @param {any} e 
     * @returns 
     */
    getDelay = (e) => {
        const i = e.index + dataArray.length % 4;
        return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
    };

    /**
     * 根据数据渲染所有的teacher对象
     * 
     * @returns 
     */
    getLiChildren = () => {
        const imgWidth = 110;
        const imgHeight = 76;
        const imgBoxWidth = 130;
        const imgBoxHeight = 96;
        return dataArray.map((item, i) => {
            const { image, title, content } = item;
            const isEnter = typeof this.state.picOpen[i] === 'boolean';
            const isOpen = this.state.picOpen[i];

            const left = isEnter ? 0 : imgBoxWidth * (i % 4);
            const imgLeft = isEnter ? imgBoxWidth * (i % 4) : 0;
            const isRight = Math.floor((i % 4) / 2);
            const isTop = Math.floor(i / 4);
            console.log(isTop);
            console.log(!!isTop);
            let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
            top = isEnter ? top : imgBoxHeight * isTop;
            let imgTop = isTop ? imgBoxHeight : 0;
            imgTop = isEnter ? imgTop : 0;

            const liStyle = isEnter ? { width: '100%', height: 175, zIndex: 1 } : null;
            const liAnimation = isOpen ?
                ({ boxShadow: '0 2px 8px rgba(140, 140, 140, .35)' }) :
                ({ boxShadow: '0 0px 0px rgba(140, 140, 140, 0)' });

            let aAnimation = isEnter ?
                ({
                    delay: 400,
                    ease: 'easeInOutCubic',
                    width: imgWidth,
                    height: imgHeight,
                    onComplete: this.onTweenEnd.bind(this, i),
                    left: imgBoxWidth * (i % 4),
                    top: isTop ? imgBoxHeight : 0,
                }) : null;

            aAnimation = isOpen ?
                ({
                    ease: 'easeInOutCubic',
                    left: isRight ? (imgBoxWidth * 2) - 10 : 0,
                    width: '50%',
                    height: 175,
                    top: 0,
                }) : aAnimation;

            // 位置 js 控制；
            return (
                <TweenOne
                    key={i}
                    style={{ left, top, ...liStyle, }}
                    component="li"
                    className={isOpen ? 'open' : ''}
                    animation={liAnimation}
                >
                    <TweenOne
                        component="a"
                        onClick={e => this.onImgClick(e, i)}
                        style={{
                            left: imgLeft,
                            top: imgTop,
                        }}
                        animation={aAnimation}
                    >
                        <img src={image} width="100%" height="100%" />
                    </TweenOne>
                    <TweenOneGroup
                        enter={[
                            { opacity: 0, duration: 0, type: 'from', delay: 400, },
                            { ease: 'easeOutCubic', type: 'from', left: isRight ? '50%' : '0%' },
                        ]}
                        leave={{ ease: 'easeInOutCubic', left: isRight ? '50%' : '0%' }}
                        component=""
                    >
                        {isOpen && (
                            <div
                                className={`${this.props.className}-text-wrapper`}
                                key="text"
                                style={{ left: isRight ? '0%' : '50%', top:'0' }}
                            >
                                <h1>{title}</h1>
                                <Icon type="cross" onClick={e => this.onClose(e, i)} />
                                <em />
                                <p>{content}</p>
                            </div>
                        )}
                    </TweenOneGroup>
                </TweenOne>
            );
        });
    };

    render() {
        return (
            <div>
                <div className={`${this.props.className}-wrapper`}>
                    <div className={this.props.className}>
                        <QueueAnim type="bottom" className={`${this.props.className}-title`}>
                            <h1 key="h1">JUST FOR YOU</h1>
                            <p key="p">XUE-CHENG TEACHERS</p>
                        </QueueAnim>
                        <QueueAnim
                            delay={this.getDelay}
                            component="ul"
                            className={`${this.props.className}-image-wrapper`}
                            interval={0}
                            type="bottom"
                        >
                            {this.getLiChildren()}
                        </QueueAnim>
                    </div>
                </div>
            </div>
        );
    }
}