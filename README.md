# GitHubTopBar
A userscript for styling the GitHub top-bar.

![Top-Bar Screenshot][1]

This script gives the options to:

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
      
    If an icon exists as a menu item, if it is added to the top-bar directly, the menu item will be removed.

- Make the top-bar sticky:

      var isSticky = true;
      
- Hide the Gist and Marketplace tabs

[1]:https://github.com/tziporaziegler/GitHubTopBar/blob/master/top-bar-1.2.2.png
