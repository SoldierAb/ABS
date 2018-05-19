import React from 'react'
import QueueAnim from 'rc-queue-anim';
import styled, { injectGlobal, keyframes } from 'styled-components'
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import { Button, message, Modal, Pagination, Icon } from 'antd';
import { connect } from 'react-redux';
import * as Actions from '../Actions';
import * as Status from '../../Status';
import _AllHeight from '../../utils/GetHeightUtil';
import Footer from '../../components/footer/Footer.jsx';
import Header from '../../components/header/Header.jsx';
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


const fadeBtnTop = keyframes`
    0%{
        transform:translateY(-40px);
    }

    80%{
        transform:translateY(24px);
    }

    100%{
        transform:translateY(20px);
    }
`

const fadeBtnBottom = keyframes`
    0%{
        transform:translateY(50px);
    }

    80%{
        transform:translateY(-14px);
    }

    100%{
        transform:translateY(-10px);
    }
`;

const Wrapper = styled.div`
   

    .teaContainerHeader{

        background: linear-gradient(50deg, rgba(212, 211, 211, 0.84), rgb(87, 160, 255));
        height: 200px;
        text-align: center;
        padding-top: 60px;
        h1{
            font-family: "Work Sans", Arial, sans-serif;
            font-weight: 400;
            font-size: 32px;
            margin: 0 0 20px 0;
            margin-bottom: 20px;
            line-height: 1.5;
            color: #000;
          }
          p{
            font-size: 18px;
            line-height: 1.5;
            color: #828282;
          }
    }

    .teaContainerBody{
        position:relative;
        height:760px;
        max-width:1700px;
        min-width:960px;
        padding:20px 40px 30px 40px;
        border-bottom:1px solid #eee;
    }

    .teaBody{
        position:relative;
        margin:auto;
        background:white;
        padding:10px;
    }
    .teaBottom{
        position:absolute;
        bottom:80px;
        right:100px;
    }
    .boxItem{
        height:270px;
        width:262px;
        margin:10px;
        background:white;
        padding:4px;
        over-flow:hidden;
        display:block;
        position:absolute;
        &:hover{
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
            bteacher-radius:4px;
            over-flow:hidden;
            color:rgba(255,255,255,0.8);
            opacity:0;
            &:hover{
                animation:${fade} .2s ease;
                opacity:1;
                .callBtn{
                    width:50%;
                    text-align:center;
                    margin:25% auto;
                    transform:translateY(20px);
                    animation:${fadeBtnTop} .3s ease;
                }
                .detailBtn{
                    width:50%;
                    text-align:center;
                    margin:0 auto;
                    transform:translateY(-10px);
                    animation:${fadeBtnBottom} .3s ease;
                }
            }
        }
    }

`;

const mapState = (state) => {
    return {
        teaArr: state.teacher.data,
        getTeaStatus: state.teacher.status,
        msg: state.teacher.msg,
        msg: state.teacher.msg,
        currentUser: state.login.data,
        total: state.teacher.total,
        pageSize: state.teacher.pageSize,
        currentPage: state.teacher.currentPage
    }
}


const mapDispatch = (dispatch) => {
    return {
        getTeachers: (current, size, city) => dispatch(Actions.getTeachers(current, size, city))
    }
}


class Tea extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let currentCity = localStorage.getItem('currentCity');
        this.props.getTeachers(1, 8, currentCity);
        // this.getMore();
    }

    switchPage = (current) => {
        let currentCity = localStorage.getItem('currentCity');
        this.props.getTeachers(current, 8, currentCity)
    }


    seeDetail = (e) => {                     //查看教师详情数据
        let tea = this.props.teaArr[e.target.value];
        let toSimplecv = {
            pathname: '/simplecv',
            state: tea
        }
        this.props.history.push(toSimplecv);
    }

    // collectTea = (e) => {                         //收藏教师
    //     let tea = this.state.teaArr[e.target.value];
    //     console.log();
    //     // let toSimplecv = {
    //     //     pathname: '/simplecv',
    //     //     state: tea
    //     // }
    //     // this.props.history.push(toSimplecv);
    // }


    getDiv = () => {                         //列表数据渲染
        let { teaArr } = this.props;
        console.log('arr教师：  ', teaArr);
        teaArr.forEach((item, index) => {
            item.address = typeof item.address === 'string' ? JSON.parse(item.address) : item.address;
            item.subject = typeof item.subject === 'string' ? JSON.parse(item.subject) : item.subject;
            item.time = typeof item.time === 'string' ? JSON.parse(item.time) : item.time;
            item.head = `http://localhost:3099/${item.head}`;
        });
        let teachers = teaArr.map((item, index) => ({ ...item }))
        return teachers.map((item, i) => {
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
                        component="div"
                        style={{ height: '100%' }}
                    >
                        <img width="100%" height="100%" src={head} />
                    </TweenOne>
                    <TweenOneGroup
                        className="boxItemContent"
                    >
                        <div className="detailBox">
                            <div className="callBtn">
                                <Button type="primary" size="small" value={i}>收藏</Button>
                            </div>
                            <div className="detailBtn">
                                <Button type="primary" size="small" value={i} onClick={this.seeDetail}>更多了解</Button>
                            </div>
                        </div>
                    </TweenOneGroup>
                </TweenOne>
            );

        })
    }


    render() {
        const { getTeaStatus, teaArr, total, pageSize, currentPage, msg } = this.props;
        switch (getTeaStatus) {
            case Status.LOADING:
                return <Wrapper></Wrapper>;
            case Status.SUCCESS:
                return (
                    <Wrapper>
                        {/* <div className="teaContainerHeader">
                            <h1>JUST FOR YOU</h1>
                            <p>Excellent Teachers</p>
                        </div> */}
                        <Header text="Excellent Teachers" />
                        <div className="teaContainerBody">
                            <div className="teaBody clearfix">
                                <QueueAnim delay={300}>
                                    {this.getDiv()}
                                </QueueAnim>
                            </div>
                            <div className="teaBottom">
                                <Pagination pageSize={parseInt(pageSize)} showQuickJumper defaultCurrent={parseInt(currentPage)} total={parseInt(total)} onChange={this.switchPage} />
                            </div>
                        </div>
                        <Footer />
                    </Wrapper>
                );
            case Status.FAILURE:
                return <Wrapper>加载失败 。。。</Wrapper>;
            default:
                return <Wrapper>加载中 。。。</Wrapper>;
        }
    }
}


export default connect(mapState, mapDispatch)(Tea);