function properView(value){
    if(value!=null && value ==true) {
        value = 'Agreed';
        return value;
    }else if(value!=null && value ==false) {
        value = 'Disagreed';
        return value;

    }else{
        return "unknow"

}}
