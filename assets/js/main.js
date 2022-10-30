var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCateg = document.getElementById("productCateg")
var productDescripion =document.getElementById("productDesc")
var product
var productList
var mode=-1

function hideStorage() {
    document.getElementById("t-body").innerHTML = "" 
    document.getElementById("t-foot").innerHTML = "" 

}
function displayLocalStorage() {
    if(localStorage.getItem("ourProducts") == null) {
        productList = []
    }else {
        productList = JSON.parse(localStorage.getItem("ourProducts"))
        display()
    }
}
function addProduct() {
    displayLocalStorage()
    product = {
        name:productName.value,
        price:productPrice.value,
        categ:productCateg.value,
        desc:productDescripion.value,
        count:productCount.value
    }
   if(mode > -1){
        productList[mode]=product
        mode = -1
    }
    else if(product.count>1) {
        for(var i = 0 ; i<product.count ; i++) {
            productList.push(product)
        }
    }
    else{
        productList.push(product)
        
    }
    localStorage.setItem("ourProducts",JSON.stringify(productList))
    
    display()
    clear()
}
 function display() {
    var x = " " ;  
    
    for( var i=0 ; i<productList.length ; i++) {
        x+=
        `
        <tr id="row">
        <td>${i+1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].categ}</td>
        <td>${productList[i].desc}</td>
        <td><button class="btn btn-warning p-2 w-100" onclick="edit(${i})">edit</button></td>
        <td><button class="btn btn-danger p-2" onclick="Delete(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById("t-body").innerHTML = x
    
    displayTotal()
    Sum()
 }
 function displayTotal() {
    var y=""
    y+=
    `<th colspan="2" id="total">total</th>
    <td colspan="5" id="total2"></td>`
                
    
    document.getElementById("t-foot").innerHTML = y
 }
function clear(){
    productName.value=""
    productPrice.value=""
    productCateg.value=""
    productDescripion.value=""
}
function DeleteAll() {
    productList.splice(0);
    localStorage.setItem("ourProducts",JSON.stringify(productList))
    display()
    document.getElementById("t-foot").innerHTML = ""
}
function Delete(i) {
    productList.splice(i,1)
    localStorage.setItem("ourProducts",JSON.stringify(productList))
    display()
    if(i===0) {
        document.getElementById("total").remove()
        document.getElementById("t-foot").innerHTML = ""
        display()
    }
}
function edit(i) {
    productName.value=productList[i].name
    productPrice.value=productList[i].price
    productCateg.value=productList[i].categ
    productDescripion.value=productList[i].desc
    mode= i
}
function Sum() {
    var sum = 0;
    for (var i=0; i<productList.length ; i++) {
        sum += Number(productList[i].price)
    }
    document.getElementById("total2").innerHTML = sum
}
function searchProducts(term) {
    var container = ""
    for (var i=0 ; i<productList.length ; i++) {
        if(productList[i].name.toLowerCase().includes(term.toLowerCase().trim())) {
            container +=
            `
            <tr id="row">
            <td>${i+1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].categ}</td>
            <td>${productList[i].desc}</td>
            <td><button class="btn btn-warning p-2 w-100" onclick="edit(${i})">edit</button></td>
            <td><button class="btn btn-danger p-2" onclick="Delete(${i})">delete</button></td>
            </tr>
            `
        }
    }
    document.getElementById("t-body").innerHTML = container
}