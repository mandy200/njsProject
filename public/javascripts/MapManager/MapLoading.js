/*
//chargement de la map
    $.get('/shops/map/1',function(data,status) {
        data = JSON.parse(data);
        managerOfPolygon.addPolygon(data.points);

    });
$.get('/shops/map/2',function(data,status) {
    data = JSON.parse(data);
    managerOfPolygon.addPolygon(data.points);

});
$.get('/shops/map/3',function(data,status) {
    data = JSON.parse(data);
    managerOfPolygon.addPolygon(data.points);

});*/

$.get('/shops/map2/number',function(data,status) {
    console.log("number of shops :"+data);
    for(var i=1 ; i<=data;i++){
        $.get('/shops/map/'+i,function(data,status) {
            data = JSON.parse(data);
            $.get('/shops/map/namePlaceId/'+data.id, function(data2,status) {
                data2 = JSON.parse(data2);
                if(data2[0] !== undefined) {
                    managerOfPolygon.addPolygon(data.points, data2);
                    createButton(data2);
                }
            })
        });
    }
});
//function for adding button to page with the name of the shop in parameter
function createButton(name) {
    //Create an input type dynamically.
    var element = document.createElement("div");
    //Assign different attributes to the element.
    element.classList.add("card");
    element.classList.add("col-lg-4");
    element.onclick = function() { // Note this is a function
        //alert(name[0].Name);
        managerOfPolygon.selectPolygon(name[0].Name);
    };
    var image = document.createElement("img");
    image.src="/images/shops/"+name[0].Logo;
    image.classList.add("card-img-top");
    image.classList.add("shop");
    element.appendChild(image);
    var titlediv = document.createElement("div");
    titlediv.classList.add("card-body");
    var title = document.createElement("h5");
    title.innerHTML = name[0].Name;
    titlediv.appendChild(title);
    element.appendChild(titlediv);
    var foo = document.getElementById("shops");

    //Append the element in page (in span).
    foo.appendChild(element);
}