// ==UserScript==
// @name        GitHubTopBar
// @namespace   https://github.com/tziporaziegler/GitHubTopBar/
// @description A user script for styling the GitHub top-bar
// @author      Tzipora Ziegler
// @include     https://github.com/*
// @version     1.2.0
// @run-at document-start
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var header;
    var nameSpace = 'GitHubTopBar-';

    //Create variables for easy customization
    var isFixed = true;
    var paddingHeight = 5;
    const ELEMENT_HEIGHT = 32;
    var barHeight = ELEMENT_HEIGHT + paddingHeight * 2;

    var defaultColor = '#000000';
    var defaultHoverColor = '#555555';
    var defaultInverseHoverColor = '#FFFFFF';
    var defaultBackgroundColor = '#f5f5f5';
    var defaultBorderColor = '#e5e5e5';

    doTasksRequiringHeader(whenHeaderExists);

    function whenHeaderExists() {
        header = document.querySelector('.Header');

        if (!header) {
            //It's not a new header
            return;
        }

        if (header) {
            removeTabs();
            setSize();
            styleFixed();
            setColor();
            styleSearchBar();
        }
    }

    function doTasksRequiringHeader(callback) {
        //Observe document.body for elements. Run the callback when the container (first after the top-bar) exists.
        //  This results in the callback running immediately after the top-bar exists.
        header = document.querySelector('.Header');
        if (header === null) {
            if (typeof observerForContainer !== 'object' || observerForContainer === null) {
                observerForContainer = new MutationObserver(function() {
                    var nodes = document.body.childNodes;
                    if (nodes && nodes.length > 0) {
                        for (let index = 0; index < nodes.length; index++) {
                            let node = nodes[index];
                            if (node.nodeName === 'DIV' && node.classList.contains('container')) {
                                observerForContainer.disconnect();
                                callback();
                            }
                        }
                    }
                });
                observerForContainer.observe(document.body, {
                    childList: true
                });
            }
        } else {
            callback();
        }
    }

    function addGlobalStyle(css) {
        var head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function removeTabs(){
        //Remove Gist and Marketplace tabs
        $('[role=navigation] li:nth-child(n+3)').remove();
    }

    function setSize(){
        //Control header height by changing padding height
        let css = '' +
            '.Header{\n' +
            '    padding-top: ' + paddingHeight + 'px;\n' +
            '    padding-bottom: ' + paddingHeight + 'px;\n' +
            '}\n';
        addGlobalStyle(css);
    }

    function styleFixed(){
        if(isFixed){
            let css = '' +
                '.js-header-wrapper {\n' +
                '    width:100%;\n' +
                '    position: fixed !important;\n' +
                '    z-index: 999;\n' +
                '}\n' +

                '[role="main"] {\n' +
                '    padding-top:' + barHeight + 'px;\n' +
                '}\n' +

                '';

            addGlobalStyle(css);
        }
    }

    function setColor(){
        let css = '' +
            '.Header{\n' +
            '    background-color: ' + defaultBackgroundColor +';\n' +
            '    border-bottom: 1px solid ' + defaultBorderColor + ' ;\n' +
            '}\n' +

            '.header-logo-invertocat .octicon-mark-github,\n' +
            '.user-nav a,\n' +
            '.Header .header-search-input,\n' +
            '.HeaderNavlink {\n' +
            '    color:' + defaultColor + '\n' +
            '}\n' +

            '.header-logo-invertocat .octicon-mark-github:hover,\n' +
            '.HeaderNavlink:hover,\n' +
            '.HeaderNavlink:focus,\n' +
            '.HeaderNavlink.selected,\n' +
            '.user-nav .dropdown a:not(.dropdown-item):hover,\n' +
            '.user-nav .dropdown a:not(.dropdown-item):focus {\n' +
            '    color:' + defaultHoverColor + ' !important;\n' +
            '}\n' +

            '.HeaderNavlink:hover .dropdown-caret,\n' +
            '.HeaderNavlink:focus .dropdown-caret {\n' +
            '    border-top-color: ' + defaultHoverColor + ';\n' +
            '}\n' +

            '';

        addGlobalStyle(css);
    }

    function styleSearchBar(){
        let placeholderStyle = '    color:#999 !important;\n';

        let css = '' +
            '.Header .header-search-wrapper {\n' +
            '    background-color:white;\n' +
            '    border: 1px solid ' + defaultBorderColor + ';\n' +
            '}\n' +

            '.Header .header-search-wrapper.focus {\n' +
            '    background-color:#fefefe;\n' +
            '    border: 1px solid ' + defaultBorderColor + ';\n' +
            '}\n' +

            '.Header .header-search-scope,\n' +
            '.Header .header-search-wrapper.focus .header-search-scope {\n' +
            '    color:#666666;\n' +
            '    border-right-color: #dddddd;\n' +
            '}\n' +


            //Set the search placeholder color
            //Need a separate line for each browser because when a browser doesn’t understand a selector, it invalidates the entire line of selectors

            /* Chrome/Opera/Safari */
            '::-webkit-input-placeholder {\n' + placeholderStyle +'}\n' +

            /* Firefox 19+ */
            '::-moz-placeholder {\n' + placeholderStyle +'}\n' +

            /* IE 10+ */
            ':-ms-input-placeholder {\n' + placeholderStyle +'}\n' +

            /* Firefox 18- */
            ':-moz-placeholder {\n' + placeholderStyle +'}\n' +

            '';

        addGlobalStyle(css);
    }

})();
