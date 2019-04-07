var skivor = [];

$.getJSON("items.json", function(data) {
    
    skivor = data.items;
    var divRow = "<div class=\"row\">";
    var divCol  = "<div class=\"col-sm-4 col-md-4\">";
    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";
    var row = "";
    var count = 0;
    let store = $("#store");
    
    skivor.forEach(function(obj, index) {
        if(count === 0){
            row = divRow;   
        }
            var art = "<img src=\""+obj.art+"\" class=\"mx-auto d-block\"/>";
            var title = "<li>"+obj.title+"</li>";
            var artist = "<li>"+"Artist: "+obj.artist+"</li>";
            var year = "<li>"+"Year: "+obj.year+"</li>";
            var price = "<li>"+"Price: "+obj.price+"</li>";
            var btn = "<button type=\"button\" class=\"btn btn-outline-dark mx-auto d-block\" onclick=\"addBtn("+index+")\">Buy</button>";
            
            var div = divCol+divUl+art+title+artist+year+price+divUlClose+btn+divClose;
            row += div;
            count++
            if(count === 3){
                row += divClose;
                store.append(row);
                count = 0;
            }
        })

});

var items = [];

function addBtn(id){
    items.push(id);
    localStorage.setItem("addedItems", JSON.stringify(items));
}

var storedItems = JSON.parse(localStorage.getItem("addedItems"));

function checkOut(){
    storedItems = JSON.parse(localStorage.getItem("addedItems"));
}

function clearCart(){
    localStorage.clear();
    items = [];
    storedItems = [];
    cart.empty();
}

let cart = $("#cartList");
var total = 0;

function loadCart(){
    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";
    var divRow = "<div class=\"row\">";
    
    storedItems.forEach(function(id) {
        var divCol  = "<div id=\"itemdiv"+id+"\" class=\"col-sm-12 col-md-12\">";
        var title = "<li>"+skivor[id].title+"</li>";
        var price = "<li>"+"<strong>Price</strong>: "+skivor[id].price+"</li>";
        var btn = "<button type=\"button\" class=\"btn btn-outline-dark mx-auto d-block\" onclick=\"removeItem("+id+")\">X</button>";
        total += skivor[id].price;
        var div = divRow+divCol+divUl+title+price+divUlClose+btn+divClose+divClose;

        cart.append(div);
    })
    cart.append(divRow+"<div class=\"col-sm-12 col-md-12 text-center\"<h5 id=\"totalTxt\">Total: "+total+" SEK</h5>"+divClose+divClose);
}

function removeItem(id){
    $("#itemdiv"+id).remove();
    storedItems.splice(storedItems.indexOf(id), 1);
    localStorage.setItem("addedItems", JSON.stringify(storedItems));
    total = total-skivor[id].price;
    document.getElementById("totalTxt").innerHTML = "Total: "+total;
}

var form = document.querySelector(".needs-validation");

form.addEventListener("submit", function(event){
    if(form.checkValidity() === false){
        event.preventDefault();
        event.stopPropagation();
    }
    form.classList.add("was-validated");
})

let modalItems = $("#modalItems");

function loadModal(){
    modalItems.empty();
    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";
    var divRow = "<div class=\"row\">";
    var row = "";
    var count = 0;
    
    storedItems.forEach(function(id) {
        if(count === 0){
            row = divRow;   
        }
        var divCol  = "<div id=\"itemdiv"+id+"\" class=\"col-sm-4 col-md-4\">";
        var art = "<img src=\""+skivor[id].art+"\" class=\"mx-auto d-block\"/>";
        var title = "<li>"+skivor[id].title+"</li>";
        var price = "<li>"+"<strong>Price</strong>: "+skivor[id].price+"</li>";
        var btn = "<button type=\"button\" class=\"btn btn-outline-dark mx-auto d-block\" onclick=\"removeItem("+id+")\">Remove</button>";
        var div = divCol+divUl+art+title+price+btn+divUlClose+divClose;

        row += div;
        count++
        if(count === 3){
            row += divClose;
            modalItems.append(row);
            count = 0;
        }

    })
    modalItems.append("<h5 id=\"totalTxt\" class=\"text-center\">Total: "+total+" SEK</h5>");
}