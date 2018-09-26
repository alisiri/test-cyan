namespace TapedeckTS {

  /**
   * Really this is just here as an excuse to build a multi-file solution to keep the bootstrap code separate from example "implementation" code.
   * We don't expect you to use this function, feel free to delete it.
   * @param el - the tapedeck element
   */
  export function bindButtons(el:Element) {
    $("body").on("click", '.tapedeck[implementation="typescript"] .button', function (e:Event) {
      $(".tapedeck").find('.button[data-btn="'+ $(this).attr("data-btn") +'"]').toggleClass("depressed");
      e.cancelBubble = true;
      e.stopImmediatePropagation();
      e.stopPropagation();
    });
  }
}
