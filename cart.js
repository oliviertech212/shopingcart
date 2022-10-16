//stage 1.3
let label=document.getElementById("label");
let shoppingcart=document.getElementById("shopping-cart")
// stage 1
// here weve used thi sin order to return datafrom our local storage
// but cart amount still zero

let basket=JSON.parse(localStorage.getItem("data"))||[];
console.log(basket);

//stage 1.2
// here calculation help to update cart amount
// calculation of all update value
let calculation=()=>{
    let carticon=document.getElementById("cartamount");
    // to see all items i have in basket
    // console.log(basket.map((items)=>items.item).reduce((x,y)=>x+y,0));
    carticon.innerHTML=basket.map((items)=>items.item).reduce((x,y)=>x+y,0)
};

// 2.4 here i call calculation in order to make even cartamount to stay upodate
calculation();


// stage 1.4
// to generate item on cart
let generatecatitems=()=>{
    if (basket.length!==0) {
        return(
            shoppingcart.innerHTML=basket.map((items)=>{
                let {id,item}=items;
                let search=shopitemsdata.find((array)=>array.id ==id)||[];
                console.log(search.img);
                return `
                <div class="cart-item">
                  <img width="150px" src=${search.img} alt=""/> 
                  <div class="details detail">
                        <div class="title-price-x">
                          <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="p">$${search.price}</p>
                           </h4>
                           <button>
                             <i onclick="removeitem(${id})" class="bi bi-x-lg"></i> 
                           </button>
                        </div>


                        <div class="buttons">
                            <button class="minus">
                                <i onclick="decrement(${id})"  class="bi bi-dash-lg"></i>
                                </button> 
                            <div id=${id} class="quantity">
                                ${item}
                            </div>
                                <button onclick="increment(${id})" class="plus">
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                        </div>


                         
                        <h3>
                        $ ${item * search.price}
                        </h3>
                   </div>
                </div>
                `
            })
            .join("")
        );
        
    } else {
      shoppingcart.innerHTML=``;
      label.innerHTML=`
       <h1>Cart  is empty</h1>
       <a  href="shop.html">
       <button class="homebtn">Back to home</button>
       </a>
       
      `;
    }
};
generatecatitems();

// stage 1.5 wew are going to paste dcre and increment i order to call it in button

// three function for decrement increment and update
// stage 1.6 we need to call generate item in order to change the total price
let increment=(id)=>{
    // let selecteditem=id;
    // console.log(selecteditem.id);


    //search willl help to know where item exit or not if  exite item increase 
    let search=basket.find((items)=>items.id===id);  
    if (search===undefined) {
        basket.push({
            id:id,
            item:1,
        });
        
    } else { 
        search.item +=1;
    }

    // console.log(basket);
    generatecatitems();
    // hereb we need to pass unique id for each
    update(id);

    // stage 2.1 only for localstorage

    // this is at 2nd stage we want any time we clicked to save on local storage
    // data is key and basket is object that is geting stored
    //  localStorage.setItem("data",basket)
    // here weve used json.stringfy for visible aour object
    localStorage.setItem("data",JSON.stringify(basket));
};
// stage 1.6 we need to call generate item in order to remove item with 0
let decrement=(id)=>{
    //search willl help to know where item exit or not if  exite item increase 
    let search=basket.find((items)=>items.id===id);  
    if (search===undefined) return;
    else if (search.item===0)return;
    else { 
        search.item -=1;
    }
    update(id);
    // 2.5 in order to remove all item with 0 qty in backet
    basket=basket.filter((items)=>items.item!==0);
generatecatitems();
    console.log(basket); 
    
//this go down cs any time weneed to check basket before localstorage update
    // stage 2.1 only for localstorage
    // here weve used json.stringfy for visible aour object
    localStorage.setItem("data",JSON.stringify(basket));
}; 

// stage 1.11 bcs when click not total updated 
// so we have to call total amount ()
let update=(id)=>{
    let search=basket.find((items)=>items.id===id)
    // to see item nbr only om console
    // console.log(search.item)
    document.getElementById(id).innerHTML=search.item
    // becouse i want calculation function to run only when i update that why
    calculation();
    totalamount();
};    


// stage 1.7
// wev created remove (id) in order to help to know which item 
// we want to remove by usin X icon

let removeitem=(id)=>{
    //    console.log(id);
       basket=basket.filter((baskitem)=>baskitem.id !==id);
// stage 1.9
generatecatitems();
// here we call this in order to make change on cart amount 
calculation();


    //    stage 1.8 to update localstorage
    // but this can hapen when we refresh page that why stage 1.9
    localStorage.setItem("data",JSON.stringify(basket));

}

// stage 1.11
let clearcart=()=>{
    basket=[];
    generatecatitems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));

}

// stage 1.10

let totalamount=()=>{
    if (basket.length !==0) {
        let amount=basket.map((items)=>{
            let {id,item}=items;
            let search=shopitemsdata.find((array)=>array.id ==id)||[];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
        // console.log(amount);
        generatecatitems();

        label.innerHTML=`
          <h2>Total bill : $ ${amount}</h2>
 <button class="checkout">Checkout</button>
          <button onclick="clearcart()" class="removeall">Clear Cart</button>
        `
    } else return;

};
totalamount();