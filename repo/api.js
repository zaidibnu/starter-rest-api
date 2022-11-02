module.exports = function  APIMANGROVE (data){
    return {
        version :1.0,
        status:'Development',
        request:JSON.stringify(data)
    }
}