/**
 * @author      Scott Lewis <scott@vectoricons.net>
 * @description A wrapper for the ExtendScript progress bar.
 * @link        https://vectoricons.net
 * @license     The MIT License (MIT)
 * @copyright   2017 Scott Lewis
 */
/**
 * ProgressBar class.
 * @param start
 * @param end
 * @param message
 * @returns {{
 *     show    : show,
 *     update  : update,
 *     message : message,
 *     close   : close
 * }}
 * @constructor
 */
var ProgressBar = function(start, end, message) {

    /**
     * Set the `this` object to a variable available in this scope.
     * @type {ProgressBar}
     */
    var self = this;

    /**
     * Custom error message for the progress bar.
     * @param e
     * @returns {{message: *}}
     * @constructor
     */
    var ValueError = function(e) {
        return { message : e };
    };

    /**
     * The top coordinate of the progress bar bounds.
     * @type {number}
     */
    self.top = 0;

    /**
     * The left coordinate of the progress bar bounds.
     * @type {number}
     */
    self.left = 0;

    /**
     * Width of the progress bar.
     * @type {number}
     */
    self.width = 450;


    /**
     * Height of the progress bar.
     * @type {number}
     */
    self.height = 100;


    /**
     * The starting number of the progress bar.
     * @type {number}
     */
    //self.start = 0;

    /**
     * The number of increments of the progress bar.
     * @type {number}
     */
    //self.end = 100;

    /**
     * The internal window instance.
     * @type {null}
     */
    self.window = null;

    /**
     * Wrap setting the `start` value so we can enforce some rules.
     * @param value
     */
    self.setStart = function(value) {
        value  = parseInt(value);
        if (isNaN(value)) {
            throw new ValueError(
                localize({en_US: "`start` must be a numeric value greater than 1"})
            );
        }
        self.start = value;
    };

    /**
     * Wrap setting the `end` value so we can enforce some rules.
     * @param value
     */
    self.setEnd = function(value) {
        if (! value || isNaN(value)) {
            throw new ValueError(
                localize({en_US: "`end` must be a numeric value greater than 1"})
            );
        }
        self.end = value;
    };

    /**
     * Set the maxvalue of the progress bar.
     * @param maxvalue
     */
    self.setMaxValue = function(maxvalue) {
        self.window.pnl.progBar.maxvalue = maxvalue;
    };

    /**
     * Wrap setting the `message` text so we can enforce some rules.
     * @param message
     */
    self.setMessage = function(message) {
        if (typeof(message) != "string") {
            return;
        }
        self.window.pnl.progBarLabel.text = message;
        self.window.update();
    };

    /**
     * Get the current value of the progress bar counter.
     * @returns {*}
     */
    self.getValue = function() {
        return self.window.pnl.progBar.value;
    };

    /**
     * Get the max value of the progress bar.
     * @returns {number|*}
     */
    self.getMaxValue = function() {
        return self.window.pnl.progBar.maxvalue;
    };

    /**
     * Show the progress bar.
     */
    self.show = function() {
        try { self.window.close(); } catch(e){};
        this.window.show();
    };

    /**
     * Update the progress bar value.
     * @param message
     * @param value
     */
    self.update = function(message) {
        self.window.pnl.progBar.value++;
        self.setMessage(message);
        var val = self.getValue();
        var max = self.getMaxValue();
        self.setMessage(val + ' of ' + max + ' : ' + message);
        $.sleep(10);
        self.window.update();
    };

    /**
     * Close the progress bar.
     */
    self.close = function() {
        self.window.close();
    };

    /**
     * The main code to execute on run().
     * @param start
     * @param end
     */
    self.init = function(start, end, message) {

        var top, right, bottom, left;

        self.setStart(start);
        self.setEnd(end);

        self.top = 0;
        self.left = 0;
        self.width = 450;
        self.height = 100;

        if ( bounds = Utils.getScreenSize() ) {
            left = Math.abs(Math.ceil((bounds.width/2) - (self.width/2)));
            top = Math.abs(Math.ceil((bounds.height/2) - (self.height/2)));
        }

        self.window = new Window(
            'palette',
            localize({en_US: 'Progress'}),
            [left, top, left + self.width, top + self.height]
        );

        self.window.pnl = self.window.add(
            'panel',
            [10, 10, 440, 100],
            localize({en_US: 'Progress'})
        );

        self.window.pnl.progBar = self.window.pnl.add(
            'progressbar',
            [20, 35, 410, 60],
            0,
            end
        );

        self.window.pnl.progBarLabel = self.window.pnl.add(
            'statictext',
            [20, 15, 320, 25],
            "0 of " + end
        );

        self.setMaxValue(end);
        self.setMessage(message);

        self.show();
    };

    /**
     * Initialize the progress bar.
     */
    self.init(start, end, message);

    /**
     * Return the publicly-accessible object.
     */
    return {
        update: function(text, value) {
            self.update(text, value);
        },
        message: function(text) {
            self.setMessage(text);
        },
        close: function() {
            self.window.close();
        }
    };

};