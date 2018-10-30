window.testHelpers = window.testHelpers || { };
(function () {
    'use strict';

    var template =  '' +
                    '<div implementation="$(type)" class="tapedeck">' +
                    '    <div class="buttons">' +
                    '        <span class="button" data-btn="rewind" />' +
                    '        <span class="button" data-btn="stop" />' +
                    '        <span class="button" data-btn="play" />' +
                    '        <span class="button" data-btn="pause" />' +
                    '        <span class="button" data-btn="fastforward" />' +
                    '        <span class="button" data-btn="record" />' +
                    '        <span class="spacer" />' +
                    '    </div>' +
                    '    <div class="shadow2"></div>' +
                    '    <div class="background"></div>' +
                    '    <div class="spindles">' +
                    '        <span class="spindle spin" spindle-side="left" />' +
                    '        <span class="spindle spin" spindle-side="right" />' +
                    '    </div>' +
                    '    <div class="shadow"></div>' +
                    '</div>';

    this.addTapedeck = function ($container, type) {
        var num = $container.find(".wrapper").length + 1;
        $container.append($('<div class="wrapper" id="wrapper-'+ num + '" />'))

        var $wrapper = $container.find("#wrapper-"+num),
            tmpl = template.toString().replace("$(type)", type);

        $wrapper.append($(tmpl));

        return $wrapper;
    };
}).call(window.testHelpers);