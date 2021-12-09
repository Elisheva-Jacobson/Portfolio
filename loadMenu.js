(function () {
    'use strict';

    const menuSections = $('#sections');
    const itemArea = $('#items');
    const popUpDiv = $('#popUp');

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
            $(` <div class="menuItem">
            <figure>
                <figcaption>${elem.name}</figcaption>
                <img src="${elem.picture}" alt="" class="itemImage">
            </figure>
            <p class="description">${elem.description}</p>
            <div class="price">${elem.price}</div>
        </div>`).appendTo($(`#${category}`));
        });
    }

    function popUp() {
        popUpDiv.show();
    }

    // const menuObject = loadMenuSections();
    loadMenuSections();

    $(document).on('click', '.menuItem', () => {
        console.log('menu Item clicked');
        popUp();
    });

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