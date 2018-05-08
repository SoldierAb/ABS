import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';

const Wrapper = styled.div`

    .loading-gui-box{
	    position: fixed;
	    left: 0;
	    right: 0;
	    top: 0;
	    width:100%;
	    height: 100%;
	    z-index:900;
	    .backgroundTM{                  
		    background-color:rgba(255,255,255,0.1);
	    }
	    .backgroundTM>div{color:rgba(255, 255, 255, 0.7);}
	
	    @meta \0screen\,screen\9 {
		    .backgroundTM{
			    background-color:#000000;
			    filter:Alpha(opcity=70);
			    position:static;
			    *zoom:1;
		    }
		    .backgroundTM div{position:relative;}
	    }
	  
	
	
    .containerBox{
   	    position: relative;
	    width: 100%;
	    height:100%;
	    box-sizing: border-box;
        .loading-container{
	        box-sizing: border-box;
		    position: absolute;
		    width:100%;
		    top:50%;
        }
   
        .loading-box{
	         padding:20px;
             text-align: center;	 
        } 

       .k-line {
	        display:inline-block;
	        width:12px;
	        height:12px;
            border-radius:12px;
            margin:2px;
	        background-color:#4b9cdb;
       }

       .k-line11-1 {
	        animation:k-loadingP 1s infinite
       }
       .k-line11-2 {
	        animation:k-loadingP 1s infinite;
	        animation-delay:.15s
       }
       .k-line11-3 {
	        animation:k-loadingP 1s infinite;
	        animation-delay:.30s
	   }
	   .k-line11-4 {
		    animation:k-loadingP 1s infinite;
		    animation-delay:.45s
	    }
	    .k-line11-5 {
		    animation:k-loadingP 1s infinite;
		    animation-delay:.60s
	    } 


       @keyframes k-loadingP {
	      0% {
	            transform:translateY(0)
          }
          35% {
	            transform:translateY(0);
	            opacity:.3
          }
          50% {
	            transform:translateY(-10px);
	            opacity:.8
          }
          70% {
	            transform:translateY(3px);
	            opacity:.8
          }
          85% {
	           transform:translateY(-3px)
          }
       }

    }

}
`;

const mapState = (state) => {
    return {
        loadingshow:state.loading.loadingshow
    }
}

const Loading = ({ loadingshow }) => {
    console.log('loadingshow:   ');
    console.log(loadingshow);
    if (!loadingshow) return <div></div>
    return (
        <Wrapper>
            <div id="loading-gui-box" className="loading-gui-box">
                <div className="containerBox backgroundTM">
                    <div className="loading-container">
                        <div className="loading-box">
                            <div className="k-line k-line11-1" ></div>
                            <div className="k-line k-line11-2" ></div>
                            <div className="k-line k-line11-3" ></div>
                            <div className="k-line k-line11-4" ></div>
                            <div className="k-line k-line11-5" ></div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}


export default connect(mapState)(Loading);