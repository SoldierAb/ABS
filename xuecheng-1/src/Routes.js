import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Loading from './components/loading/Loading.jsx';
import Personal from './personal/views/Personal.jsx';
import Login from './login/views/Login.jsx';
import Home from './home/views/Home.jsx';
import Regist from './regist/views/Regist.jsx';
import About from './about/views/About.jsx';
import Teacher from './teacher/views/Tea.jsx';
import Course from './course/views/Course.jsx';
import Order from './order/views/Order.jsx';
import Contact from './contact/views/Contact.jsx';
import Menu from './components/menu/Menu.jsx';
import Simplecv from './components/simplecv/Simplecv.jsx';
// import Edumap from './components/edumap/Edumap.jsx';
// import Subway from './components/edumap/Subway.jsx';
import Busmap from './components/edumap/Busmap.jsx';
import Drivemap from './components/edumap/Drivemap.jsx';
import Detail from './order/views/Detail.jsx';
import './transition.css';
import { message } from 'antd';

injectGlobal`
   *{
       margin:0;
       padding:0;
   }
   p{
       word-wrap:break-word;
   }
   .clearfix:after{
       height:0;
       content:'';
       display:block;
       visibility:hidden;
       clear:both;
   }

   .clearfix{
       zoom:1;
   }
   a{
       text-decoration:none;
       color:rgba(0,0,0,0.8);
   }
   .fl{
       float:left;
   }

   .fr{
       float:right;
   }
   .loginTip{
       margin-right:4px;
   }
   max-width:1700px;
   min-width:960px;
`;


const Wrapper = styled.div`

    max-width:1700px;
    min-width:960px;
   .xHeader{
       max-width:1700px;
       min-width:960px;
       background:white;
       line-height:100%;
       padding:0 60px;
       z-index:900;
       position:fixed;
       width:100%;
       border-bottom:1px solid #dcdcdc;
       .logo{
           height:100%;
           overflow:hidden;
           img{
               height:100%;
           }
       }
       ul,li{
        margin:0;
        padding:0;
        list-style:none;
       }
        ul>li{
            line-height:56px;
            height:60px;
            float:right;
            display:block;
            padding:10px 16px;
        }
   }
   

   .xBody{
       padding-top:76px;
   }

`;

const Top = withRouter(({ location }) => <Menu locat={location} />)


class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let myCity = new window.BMap.LocalCity();   //定位当前城市
        myCity.get(this.myFun);
    }

    myFun = (result) => {      //定位回调函数               
        let cityName = result.name;
        message.info(`当前城市：${cityName}`, 2);
        localStorage.setItem('currentCity', cityName);
    }

    render() {
        return (
            <Router>
                <Wrapper>
                    <Top />
                    <div className="xBody">
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={Home} />
                        <Route path="/course" component={Course} />
                        <Route path="/regist" component={Regist} />
                        <Route path="/about" component={About} />
                        <Route path="/order" component={Order} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/teacher" component={Teacher} />
                        <Route path="/personal" component={Personal} />
                        <Route path="/simplecv" component={Simplecv} />
                        <Route path="/busmap" component={Busmap} />
                        <Route path="/drivemap" component={Drivemap} />
                        <Route path="/detail" component={Detail} />
                        <Route path="/admin" component={Login} />
                    </div>
                    <div>
                        <Loading />
                    </div>
                </Wrapper>
            </Router>
        );
    }
}

export default Routes;


// const RoutesBak = () => (
//     <Router>
//         <Wrapper>
//             <Top />
//             <div className="xBody">
//                 <Route path="/login" component={Login} />
//                 <Route exact path="/" component={Home} />
//                 <Route path="/course" component={Course} />
//                 <Route path="/regist" component={Regist} />
//                 <Route path="/about" component={About} />
//                 <Route path="/order" component={Order} />
//                 <Route path="/contact" component={Contact} />
//                 <Route path="/teacher" component={Teacher} />
//                 <Route path="/personal" component={Personal} />
//                 <Route path="/simplecv" component={Simplecv} />
//                 <Route path="/busmap" component={Busmap} />
//                 <Route path="/drivemap" component={Drivemap} />
//                 <Route path="/detail" component={Detail} />
//                 <Route path="/admin" component={Login} />
//             </div>
//             <div>
//                 <Loading />
//             </div>
//         </Wrapper>
//     </Router>
// )