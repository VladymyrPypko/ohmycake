// homepage/header/slider
const box = document.querySelectorAll('.slider .slider__box .slider__item');
console.log(box);

const prev = document.querySelector('.slider .slider__buttons .slider__prev');
console.log(prev);

const next = document.querySelector('.slider .slider__buttons .slider__next');
console.log(next);

let current_slide = 0;
next.addEventListener('click', function(){
    box[current_slide].classList.remove('current');
    if (current_slide == box.length-1) {
        current_slide = 0
    } else {
        current_slide++;
    }
    box[current_slide].classList.add('current');
});

prev.addEventListener('click', function(){
    box[current_slide].classList.remove('current');
    if (current_slide == 0) {
        current_slide = box.length-1
    } else {
        current_slide--;
    }
    box[current_slide].classList.add('current');
});

// homepage/main/top-products
const main = document.querySelector('.main-homepage');
const image = main.querySelector('.top-products__image');
const text = main.querySelector('.top-products__info');

document.querySelector('.top-products__buttons').addEventListener('click', (e) => {
    
    if (e.target.className === 'active') return;
    
    const btnActive = document.querySelector('.active');
    console.log(e.target.id);

    switch(e.target.id){
        case 'DevilsFood':
            image.setAttribute('src', 'src/images/homepage/main/products/DevilsFood.png');
            image.setAttribute('alt', 'DevilsFoodCake');
            text.innerText = "Thrilled for our Devil's Food Cheesecake! This cake offering is one of our best selling flavors! It's made with layers of chocolate fudge cake, cheesecake and chocolate buttercream filling topped with chocolate buttercream icing!";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        case 'MangoPeach': 
            image.setAttribute('src', 'src/images/homepage/main/products/MangoPeach.png');
            image.setAttribute('alt', 'MangoPeachCake');
            text.innerText = "Summer is here and we're so excited to launch our new cake offering, Peach Mango Tiramisu! This naked cake is made with a coffee liquer-soaked sponge cake layered with whipped cream and peach slices and topped with mango balls.";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        case 'BlueberryCheese': 
            image.setAttribute('src', 'src/images/homepage/main/products/BlueberryCheese.png');
            image.setAttribute('alt', 'BlueberryCheeseCake');
            text.innerText = "Let our Blueberry Cheese Shortcake be the heart of your table! This beautiful cake is made with layers of spongecake soaked in a milk mixture, baked cheesecake, whipped cream, blueberry filling and topped with blueberries.";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        case 'BrazoSansrival': 
            image.setAttribute('src', 'src/images/homepage/main/products/BrazoSansrival.png');
            image.setAttribute('alt', 'BrazoSansrivalCake');
            text.innerText = "Enjoy our IMPROVED Brazo Sansrival made with layers of meringue with cashew nuts, brazo custard, vanilla buttercream filling and icing. Try it for yourself and taste the difference!";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        case 'CappuccinoChoco': 
            image.setAttribute('src', 'src/images/homepage/main/products/CappuccinoChoco.png');
            image.setAttribute('alt', 'CappuccinoChocoCake');
            text.innerText = "Introducing OhMyCake's Cappuccino Choco Crunch Cake. Enjoy layers of chocolate cake, coffee buttercream, chocolate ganache, crispy meringue, fluffy whipped cream, and honeycomb crunch.";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        case 'ChocoSansrival': 
            image.setAttribute('src', 'src/images/homepage/main/products/ChocoSansrival.png');
            image.setAttribute('alt', 'ChocoSansrivalCake');
            text.innerText = "Our IMPROVED Choco Sansrival is a fun twist from the classic sansrival cake. Our version is made with delicious layers of meringue with cashew nuts, bittersweet chocolate ganache, vanilla buttercream filling and icing.";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        case 'HersheysKisses': 
            image.setAttribute('src', 'src/images/homepage/main/products/HersheysKisses.png');
            image.setAttribute('alt', 'HersheysKissesCake');
            text.innerText = "Enjoy our IMPROVED Hershey's Kisses Tiramisu! You will definitely love our vanilla chiffon cake layered with Hershey's Kisses chocolate cream cheese filling and topping, and dusted with light cocoa powder on top!";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        case 'MangoSymphony': 
            image.setAttribute('src', 'src/images/homepage/main/products/MangoSymphony.png');
            image.setAttribute('alt', 'MangoSymphonyCake');
            text.innerText = "Taste our famous Mango Meringue Symphony made with mangoes, meringue, cashew nuts, and a chocolate mousse filling held together by whipped cream icing!";
            btnActive.classList.remove('active');
            e.target.classList.add('active');
        break;
        default: 
        break;
  }
});