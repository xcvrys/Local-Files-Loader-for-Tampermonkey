// ==UserScript==
// @name         ProjectName - local files
// @namespace    http://tampermonkey.net/
// @version      1
// @description  ProjectName - local files
// @author       xcvrys
// @match        https://www.linkedin.com/jobs/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addElement
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const files = [
        "http://localhost:8000/example-script.js",
    ];

    function getExistingNonce() {
        const script = document.querySelector('script[nonce]');
        return script ? script.nonce : null;
    }

    function safeInject(content) {
        try {
            GM_addElement('script', {
                textContent: content,
                nonce: getExistingNonce() || undefined
            });
        } catch (e) {
            console.error('Injection failed:', e);
        }
    }

    function fetchAllScripts(urls) {
        return Promise.all(urls.map(url =>
            new Promise(resolve => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url,
                    onload: response => resolve(response.responseText),
                    onerror: () => resolve(`// Failed to load ${url}\n`)
                });
            })
        ));
    }

    fetchAllScripts(files).then(scripts => {
        const combinedScript = scripts.join('\n');
        console.log("Combined Script:\n", combinedScript);
        safeInject(combinedScript);
    });
})();
