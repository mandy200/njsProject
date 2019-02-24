function searchCustomerVerification() {

    var nom = document.getElementById(nom).value;
    var prenom = document.getElementById(prenom).value;
    var mail = document.getElementById(email).value;


    var Ernom  =  /^[a-z ,.'-]+$/i
    var Ermail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/
    var erreurs = [];

    if (nom && Ernom.test(nom)) erreurs.push("Le format du nom n'est pas valide");
    if (prenom && Ernom.test(prenom)) erreurs.push("Le format du nom n'est pas valide");
    if (mail && Ermail.test(mail)) erreurs.push("Le format de l'email n'est pas valide.");

    if (erreurs.length > 0) {
        alert("Le formulaire n'a pas pu être validé car :\n\n" + erreurs.join("\n"));
        return false;
    }
    return true;
}