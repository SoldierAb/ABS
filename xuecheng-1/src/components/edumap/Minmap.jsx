import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Wrapper = styled.div`
  position:relative;
   width:auto;
   height:400px;
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

export default class Minmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      start_address: '福建工程学院鳝溪校区',
      map: {},
      BMap: window.BMap,
      resBox: {}
    }
  }

  componentDidMount() {
    let resBox = document.getElementById('results');
    this.setState({ resBox })
    let { address } = this.state,
      BMap = window.BMap,
      str = `<div>${address}</div>`,
      map = new BMap.Map("mapbox");             // 创建地图实例
    this.setState({ map });
    map.centerAndZoom("福州", 12);               //初始化默认福州
    map.enableScrollWheelZoom();                //启用滚轮放大缩小
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
    map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMap.BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开  

    //构建查询
    let localSearch = new BMap.LocalSearch(map);
    localSearch.enableAutoViewport();       //允许自动调节窗口
    map.clearOverlays();                   //清空原来的标注
    localSearch.setSearchCompleteCallback((res) => {
      let position = res.getPoi(0);        //获取结果
      let longitude = position.point.lng,      //纬度
        latitude = position.point.lat;       //纬度
      map.centerAndZoom(position.point, 15);    //地图设置中心点
      //创建标注
      let marker = new BMap.Marker(new BMap.Point(longitude, latitude));
      map.addOverlay(marker);  //向地图中添加标注
      let info = new BMap.InfoWindow(str);
      marker.openInfoWindow(info);         //标注提示信息默认展示
    })
    localSearch.search(address);

  }




  render() {
    return (
      <Wrapper>
        <div className="mapContainer">
          <div id="mapbox" className="mapBox"></div>
        </div>
        <div className="btnBox">
          {/* <span>
            <Button type="primary" onClick={this.getDrive} value={this.state.start_address}>驾车路线</Button>
          </span>
          <span>
            <Button type="primary" onClick={this.getBus} value={this.state.start_address}>公交路线</Button>
          </span> */}
        </div>
      </Wrapper>
    );
  }
}