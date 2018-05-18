import React from 'react'
import QueueAnim from 'rc-queue-anim';
import styled, { injectGlobal, keyframes } from 'styled-components'
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import { Button, message, Icon } from 'antd';

injectGlobal`
    .clearfix:after{
        height:0;
        content:'';
        visibility:hidden;
        clear:both;
        display:block;
    }

    .clearfix{
        zoom:1;
    }

    .fl{
        float:left
    }

    .fr{
        float:right;
    }
`;

const fade = keyframes`
    0%{
        opacity:0;
        left:-100px;
    }

    100%{
        opacity:1;
        left:0;
    }
`;

const Wrapper = styled.div`
    max-width:1700px;
    min-width:960px;
    padding:40px;
    .teaTitle{
        background: url(http://localhost:3099/crossword.png) repeat scroll 0 0 #5a88ca;
    }
    .boxContainer{
        position:relative;
        margin:auto;
        background:white;
        padding:10px;
    }
    .boxItem{
        height:290px;
        width:262px;
        margin:10px;
        background:white;
        padding:4px;
        over-flow:hidden;
        display:block;
        position:absolute;
        &:hover{
            cursor:pointer;
            opacity:0;
        }
        .boxItemContent{
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.6);
            padding:10px;
            border-radius:4px;
            over-flow:hidden;
            color:rgba(255,255,255,0.8);
            opacity:0;
            &:hover{
                animation:${fade} .2s ease;
                opacity:1;
            }
            .detailBox{
                .callBtn{
                    width:50%;
                    text-align:center;
                    margin:25% auto;
                    transform:translateY(20px);
                }
                .detailBtn{
                    width:50%;
                    text-align:center;
                    margin:0 auto;
                    transform:translateY(-10px);
                }
            }
        }
    }

`;

export default class Tea extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            teaArr: [],
            loaded: false,
            btnSize: 'small',
        }
    }

    componentDidMount() {
        let currentCity = localStorage.getItem('currentCity');
        console.log('tea city:  ', currentCity);
        const api = `/getTeachers`;
        fetch(api).then((res) => {
            if (res.status !== 200) throw new Error('出错' + res);
            res.json().then((resJson) => {
                if (resJson.data.length < 1) {
                    this.setState({
                        loaded: true,
                        teaArr: []
                    })
                    return;
                }
                let teaArr = resJson.data;
                teaArr.forEach((item, index) => {
                    item.address = JSON.parse(item.address);
                    item.subject = JSON.parse(item.subject);
                    item.time = JSON.parse(item.time);
                    item.head = `http://localhost:3099/${item.head}`;
                });
                teaArr = teaArr.map((item, index) => ({ ...item }))

                this.setState({
                    loaded: true,
                    teaArr
                })
            })
        }).catch((err) => {
            throw new Error('Err' + err);
        })
    }


    seeDetail = (e) => {                     //查看教师详情数据
        let tea = this.state.teaArr[e.target.value];
        let toSimplecv = {
            pathname: '/simplecv',
            state: tea
        }
        this.props.history.push(toSimplecv);
    }


    getDiv = () => {                         //列表数据渲染
        const { teaArr, btnSize } = this.state;
        return teaArr.map((item, i) => {
            const { head, address, name, phone, age, price, sex, suject } = item;
            // console.log(item);
            const imgBoxWidth = 262;
            const imgBoxHeight = 290;
            const left = imgBoxWidth * (i % 4) * 1.17;
            const isNewLine = Math.floor(i / 4);
            const top = isNewLine ? imgBoxHeight * (Math.floor(i / 4)) * 1.1 : 0;
            return (
                <TweenOne
                    component="div"
                    key={item + i}
                    className="boxItem"
                    style={{ left, top }}
                >
                    <TweenOne
                        component="span"
                    >
                        <img width="100%" height="100%" src={head} />
                    </TweenOne>
                    <TweenOneGroup
                        className="boxItemContent"
                    >
                        <div className="detailBox">
                            <div className="callBtn">
                                <Button type="primary">SELECT</Button>
                            </div>
                            <div className="detailBtn">
                                <Button type="primary" value={i} onClick={this.seeDetail}>SEE DETAILS</Button>
                            </div>
                        </div>
                    </TweenOneGroup>
                </TweenOne>
            );

        })
    }


    render() {
        const { loaded, teaArr } = this.state;

        if (!loaded) return <div>加载中。。。</div>;
        if (teaArr.length < 1) return <div>暂无数据~</div>;
        return (
            <Wrapper>
                <div className="teaTitle">

                </div>
                <div className="boxContainer clearfix">
                    <div className="teaLeft fl clearfix">
                        <QueueAnim delay={400}>
                            {this.getDiv()}
                        </QueueAnim>
                    </div>
                    <div className="teaRight fr">

                    </div>
                </div>
            </Wrapper>
        );

    }


}

