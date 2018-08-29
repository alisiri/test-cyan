var BootstrapJS = BootstrapJS || {};
(function () {
    'use strict';

    if(!TapedeckJS) {
        console.log("One or more dependencies not loaded.");
        return;
    }

    /**
     * This is the bootstrap function that you can modify the contents of to run your javascript solution.
     * @param el - the tapedeck element
     */
    this.bootstrap = function (el) {
        TapedeckJS.bindButtons(el);
    }
}).bind(BootstrapJS)();