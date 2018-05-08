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
    

`;

const fade = keyframes`
    0%{
        opacity:0;
        top:-100px;
    }

    100%{
        opacity:1;
        top:0;
    }
`;

const Wrapper = styled.div`
    max-width:1700px;
    min-width:960px;
    padding:40px;
    background-color:#DEEDCC;
    .boxContainer{
        height:2000px;
        position:relative;
        margin:auto;
        background:white;
        border-radius:4px;
        padding:10px;
        box-shadow:0 0 2px #ccc;
    }
    .boxItem{
        height:290px;
        width:262px;
        margin:10px;
        border-radius:4px;
        background:white;
        padding:4px;
        over-flow:hidden;
        display:block;
        position:absolute;
        &:hover{
            cursor:pointer;
            opacity:0;
            box-shadow:0 0 4px gray;
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
                animation:${fade} 400ms linear normal;
                opacity:1;
            }
            .detailBox{
                .phoneCall{
                    width:15%;
                    text-align:center;
                    margin:45% auto;
                    transform:scale(2);
                    border:6px groove rgba(255,255,255,0.3);
                    border-radius:50%;
                    &:hover{
                        transition:.5s ease-out;
                        tranform:scale(2.5);
                    }
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
            btnSize: 'small'
        }
    }

    componentDidMount() {
        const api = `/getTeachers`;
        fetch(api).then((res) => {
            if (res.status !== 200) throw new Error('出错' + res);
            res.json().then((resJson) => {
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


    clickContact = () => {
        message.success('SUCCESS');
    }


    getDiv = () => {
        const { teaArr, btnSize } = this.state;
        return teaArr.map((item, i) => {
            const { head, address, name, phone, age, price, sex, suject } = item;
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
                            <p>{address.address}</p>
                            <div className="phoneCall">
                                <Icon type="phone" onClick={this.clickContact} />
                            </div>
                        </div>
                    </TweenOneGroup>
                </TweenOne>
            );

        })
    }


    render() {
        const { loaded } = this.state;

        if (!loaded) return <div></div>

        return (
            <Wrapper>
                <div className="boxContainer">
                    <QueueAnim delay={400}>
                        {this.getDiv()}
                    </QueueAnim>
                </div>
            </Wrapper>
        );

    }


}

