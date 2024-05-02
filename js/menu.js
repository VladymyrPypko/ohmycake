
fetch('../src/json/database.json')
    .then(db => db.json())
    .then(db => {
        console.log(db)
        const menu = document.querySelector('.menu');

        db.forEach(cake => {
            menu.insertAdjacentHTML(
                'beforeend',
                `<li data-id="${cake.id}" class="menu__cake cake">
                    <div class="cake__images-wrap">
                        <img class="cake__preview active" src="${cake.preview['590']}" alt="cake-preview">
                        <img class="cake__filling" src="${cake.filling['590']}" alt="cake-filling">
                    </div>
                    <div class="cake__info-wrap">
                        <h5 class="cake__name">${cake.name}</h5>
                        <span class="cake__price">${cake.price} &#8372;</span>
                        <div class="cake__control">
                            <i class='cake__add-to-cart bx bx-cart-add bx-flip-horizontal'></i>        
                            <i class='cake__full-info bx bx-detail bx-flip-horizontal' ></i>       
                        </div>
                    </div>
                </li>`
            )
        })

        menu.addEventListener('click', (e) => {
            if (e.target.tagName !== 'IMG') return;

            e.target.parentElement.querySelectorAll('img')
                .forEach(elem => elem.classList.toggle('active'));
        })
    })