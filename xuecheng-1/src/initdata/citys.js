import * as cityjson from './cityjson';

let provinceCity = [];

cityjson.province.forEach((pro) => {
  let proObj = {
    value: pro.item_name,
    label: pro.item_name,
    children: []
  }
  cityjson.city.forEach((city) => {
    if (pro.item_code.substr(0, 3) === city.item_code.substr(0, 3)) {
      let cityObj = {
        value: city.item_name,
        label: city.item_name,
        children: []
      }
      cityjson.area.forEach((area) => {
        if (city.item_code.substr(0, 4) === area.item_code.substr(0, 4)) {
          cityObj.children.push({
            value: area.item_name,
            label: area.item_name
          });
        }
      })
      proObj.children.push(cityObj);
    }
  })
  provinceCity.push(proObj);
})

export default provinceCity;

// export default [
//   {
//     value: '福建省',
//     label: '福建省',
//     children: [
//       {
//         value: '福州市',
//         label: '福州市',
//         children: [
//           {
//             value: '晋安区',
//             label: '晋安区',
//           },
//           {
//             value: '仓山区',
//             label: '仓山区',
//           }
//         ],
//       },
//       {
//         value: '泉州市',
//         label: '泉州市',
//         children: [
//           {
//             value: '鲤城区',
//             label: '鲤城区',
//           },
//           {
//             value: '丰泽区',
//             label: '丰泽区',
//           }
//         ],
//       },
//       {
//         value: '厦门市',
//         label: '厦门市',
//         children: [
//           {
//             value: '思明区',
//             label: '思明区',
//           },
//           {
//             value: '同安区',
//             label: '同安区',
//           }
//         ],
//       }

//     ],
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     children: [{
//       value: 'nanjing',
//       label: 'Nanjing',
//       children: [{
//         value: 'zhonghuamen',
//         label: 'Zhong Hua Men',
//       }],
//     }],
//   }];