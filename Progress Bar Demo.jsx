/**
 * @author      Scott Lewis <scott@iconify.it>
 * @copyright   2017 Scott Lewis
 * @version     1.0.0
 * @url         http://github.com/iconifyit
 *
 * ABOUT:
 *
 *    This script demonstrates how to implement a progress bar in your script.
 *
 * USAGE:
 *
 * 1. Place this script in Applications > Adobe Illustrator > Presets > en_US > Scripts
 * 2. Restart Adobe Illustrator to activate the script
 * 3. The script will be available under menu File > Scripts > Progress Bar Demo
 *
 * NO WARRANTIES:
 *
 *   You are free to use, modify, and distribute this script as you see fit.
 *   No credit is required but would be greatly appreciated.
 *
 *   THIS SCRIPT IS OFFERED AS-IS WITHOUT ANY WARRANTY OR GUARANTEES OF ANY KIND.
 *   YOU USE THIS SCRIPT COMPLETELY AT YOUR OWN RISK AND UNDER NO CIRCUMSTANCES WILL
 *   THE DEVELOPER AND/OR DISTRIBUTOR OF THIS SCRIPT BE HELD LIABLE FOR DAMAGES OF
 *   ANY KIND INCLUDING LOSS OF DATA OR DAMAGE TO HARDWARE OR SOFTWARE. IF YOU DO
 *   NOT AGREE TO THESE TERMS, DO NOT USE THIS SCRIPT.
 */

/**
 * Give the script a name.
 */
#script "Progress Bar Demo";

/**
 * Declare the target app.
 */
#target illustrator

/**
 * Set includes path.
 * This can be a semi-colon separated list.
 */
#includepath "/Users/scott/github/iconify/illustrator-jsx-demos/inc/";

/**
 * Include the libraries we need.
 * Includes can be a file name only. No leading slash /.
 */
#include "JSON.jsx";
#include "Utils.jsx";
#include "Logger.jsx";
#include "Progress.jsx";

/**
 * Disable Illustrator's alerts.
 */
Utils.displayAlertsOff();

/**
 * Set some global variables.
 */
var DATE_STRING      = Utils.dateFormat(new Date().getTime());

/**
 * @type {{
 *    APP_NAME   : sring,
 *    SRCFOLDER  : string,
 *    LOGFOLDER  : string,
 *    LOGFILE    : string
 * }}
 */
var CONFIG = {
    APP_NAME         : "progress-bar-demo",
    LOGFOLDER        : $.getenv("HOME") + "/progress-bar-demo/var/logs",
    LOGFILE          : $.getenv("HOME") + "/progress-bar-demo/var/logs/log-"  + DATE_STRING  + "-r1.log"
};

/**
 * Run the script using the Module pattern. This pattern isn't required,
 * but it is a nice clean and organized way to write the code. It also avoids
 * cluttering the global scope.
 */
var ProgressBarDemo = (function(CONFIG) {

    /**
     * Callback to open the selected session.
     */
    function main() {

        var max = 30;

        var progress = new ProgressBar(0, max, 'Progress Bar Demoing');

        // Update only the text message but not the counter.
        progress.message(
            localize({en_US: 'You can change only the message.'})
        );

        // Increment the counter up to max
        for (i = 0; i < max; i++) {
            progress.update(localize({en_US: 'Processing item %1'}, i));
            $.sleep(500);
        }

        progress.close();
    };

    /**
     * Returns the public module object/interface.
     */
    return {
        /**
         * Runs the module code.
         */
        run: function() {
            main();
        }
    }

})(CONFIG);


/**
 * Run the module.
 */
ProgressBarDemo.run();
