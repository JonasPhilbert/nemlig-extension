let productsListElement = document.querySelector(".productlist-show-all__item-container")
let productElements = document.querySelectorAll(".productlist-item");

let sortSavingsBtn = document.createElement("button");
sortSavingsBtn.innerText = "Sort by savings percentage";
sortSavingsBtn.addEventListener("click", () => { sortByPercentSavings() });
document.querySelector(".site-header__logo-link").parentNode.appendChild(sortSavingsBtn);

let sortKiloPriceBtn = document.createElement("button");
sortKiloPriceBtn.innerText = "Sort by kilo price";
sortKiloPriceBtn.addEventListener("click", () => { sortByKiloPrice() });
document.querySelector(".site-header__logo-link").parentNode.appendChild(sortKiloPriceBtn);

function calculatePercentSavings() {
    console.log("Calculating percentage savings for products.");
    productElements.forEach(productElement => {
        // Only checks for products with direct savings, not X for Y specials.
        let priceElement = productElement.querySelector(".pricecontainer.has-campaign")

        if (priceElement) {
            campaignPriceElement = priceElement.children[0];
            basePriceElement = priceElement.children[1];

            let campaignPriceStr = campaignPriceElement.children[0].innerText + "." + campaignPriceElement.children[1].innerText;
            let basePriceStr = basePriceElement.children[0].innerText + "." + basePriceElement.children[1].innerText;

            let campaignPrice = parseFloat(campaignPriceStr);
            let basePrice = parseFloat(basePriceStr);

            let percentSaving = (1 - campaignPrice / basePrice) * 100;

            priceElement.appendChild(document.createTextNode(`[${Math.round(percentSaving * 10) / 10}%]`));

            productElement.fp_percentSaving = percentSaving;
        } else {
            productElement.fp_percentSaving = -1; // Maybe not the best, but ensures correct sorting.
        }

    });
}

function sortByPercentSavings() {
    console.log("Sorting products by percentage savings.");
    productElementsArray = Array.prototype.slice.call(productElements, 0);

    productElementsArray.sort((a, b) => {
        // Notice the inverted sorting. We want to highest savings first in the array.
        if (a.fp_percentSaving > b.fp_percentSaving) return -1;
        if (a.fp_percentSaving < b.fp_percentSaving) return 1;
        return 0
    });

    productsListElement.innerHTML = "";
    productElementsArray.forEach(e => {
        productsListElement.appendChild(e);
    })
}

function sortByKiloPrice() {
    console.log("Sorting products by kilo price.");
    productElementsArray = Array.prototype.slice.call(productElements, 0);

    productElementsArray.sort((a, b) => {
        let aPrice = a.querySelector(".pricecontainer-unitprice__campaign-price").innerText || a.querySelector(".pricecontainer-unitprice__base-price").innerText;
        let bPrice = b.querySelector(".pricecontainer-unitprice__campaign-price").innerText || b.querySelector(".pricecontainer-unitprice__base-price").innerText;

        aPrice = parseFloat(aPrice);
        bPrice = parseFloat(bPrice);

        if (aPrice > bPrice) return 1;
        if (aPrice < bPrice) return -1;
        return 0
    });

    productsListElement.innerHTML = "";
    productElementsArray.forEach(e => {
        productsListElement.appendChild(e);
    })
}

calculatePercentSavings();

// sortByPercentSavings();
// sortByKiloPrice();