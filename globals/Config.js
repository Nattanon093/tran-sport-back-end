const internal = {};

export default internal.Global =  class {
    constructor() { 
        this.SERVER_URL = 'https://api.bsdeliverymarkets.com' 
        this.CLIENT_URL = 'https://bsdeliverymarkets.com'
    } 
 
     getServerUrl(){
        return this.SERVER_URL
    }

    getClientUrl(){
        return this.CLIENT_URL
    }

    getInt2Text(val){
        return ('0000000000000000'+val).slice(-16);
    }
}