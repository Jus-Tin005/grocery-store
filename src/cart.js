let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket);

let calculation = () => {
        let cartIcon = document.getElementById("cartAmout");
        cartIcon.textContent = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
        // console.log(basket.map((x)=>x.item).reduce((x,y) => x + y, 0));
}
calculation();

// console.log(shopItemDatas);


let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");


let generateCartItems = () => {
        if(basket.length !== 0){
                // console.log("basket is not empty!");

                return (shoppingCart.innerHTML = basket.map((x)=>{
                        // console.log(x);

                        let {id,item} = x; /*
                                              ! came from basket.
                                            */


                        let search = shopItemDatas.find((y)=>y.id ===id) || []; /*
                                                                                ! came from shopItemDatas.
                                                                    */
                        let {img, name, price } = search;
                        return `
                        <div class="cart-item">
                                <img width="100" src=${img} alt=""/>
                                <div class="details">
                                        <div class="title-price-x">
                                                <h4 class="title-price">
                                                        <p>${name}</p>
                                                        <p class="cart-item-price">$ ${price}</p>
                                                </h4>
                                                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                                        </div>
                                        <div class="buttons">
                                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                                <div id=${id} class="quantity">${item}</div>
                                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                        </div>
                                        <h3>$ ${item * search.price}</h3>
                                </div>
                        </div>
                        `;
                }).join(""));

                /*
                        ! <h3>$ ${item * search.price}</h3> = quantity
                */

        }else{
                // console.log("basket is totally empty!");

                shoppingCart.innerHTML = ``;
                label.innerHTML = `
                <h2>Cart is Empty !</h2>
                <a href="index.html">
                        <button class="HomeBtn">Back to home</button>
                </a>
                `;
        }
};

generateCartItems();


let increment = (id)=>{
        let selectedItem = id;

        let search = basket.find((x) => x.id === selectedItem.id);

        if(search === undefined){
                basket.push({
                        id:selectedItem.id,
                        item: 1
                });
        }else{
                search.item += 1;
        }




        // console.log(basket);
        update(selectedItem.id);
        generateCartItems();
        localStorage.setItem("data",JSON.stringify(basket));


        // e.preventDefault();


};
let decrement = (id)=>{
        // e.preventDefault();

        let selectedItem = id;

        let search = basket.find((x) => x.id === selectedItem.id);
        if(search === undefined) return;
        else if(search.item === 0) { return;
        } else{
                search.item -= 1;
        }

        update(selectedItem.id);
        basket = basket.filter((x) => x.item !== 0);
        // console.log(basket);
        generateCartItems();
        localStorage.setItem("data",JSON.stringify(basket));



};


let update = (id)=>{
        // e.preventDefault();

        let search = basket.find((x) => x.id === id);
        // console.log(search.item);
        document.getElementById(id).innerHTML = search.item;
        calculation();
        totalAmout();
};

let removeItem = (id) => {
        let selectedItem = id;
        // console.log(selectedItem.id);
        basket = basket.filter((x)=>x.id !== selectedItem.id);
        localStorage.setItem("data",JSON.stringify(basket));
        generateCartItems();
        totalAmout();
        calculation();
}

let cearCart = () => {
        basket = [];
        generateCartItems();
        localStorage.setItem("data",JSON.stringify(basket));
        calculation();


}

let totalAmout = () => {
        if(basket.length !== 0){
                let amount = basket.map((x)=>{
                        let {item,id} = x;
                        let search = shopItemDatas.find((y)=>y.id === id) || [];
                        return item * search.price;
                }).reduce((x,y) => x+y,0);        //  adding all numbers.
                                                // x =previous number / y = next number
                // console.log(amount);

                label.innerHTML = `
                        <h2>Total Bill : $ ${amount}</h2>
                        <button class="checkout">Checkout</button>
                        <button onclick="cearCart()" class="removeAll">Clear Cart</button>
                `;
        }
        else return;
}

totalAmout();