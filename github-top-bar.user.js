// ==UserScript==
// @name        GitHubTopBar
// @namespace   https://github.com/tziporaziegler/GitHubTopBar/
// @description A user script for styling the GitHub top-bar
// @author      Tzipora Ziegler
// @include     https://github.com/*
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @version     1.2.9
// @run-at document-start
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var $ = window.jQuery;

(function() {
  'use strict';

  var nameSpace = 'GitHubTopBar-';
  var username = 'tziporaziegler';

  // Create variables for easy customization

  // size
  var paddingHeight = 5;
  const ELEMENT_HEIGHT = 32;
  var barHeight = ELEMENT_HEIGHT + paddingHeight * 2;
  const ICON_SIZE = 18;

  // colors
  var defaultColor = '#000000';
  var defaultHoverColor = '#555555';
  var defaultInverseHoverColor = '#FFFFFF';
  var defaultBackgroundColor = '#f5f5f5';
  var defaultBorderColor = '#e5e5e5';

  // icons
  var showOverviewIcon = true;
  var showReposIcon = true;
  var showStarsIcon = true;
  var showSettingsIcon = true;
  var showHelpIcon = false;
  var showSignOutIcon = false;

  // other
  var isSticky = true;

  if (document.readyState === 'loading') {
    doTasksRequiringHeader(whenHeaderExists);
    window.addEventListener('DOMContentLoaded', afterLoaded);
  } else {
    doTasksRequiringHeader(whenHeaderExists);
    afterLoaded();
  }

  function whenHeaderExists() {
    // Check to ensure a header tag exists
    if ($('header')) {
      removeTabs();
      addIcons();
      removeMenuItems();

      setSize();
      setStickiness();
      setColor();
      styleSearchBar();
    }
  }

  var observerForContainer;

  function doTasksRequiringHeader(callback) {
    // Observe document.body for elements. Run the callback when the container (first after the top-bar) exists.
    // This results in the callback running immediately after the top-bar exists.
    if ($('header') === null) {
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

  /* function afterLoaded() {
    // Tasks to be run after the document is loaded.
    if (window.location.pathname.startsWith('/settings/')) {
        constructPreferences();
    }
  } */

  function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) {
      return;
    }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  function removeTabs() {
    //Remove Marketplace tab
    $('header nav a:contains("Marketplace")').remove();
  }

  function addIcons() {
    let parent = $('header');
    let firstItem = $(parent).find('.octicon-bell').closest('.Header-item');
    let avatar = $(parent).find('.avatar');

    // Replace profile pic dropdown menu with link to profile page
    //$(avatar).closest('details').replaceWith(avatar);
    //$(avatar).wrap('<span><a href="/' + username + '" aria-label="Profile" class="tooltipped tooltipped-s"></a></span>');

    /* Any SVG icon will work. Just need to include the svg path/shape with the correct viewBox dimensions:
      GitHub Octicons: https://octicons.github.com/
                       https://github.com/primer/octicons/tree/master/lib/svg
      Font Awesome: https://github.com/encharm/Font-Awesome-SVG-PNG/tree/master/black/svg
    */

    var menuItems = [{
        tooltip: 'Overview',
        url: '/' + username,
        icon: ' <path d="M12,14.002 C12,14.553 11.553,15 11.002,15 L1.001,15 C0.448,15 0,14.552 0,13.999 L0,13 C0,10.367 4,9 4,9 C4,9 4.229,8.591 4,8 C3.159,7.38 3.056,6.41 3,4 C3.173,1.587 4.867,1 6,1 C7.133,1 8.827,1.586 9,4 C8.944,6.41 8.841,7.38 8,8 C7.771,8.59 8,9 8,9 C8,9 12,10.367 12,13 L12,14.002 Z" id="Shape"></path>',
        viewBoxWidth: 12,
        viewBoxHeight: 16,
        target: '_self',
        before: true,
        visible: showOverviewIcon
      },
      {
        tooltip: 'Repos',
        url: '/' + username + '?tab=repositories',
        icon: ' <path d="M4,9 L3,9 L3,8 L4,8 L4,9 L4,9 Z M4,6 L3,6 L3,7 L4,7 L4,6 L4,6 Z M4,4 L3,4 L3,5 L4,5 L4,4 L4,4 Z M4,2 L3,2 L3,3 L4,3 L4,2 L4,2 Z M12,1 L12,13 C12,13.55 11.55,14 11,14 L6,14 L6,16 L4.5,14.5 L3,16 L3,14 L1,14 C0.45,14 0,13.55 0,13 L0,1 C0,0.45 0.45,0 1,0 L11,0 C11.55,0 12,0.45 12,1 L12,1 Z M11,11 L1,11 L1,13 L3,13 L3,12 L6,12 L6,13 L11,13 L11,11 L11,11 Z M11,1 L2,1 L2,10 L11,10 L11,1 L11,1 Z" id="Shape"></path>',
        viewBoxWidth: 12,
        viewBoxHeight: 16,
        target: '_self',
        before: true,
        visible: showReposIcon
      },
      {
        tooltip: 'Stars',
        url: '/' + username + '?tab=stars',
        icon: '<polygon id="Shape" points="14 6 9.1 5.36 7 1 4.9 5.36 0 6 3.6 9.26 2.67 14 7 11.67 11.33 14 10.4 9.26"></polygon>',
        viewBoxWidth: 14,
        viewBoxHeight: 16,
        target: '_self',
        before: true,
        visible: showStarsIcon
      },
      {
        tooltip: 'Help',
        url: 'https://help.github.com/',
        icon: '<path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"/>',
        viewBoxWidth: 1792,
        viewBoxHeight: 1792,
        target: '_blank',
        before: false,
        visible: showHelpIcon
      },
      {
        tooltip: 'Settings',
        url: '/settings/profile',
        icon: '<path d="M14,8.77 L14,7.17 L12.06,6.53 L11.61,5.44 L12.49,3.6 L11.36,2.47 L9.55,3.38 L8.46,2.93 L7.77,1.01 L6.17,1.01 L5.54,2.95 L4.43,3.4 L2.59,2.52 L1.46,3.65 L2.37,5.46 L1.92,6.55 L0,7.23 L0,8.82 L1.94,9.46 L2.39,10.55 L1.51,12.39 L2.64,13.52 L4.45,12.61 L5.54,13.06 L6.23,14.98 L7.82,14.98 L8.45,13.04 L9.56,12.59 L11.4,13.47 L12.53,12.34 L11.61,10.53 L12.08,9.44 L14,8.75 L14,8.77 Z M7,11 C5.34,11 4,9.66 4,8 C4,6.34 5.34,5 7,5 C8.66,5 10,6.34 10,8 C10,9.66 8.66,11 7,11 L7,11 Z" id="Shape"></path>',
        viewBoxWidth: 14,
        viewBoxHeight: 16,
        target: '_blank',
        before: false,
        visible: showSettingsIcon
      },
      {
        tooltip: 'Sign Out',
        url: '', //need to add button functionality
        icon: '<path d="M12,9 L12,7 L8,7 L8,5 L12,5 L12,3 L16,6 L12,9 L12,9 Z M10,12 L6,12 L6,3 L2,1 L10,1 L10,4 L11,4 L11,1 C11,0.45 10.55,0 10,0 L1,0 C0.45,0 0,0.45 0,1 L0,12.38 C0,12.77 0.22,13.11 0.55,13.29 L6,16.01 L6,13 L10,13 C10.55,13 11,12.55 11,12 L11,8 L10,8 L10,12 L10,12 Z" id="Shape"></path>',
        viewBoxWidth: 16,
        viewBoxHeight: 16,
        target: '_self',
        before: false,
        visible: showSignOutIcon
      }
    ];

    for (let obj of menuItems) {
      if (obj.visible) {
        let element = `
                    <div class="Header-item">
                       <a aria-label="${obj.tooltip}" class="Header-link tooltipped tooltipped-s" href="${obj.url}" target="${obj.target}">
                            <span class="mail-status "></span>
                            <svg viewBox="0 0 ${obj.viewBoxWidth} ${obj.viewBoxHeight}" width="${ICON_SIZE}" height="${ICON_SIZE}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                ${obj.icon}
                            </svg>
                        </a>
                    </div>`;

        if (obj.before) {
          firstItem.before(element);
        } else {
          firstItem.after(element);
        }
      }
    }
  }

  function removeMenuItems() {
    let parent = $('header .avatar').closest('details').find('details-menu');

    if (showOverviewIcon) {
      $(parent).find('a:contains("Your profile")').remove();
    }

    if (showStarsIcon) {
      $(parent).find('a:contains("Your stars")').remove();
    }

    if (showHelpIcon) {
      $(parent).find('a:contains("Help")').remove();
    }

    if (showSettingsIcon) {
      $(parent).find('a:contains("Settings")').remove();
    }

    if (showSignOutIcon) {
      $(parent).find('a:contains("Sign Out")').remove();
    }
  }

  function setSize() {
    // Control header height by changing padding height
    let css = `
            .Header {
                padding-top: ${paddingHeight}px;
                padding-bottom: ${paddingHeight}px;
                line-height: normal;
            }`;
    addGlobalStyle(css);
  }

  function setStickiness() {
    if (isSticky) {
      $('.js-header-wrapper').after(
        `<div id="sticky-placeholder-div" style="padding-top: ${barHeight}px;"></div>`
      );

      let css = `
                .js-header-wrapper {
                    width:100%;
                    position: fixed !important;
                    z-index: 999;
                }

                .user-profile-nav.is-stuck {
                    margin-top: ${barHeight}px !important;
                }

                ${/*No need to have profile visible twice, since already visible in stick top-bar*/''}
                .user-profile-sticky-bar.is-stuck {
                    opacity:0 !important;
                }

                `;

      addGlobalStyle(css);
    }
  }

  function setColor() {
    let css = `
            .Header {
                background-color: ${defaultBackgroundColor};
                border-bottom: 1px solid ${defaultBorderColor};
            }

            .Header .octicon-mark-github,
            .Header a,
            .Header .Header-link {
                color: ${defaultColor};
            }

            .Header .octicon-mark-github:hover,
            .Header .octicon-mark-github:focus,
            .Header a:not([role=menuitem]):hover,
            .Header a:not([role=menuitem]):focus,
            .Header-link .octicon-plus:hover,
            .Header-link .octicon-plus:focus {
                color: ${defaultHoverColor};
                fill: ${defaultHoverColor};
            }

            .Header-link .dropdown-caret:hover,
            .Header-link .dropdown-caret:focus {
                border-top-color: ${defaultHoverColor};
            }

            `;

    addGlobalStyle(css);
  }

  function styleSearchBar() {
    let placeholderStyle = `color:#999 !important;`;

    let css = `
            .Header .header-search-wrapper {
                background-color:white;
                border: 1px solid ${defaultBorderColor};
            }

            .Header .header-search-wrapper.focus {
                background-color:#fefefe;
                border: 1px solid ${defaultBorderColor};
            }

            .Header .header-search-scope,
            .Header .header-search-wrapper.focus .header-search-scope {
                color:#666666;
                border-right-color: #dddddd;
            }


            ${/*Set the search placeholder color.
                Need a separate line for each browser because when a browser doesn’t understand a selector, it invalidates the entire line of selectors.*/''}

            ${/* Chrome/Opera/Safari */''}
            ::-webkit-input-placeholder {
                ${placeholderStyle}
            }

            ${/* Firefox 19+ */''}
            ::-moz-placeholder {
                ${placeholderStyle}
            }

            ${/* IE 10+ */''}
            :-ms-input-placeholder {
                ${placeholderStyle}
            }

            ${/* Firefox 18- */''}
            :-moz-placeholder {
                ${placeholderStyle}
            }

            `;

    addGlobalStyle(css);
  }

  function constructPreferences() {
    //$('nav:first() a:nth-child(2)').after('<a href="/settings/display" class="js-selected-navigation-item menu-item" data-selected-links=" /settings/display">Display</a>');
    $('nav:first() a:nth-child(2)').after('<a id="display-nav" href="#" class="js-selected-navigation-item menu-item" data-selected-links=" /settings/display">Display</a>');
    document.getElementById("display-nav").addEventListener("click", showDisplayPrefsPage);
  }

  function showDisplayPrefsPage() {
    $('.Subhead .Subhead-heading').text('Display');
    $('.menu-item').removeClass('selected');
    $("#display-nav").addClass('selected');
  }

})();
