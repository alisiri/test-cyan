var TapedeckJS = TapedeckJS || {};
(function () {
    /**
     * This is just here as an example code entry point. Feel free to modify index.html to suit your code.
     * We don't expect you to use this function. :)
     * @param el - the tapedeck element
     */
    this.bindButtons = function (el) {
        $(el).off("click", ".button");
        $(el).on("click", ".button", function () {
            $(this).toggleClass("depressed");
        });
    }
}).bind(TapedeckJS)();