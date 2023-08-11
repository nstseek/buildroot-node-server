// ==UserScript==
// @name         Azul Flight Crawler - Browser Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Intercept availability request response and send it to the azul flight crawler server to parse data
// @author       Rafael Lopes Schneider
// @match        https://www.voeazul.com.br/br/pt/home/selecao-voo*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=voeazul.com.br
// @grant        none
// ==/UserScript==

// This should run in your browser when the selecao voo page is loading
// The azul flight crawler server must be running in port 3000
// You'll see the output in the server's terminal output (for now)

(function () {
    'use strict';

    const originalXMLHttpRequestOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function () {
        // in this case, `this` is the own xhr object. You can use it to overwrite xhr.onreadystatechange and read the response
        const originalOnreadystatechange = this.onreadystatechange!;

        const [, url] = arguments;

        const isAvailabilityRequest = url.includes('v4/availability');

        this.onreadystatechange = function () {
            if (isAvailabilityRequest) {
                Object.defineProperty(this, 'onreadystatechange', {
                    configurable: false,
                    writable: false,
                });
                if (this.readyState === 4) {
                    console.log(this.response);
                    fetch(
                        'http://localhost:3000/availability-crawler/extract-and-save',
                        {
                            method: 'POST', // Specify the HTTP method
                            headers: {
                                'Content-Type': 'application/json', // Set the content type of the request body
                            },
                            body: this.response, // Convert the data object to a JSON string
                        },
                    );
                }
            } else {
                originalOnreadystatechange.apply(this, arguments as any);
            }
        };

        if (isAvailabilityRequest) {
            console.log(this, arguments);
        }

        originalXMLHttpRequestOpen.apply(this, arguments as any);
    };
})();
