var TapedeckJS = TapedeckJS || {};
(function () {
    'use strict';

    /**
     * Really this is just here as an excuse to build a multi-file solution to keep the bootstrap code separate from example "implementation" code.
     * We don't expect you to use this function, feel free to delete it.
     * @param el - the tapedeck element
     */
    this.bindButtons = function (el) {
        $("body").on("click", '.tapedeck[implementation="javascript"]>.buttons>.button', function (e) {
          $(".tapedeck").find('.button[data-btn="'+ $(this).attr("data-btn") +'"]').toggleClass("depressed");
          e.cancelBubble = true;
          e.stopImmediatePropagation();
          e.stopPropagation();
        });
    }
}).bind(TapedeckJS)();