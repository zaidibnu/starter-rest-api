function get(id){
    const data = require('./../wilayah/'+id+'.json');
    return data;
}
function download(id){
    return './existing/'+id+'.json'
}
module.exports = {get, download}
