# Adobe Illustrator JSX Scripting Demos

This repository is a collection of JSX scripts for Adobe Illustrator. Also included in 
the repo are some useful utilities like Logger, Progress, and Utils.

### Author
Scott Lewis <scott@vectoricons.net>

### Copyright 
2017 Scott Lewis

While I do wish to retain the copyright to the code, you are welcome to copy, modify, re-use, re-distribute, 
whatever you want. If you use it, it would be nice to have a credit and a link to my webiste at <https://vectoricons.net>.

### Version 
1.0.0

### About

This script is a simple demo of an Adobe Illustrator ExtendScript written using the Module pattern.
The script doesn't really do anything except demonstrate a rough outline for how to build clean,
readable and well-organized scripts for Adobe Illustrator. Others, no doubt, have different
ideas but I am always trying to make my code cleaner, better organized, more reusable, and
more extensible.

****

### Usage

#### My Module
1. Place the entire illustrator-jsx-demos folder in Applications > Adobe Illustrator > Presets > en_US > Scripts
2. Restart Adobe Illustrator to activate the script
3. The script will be available under menu File > Scripts > jsx-illustrator-demos > My Module

#### Progress Bar Demo
1. Place the entire illustrator-jsx-demos folder in Applications > Adobe Illustrator > Presets > en_US > Scripts
2. Restart Adobe Illustrator to activate the script
3. The script will be available under menu File > Scripts > jsx-illustrator-demos > Progress Bar Demo

If you want to incorporate a progress bar using the ProgressBar class in your app, everything you need is 
in `Progress Bar Demo.jsx`. First, just include the following at the top of your main file:

```
#includepath "/path/to/illustrator-jsx-demos/inc/";
#include "JSON.jsx";
#include "Utils.jsx";
#include "Logger.jsx";
#include "Progress.jsx";
```

Then simply call the `ProgressBar` constructor:

```
var progress = new ProgressBar(0, 100, 'Progess bar text');
```


Update the message without incrementing the counter:

```
progress.message('Update the text only');
```

Increment the counter inside of whatever loop you are using:

```
for (i = 0; i < 100; i++) {
    progress.update(localize({en_US: 'Processing item %1'}, i));
    $.sleep(500);
}
```
   
When your loop is finished, close the ProgressBar:

```
progress.close();
```

****

### NO WARRANTIES

You are free to use, modify, and distribute this script as you see fit.
No credit is required but would be greatly appreciated.

THIS SCRIPT IS OFFERED AS-IS WITHOUT ANY WARRANTY OR GUARANTEES OF ANY KIND.
YOU USE THIS SCRIPT COMPLETELY AT YOUR OWN RISK AND UNDER NO CIRCUMSTANCES WILL
THE DEVELOPER AND/OR DISTRIBUTOR OF THIS SCRIPT BE HELD LIABLE FOR DAMAGES OF
ANY KIND INCLUDING LOSS OF DATA OR DAMAGE TO HARDWARE OR SOFTWARE. IF YOU DO
NOT AGREE TO THESE TERMS, DO NOT USE THIS SCRIPT.

****

### Road Map

1. JSX -> NodeJS Proof-of-concept
2. JSX -> NodeJS REST implementation
3. JSX -> Google Chrome Plugin proof-of-concept
4. Create a re-usable library of common JSX elements & tools

****

### References

Below is a list of references I have found useful for learning Extendscript for Illustrator. 
This list is by no means exhaustive. 

* Full ExtendSript API & Class reference : https://yearbook.github.io/esdocs/#/
* Adobe Scripting Resources : https://www.adobe.com/devnet/scripting.html
* Adobe Illustrator Scripting Resources : https://www.adobe.com/devnet/illustrator/scripting.html
* ExtendScript Toolkit : https://www.adobe.com/products/extendscript-toolkit.html
* Adobe CEP Resources : https://github.com/Adobe-CEP/CEP-Resources
* fabianmoronzirfas examples : https://github.com/fabianmoronzirfas/extendscript-101
* More from Fabian : https://github.com/fabianmoronzirfas/extendscript
* Must-have Scripts on Astute Graphics : https://astutegraphics.com/blog/30-must-free-illustrator-scripts-2/
* P. J. Onori / Waybury Iconic scripts : https://github.com/somerandomdude/Iconic
* Sublime-ExtendScript : https://github.com/ExtendScript/Sublime-ExtendScript
* Examples from jtnimoy : https://github.com/jtnimoy/scripting-for-illustrator-tutorial
* ExtendScript Toolkit Doco : http://estk.aenhancers.com/index.html
* JavaScript Design Patterns : https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know
* More JS Design Patterns : http://shichuan.github.io/javascript-patterns/
* Still More JS Design Patterns : https://github.com/addyosmani/essential-js-design-patterns
* Still More JS Design Patterns : http://www.dofactory.com/javascript/design-patterns
* More to come ...
