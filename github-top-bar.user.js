// ==UserScript==
// @name        GitHubTopBar
// @namespace   https://github.com/tziporaziegler/GitHubTopBar/
// @description A user script for styling the GitHub top-bar
// @author      Tzipora Ziegler
// @include     https://github.com/*
// @version     1.2.1
// @run-at document-start
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require https://use.fontawesome.com/cf3b7450e0.js
// ==/UserScript==

(function() {
    'use strict';

    var header;
    var nameSpace = 'GitHubTopBar-';
    var username = 'tziporaziegler';

    //Create variables for easy customization
    var paddingHeight = 5;
    const ELEMENT_HEIGHT = 32;
    var barHeight = ELEMENT_HEIGHT + paddingHeight * 2;
    const ICON_SIZE = 18;

    var isFixed = true;
    var addMenuItemsToBar = true;

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
            changeMenuIntoIcons();

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

    function changeMenuIntoIcons(){
        if(addMenuItemsToBar)
        {
            let parent = $('.HeaderMenu ul.user-nav');

            let avatar = parent.find('.avatar');
            $(avatar).prop('href', '/' + username);

            var menuItems = [
                {
                    tooltip: 'Profile',
                    url: '/' + username,
                    icon: '<path d="M1536 1399q0 109-62.5 187t-150.5 78h-854q-88 0-150.5-78t-62.5-187q0-85 8.5-160.5t31.5-152 58.5-131 94-89 134.5-34.5q131 128 313 128t313-128q76 0 134.5 34.5t94 89 58.5 131 31.5 152 8.5 160.5zm-256-887q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5z"/>'
                },
                {
                    tooltip: 'Stars',
                    url: '/tziporaziegler?tab=stars',
                    icon: '<path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"/>'
                },
                {
                    tooltip: 'Settings',
                    url: '/settings/profile',
                    icon: '<path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/>'
                },
                {
                    tooltip: 'Help',
                    url: 'https://help.github.com/',
                    icon: '<path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"/>'
                },
                {
                    tooltip: 'Sign Out',
                    url: '/settings/profile',
                    icon: '<path d="M704 1440q0 4 1 20t.5 26.5-3 23.5-10 19.5-20.5 6.5h-320q-119 0-203.5-84.5t-84.5-203.5v-704q0-119 84.5-203.5t203.5-84.5h320q13 0 22.5 9.5t9.5 22.5q0 4 1 20t.5 26.5-3 23.5-10 19.5-20.5 6.5h-320q-66 0-113 47t-47 113v704q0 66 47 113t113 47h312l11.5 1 11.5 3 8 5.5 7 9 2 13.5zm928-544q0 26-19 45l-544 544q-19 19-45 19t-45-19-19-45v-288h-448q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h448v-288q0-26 19-45t45-19 45 19l544 544q19 19 19 45z"/>'
                }
            ];

            menuItems.forEach(function(element) {
                parent.append(
                    '<li class="dropdown js-menu-container"><span class="d-inline-block px-2">' +
                    '<a href="' + element.url + '" aria-label="' + element.tooltip + '" class="tooltipped tooltipped-s" style="top:3px">' +
                    '<svg width="' + ICON_SIZE + '" height="' + ICON_SIZE + '" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">' + element.icon + '</svg>' +
                    '</a></span></li>'
                );
            });
        }
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
