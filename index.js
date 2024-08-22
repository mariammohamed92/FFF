var ProductName=document.getElementById("ProductName");
var ProductPrice=document.getElementById("ProductPrice");
var ProductCate=document.getElementById("ProductCate");
var ProductDesc=document.getElementById("ProductDesc");
var mainBtn=document.getElementById("mainBtn");
var Update
var inCase = 'create';
var ProductList=[]

if (localStorage.getItem("Product")!=null) {
    ProductList=JSON.parse(localStorage.getItem("Product"));
    displayProduct();
}else{
    ProductList=[]
}

// Function addProduct
function addProduct(){
   if ( validateProductName() == true ) {
    var Product={
        name:ProductName.value,
        price:ProductPrice.value,
        cate:ProductCate.value,
        desc:ProductDesc.value,
    };
    clearProduct();

if (inCase === 'create'){
ProductList.push(Product);
displayProduct();
localStorage.setItem("Product",JSON.stringify(ProductList))

}
else{
ProductList[Update]=Product
displayProduct();
inCase = 'create'
mainBtn.innerText='Add Product'
localStorage.setItem("Product",JSON.stringify(ProductList))

}
   }else{
    alert("Invaild ")
   }
            
}

// Function displayProduct
function displayProduct() {
    cartoona=``;
    for (var i = 0; i < ProductList.length; i++) {
        cartoona+=` <tr>
                <td>${i+1}</td>
                <td>${ProductList[i].name}</td>
                <td>${ProductList[i].price}</td>
                <td>${ProductList[i].cate}</td>
                <td>${ProductList[i].desc}</td>
                <td><button onclick="UpdateProduct(${i})" class=" btn btn-outline-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>

            </tr>`
    }
    document.getElementById("Tbody").innerHTML=cartoona;
}

// Function clearProduct
function clearProduct() {
    ProductName.value="";
    ProductPrice.value="";
    ProductCate.value="";
    ProductDesc.value="";
}

// Function deleteProduct
function deleteProduct(index) {
    ProductList.splice(index,1);
    displayProduct();
    localStorage.setItem("Product",JSON.stringify(ProductList))

}

// Function UpdateProduct
function UpdateProduct(index) {
    ProductName.value=ProductList[index].name;
    ProductPrice.value= ProductList[index].price;
    ProductCate.value=ProductList[index].cate;
    ProductDesc.value=ProductList[index].desc ;
    mainBtn.innerText="UpdateProduct";
    Update=index;
    inCase = 'update'


}
// Function Search
function search(trem){
    cartoona=``;
    for (var i = 0; i < ProductList.length; i++) {
        if (ProductList[i].name.toLowerCase().includes(trem.toLowerCase())==true) {
            ProductList[i].newName=ProductList[i].name.replace(trem,`<span class=" text-danger fw-bolder">${trem}</span>`)
            cartoona+=` <tr>
            <td>${i+1}</td>
            <td>${ProductList[i].newName?ProductList[i].newName:ProductList[i].name}</td>
            <td>${ProductList[i].price}</td>
            <td>${ProductList[i].cate}</td>
            <td>${ProductList[i].desc}</td>
            <td><button  class=" btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>

        </tr>`
        }
        
    }
    document.getElementById("Tbody").innerHTML=cartoona;

}

// Function validateProductName
function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;

    if (regex.test(ProductName.value) == true) {
                document.getElementById("name-validation").classList.replace("d-block", "d-none");

    return true
    } else {
        document.getElementById("name-validation").classList.replace("d-none","d-block")
     return false
    }
}

