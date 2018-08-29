$(document).ready(function () {
    var selectors = {
        class: {
            tapedeck: ".tapedeck",
            tabset: ".tabset",
            tab: ".tab",
            controls: ".tab-controls"
        }
    }, templates = {
        tabContainer: '<ul class="tab-controls"></ul>',
        tab: '<li class="tab"></li>'
    }

    var Tabset = function (el) {
        var Tab = function (container) {
            return {
                id: $(container).find(selectors.class.tapedeck).attr("id"),
                label: $(container).attr("data-label"),
                show: function () {
                    $(container).css("visibility", "");
                },
                hide: function () {
                    $(container).css("visibility", "hidden");
                }
            }
        };

        var TabController = function (container) {
            this.tabs = [];

            this.tabContainer = $(templates.tabContainer);
            this.tabContainer.insertBefore($(container).children().first());
            this.tabContainer = $(container).find(selectors.class.controls);

            this.tabContainer.on("click", selectors.class.tab, (function (event) {
                this.selectTab($(event.delegateTarget).children().index(event.currentTarget));
            }).bind(this))
        };

        TabController.prototype = {
            setTabs: function (tabs) {
                this.tabs = tabs;
                this.tabs.forEach((function (tab, i) {
                    this.tabContainer.append($(templates.tab).text(tab.label).attr("control-for", tab.id).get(0));
                    if(i !== 0) {
                        tab.hide();
                    }
                }).bind(this));
            },
            selectTab: function(index) {
                this.tabs.forEach(function (tab, i) {
                    if(i !== index) {
                        tab.hide();
                    } else {
                        tab.show();
                    }
                });
            }

        };

        var $el = $(el),
            $tabcontrols = $el.find(selectors.class.controls),
            $tabs = $el.find(selectors.class.tab),
            tabs = [],
            tabcontroller = null;

        if($tabcontrols.length === 0) {
            tabcontroller = new TabController(el);
            $tabcontrols = $el.find(selectors.class.controls);
        } else {
            return;
        }

        $.each($tabs, function (index, el) {
            tabs.push(new Tab(el));
        });

        tabcontroller.setTabs(tabs);
    };

    var $tabsets = $(selectors.class.tabset),
        tabsets = [];

    $.each($tabsets, function (index, el) {
        tabsets.push(new Tabset(el));
    });
});