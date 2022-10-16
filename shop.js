
// here am going to start generate shop product on html pagae
let shop=document.getElementById("shop");

// here we removed array item used in html page




// any time we select cart we store data inside basket
// here from first stage we are going to remove basket in order to retrieve data in localstorage
// let basket=[
//     // {id:1,item:1}
// ]; at stage 1


// stage 2.2 only for localstorage
// here we pass data cs we wnt to get ourdata
// in case we dont have data to remove error we can use || []
let basket=JSON.parse(localStorage.getItem("data"))||[];











let generateshop=()=>{
    // hre am going to gretut
// rn by usin map in order to return array items
    return(shop.innerHTML=shopitemsdata.map((aritem)=>{
        // in order to avoid use of item.each name of element in${} 
        // on quantity  here we have used also cs every time click we  target id
        let {id,name,img,desc,price}=aritem;
// stage 2.3
        // here we need quick search in order to see quick update on cartamount
        // here we will update quantity
        let search=basket.find((items)=>items.id==id)|| []; 

      
        return  `<div id=product-id-${id}  class="item">
        <img src=${img} width="222px" alt="">
        <div class="details">
            <h2>${name}</h2>
            <p>${desc }
            </p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                <button class="minus">
                <i onclick="decrement(${id})"  class="bi bi-dash-lg"></i>
                   </button> 
                   <div id=${id} class="quantity">
                   ${search.item===undefined?0:search.item}
                   </div>
                   <button onclick="increment(${id})" class="plus">
                      <i class="bi bi-plus-lg"></i>
                   </button>
                </div>
            </div>
        </div>
    </div>

`;
    }).join("")
    //here i  have used join in order to remove `` on page
    )
};generateshop();

// three function for decrement increment and update
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
    // hereb we need to pass unique id for each
    update(id);

    // stage 2.1 only for localstorage

    // this is at 2nd stage we want any time we clicked to save on local storage
    // data is key and basket is object that is geting stored
    //  localStorage.setItem("data",basket)
    // here weve used json.stringfy for visible aour object
    localStorage.setItem("data",JSON.stringify(basket));
};

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

    console.log(basket); 
    
//this go down cs any time weneed to check basket before localstorage update
    // stage 2.1 only for localstorage
    // here weve used json.stringfy for visible aour object
    localStorage.setItem("data",JSON.stringify(basket));
}; 
let update=(id)=>{
    let search=basket.find((items)=>items.id===id)
    // to see item nbr only om console
    // console.log(search.item)
    document.getElementById(id).innerHTML=search.item
    // becouse i want calculation function to run only when i update that why
    calculation();
};    

// calculation of all update value
let calculation=()=>{
    let carticon=document.getElementById("cartamount");
    // to see all items i have in basket
    // console.log(basket.map((items)=>items.item).reduce((x,y)=>x+y,0));
    carticon.innerHTML=basket.map((items)=>items.item).reduce((x,y)=>x+y,0)
};

// 2.4 here i call calculation in order to make even cartamount to stay upodate
calculation(); 




(function () {
    let show=document.getElementById("show")
let item=document.getElementById("items")

show.addEventListener("click",()=>{
    item.classList.toggle("show-cart")
})
    
})();

