function split_street(address){
    let obj={};
        let len = address.length;
        let iON = getIndexOfNumber(address);
        obj.streetName = address.substring(0,iON);
        obj.streetNumber = address.substring(iON,len);
        return obj;
}
function getIndexOfNumber(str){
    for ( var i in str ) {
        if ( parseInt(str[i])>=0 ) {
            return i;
        }
    }
 }