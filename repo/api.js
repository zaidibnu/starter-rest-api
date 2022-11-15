function  APIMANGROVE (){
    return {
        version :1.0,
        status:'Development',
        request:null,
        timestamp:new Date(),
    }
}
 function  HITUNGLUAS (data){
    return {
        version :1.0,
        status:'Development',
        request:data,
        timestamp:new Date(),
    }
}

module.exports = {APIMANGROVE,HITUNGLUAS}