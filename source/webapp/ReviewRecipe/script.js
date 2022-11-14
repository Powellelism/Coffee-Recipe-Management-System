window.addEventListener('DOMContentLoaded', init);

function init(){
    let custome = JSON.parse(localStorage.getItem("custom"));
    
    const recipeName = document.getElementById('coffeeName');
    const coffeeType = document.getElementById('coffeeName1');
    const drinkName = document.getElementById('drinkTypeInput');
    const drinkSize = document.getElementById('sizeTypeInput');
    const addOn = document.querySelectorAll('#Topping');
    let shopEl;

    let drinkType = {1: "Cappuccinos", 2: "Latte", 3: "Espresso"};
    let size = {"1": "S", "2": "M", "3": "L"};

    recipeName.value = custome["recipeName"];
    coffeeType.value = custome["coffeeType"];
    drinkName.value = drinkType[custome["drinkType"]];
    drinkSize.value = size[custome["size"]];

    const customeAdd = custome["addOns"];
    for(let i=0; i<customeAdd.length; i++) {
        addOn[customeAdd[i]].checked = true;
    }
    const addOnArr = [];
    for(let i=0; i<addOn.length; i++) {
        if(addOn[i].checked) {
            addOnArr.push(i);
        }
    }

    const review = {
        "recipeName" : recipeName.value,
        "coffeeType" : coffeeType.value,
        "drinkType" :  drinkName.value,
        "size" : drinkSize.value,
        "addOns" : addOnArr,
        "availableShop": []
    };

    //check shops
    let shops = JSON.parse(localStorage.getItem("shops"));
    let numShops = 1;
    console.log(shops[0]["drinkType"]);
    console.log(drinkName.value);
    for (let i = 0; i < shops.length; i++){
        if (shops[i]["coffeeType"].includes(coffeeType.value)
        && shops[i]["drinkType"].includes(drinkName.value)
        && shops[i]["size"].includes(drinkSize.value)){
            review["availableShop"].push(shops[i]["shopName"]);
            shopEl = document.getElementById(`shopName${numShops}`);
            shopEl.value = shops[i]["shopName"];
            numShops++;
        }
    }
    console.log(review);
    const buttonEl = document.querySelector("button");
    buttonEl.addEventListener('click', () => {
        localStorage.setItem('review', JSON.stringify(review));
    })
}