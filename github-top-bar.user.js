// ==UserScript==
// @name        GitHubTopBar
// @namespace   https://github.com/tziporaziegler/GitHubTopBar/
// @description A user script for styling the GitHub top-bar
// @author      Tzipora Ziegler
// @include     https://github.com/*
// @version     1.5
// @run-at document-start
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

(function() {
    //Remove Gist and Marketplace tabs
    $('[role=navigation] li:nth-child(n+3)').remove();
})();

function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Change background to lightgrey. Reduce top and bottom padding. Add grey bottom border.
addGlobalStyle (
    '.Header{ background-color:#f5f5f5; padding-top:7px; padding-bottom: 7px; border-bottom:1px solid #e5e5e5; }'
);

//Change nav items to black
addGlobalStyle (
    '.header-logo-invertocat .octicon-mark-github, .user-nav a, .Header .header-search-input, .HeaderNavlink { color:black }'
);

addGlobalStyle (
    '.header-logo-invertocat .octicon-mark-github:hover, .user-nav a:hover, .user-nav a:focus, .HeaderNavlink:hover { color:#555555 }'
);

addGlobalStyle (
    '.user-nav a:hover .dropdown-caret, .user-nav a:focus .dropdown-caret { border-top-color: #555555; }'
);

//Fix search bar
addGlobalStyle (
    '.Header .header-search-wrapper { background-color:white; border: 1px solid #e5e5e5; }'
);

addGlobalStyle (
    '.Header .header-search-wrapper.focus { background-color:#fefefe; border: 1px solid #e5e5e5; }'
);

addGlobalStyle (
    '.Header .header-search-scope, .Header .header-search-wrapper.focus .header-search-scope { color:#666666; border-right-color:#dddddd; }'
);

//Set the search placeholder color
//Need a separate line for each browser because when a browser doesn’t understand a selector, it invalidates the entire line of selectors
addGlobalStyle (
    /* Chrome/Opera/Safari */
    '::-webkit-input-placeholder { color:#999 !important; }'
);
addGlobalStyle (
    /* Firefox 19+ */
    '::-moz-placeholder { color:#999 !important; }'
);
addGlobalStyle (
    /* IE 10+ */
    ':-ms-input-placeholder { color:#999 !important; }'
);
addGlobalStyle (
    /* Firefox 18- */
    ':-moz-placeholder { color:#999 !important; }'
);
