var TapedeckTS;
(function (TapedeckTS) {
    function bindButtons(el) {
        $(el).off("click", ".button");
        $(el).on("click", ".button", function () {
            $(this).toggleClass("depressed");
        });
    }
    TapedeckTS.bindButtons = bindButtons;
})(TapedeckTS || (TapedeckTS = {}));
//# sourceMappingURL=tapedeck.js.map