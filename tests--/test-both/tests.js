/**
 * The testSuite object is what will become the testSuite module defined below, providing context for the test suite.
 *
 * It is currently set up to test the example code, but the tests should probably still be somewhat relevant at least as
 * examples for testing a particular button function.
 *
 * Although it is not referenced in the examples below, moduleParams[name].module refers to the bootstrap module (BootstrapJS or BootstrapTS)
 * that the test is being called with.
 *
 * Because we use the same bootstrap function to instantiate the test module, and since the bootstrap module is intended to be modified
 * by you to instantiate your solution on a tapedeck element, this test harness should continue to work for your solution as you make changes.
 *
 * Assuming you have implemented the code as expected, such that it can be instantiated multiple times, it is likely that you will have
 * some object representing your tapedeck instance that might you wish to test more directly by interrogating its methods, properties or whatever.
 * This would probably be particularly useful if you wish to TDD a solution.
 *
 * - You might do this by passing the instance object to `moduleParams` via the `params` argument to `initTest`, much like the bootstrap object is.
 * - If you are TDDing with this harness you'll want to update the included javascript to refer to the build directory as well.
 *
 * Both of these changes can be made in the test's index.html.
 *
 * You also can disable one or the other of the test modules (typescript/javascript) in index.html while working on its counterpart solution.
 *
 * In any case, the helper functions should still be useful when writing your own test logic.
 *
 * @property moduleWrappers provides access to a map of module names to wrapper elements in the DOM which contain
 *                          a tapedeck that has been used to initialise a solution.
 * @property moduleParams   provides access to a map of module names to parameters that were passed to the initTest function
 *                          to instantiate a module
 */
window.testSuite = window.testSuite || { moduleWrappers: { }, moduleParams: { } };

;(function() {
    'use strict';


    /** Exposes testsuite function to the outside world, allowing the instantiation of test modules
     * @param {string} name Module name
     */
    this.initTest = function (name, params) {
        this.moduleParams[name] = params;
        testsuite(name);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Helper functions

    /** Retrieves the tapedeck associated with a particular test module.
     * @param {string} name the name of the test module to retrieve the tapedeck for.
     */
    var getTapedeck = function (name) {
        return             window.testSuite.moduleWrappers[name].find(".tapedeck");
    };

    /** Retrieves all the button elements for the tapedeck wrapper element associated with
     * a particular test module.
     * @param name the name of the test module to retrieve the buttons for
     */
    var getButtons = function (tapedeck) {
        var buttons = {};
        tapedeck.find(".button").each(function (i, button) {
            var $button = $(button);
            buttons[$button.attr("data-btn")] = $button;
        });
        return buttons;
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // This is where you can define tests which will be run against both the javascript and typescript
    // implementations.
    // Note: You will need to update index.html for the test to properly instantiate your solution.

    /** Prepares a module of tests.
     *
     * By instantiating the tests like this we can run the same barrage of tests against the typescript and javascript implementations within
     * a single test session by running them as separate modules and instantiating a new tapedeck in the DOM for each module
     *
     * see `docs/qunit-api/index.html` for more info on QUnit commands and syntax.
     *
     * @param name the name for the module being prepared
     */
    var testsuite = function (name) {
        QUnit.module(name);

        // Tests shared by both modules would include basic testing via DOM interrogation

        QUnit.test("pause button toggle", function () {
            expect(2);

            var btn = getButtons(getTapedeck(name))["pause"];
            if(btn.hasClass("depressed")) { btn.click(); } // reset the button if necessary

            btn.click();

            ok(btn.hasClass("depressed"), "clicking the pause button depresses it");

            btn.click();

            equal(btn.hasClass("depressed"), false, "clicking the pause button again resets it");
        });

        QUnit.test("record button toggle", function () {
            expect(2);

            var btn = getButtons(getTapedeck(name))["record"];
            if(btn.hasClass("depressed")) { btn.click(); } // reset the button if necessary

            btn.click();

            ok(btn.hasClass("depressed"), "clicking the record button depresses it");

            btn.click();

            equal(btn.hasClass("depressed"), false, "clicking the record button again resets it");
        });

        // Or you might want to do some implementation-specific testing:

        if(name === "Javascript Implementation Tests") {
            // unfortunately we don't have much interesting to test
			
			
        }

        if(name === "Typescript Implementation Tests") {
            // Even though this is a pointless test, it demonstrates that these tests don't
            // just have to be about the DOM, you can pass objects (including instance objects) to the test module and access
            // them in your unit tests.
            QUnit.test("BootstrapTS pointless unit test", function () {
                expect(2);
                var _module = window.testSuite.moduleParams[name].module;
                equal(Object.keys(_module).length, 1, "BootstrapTS has one key");
                equal(Object.keys(_module)[0], "bootstrap", "\"bootstrap\" is that key");
            });
        }
    };

}).call(window.testSuite);