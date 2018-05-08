const toArr = (obj) => {
    let arr = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(obj[key]);
        } 
    }
    console.log(arr);
    return arr
}

module.exports = toArr;