const setCartStorage = cart => localStorage.setItem('cart', JSON.stringify(cart));

const getCartStorage = (() => {
    const storage = localStorage.getItem('cart') ?? '{}'
    const cart = JSON.parse(storage);

    setCartStorage(cart);

    return () => cart;
})();

const cakeIteHTML = (cake, isAdded) => {
    return `<li data-id="${cake.id}" data-preview="${cake.preview['590']}" data-name="${cake.name}" data-price="${cake.price}" class="menu__cake cake">
        <div class="cake__gallery">
           <a class="cake__gallery-item" data-lightbox="cake${cake.id}" href="${cake.preview['1000']}"><i class='bx bxs-image' ></i></a>
           <a class="cake__gallery-item" data-lightbox="cake${cake.id}" href="${cake.filling['1000']}"></a> 
        </div>
        <div class="cake__images-wrap">
            <img class="cake__preview active" src="${cake.preview['590']}" alt="cake-preview">
            <img class="cake__filling" src="${cake.filling['590']}" alt="cake-filling">
        </div>
        <div class="cake__info-wrap">
            <h4 class="cake__name">${cake.name}</h4>
            <span class="cake__price">${cake.price} &#8372;</span>
            <div class="cake__control">
                <a href="#" class="cake__full-info bx bx-detail"></a>
                <a href="#" class="cake__add-to-cart ${isAdded && 'cake__add-to-cart--added'} bx bx-cart"></a>
            </div>
            <p class="cake__description">${cake.description}</p>
        </div>
    </li>`;
};

const cartItemHTML = (id, cartItem) => {
    return `<li data-id="${id}" class="cart__item order">
        <img class="order__image" src="${cartItem.preview}" alt="cake-cart-preview">
        <p class="order__name">${cartItem.name}</p>
        <div class="order__calculator">
            <div class="order__quantity-wrap">
                <a data-action="order-quantity-minus" href="#" class="order__minus bx bx-minus-circle" type="text"></a>
                <span data-price-item="${cartItem.price}" class="order__quantity">${cartItem.quantity}</span>
                <a data-action="order-quantity-plus" href="#" class="order__plus bx bx-plus-circle" type="text"></a>
            </div>
            <span class="order__price">${cartItem.price}</span>
        </div>
        <a data-action="order-remove" href="#" class="order__remove bx bx-trash"></a>
    </li>`;
};

const switchCakeImages = cakeCard => {
    cakeCard.querySelectorAll('img').forEach(e => e.classList.toggle('active'));
};

const toggleCakeDescriptionIcon = (cakeCard, klassList) => {
    cakeCard.querySelector('.cake__info-wrap').classList.toggle('cake__info-wrap--show-description');
    klassList.toggle('cake__full-info--shown');
};

const addToCart = (cartId, { preview, name, price, quantity = 1 }) => {
    const cart = getCartStorage();
    const cartListBlock = document.querySelector('.cart__list');
    const totalCartPriceBlock = document.querySelector('.cart__total-price');

    cart[cartId] = { name, preview, price, quantity };
    setCartStorage(cart);

    cartListBlock.insertAdjacentHTML('beforeend', cartItemHTML(cartId, cart[cartId]));
    totalCartPriceBlock.textContent = `${+totalCartPriceBlock.textContent + +price}`;
};

const removeFromCart = (id) => {
    const cart = getCartStorage();

    document.querySelector(`.cart .cart__list li[data-id="${id}"]`).remove();
    document.querySelector(`.cart .cart__counter`).textContent -= 1;
    document.querySelector('.cart .cart__total-price').textContent -= (cart[id].price * cart[id].quantity);

    delete cart[id];
    setCartStorage(cart);
};

const toggleCartOpenLink = () => {
    const cartBlock = document.querySelector('.cart');
    const cartLength = Object.keys(getCartStorage()).length;

    cartBlock.querySelector('.cart__counter').textContent = cartLength.toString();
    cartLength ? cartBlock.classList.add('cart--shown') : cartBlock.classList.remove('cart--shown');
}

fetch('../src/json/database.json')
    .then(db => db.json())
    .then(db => {
        const cartItemIds = Object.keys(getCartStorage());
        const menu = document.querySelector('.menu');

        db.forEach(cake => {
            const isAdded = cartItemIds.includes(cake.id.toString());
            menu.insertAdjacentHTML('beforeend', cakeIteHTML(cake, isAdded));
        });

        return menu;
    })
    .then(menu => {
        menu.addEventListener('click', (e) => {
            if (!['IMG', 'A'].includes(e.target.tagName)) return;

            e.preventDefault();

            const target = e.target;
            const klassList = target.classList;
            const cakeCardBlock = e.composedPath().find(elem => elem.classList.contains('cake'));

            if (klassList.contains('cake__preview') || klassList.contains('cake__filling')) {
                switchCakeImages(cakeCardBlock);
            } else if (klassList.contains('cake__full-info')) {
                toggleCakeDescriptionIcon(cakeCardBlock, klassList)
            } else if (klassList.contains('cake__add-to-cart')) {
                const cakeData = cakeCardBlock.dataset;

                klassList.toggle('cake__add-to-cart--added') ? addToCart(cakeData.id, cakeData) : removeFromCart(cakeData.id);
                toggleCartOpenLink();
            }
        });
    })
    .then(() => {
        let totalPrice = 0;

        Object.entries(getCartStorage()).forEach(i => {
            // [0] - cartItem ID
            // [1] - cartItem Data
            addToCart(i[0], i[1]);
            totalPrice += +i[1].price * i[1].quantity;
        });

        document.querySelector('.cart__total-price').textContent = totalPrice;
    })
    .then(() => toggleCartOpenLink());

// cart-modal open
document.querySelector('a[data-target="#cartModal"]').addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector(e.target.dataset.target).classList.add('modal--show');
});

// cart-modal close
document.querySelector('#cartModal').addEventListener('click', (e) => {
    if (e.target.dataset.action !== 'modal-close') return;

    e.currentTarget.classList.remove('modal--show');
});

// change order quantities
document.querySelector('.cart').addEventListener('click', (e) => {
    if (!['order-quantity-plus', 'order-quantity-minus'].includes(e.target.dataset.action)) return;

    e.preventDefault();

    const totalCartPriceBlock = e.currentTarget.querySelector('.cart__total-price');
    const orderBlock = e.composedPath().find(elem => elem.classList.contains('order'));
    const quantityBlock = orderBlock.querySelector('.order__quantity');
    const currentOrderPriceBlock = orderBlock.querySelector('.order__price');
    const cart = getCartStorage();

    switch (e.target.dataset.action) {
        case 'order-quantity-plus':
            quantityBlock.textContent = +quantityBlock.textContent + 1;
            totalCartPriceBlock.textContent = +totalCartPriceBlock.textContent + +quantityBlock.dataset.priceItem;
            cart[orderBlock.dataset.id].quantity += 1;
            break;
        case 'order-quantity-minus':
            if (+quantityBlock.textContent === 1) return;

            quantityBlock.textContent -= 1;
            totalCartPriceBlock.textContent -= quantityBlock.dataset.priceItem;
            cart[orderBlock.dataset.id].quantity -= 1;
            break;
    }

    currentOrderPriceBlock.textContent = +quantityBlock.textContent * +quantityBlock.dataset.priceItem;
    setCartStorage(cart);
});

// remove from cart
document.querySelector('.cart').addEventListener('click', (e) => {
    if (e.target.dataset.action !== 'order-remove') return;

    e.preventDefault();

    const orderBlock = e.composedPath().find(elem => elem.classList.contains('order'));

    e.currentTarget.parentNode
        .querySelector(`li.cake[data-id="${orderBlock.dataset.id}"] .cake__add-to-cart`)
        .classList.remove('cake__add-to-cart--added');

    removeFromCart(orderBlock.dataset.id);
    toggleCartOpenLink();
});
