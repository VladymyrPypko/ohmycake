const cakeCardBlock = cake => {
    return `<li data-id="${cake.id}" class="menu__cake cake">
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
                <a href="#" class="cake__add-to-cart bx bx-cart"></a>
            </div>
            <p class="cake__description">${cake.description}</p>
        </div>
    </li>`;
}

const cakeImagesHandler = cakeCard => {
    cakeCard.querySelectorAll('img').forEach(e => e.classList.toggle('active'));
};
const cakeDescriptionHandler = (target, klassList, cakeCard) => {
    cakeCard.querySelector('.cake__info-wrap')
        .classList.toggle('cake__info-wrap--show-description');
    target.classList.toggle('cake__full-info--shown');
};
const addToCardHandler = target => {
    target.classList.toggle('cake__add-to-cart--added')
};

fetch('../src/json/database.json')
    .then(db => db.json())
    .then(db => {
        console.log(db)
        const menu = document.querySelector('.menu');

        db.forEach(cake => {
            menu.insertAdjacentHTML('beforeend', cakeCardBlock(cake))
        });

        menu.addEventListener('click', (e) => {
            if (!['IMG', 'A'].includes(e.target.tagName)) return;

            e.preventDefault();
            e.stopPropagation();

            const target = e.target;
            const klassList = target.classList;
            const cakeCard = e.composedPath().find(elem => elem.classList.contains('cake'));

            if (klassList.contains('cake__preview') || klassList.contains('cake__filling')) {
                cakeImagesHandler(cakeCard);
            } else if (klassList.contains('cake__full-info')) {
                cakeDescriptionHandler(target, klassList, cakeCard)
            } else if (klassList.contains('cake__add-to-cart')) {
                addToCardHandler(target)
            }
        })
    });