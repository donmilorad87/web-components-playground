
function urlAndDomElementChecker(mutationObserverFunction = false) {
    if (window.location.origin + window.location.pathname === "https://execbalance.com/products/splittesting-beanie") {
        if (document.querySelector('.product__description')) {

            const splitTesting = new SplitTesting({});

            let productDesription = document.querySelector('.product__description')
            productDesription.parentElement.insertBefore(splitTesting, productDesription)
            if (mutationObserverFunction) {
                mutationObserverFunction()
            }
        }
    }
}

class SplitTesting extends HTMLElement {


    constructor() {

        super();


        this.styles = `

            split-testing .splitTestContainer{
            
                display: flex;
                flex-direction: column;

            }
            split-testing .splitTestContainer .discountDiv{
            
                background: #feb728;
                padding: 0.25rem 1rem;
                border-radius: 6px 6px 0 0;
                width: fit-content;
                font-weight: 600;

            }

            split-testing .splitTestContainer .contentDivOuter {
                display: flex;
                background: #f4f4f4;
                width: fit-content;
                border: 1px solid rgba(6, 4, 3, 0.1);
                border-radius: 0px 4px 4px 4px;
            }

            split-testing .splitTestContainer .contentDivOuter .imageDiv{
                display: flex;
                background: #d7d7d7;
                padding: 1.5rem 1rem;
                align-items: center;
                width: 30%;
            }

            split-testing .splitTestContainer .contentDivOuter .imageDiv img{
                width: 100%;
            }

            split-testing .splitTestContainer .contentDivOuter .contentDiv{
                padding: 1rem 4rem 1rem 2rem;
                flex-grow: 1;
                width: 70%;
            }
            split-testing .splitTestContainer .contentDivOuter .contentDiv .contentDivH4{ 

                font-weight: 600;
                font-size: 2rem;
                padding:0;
                margin: 0;
            }

            split-testing .splitTestContainer .contentDivOuter .contentDiv .contentDivP{ 
                font-weight: 300;
                font-size: 1.2rem;
                padding:0;
                margin: 0;

            }

            split-testing .splitTestContainer .contentDivOuter .contentDiv .innerContentDiv{ 
                margin-top: 0.75rem;
                display: flex;
                width: 100%;
                justify-content: space-between;
                gap: 2rem;

            }

            split-testing .splitTestContainer .contentDivOuter .contentDiv .priceContentDiv{ 
                
                display: flex;
                gap: 0.5rem;
                align-items: center;

            }

            split-testing .splitTestContainer .contentDivOuter .contentDiv .priceContentDiv .priceNotCross{ 
                text-decoration: none;
                font-weight: 600;
                color: #d50000;
                margin:0;
            } 

            split-testing .splitTestContainer .contentDivOuter .contentDiv .priceContentDiv .priceCross{ 
                text-decoration: line-through;
                font-weight: 600;
                color: gray;
                margin:0;
            } 

            split-testing .splitTestContainer .contentDivOuter .contentDiv .addToChartButton{ 
            
                border: 0;
                background: transparent;
                padding: 0;
                margin: 0;

            }
            split-testing .splitTestContainer .contentDivOuter .contentDiv .addToChartButton product-form{ 
                margin: 0;
            }
            split-testing .splitTestContainer .contentDivOuter .contentDiv .addToChartButton product-form form button.product-form__submit{ 
                
                margin: 0;
                background: #443f3e;
                color: white;
                padding: 0 0rem;
                border-radius: 2px;
                border: none;
                line-height: 1;
                min-height: 26px;
                min-width: 88px;

            }
        `

    }

    render() {

        let splitTestContainer = document.createElement('div')
        splitTestContainer.className = 'splitTestContainer'

        let discountDiv = document.createElement('div')
        discountDiv.className = 'discountDiv'
        discountDiv.textContent = '20% OFF'

        splitTestContainer.append(discountDiv)

        let contentDivOuter = document.createElement('div')
        contentDivOuter.className = 'contentDivOuter'


        let imageDiv = document.createElement('div')
        imageDiv.className = 'imageDiv'

        let image = document.createElement('img')
        image.src = 'https://cdn.shopify.com/s/files/1/0612/5086/3345/files/Group_72_1.png?v=1726779947'
        image.alt = 'Split Testing'

        imageDiv.append(image)

        contentDivOuter.append(imageDiv)


        let contentDiv = document.createElement('div')
        contentDiv.className = 'contentDiv'

        let h4 = document.createElement('h4')
        h4.className = 'contentDivH4'
        h4.textContent = 'Splittestin Gearg'

        contentDiv.append(h4)

        let p = document.createElement('p')
        p.className = 'contentDivP'
        p.textContent = 'Lorem ipsum dolor sit amet'

        contentDiv.append(p)

        let innerContentDiv = document.createElement('div')
        innerContentDiv.className = 'innerContentDiv'


        contentDiv.append(innerContentDiv)

        let priceContentDiv = document.createElement('div')
        priceContentDiv.className = 'priceContentDiv'

        innerContentDiv.append(priceContentDiv)

        let price = document.createElement('p')
        price.className = 'priceNotCross'
        price.textContent = '$62'

        priceContentDiv.append(price)

        let priceCross = document.createElement('p')
        priceCross.className = 'priceCross'
        priceCross.textContent = '$77'

        priceContentDiv.append(priceCross)

        let addToChartButton = document.createElement('button')
        addToChartButton.className = 'addToChartButton'
        addToChartButton.innerHTML = `
            <product-form product-form class="product-form" >
                <div class="product-form__error-message-wrapper" role="alert" hidden="">
                    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-error" viewBox="0 0 13 13">
                        <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
                        <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
                        <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white">
                        </path>
                        <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
                        </path>
                    </svg>
                    <span class="product-form__error-message"></span>
                </div>
                <form method="post" action="/cart/add" accept-charset="UTF-8" class="form" enctype="multipart/form-data" novalidate="novalidate" data-type="add-to-cart-form">
                    <input type="hidden" name="form_type" value="product">
                    <input type="hidden" name="utf8" value="✓">
                    <input type="hidden" name="id" value="42143947030769">
                    <div class="product-form__buttons">
                        <button type="submit" name="add" class="product-form__submit button button--full-width button--secondary">
                            <span>ADD</span>
                            <div class="loading-overlay__spinner hidden">
                                <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <input type="hidden" name="product-id" value="7484371239153">
                    <input type="hidden" name="section-id" value="template--16757022458097__main">
                </form>
            </product-form>
        `

        innerContentDiv.append(addToChartButton)
        contentDivOuter.append(contentDiv)

        splitTestContainer.append(contentDivOuter)

        let styles = document.createElement('style')
        styles.innerHTML = this.styles
        this.append(styles)

        this.append(splitTestContainer);
    }


    connectedCallback() {
        console.info('Split Testing started with initialization.');

        this.render();



    }

    disconnectedCallback() {
        console.info('Split Testing component is removed from the DOM');
        /* urlAndDomElementChecker(); */
    }
}

customElements.define("split-testing", SplitTesting);

const observeUrl = () => {

    window.observedUrl = location.href;

    function checkIfUrlChanged() {
        requestAnimationFrame(() => {
            if (observedUrl !== location.href) {
                console.log(`Url changed from "${observedUrl}" to "${location.href}"`);
                observedUrl = location.href;

                urlAndDomElementChecker(checkIfElementIsRemoved);

            }
        });
    }

    // in spa aplication user need to click somewhere in page to navigate to another page
    // here we listen to the clicks on body, and if url is changed
    document.body.addEventListener("click", checkIfUrlChanged);

    // if user navigate with next and back browesr button or change url hash in browser
    window.addEventListener("popstate", checkIfUrlChanged);
};

function checkElementRemoved() {
    const targetElement = document.querySelector('split-testing');
    if (!targetElement) {

        urlAndDomElementChecker(checkIfElementIsRemoved);
    }
}

function checkIfElementIsRemoved() {


    // Start observing the body or a specific parent element
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.removedNodes.length) {
                // Check if the target element was removed
                checkElementRemoved();
            }
        });
    });

    // Observe the body or a specific container
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Initial check in case the element is already removed
    checkElementRemoved();

}


(function () {
    observeUrl()
    urlAndDomElementChecker(checkIfElementIsRemoved);
})();