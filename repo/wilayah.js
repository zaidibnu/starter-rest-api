function get(id){
    const data = require('./../wilayah/'+id+'.json');
    return data;
}
function download(id){
    return './existing/'+id+'.json'
}
function tryMe(e){
    return e;
}
module.exports = {get, download,tryMe}
