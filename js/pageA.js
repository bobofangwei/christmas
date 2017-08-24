//$(function() {
// var rotate=move('#boyDeer')
//     .set('transform','rotateY(-180deg)')
//     .duration('1s')

// var moveRight= move('#boyDeer')
//     .set('right','2rem')
//     .set('top','10rem')
//     .scale(1.2)
//     .duration('6s');
// // 使用move.js操作小男孩儿的系列动画行为
// move('#boyDeer')
// .set('right', '12rem')
// .set('top', '3rem')
// .duration('8s')
// .scale(0.8)
// .then(rotate)
// .then(moveRight)
// //.set('transform','rotateY(180deg)')
// .end()
var moveBack = move('#test1')
    .set('background-color', 'white')
    .x(0)
    .duration('8s')

move('#test1')
    .x(500)
    .duration('2s')   
    .then()
    .x(0)
    .pop()    
    .end();

//});