function get(id){
    const data = require('./wilayah/'+id+'.json');
    return data;
}
module.exports = {get}