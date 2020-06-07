# GitHubTopBar

A userscript for styling the GitHub top-bar.

[![Top-Bar Screenshot][1]][1]

### Installation

- [GitHub][2]

### Features and Customization

This script gives options for the features listed below. To customize any feature, simply update the values on the top of the script. 

- Change the background, text and hover color:  

      var defaultColor = '#000000';
      var defaultHoverColor = '#555555';
      var defaultInverseHoverColor = '#FFFFFF';
      var defaultBackgroundColor = '#f5f5f5';
      var defaultBorderColor = '#e5e5e5';
      
   By default, the colors are set the the old GitHub light-gray themed colors.
 
-  Remove the excess top and bottom padding, which changes the overall height of the top-bar:
   
       var paddingHeight = 5;

- Choose which icons to display directly in the top-bar:

      var showOverviewIcon = true;
      var showReposIcon = true;
      var showStarsIcon = true;
      var showSettingsIcon = true;
      var showHelpIcon = false;
      var showSignOutIcon = false;
      
  If a shortcut exists as a menu item in the "+" dropdown menu, if it is added as an icon to the top-bar directly, the corresponding menu item will automatically be removed.

- Make the top-bar sticky:

      var isSticky = true;
      
- Hide menu tabs:

      var menuItemsToRemove = ['Marketplace', 'Explore'];
  
  By default, the "Marketplace" and "Explore" tabs are hidden. To hide addional tabs, add a string with the exact tab name to the array, like `'Pull requests'` or `'Issues'`. To show all tabs, set the value to `[]`.

[1]: https://github.com/tziporaziegler/GitHubTopBar/blob/master/top-bar-1.2.2.png
[2]: https://github.com/tziporaziegler/GitHubTopBar/raw/master/github-top-bar.user.js
