// www.channelfireball.com list
// https://www.channelfireball.com/articles/an-early-pick-order-list-for-guilds-of-ravnica/
var list = []
$('.crystal-catalog-helper-grid-item').each((x,y)=>{list.push(x+':'+$(y).data('name'));});
//search card name in console
list.forEach(x=>console.log(x));