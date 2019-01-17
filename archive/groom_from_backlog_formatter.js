var results = [];
$('#tbodyMain_88 .backlog-table .flex-container').toArray().forEach(el=>{
    if($(el).find('.id:nth-child(4)').length===0){return;}
//     debugger;
    results.push(
        'Groom[ ] - '+$(el).find('.id:nth-child(4)').text()+' - '+$(el).find('.title').text() + '\n'
    );
});
copy(results.join(''));
