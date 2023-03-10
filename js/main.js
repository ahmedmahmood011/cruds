let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let updateBtn = document.getElementById("updateValue");
let tabel = document.getElementById("tbody");
let prices = document.querySelector(".prices");
let submit = document.getElementById("submit");
let search = document.querySelector("#search");
let searchtitle = document.querySelector("#searchtitle");
let searchcategory = document.querySelector("#searchcategory");
let deleteAll = document.querySelector("#deleteAll button");

// Show Total Price
let totalV = "Total: ";
total.innerHTML = totalV ;
let totalValue = 0;
prices.addEventListener("input", ()=>{
    totalValue = (+price.value + +taxes.value + +ads.value) - +descount.value;
    total.innerText = `${totalV}`+totalValue;
})

// On Click Up Submit
submit.addEventListener("click", ()=>{
        if (count.value > 0) {
            saveData()
        }else {
            alert("Pleas Inter Count The  Proudct")
        }
        getData()
        removAndSellElement()
        updateElement()
        clearValues()
        removeAll()
    }
);

// get Data from LocaleStorag 
function data() {
    let get = localStorage.getItem("Element");
    let convert = JSON.parse(get);
    return convert
}

// Create Element And Save Data In LocaleStorag 
function saveData(){
    let save ;
    if (data() !== null) { 
        save = data()
    } else {
        save = []
    }
        save.push( {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            descount: descount.value,
            total: totalValue,
            count: count.value,
            category: category.value,
        })
    localStorage.setItem("Element", JSON.stringify(save))
}

let UbdateValue = "Update";
let deleteValue = "Delete";
let sellValue = "Sell";
// Get Element And Data From LocaleStorag
function getData(){
    let table ="";
    if ( data() !== null) {
        for (let i = 0; i < data().length; i++) {
            table += `
            <tr>
                <th>${ i+1}</th>
                <th>${data()[i].title}</th>
                <th>${data()[i].price}</th>
                <th>${data()[i].taxes}</th>
                <th>${data()[i].ads}</th>
                <th>${data()[i].descount}</th>
                <th>${data()[i].total}</th>
                <th>${data()[i].category}</th>
                <th>${data()[i].count}</th>
                <th><button id ='update'>${UbdateValue}</button></th>
                <th><button id = "delete" >${deleteValue}</button></th>
                <th><button id = "sell" >${sellValue}</button></th>
            </tr>
            `
        }
    }
    tabel.innerHTML= table;
}getData()

// Remove Element And Save Data In LocaleStorag
function removAndSellElement(){
    let remove = document.querySelectorAll("#delete");
    let sell = document.querySelectorAll("#sell");
    let convert = data();
    if (convert !== null) {
        for (let i = 0; i < convert.length; i++) {
            remove[i].addEventListener("click", ()=>{
                convert.splice(i, 1)
                localStorage.setItem("Element", JSON.stringify(convert))
                getData()
                removAndSellElement()
                updateElement()
                removeAll()
            })
            sell[i].addEventListener("click", ()=>{
                if (convert[i].count > 1) {
                    convert[i].count --
                } else {
                    convert.splice(i, 1)
                }
                localStorage.setItem("Element", JSON.stringify(convert))
                getData()
                removAndSellElement()
                updateElement()
                removeAll()
            })
        }
    }
}
removAndSellElement()

// Update Element And Save Data In LocaleStorag
function updateElement(){
    let updateData = document.querySelectorAll("#update")
    let valueUpdate = data()
    let position = 0;
    for (let i = 0; i < updateData.length; i++) {
        // get Element For Update
        updateData[i].onclick = ()=> {
            position = i
            title.value = valueUpdate[i].title;
            price.value = valueUpdate[i].price;
            taxes.value = valueUpdate[i].taxes;
            ads.value   = valueUpdate[i].ads;
            descount.value = valueUpdate[i].descount;
            if (localStorage.getItem("ar") !== null) {
                total.innerHTML = `المجموع: ${valueUpdate[i].total}`;
            } else {
                total.innerHTML = `Total: ${valueUpdate[i].total}`;
            }
            category.value = valueUpdate[i].category;
            count.value = valueUpdate[i].count;
            submit.style.display = "none";
            updateBtn.style.display = "block";
        }
        // save Element After Update
        updateBtn.addEventListener("click",()=>{
            valueUpdate[position] = {
                title: title.value,
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                descount: descount.value,
                total: total.innerText,
                category: category.value,
                count: count.value,
            }
            localStorage.setItem("Element", JSON.stringify(valueUpdate))
            submit.style.display = "block"
            updateBtn.style.display = "none"
            getData()
            removAndSellElement()
            updateElement()
            setTimeout(() => {
                clearValues()
            }, 0);
        })
    }
}
updateElement()

// Clear Values From Inputs
function clearValues() {
    title.value ="";
    price.value ="";
    taxes.value ="";
    ads.value ="";
    descount.value ="";
    if ( localStorage.getItem("ar") !== null) {
        total.innerHTML ="المجموع:";
    } else {
        total.innerHTML ="Total:";
    }
    count.value ="";
    category.value ="";
}

// Show Data On Input Search 
function showDataInSearch(){
    search.addEventListener("input", ()=>{
        let elements = document.querySelectorAll("#tbody tr");
        for (let i = 0; i < elements.length; i++) {
            elements[i].removeAttribute("style");
        }
    })
}

// Search By Title 
searchtitle.addEventListener("click", ()=>{
    let elements = document.querySelectorAll("#tbody tr th:nth-of-type(2)");
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].innerText.includes(search.value)) {
            elements[i].parentElement.style.display = "none"
        }
    }
    showDataInSearch()
})

// Search By Category 
searchcategory.addEventListener("click", ()=>{
    let elements = document.querySelectorAll("#tbody tr th:nth-of-type(8)");
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].innerText.includes(search.value)) {
            elements[i].parentElement.style.display = "none"
        }
    }
    showDataInSearch()
})

// Remove All Element 
let deleteAllValue = "Delete All";
function removeAll(){
    let numbers = document.getElementById("tbody");
    if ( numbers.children.length > 0) {
        deleteAll.innerHTML = `${deleteAllValue} ${numbers.children.length}`
        deleteAll.parentElement.style.display = "block";
        deleteAll.addEventListener("click", ()=>{
            localStorage.removeItem("Element")
            getData()
            deleteAll.parentElement.style.display = "none";
        } );
    }else {
        deleteAll.parentElement.style.display = "none";
    }
}removeAll()


// Switch Languish 
function languish() {
    let ar = document.getElementById("ar")
    let en = document.getElementById("en")
    
    ar.addEventListener("click", ()=>{
        localStorage.setItem("ar", "yes");
        arabic()
    })
    function arabic(){
        title.placeholder = "العنوان او المنتج";
        price.placeholder = "السعر";
        taxes.placeholder = "الضرائب";
        ads.placeholder = "اعلانات";
        descount.placeholder = "الخصم";
        totalV = "المجموع: "
        total.innerHTML = totalV ;
        count.placeholder = "العدد";
        category.placeholder = "التصنيف";
        updateBtn.innerHTML = "تحديث";
        submit.innerHTML = "انشاء";
        search.placeholder = "بحث";
        searchtitle.innerHTML = "بحث بالعنوان";
        searchcategory.innerHTML = "بحث بالصنف";
        deleteAll.innerHTML = "حذف الكل";
        deleteAllValue = "حذف الكل"
        UbdateValue = "تحديث"
        deleteValue = "حذف"
        sellValue = "بيع"
        let tableChild = document.querySelector(".heading")
        let arr = ["م","العنوان","السعر", "الضرائب", "اعلانات", "الخصم", "الاجمالي", "التصنيف"
        , "العدد", "تحديث", "حذف", "بيع"]
        for (let i = 0; i < arr.length; i++) {
            tableChild.children[i].innerHTML = `${arr[i]}`
        }
        getData()
        removAndSellElement()
        updateElement()
        removeAll()
    }
    if ( localStorage.getItem("ar") !== null) {
        arabic()
    }
    en.addEventListener("click", ()=>{
        localStorage.removeItem("ar");
        engliesh()
    })
    function engliesh(){
        title.placeholder = "Titel";
        price.placeholder = "Price";
        taxes.placeholder = "Taxes";
        ads.placeholder = "Ads";
        descount.placeholder = "Descount";
        totalV = "Total: "
        total.innerHTML = totalV ;
        count.placeholder = "Count";
        category.placeholder = "Category";
        updateBtn.innerHTML = "Update";
        submit.innerHTML = "Create";
        search.placeholder = "Search";
        searchtitle.innerHTML = "Search By Title";
        searchcategory.innerHTML = "Search By Category";
        deleteAll.innerHTML = "Delete All";
        deleteAllValue = "Delete All"
        UbdateValue = "Update"
        deleteValue = "Delete"
        sellValue = "Sell"
        let tableChild = document.querySelector(".heading")
        let arr = ["ID","Title","Price", "Taxes", "Ads", "Descount", "Total", "Category"
        , "Count", "Update", "delete", "Sell"]
        for (let i = 0; i < arr.length; i++) {
            tableChild.children[i].innerHTML = `${arr[i]}`
        }
        getData()
        removAndSellElement()
        updateElement()
        removeAll()
    }
}languish()