
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
                        <h4 class="cake__name">${cake.name}</h4>
                        <span class="cake__price">${cake.price} &#8372;</span>
                        <div class="cake__control">
                            <a href="#" class="cake__full-info bx bx-detail"></a>
                            <a href="#" class="cake__add-to-cart bx bx-cart-alt"></a>
                        </div>
                        <p class="cake__description">${cake.description}</p>
                    </div>
                </li>`
            )
        })

        // image switcher
        menu.addEventListener('click', (e) => {
            if (!['IMG', 'A'].includes(e.target.tagName)) return;

            e.preventDefault();

            const target = e.target;
            const klassList = target.classList;
            const cakeCard = e.composedPath().find(elem => elem.classList.contains('cake'));


            if (klassList.contains('cake__preview') || klassList.contains('cake__filling')) {
                cakeCard.querySelectorAll('img').forEach(elem => elem.classList.toggle('active'));
            } else if (klassList.contains('cake__full-info')) {
                cakeCard.querySelector('.cake__info-wrap')
                    .classList.toggle('cake__info-wrap--show-description');
                target.classList.toggle('cake__full-info--shown');
            } else if (klassList.contains('cake__add-to-cart')) {
                target.classList.toggle('cake__add-to-cart--added');
            }
        })
    })