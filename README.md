# About
 
 letter Run is a 2D platformer game developed using Phaser.js and Electron. 
 
 ## PLAY GAME
 https://forche.itch.io/letter-run-online
 
 ## DOWNLOAD GAME HERE
In order to play the game as a desktop application, go to the link below, extract the zipped file.
https://forche.itch.io/letter-run
 
 ## ASSETS
 https://bayat.itch.io/platform-game-assets

## COMMIT MESSAGE FORMAT

Commit Message should be informative for what is changed/removed/added. Example: “Added character select screen functionality” or “Changed settings page instructions” 



## HOW TO PACKAGE APP FOR DISTRIBUTION

* Make sure to install the electron-packager using npm install command.
~~~
npm install electron-packager --save-dev
~~~

* After the installation, the syntax for running electron-packager is listed below.
~~~
electron-packager <sourcedir> --platform=<platform> --arch=<arch> [optional flags...]
~~~

* Example to package LetterRun for Windows OS
~~~
electron-packager <sourcedir> --overwrite --platform=win32 --arch=ia32 --prune=true --out=<desired directory name>
~~~

* Example to package LetterRun for MacOS
~~~
electron-packager <sourcedir> --overwrite --platform=darwin --arch=x64 --prune=true --out=<desired directory name>
~~~

* To include custom icon, add following flag to your command
~~~
--icon=<your directory for icon>/<your icon file>
~~~

* For more details and flags to use...
~~~
electron-packager -h 
~~~

* Visit https://github.com/electron-userland/electron-packager for more details
