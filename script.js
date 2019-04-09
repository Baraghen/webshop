var skivor = [];

$.getJSON("items.json", function(data) {
    
    skivor = data.items;
    var divRow = "<div class=\"row\">";
    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";
    var row = "";
    var count = 0;
    var rowCount = 0;
    let store = $("#store");
    
    skivor.forEach(function(obj, index) {
        var divCol  = "<div class=\"col-sm-4 col-md-4\" id=\""+index+"\">";
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
            rowCount++
            if(rowCount === skivor.length){
                row += divClose;
                store.append(row);
            }
            else if(count === 3){
                row += divClose;
                store.append(row);
                count = 0;
            }
        })

});

function addBtn(id){
    if(localStorage.getItem(id) === null){
        localStorage.setItem(id, 1)
    }
    else{
        var antal = localStorage.getItem(id);
        antal++
        localStorage.setItem(id, antal);
    }
}



var items = [];
function getItems(){
    items = [];
    for(var i = 0; i < localStorage.length; i++){
        var itemObj = {};
        itemObj["key"] = localStorage.key(i);
        itemObj["value"] = localStorage.getItem(localStorage.key(i));
        items.push(itemObj)
    }
}

function clearCart(){
    localStorage.clear();
    items = [];
    cartList.empty();
    cart.empty();
}

let cartList = $("#cartList");
let cart = $("#modalItemsCart");
var total = 0;

function loadCart(){
    cart.empty();
    total = 0;
    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";
    var divRow = "<div class=\"row\">";
    
    items.forEach(function(id) {
        var divCol  = "<div id=\"itemdiv"+id.key+"\" class=\"col-sm-12 col-md-12\">";
        var title = "<li>"+skivor[id.key].title+"</li>";
        var antal = "<li><input name=\""+id.key+"\" onchange=\"updateItems(this.value, this.name)\" class=\"form-control\" type=\"number\" value=\""+id.value+"\"> st à "+skivor[id.key].price+" kr";
        var btn = "<button type=\"button\" class=\"btn btn-outline-dark mx-auto d-block\" onclick=\"removeItem("+id.key+")\">X</button>";
        total += skivor[id.key].price*id.value;
        var div = divRow+divCol+divUl+title+antal+divUlClose+btn+divClose+divClose;

        cartList.append(div);
        cart.append(div);
    })
    cartList.append(divRow+"<div class=\"col-sm-12 col-md-12 text-center\"<h5 id=\"totalTxt\">Total: "+total+" SEK</h5>"+divClose+divClose);
    cart.append(divRow+"<div class=\"col-sm-12 col-md-12 text-center\"<h5 id=\"totalTxt\">Total: "+total+" SEK</h5>"+divClose+divClose);
}

function updateItems(value, name){
    localStorage.setItem(name, value)
    total = 0;
    for(var i = 0; i < localStorage.length; i++){
        total += skivor[localStorage.key(i)].price*localStorage.getItem(localStorage.key(i));
    }
    document.getElementById("totalTxt").innerHTML = "Total: "+total+" SEK";
}

function removeItem(id){
    $("#itemdiv"+id).remove();
    total = total-(skivor[id].price*localStorage.getItem(id));
    localStorage.removeItem(id);
    document.getElementById("totalTxt").innerHTML = "Total: "+total+" SEK";
}

var form = document.querySelector(".needs-validation");

form.addEventListener("submit", function(event){
    if(form.checkValidity() === false){
        event.preventDefault();
        event.stopPropagation();
    }
    else if(form.checkValidity() === true){
        $("#checkModal").modal("show");
        event.preventDefault();
        event.stopPropagation();
    }
    form.classList.add("was-validated");
})

let modalItems = $("#modalItems");

function purchaseConfirm(){
    modalItems.empty();
    items = [];
    getItems();

    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";
    var divRow = "<div class=\"row\">";
    var row = "";
    var count = 0;
    var rowCount = 0;
    
    items.forEach(function(id) {
        if(count === 0){
            row = divRow;   
        }
        var divCol  = "<div id=\"itemdiv"+id.key+"\" class=\"col-sm-4 col-md-4\">";
        var art = "<img src=\""+skivor[id.key].art+"\" class=\"mx-auto d-block\"/>";
        var title = "<li>"+skivor[id.key].title+"</li>";
        var artist = "<li>"+"Artist: "+skivor[id.key].artist+"</li>";
        var price = "<li>"+id.value+" st à "+skivor[id.key].price+" SEK</li>";
        var div = divCol+divUl+art+title+artist+price+divUlClose+divClose;

        row += div;
        count++
        rowCount++
        if(rowCount === items.length){
            row += divClose;
            modalItems.append(row);
        }
        else if(count === 3){
            row += divClose;
            modalItems.append(row);
            count = 0;
        }

    })
    modalItems.append("<h5 id=\"totalTxt\" class=\"text-center\">Tack för ditt köp!</h5>");    
}