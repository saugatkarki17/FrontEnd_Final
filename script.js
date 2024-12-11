const mainDiv = document.querySelector(".product-div");
const imageDiv = document.querySelector('.imageDiv');
const itemPrice = document.querySelector('.price');
const countSpin= document.querySelector('.countSpin');
const nextItem = document.querySelector('.skip');
const addItem = document.querySelector('.add');
const startGame = document.querySelector('.start');
const cartMain = document.querySelector('.cart');
const checkoutBtn = document.querySelector('.checkout');
const cartTopClick = document.querySelector('.cart-two');
const checkoutDiv = document.querySelector(".checkoutDiv");
const checkoutDivLeft = document.querySelector(".check-left");
const mainLeft = document.querySelector(".main-left");
const mainStart = document.querySelector(".banner");
const toremove = document.querySelector(".toremove");
const totalCheck = document.querySelector(".tot-check");

const crossCheckout = document.getElementById('x');
const restAll= document.querySelector(".rest-all");

const mainRight = document.querySelector(".main-div");
const mainRightRight = document.querySelector(".namePrice");


mainStart.addEventListener("click", ()=> {
   mainLeft.classList.add("main-left-after");
   mainRight.classList.add("main-right-after");

   toremove.style.display= "none";

   startGame.style.display="block";
   
});




let currentItem = {};
let cartItems = new Map();
let totalPrice = 0;

const totalPriceElement = document.createElement("p");
totalPriceElement.classList.add('total-price');
totalPriceElement.style.paddingLeft = "9px";

totalPriceElement.innerHTML =   `Your Total Value: $${totalPrice}`;
totalPriceElement.classList.add("total-top");
mainRightRight.appendChild(totalPriceElement);



fetch('https://dummyjson.com/products?limit=194')
    .then(res => res.json())
    .then(data => {
        startGame.addEventListener("click", () => {

            parent(data); 
            countSpin.style.display = "block";
            totalPriceElement.style.display = "block";

            nextItem.style.display = "block";
            addItem.style.display = "block";
            checkoutBtn.style.display = "block";
            startGame.style.display = "none";
            cartMain.style.display = "flex";
        });
    })
    .catch(error => console.error('Error:', error));

// for bringig cart

cartTopClick.addEventListener("click", ()=> {

    cartMain.classList.toggle("cart-active");

    
});


function parent(data) {

    let clickCount = 0;

    nextItem.addEventListener("click", ()=> {
        

        if (clickCount<10) {
            clickCount++;
            countSpin.innerText = `Chances left: ${10-clickCount}`;
            nextBtnWork(data);


        } else {
            alert("No more chances left.");
        }
    });

    checkoutBtn.addEventListener("click",()=> {

        if(cartItems.size == 0) {
            alert("cart empty!!")
        }
        else {
            window.scrollTo({ top: 0, behavior: "smooth" });
            checkoutDiv.style.display = "flex";
            restAll.style.display = "block";
            
            crossCheckout.addEventListener("click", ()=> {
                checkoutDiv.style.display = "none";
                restAll.style.display = "none";
                
    
            });
            restAll.addEventListener("click", ()=> {
                checkoutDiv.style.display = "none";
                restAll.style.display = "none";

            }); 
        }
           
    })

    addItem.addEventListener("click", ()=> {
        

        // adds
        if (cartItems.size >= 5) {
            alert("cart Full");
            return;
        }

        if (cartItems.has(currentItem.name)) {
            alert("alredy added");
            return;


        }

        cartItems.set(currentItem.name, currentItem.price);
        const itemNewAdded = document.createElement("p");
        itemNewAdded.style.paddingLeft = "10px";
        itemNewAdded.style.marginBottom = "8px";
        itemNewAdded.innerHTML = `${currentItem.name} : $${currentItem.price}`;
        cartMain.appendChild(itemNewAdded);


        // for checkout

        const mainItemCheckout = document.createElement("div");
        const mainItemCheckoutLeft = document.createElement("div");
        const mainItemCheckoutRight = document.createElement("div");
        const mainItemCheckoutRightH = document.createElement("p");
        const mainItemCheckoutRightP = document.createElement("p");


        mainItemCheckout.append(mainItemCheckoutLeft,mainItemCheckoutRight);
        mainItemCheckoutRight.append(mainItemCheckoutRightH,mainItemCheckoutRightP);
        checkoutDivLeft.appendChild(mainItemCheckout);
        mainItemCheckoutRightH.innerHTML = `${currentItem.name}`;
        mainItemCheckoutRightP.innerHTML = `$${currentItem.price}`;

        mainItemCheckout.classList.add("mainItemCheckout");
        mainItemCheckoutLeft.style.backgroundImage =  `url('${currentItem.picture}')`;
        mainItemCheckoutLeft.style.width = "80px";
        mainItemCheckoutLeft.style.height = "80px";
        mainItemCheckoutLeft.style.backgroundSize = "cover";
        mainItemCheckoutLeft.style.backgroundColor= "#999";

        mainItemCheckoutRightH.style.fontWeight = "bold";
        mainItemCheckoutRightH.style.marginBottom = "0.5rem";
        

                

        //for total price

        totalPrice += currentItem.price;
        updatedTotal(); 
        
    });
    

    function nextBtnWork(data) {


            // function for random generation
            
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            const randomValue = getRandomInt(1, 193);
            const product = data.products[randomValue];
            console.log(randomValue); 

            // start of DOM
            currentItem = {
                name: product.title,
                price: product.price,
                picture: product.images[0],
            };


            console.log(currentItem.name);
            console.log(currentItem.price);

            mainDiv.innerText = currentItem.name;
            mainDiv.classList.add("name-pro");
            itemPrice.classList.add("name-pro");
            itemPrice.innerHTML = `Item Price: $${currentItem.price}`;
            
            imageDiv.style.backgroundImage =  `url('${currentItem.picture}')`;
            imageDiv.style.width = "280px";
            imageDiv.style.height = "280px";
            imageDiv.style.backgroundSize = "cover";
            imageDiv.style.backgroundColor= "white";


            
            
           


        

        
    } 
    nextBtnWork(data)


}
function updatedTotal() {
    totalPriceElement.innerHTML =  `Total Value: $${totalPrice.toFixed(2)}`;
    totalCheck.innerHTML = `$${totalPrice.toFixed(2)}`;

    totalPriceElement.style.paddingLeft = "9px";
    totalPriceElement.style.marginBottom = "9px";

}
    
        
   

// for menu 

const menuBtn = document.querySelector(".menu-btn");
const menuItems = document.querySelector(".nav-links");

menuBtn.addEventListener('click',()=> {
    menuItems.classList.toggle("after-menu");
    document.body.classList.toggle("body-after")

});