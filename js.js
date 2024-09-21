(function () {
    "use strict";

    let deleteObserver = null;

    function addUpsellComponentToPage(mutationObserverFunction = false) {
        if (!document.querySelector('split-testing')) {
            // Instance the web component and pass arguments to class constructor
            const splitTesting = new SplitTesting({
                upsellTagLabel: "20% OFF",
                upsellImage: 'https://cdn.shopify.com/s/files/1/0612/5086/3345/files/Group_72_1.png?v=1726779947',
                upsellImageAlt: 'Split Testing',
                upsellTitle: "Splittestin Gearg",
                upsellDescription: "Lorem ipsum dolor sit amet",
                upsellPrice: "$62",
                regularPrice: "$77",
                quantity: 1,
                variantId: 42143947030769,
                productId: 7484371239153,
            });
            // Find product description element and add web component
            let productDesription = document.querySelector('.product__description')
            productDesription.parentElement.insertBefore(splitTesting, productDesription)

            // Use callback if present
            if (mutationObserverFunction) {
                mutationObserverFunction()
            }
        }
    }

    function urlAndDomElementChecker(mutationObserverFunction = false) {
        if (window.location.origin + window.location.pathname === "https://execbalance.com/products/splittesting-beanie") {
            if (document.querySelector('.product__description')) {
                // Add the web component to the page
                addUpsellComponentToPage(mutationObserverFunction)
            } else {

                // Set up the MutationObserver
                const observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            const element = document.querySelector('.product__description');
                            if (element) {
                                // Add the web component to the page after element is found
                                addUpsellComponentToPage(mutationObserverFunction)
                                // Stop observing once the element is found
                                observer.disconnect();
                                break;
                            }
                        }
                    }
                });

                // Start observing the document for changes
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }
        } else {
            if (document.querySelector('split-testing')) {
                document.querySelector('split-testing').remove()
                if (deleteObserver !== null && typeof deleteObserver !== 'undefined') {
                    deleteObserver.disconnect()
                    deleteObserver = null
                
                }

            }
        }
    }

    function observeUrl() {

        function onUrlChange() {
            urlAndDomElementChecker(checkIfElementIsRemoved);
        }

        // Create a MutationObserver to monitor for URL changes
        const urlObserver = new MutationObserver(() => {
            onUrlChange();
        });

        // Start observing the document for changes to the <title> element
        urlObserver.observe(document, {
            childList: true,
            subtree: true,
        });

        // Save original pushState and replaceState methods
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        // Override pushState to include our custom logic
        history.pushState = function (...args) {
            originalPushState.apply(this, args);
            onUrlChange();
        };

        // Override replaceState to include our custom logic
        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
            onUrlChange();
        };

        //we monitor even url hash (#specificPointer), so if url have some specific hash we can have specific action for that, maybe, if specific hash, than we create different web component
        window.addEventListener("popstate", onUrlChange);
    }

    function checkElementRemoved() {
        const targetElement = document.querySelector('split-testing');
        if (!targetElement) {
            // Element is removed from the DOM, we disconect this observer, function urlAndDomElementChecker will add new one
            deleteObserver.disconnect();
            urlAndDomElementChecker(checkIfElementIsRemoved);
        }
    }

    function checkIfElementIsRemoved() {

        // Start observing the body or a specific parent element
        deleteObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.removedNodes.length) {
                    // Check if the target element was removed
                    checkElementRemoved();
                }
            });
        });

        // Observe the body or a specific container
        deleteObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

    }

    class SplitTesting extends HTMLElement {


        constructor(stickyFooterConstructionObject) {

            super();

            const {
                upsellTagLabel,
                upsellImage,
                upsellImageAlt,
                upsellTitle,
                upsellDescription,
                upsellPrice,
                regularPrice,
                quantity,
                variantId,
                productId
            } = stickyFooterConstructionObject;

            this.upsellTagLabel = upsellTagLabel;
            this.upsellImage = upsellImage;
            this.upsellImageAlt = upsellImageAlt;
            this.upsellTitle = upsellTitle;
            this.upsellDescription = upsellDescription;
            this.upsellPrice = upsellPrice;
            this.regularPrice = regularPrice;
            this.quantity = quantity;
            this.variantId = variantId;
            this.productId = productId;
            this.styles = `

                split-testing .splitTestContainer{
                    display: flex;
                    flex-direction: column;
                }

                split-testing .discountDiv{
                    background: #feb728;
                    padding: 0.25rem 1rem;
                    border-radius: 6px 6px 0 0;
                    width: fit-content;
                    font-weight: 600;
                }

                split-testing .contentDivOuter {
                    display: flex;
                    background: #f4f4f4;
                    width: fit-content;
                    border: 1px solid rgba(6, 4, 3, 0.1);
                    border-radius: 0px 4px 4px 4px;
                }

                split-testing .imageDiv{
                    display: flex;
                    background: #d7d7d7;
                    padding: 1.5rem 1rem;
                    align-items: center;
                    max-width: 150px;
                    width: 150px;
                }

                split-testing .imageDiv img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                split-testing .contentDiv{
                    flex-grow: 1;
                    width: 70%;
                }

                split-testing .contentDivH4{ 
                    font-weight: 600;
                    padding:0;
                    margin: 0;
                }

                split-testing .contentDivP{ 
                    font-weight: 300;
                    padding:0;
                    margin: 0;
                }

                split-testing .innerContentDiv{ 
                    margin-top: 0.75rem;
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }

                split-testing .priceContentDiv{ 
                    display: flex;
                    align-items: center;
                }

                split-testing .upsellPrice{ 
                    text-decoration: none;
                    font-weight: 600;
                    color: #d50000;
                    margin:0;
                } 

                split-testing .regularPrice{ 
                    text-decoration: line-through;
                    font-weight: 600;
                    color: gray;
                    margin:0;
                } 

                split-testing .addToChartButton{ 
                    border: 0;
                    background: transparent;
                    padding: 0;
                    margin: 0;
                }

                split-testing .splitTestContainer .contentDivOuter .contentDiv .addToChartButton product-form{ 
                    margin: 0;
                }
                    
                split-testing button.product-form__submit{ 
                    margin: 0;
                    background: #443f3e;
                    color: white;
                    border-radius: 2px;
                    border: none;
                    line-height: 1;
                    min-height: auto;
                    min-width: auto;
                    padding: 0.5rem 0.5rem;
                    font-size: 1.2rem;
                }

                @media (min-width:280px){

                    split-testing .priceContentDiv{
                        gap: 0.5rem;
                        font-size: 10px;
                    }

                    split-testing .contentDivH4{
                        font-size: 1.4rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1rem;
                    }

                    split-testing .contentDiv{
                        padding: 1rem 0.5rem;
                    }
                        
                    split-testing .innerContentDiv{
                        gap: 0rem;
                    }
            
                    split-testing button.product-form__submit{
                        width: 46px;
                    } 
                            
                }

                @media (min-width:320px){

                    split-testing .priceContentDiv{
                        font-size: 12px;
                    }

                    split-testing .contentDivH4{
                        font-size: 1.8rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1.2rem;
                    }

                    split-testing .contentDiv{
                        padding: 1rem;
                    }
                        
                    split-testing .innerContentDiv{
                        gap: 0rem;
                    }
            
                    split-testing button.product-form__submit{
                        width: 66px;
                    } 

                }

                @media (min-width:360px){

                    split-testing .priceContentDiv{
                        font-size: 15px;
                    }

                    split-testing .contentDivH4{
                        font-size: 2rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1.2rem;
                    }

                    split-testing .innerContentDiv{
                        gap: 2rem;
                    }
            
                    split-testing button.product-form__submit{
                        width: 80px;
                    }  

                }

                @media (min-width:400px){
                    
                    split-testing .contentDiv{
                        padding: 1rem 4rem 1rem 2rem;
                    }
                        
                }
                    
                @media (min-width:750px){

                    split-testing .priceContentDiv{
                        font-size: 12px;
                    }

                    split-testing .contentDivH4{
                        font-size: 1.6rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1rem;
                    }

                    split-testing .contentDiv{
                        padding: 1rem;
                    }

                    split-testing .innerContentDiv{
                        gap: 0rem;
                    }
                
                    split-testing button.product-form__submit{
                        width: 57px;
                    }   

                }

                @media (min-width:800px){
                
                    split-testing .priceContentDiv{
                        font-size: 15px;
                    }

                    split-testing .contentDivH4{
                        font-size: 1.6rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1.2rem;
                    }

                    split-testing .innerContentDiv{
                        gap: 1rem;
                    }
                
                    split-testing button.product-form__submit{
                        width: 62px;
                    }  

                }

                @media (min-width:850px){
        
                    split-testing .contentDivH4{
                        font-size: 2rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1.2rem;
                    }

                    split-testing .innerContentDiv{
                            gap: 1rem;
                    }
                
                    split-testing button.product-form__submit{
                        width: 80px;
                    }  

                }

                @media (min-width:900px){
                
                    split-testing .contentDiv{
                        padding: 1rem 2rem 1rem 2rem;
                    }

                    split-testing .innerContentDiv{
                        gap: 2rem;
                    }

                }

                @media (min-width:900px){
                
                    split-testing .contentDiv{
                        padding: 1rem 4rem 1rem 2rem;

                    }
            
                }

                @media (min-width:990px){

                    split-testing .priceContentDiv{
                        font-size: 13px;
                    }

                    split-testing .contentDivH4{
                        font-size: 1.6rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1rem;
                    }

                    split-testing .contentDiv{
                        padding: 1rem;
                    }

                    split-testing .innerContentDiv{
                        gap: 0rem;
                    }

                    split-testing button.product-form__submit{
                        width: 60px;
                    }  

                }

                @media (min-width:1100px){

                    split-testing .priceContentDiv{
                        font-size: 15px;
                    }

                    split-testing .contentDivH4{
                        font-size: 2rem;
                    }

                    split-testing .contentDivP{
                        font-size: 1.2rem;
                    }

                    split-testing .innerContentDiv{
                        gap: 2rem;
                    }

                    split-testing button.product-form__submit{
                        width: 72px;
                    }   

                }

                @media (min-width:1200px){
            
                    split-testing .contentDiv{
                        padding: 1rem 3rem 1rem 2rem;
                    }
            
                    split-testing button.product-form__submit{
                        width: 80px;
                    }       
                }
                @media (min-width:1250px){
            
                    split-testing .contentDiv{
                        padding: 1rem 4rem 1rem 2rem;
                    }
                
                }
            `

        }

        render() {

            let splitTestContainer = document.createElement('div')
            splitTestContainer.className = 'splitTestContainer'

            let discountDiv = document.createElement('div')
            discountDiv.className = 'discountDiv'
            discountDiv.textContent = this.upsellTagLabel

            splitTestContainer.append(discountDiv)

            let contentDivOuter = document.createElement('div')
            contentDivOuter.className = 'contentDivOuter'


            let imageDiv = document.createElement('div')
            imageDiv.className = 'imageDiv'

            let image = document.createElement('img')
            image.src = this.upsellImage
            image.alt = this.upsellImageAlt

            imageDiv.append(image)

            contentDivOuter.append(imageDiv)


            let contentDiv = document.createElement('div')
            contentDiv.className = 'contentDiv'

            let h4 = document.createElement('h4')
            h4.className = 'contentDivH4'
            h4.textContent = this.upsellTitle

            contentDiv.append(h4)

            let p = document.createElement('p')
            p.className = 'contentDivP'
            p.textContent = this.upsellDescription

            contentDiv.append(p)

            let innerContentDiv = document.createElement('div')
            innerContentDiv.className = 'innerContentDiv'


            contentDiv.append(innerContentDiv)

            let priceContentDiv = document.createElement('div')
            priceContentDiv.className = 'priceContentDiv'

            innerContentDiv.append(priceContentDiv)

            let upsellPrice = document.createElement('p')
            upsellPrice.className = 'upsellPrice'
            upsellPrice.textContent = this.upsellPrice

            priceContentDiv.append(upsellPrice)

            let regularPrice = document.createElement('p')
            regularPrice.className = 'regularPrice'
            regularPrice.textContent = this.regularPrice

            priceContentDiv.append(regularPrice)

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
                        <input type="hidden" name="quantity" value="${this.quantity}">    
                        <input type="hidden" name="form_type" value="product">
                    
                        <input type="hidden" name="utf8" value="✓">
                        <input type="hidden" name="id" value="${this.variantId}">
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
                        <input type="hidden" name="product-id" value="${this.productId}">
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
            console.info('Split Testing component started with initialization.');

            this.render();

        }

        disconnectedCallback() {
            console.info('Split Testing component is removed from the DOM');
            /* urlAndDomElementChecker(); */
        }
    }

    customElements.define("split-testing", SplitTesting);


    // add observer to monitor for url changes
    observeUrl()
    // than call urlAndDomElementChecker to check if all neccesary requirments are met.  
    // function takes argumetn -> callback mutation observer to re render element if removed from page
    urlAndDomElementChecker(checkIfElementIsRemoved);

})();