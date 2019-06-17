export default class Utils{
    static BASEURL="https://test-rest-api-mdinocera.herokuapp.com/api/";

    static timeConverter(UNIX_timestamp){
        var a =new Date(UNIX_timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = Utils.pad2(a.getHours());
        var min = Utils.pad2(a.getMinutes());
        var sec = Utils.pad2(a.getSeconds());
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    static pad2=(number) => (number < 10 ? '0' : '') + number;

    static EMPTY_ADMIN={
        isLoggedIn:false,
        name:"",
        type:"",
        id:0,
        ownerName:""
    }
}