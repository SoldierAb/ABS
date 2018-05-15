import React from 'react';
import styled from 'styled-components';
// import BMap from 'BMap';

const Wrapper = styled.div`
   width:500px;
   height:500px;
   margin:10px auto;
   .mapBox{
      height:100%;
      width:100%;
   }
`;

export default class Edumap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '福建省福州市仓山区上下店路15号'
    }
  }

  componentDidMount() {
    let { address } = this.state,
      BMap = window.BMap,
      str = `<div>${address}</div>`,
      map = new BMap.Map("mapbox");             // 创建地图实例  
    map.centerAndZoom("泉州", 12);               //初始化默认福州
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
        <div id="mapbox" class="mapBox"></div>
      </Wrapper>
    );
  }
}