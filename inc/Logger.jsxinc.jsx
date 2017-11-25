/**
 * @author Scott Lewis <scott@vectoricons.net>
 * @copyright 2017 Scott Lewis
 * @license MIT
 */

/**
 * Create a new logger instance.
 * @param name
 * @param folder
 * @constructor
 */
function Logger(name, folder) {

    /**
     * The log folder object.
     * @type {Folder}
     */
    this.folder = new Folder(folder);

    // Create the log folder if not exists.
    if (! this.folder.exists) {
        this.folder.create();
    }

    /**
     * Format date into a filename-friendly format.
     * @param date
     * @returns {string}
     */
    function dateFormat(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    /**
     * The log file.
     * @type {File}
     */
    this.file = new File(
        this.folder.absoluteURI + "/" + name + "-" + dateFormat(new Date().getTime()) + ".log"
    );

};

/**
 * Logger prototype.
 * @type {{
 *     types: {
 *         INFO: string,
 *         WARN: string,
 *         ERROR: string
 *     },
 *     info: Logger.info,
 *     warn: Logger.warn,
 *     error: Logger.error,
 *     log: Logger.log,
 *     remove: Logger.remove,
 *     create: Logger.create
 * }}
 */
Logger.prototype = {

    /**
     * Log message types.
     */
    types: {
        INFO  : localize({en_US: "INFO"}),
        WARN  : localize({en_US: "WARN"}),
        ERROR : localize({en_US: "ERROR"})
    },

    /**
     * Add info message to log.
     * @param message
     */
    info : function(message) {
        this.log(message, this.types.INFO);
    },

    /**
     * Add warning message to log.
     * @param message
     */
    warn : function(message) {
        this.log(message, this.types.WARN);
    },

    /**
     * Add error message to log.
     * @param message
     */
    error : function(message) {
        this.log(message, this.types.ERROR);
    },

    /**
     * Add message to log.
     * @param message
     */
    log : function(message, type) {
        Utils.write_file(
            this.file.absoluteURI,
            "[" + this.types[type] + "][" + new Date().toUTCString() + "] " + message
        );
    },

    /**
     * Delete log file.
     * @returns {*|Array}
     */
    remove : function() {
        if (this.file.exists) {
            return this.file.remove();
        }
    },

    /**
     * Create the log file.
     * @param message
     */
    create : function() {
        if (! this.file.exists) {
            return this.file.create();
        }
    }
};