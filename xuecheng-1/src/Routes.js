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
// import Course from './course/views/Course.jsx';
import Menu from './menu/Menu.jsx';
import Regist from './regist/views/Regist.jsx';
import About from './about/views/About.jsx';
import Teacher from './teacher/views/Tea.jsx';
import Course from './teacher/views/Teacher.jsx';
import Order from './order/views/Order.jsx';
import Contact from './contact/views/Contact.jsx';
import './transition.css';

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
       padding:76px 0;
   }

`;

const Top = withRouter(({ location }) => <Menu locat={location} />)

const Routes = () => (
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
            </div>
            <div>
                <Loading />
            </div>
        </Wrapper>
    </Router>
)


export default Routes;
