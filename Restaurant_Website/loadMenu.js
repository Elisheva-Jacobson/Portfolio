(function () {
    'use strict';

    const menuSections = $('#sections');
    const itemArea = $('#items');
    const popUpDiv = $('#popUp');
    const foodName = $('#foodName');
    const optionsDiv = $('#options');
    const menuItems = [];
    const cart = [];
    const quantity = $('#quantity');
    const addItem = $('#addItem');
    const comments = $('#comments');
    const cartNum = $('#cart');
    const xButton = $('#x');

    async function loadMenuSections() {
        try {
            const r = await fetch('menuSections.json');
            if (!r.ok) {
                //console.log("threw defined error");
                throw new Error(`${r.status} ${r.statusText}`);
            }
            const obj = await r.json();
            showSections(obj);
            //console.log("printing object in loadMenuSections", obj);
            loadMenuItems(obj);
            return obj;
            //return obj.PromiseResult;
        } catch (err) {
            console.log(err);
        }

    }


    function showSections(object) {
        //console.log("printing object in show sections", object);
        object.forEach(elem => {
            $(`<li class = "foodType"><a href="#${elem.title}">${elem.title}</a></li>`).appendTo(menuSections);
            $(`<section id ="${elem.title}"><h2>${elem.title}</h2></section>`).appendTo(itemArea);

        });
        // $('.foodType').click(() => );
    }

    async function loadMenuItems(menuObject) {
        //console.log("printing object in loadMenuItems", menuObject);
        //const otherObject = Object.keys(menuObject);
        //const newObject = Object.values(menuObject);
        for (let i = 0; i < menuObject.length; i++) {
            //for (let i = 0; i < newObject.length; i++) {
            try {
                const r = await fetch(menuObject[i].file);
                //const r = await fetch(newObject[i]);
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                const menuStuff = await r.json();
                showItems(menuObject[i].title, menuStuff);
                //showItems(otherObject[i], menuStuff);
                //return Object.values(menuStuff);
            } catch (err) {
                console.error(err);
            }
        }
        // menuObject.forEach(elem => {
        //     try {
        //         const r = await fetch(elem.file);
        //         if (!r.ok) {
        //             throw new Error(`${r.status} ${r.statusText}`);
        //         }
        //         const menuStuff = await r.json();
        //         showItems(elem.title, menuStuff);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // });

    }

    function showItems(category, object) {
        object.forEach(elem => {
            menuItems.push(elem);
            $(` <div class="menuItem" data-index = "${menuItems.length - 1}">
            <figure data-index = "${menuItems.length - 1}">
                <figcaption data-index = "${menuItems.length - 1}">${elem.name}</figcaption>
                <img src="${elem.picture}" alt="" class="itemImage" data-index = "${menuItems.length - 1}">
            </figure>
            <p class="description" data-index = "${menuItems.length - 1}">${elem.description}</p>
            <div class="price" data-index = "${menuItems.length - 1}">${elem.price}</div>
        </div>`).appendTo($(`#${category}`));
        });
    }

    function popUp(id) {
        //console.log(menuItems);
        const item = menuItems[id];
        console.log(item);
        foodName.text(item.name);
        if (item.options) {
            const optionTypes = Object.keys(item.options);
            const information = Object.values(item.options);
            for (let i = 0; i < optionTypes.length; i++) {

                $(`<h4 class="optionType">${optionTypes[i]}</h4>`).appendTo(optionsDiv);
                $(`<p class="instructions">${information[i].instructions}</p>`).appendTo(optionsDiv);
                information[i].choices.forEach(c => {
                    $(`<label for="">${c}<input type="checkbox" name="${optionTypes[i]}" id="" class="option"></label>`).appendTo(optionsDiv);
                });
            }
            optionsDiv.show();
        }
        popUpDiv.show();
    }

    function numCart() {
        let previousNum = parseInt(cartNum.text());
        if (previousNum) {
            cartNum.text(++previousNum);
        } else {
            cartNum.text('1');
        }
    }

    $('#plus').click(() => {
        let previousQ = parseInt(quantity.text());
        quantity.text(++previousQ);

    });

    $('#minus').click(() => {
        let previousQ = parseInt(quantity.text());
        if (previousQ > 1) {
            quantity.text(--previousQ);
        }

    });

    addItem.click(event => {
        event.preventDefault();
        const cartItem = {
            name: foodName.text(),
            quantity: quantity.text(),
            comments: comments.text()
        };
        cart.push(cartItem);
        popUpDiv.hide();
        numCart();
        //need to retrieve the option values
    });

    // const menuObject = loadMenuSections();


    $(document).on('click', '.menuItem', event => {
        console.log('menu Item clicked');
        const target = $(event.target);
        console.log(target.data('index'));
        //console.log(event.target.data);
        popUp(target.data('index'));
    });

    xButton.click(() => {
        popUpDiv.hide();
    });

    loadMenuSections();

    // $('.menuItem').click(() => {
    //     console.log('menu Item clicked');
    //     popUp();
    // });
    // if (menuObject) {
    //     console.log(menuObject);
    //     console.log("got this far");
    //     loadMenuItems(menuObject);
    // } else {
    //     console.log("did not go through");
    // }

})();