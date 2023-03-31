const normalizePort = (val) => {
    var port = parseInt(val ,10);
    if (port>= 0){
        return port ;
    }
    return false ;
}
exports.normalizePort = normalizePort
