const internal = {};

export default internal.Global =  class {
    constructor() { 
        this.SERVER_URL = 'https://api.bsdeliverymarkets.com' 
        this.CLIENT_URL = 'https://bsdeliverymarkets.com'
        // this.SERVER_URL = 'http://localhost:5432' 
        // this.CLIENT_URL = 'http://localhost:5173'
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