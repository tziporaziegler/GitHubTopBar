// ==UserScript==
// @name        GitHubTopBar
// @namespace   https://github.com/tziporaziegler/GitHubTopBar/
// @description A user script for styling the GitHub top-bar
// @author      Tzipora Ziegler
// @include     http://github.com*
// @version     1.0
// @run-at document-start
// ==/UserScript==

(function() {
    //Remove Gist tab
    $('.header-nav li:nth-child(3)').remove();
})();


function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Change background to lightgrey. Reduce padding. Add grey bottom border.
addGlobalStyle ( 
    '.header{ background-color:#f5f5f5; padding-top:7px; padding-bottom: 7px; border-bottom:1px solid #e5e5e5; }' 
);

//Change nav items to black
addGlobalStyle ( 
    '.header-logo-invertocat .octicon-mark-github, .header-nav-link { color:black }'
);

//Fix search bar
addGlobalStyle ( 
    '.header .header-search-wrapper { background-color:white; border: 1px solid #e5e5e5; }'
);
