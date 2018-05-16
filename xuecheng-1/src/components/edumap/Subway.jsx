import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Wrapper = styled.div`
  position:relative;
   width:auto;
   height:768px;
   .mapContainer{
    height:100%;
    width:100%;
    .mapBox{
      height:100%;
      width:100%;
    }
   }
   .btnBox{
      padding:10px;
      width:400px;
      height:80px;
      background:rgba(255,255,255,0.8);
      text-align:center;
      position:absolute;
      right:20px;
      top:20px;
      border-radius:10px;
      height:auto;
      width:300px;
      span{
        margin-right:10px;
      }
   }
   .resBox{
     position:absolute;
     left:0;
     top:0;
     height:auto;
     width:300px;
   }
`;

export default class Subway extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '福建省福州市仓山区上下店路15号',
      start_address: '福建工程学院鳝溪校区',
      map: {},
      BMapSub: window.BMapSub,
      resBox: {}
    }
  }

  componentDidMount() {
    let subwayCityName = '北京',
      list = window.BMapSub.SubwayCitiesList;
    let subwaycity = null;
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === subwayCityName) {
        subwaycity = list[i];
        break;
      }
    }
    // 获取北京地铁数据-初始化地铁图
    let subway = new window.BMapSub.Subway('mapbox', subwaycity.citycode);
    subway.setZoom(0.5);

  }

  getDrive = () => {
    let { start_address, address, BMap, resBox } = this.state,
      map = new BMap.Map("mapbox");             // 创建地图实例
    map.centerAndZoom("福州", 12);               //初始化默认福州
    map.enableScrollWheelZoom();                //启用滚轮放大缩小
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
    map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMap.BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开  
    let driving = new BMap.DrivingRoute(map, {
      renderOptions: {
        map: map,
        panel: "results",
        autoViewport: true
      }
    });
    driving.search(start_address, address);
  }

  getBus = () => {
    let { start_address, address, BMap, resBox } = this.state,
      map = new BMap.Map("mapbox");             // 创建地图实例
    map.centerAndZoom("福州", 12);               //初始化默认福州
    map.enableScrollWheelZoom();                //启用滚轮放大缩小
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
    map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMap.BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开  
    let transit = new BMap.TransitRoute(map, {
      renderOptions: { map: map, panel: "results" }
    });
    transit.search(start_address, address);
  }

  render() {
    return (
      <Wrapper>
        <div className="mapContainer">
          <div id="mapbox" className="mapBox"></div>
        </div>
        <div className="btnBox">
          <span>

          </span>
          <span>
            <Button type="primary" onClick={this.getDrive} value={this.state.start_address}>驾车路线</Button>
          </span>
          <span>
            <Button type="primary" onClick={this.getBus} value={this.state.start_address}>公交路线</Button>
          </span>
        </div>
        <div id="results" className="resBox"></div>
      </Wrapper>
    );
  }
}