console.log("感谢您的浏览，期待能够加入贵公司！我的博客：https://xian6ge.cn/");

function loading() {
    console.log(document.getElementsByClassName('avatar')[0]);
    console.log(document.getElementsByClassName('loading')[0]);
    document.getElementsByClassName('avatar')[0].style.display = 'block';  
    document.getElementsByClassName('loading')[0].style.display = 'none';          
}