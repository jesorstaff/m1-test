let openModalCatalogButton = document.querySelectorAll('.catalog-list button'),
    overlay = document.querySelector('.overlay'),
    modalWindow = document.querySelector('.popup'),
    body = document.querySelector('body'),
    closeButton = document.querySelector('.popup-close');

openModalCatalogButton.forEach(button => {
    button.addEventListener('click', function () {

        // Add class for open form
        overlay.classList.add('open');
        modalWindow.classList.add('open');
        body.classList.add('no-scroll');

        // Card
        let parent = this.closest('.catalog-list-item'),
            name = parent.querySelector('.catalog-list-item__name').innerHTML,
            oldPrice = parent.querySelector('.old-price').innerHTML,
            newPrice = parent.querySelector('.new-price').innerHTML,
            image = parent
                .querySelector('.catalog-list-item__photo img')
                .getAttribute('src');

        // Form
        let nameForm = document.querySelector('.popup-name');
        nameForm.innerHTML = name;

        let oldPriceForm = document.querySelector('.popup-old-price');
        oldPriceForm.innerHTML = oldPrice;

        let newPriceForm = document.querySelector('.popup-new-price');
        newPriceForm.innerHTML = newPrice;

        let newImageForm = document.querySelector('.popup img');
        newImageForm.setAttribute('src', image);

    });
});

[closeButton, overlay].forEach(button => {
    button.addEventListener('click', function () {
        overlay.classList.remove('open');
        modalWindow.classList.remove('open');
        body.classList.remove('no-scroll');
    })
})

// popup select

const popupSelectButton = document.querySelector('.popup-select'),
    popupSelectWindow = document.querySelector('.popup-select-list'),
    popupSelectList = document.querySelectorAll('.popup-select-list__list span');

popupSelectButton.addEventListener('click', function() {
    popupSelectWindow.classList.add('open-window');

    if (popupSelectWindow.classList.contains ('open-window')) {
        popupSelectButton.classList.add('revers-arrow');
    }
})

popupSelectList.forEach(item => {
    item.addEventListener('click', function () {
        popupSelectButton.innerHTML = this.innerHTML;
        popupSelectWindow.classList.remove('open-window');
        popupSelectButton.classList.remove('revers-arrow')
    })
})

// switch section

let buttonSwitchSection = document.querySelectorAll('.catalog-sections-button button');

buttonSwitchSection.forEach(button => {
    button.addEventListener('click', function () {

        buttonSwitchSection.forEach(item => {
            item.classList.remove('open');
        })

        this.classList.add('open');

        function togglesOpenItem(topic, catalog, nameAttr) {
            if (nameAttr === topic) {

                let sectionName = document.querySelector(`.${topic}`);

                catalog.forEach(item => {
                    item.classList.remove('open-section');
                })

                sectionName.classList.add('open-section');
            }
        }

        ['everyday', 'erotic'].forEach(topic => togglesOpenItem(
            topic,
            document.querySelectorAll('.catalog .catalog-list'),
            this.dataset.section
        ))
    })
});

// planned scroll

const anchors = document.querySelectorAll('.hero-buttons a[href*="#"]');

for( let anchor of anchors) {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        const blockID = anchor.getAttribute('href')
        const fixedHeaderHeight = 175;
        const top = document.querySelector('' + blockID).offsetTop - fixedHeaderHeight;
        window.scrollTo({
            top,
            left: 0,
            behavior: "smooth",
        })

        function openSectionCatalog(topic) {
            if (topic === blockID.substr(1)) {

                document.querySelectorAll('.catalog .catalog-list')
                    .forEach(item => {
                        item.classList.remove('open-section');
                    })

                document.querySelectorAll('.catalog-sections-button button')
                    .forEach(item => {
                        item.classList.remove('open');
                    })

                document.getElementById(topic).classList.add('open');

                document.querySelector(`.${topic}`).classList.add('open-section');
            }
        }

        ['erotic', 'everyday'].forEach(topic => openSectionCatalog(
            topic
        ))

    })
}
