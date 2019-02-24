function calculateAge(value){
    if(value!=null) {
        var valeur = value.toString();
        var date = new Date(valeur);
        var ageDifMs = Date.now() - date.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return (Math.abs(ageDate.getUTCFullYear() - 1970)-20);
    }else{return "unknow"}

}