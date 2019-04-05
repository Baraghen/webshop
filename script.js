var skivor = [];

$.getJSON("items.json", function(data) {
    
    skivor = data.items;
    
    var divCol  = "<div class=\"col-sm-4 col-md-4\">";
    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";

    skivor.forEach(function(obj, index) {
        var art = "<img src=\""+obj.art+"\" class=\"mx-auto d-block\"/>";
        var title = "<li>"+obj.title+"</li>";
        var artist = "<li>"+"Artist: "+obj.artist+"</li>";
        var year = "<li>"+"Year: "+obj.year+"</li>";
        var price = "<li>"+"Price: "+obj.price+"</li>";
        var btn = "<button type=\"button\" class=\"btn btn-outline-dark mx-auto d-block\" onclick=\"addBtn("+index+")\">Buy</button>";

        var div = divCol+divUl+art+title+artist+year+price+divUlClose+btn+divClose;

        let store = $("#store");
        store.append(div);
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

function loadCart(){
    var divCol  = "<div id=\"test\" class=\"col-sm-12 col-md-12 cartItem\">";
    var divClose= "</div>";
    var divUl = "<ul>";
    var divUlClose = "</ul>";
    var total = 0;

    storedItems.forEach(function(id) {
        var art = "<img src=\""+skivor[id].art+"\" class=\"mx-auto d-block\"/>";
        var title = "<li>"+skivor[id].title+"</li>";
        var price = "<li>"+"<strong>Price</strong>: "+skivor[id].price+"</li>";
        var btn = "<button type=\"button\" class=\"btn bg-danger d-block\" onclick=\"removeItem()\">Remove item</button>";
        total += skivor[id].price;
        var div = divCol+divUl+art+title+price+btn+divUlClose+divClose;

        cart.append(div);
    })
    cart.append("<h5 class=\"text-center\">Total: "+total+" SEK</h5>");
}

function removeItem(){
    
}