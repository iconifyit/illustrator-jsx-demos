/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Scott Lewis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

/**
 * Set the base include path.
 */
#includepath "/Users/scott/github/iconify/jsx-common/";

/**
 * Include dependencies.
 */
#include "JSON.jsxinc";
#include "Logger.jsx";

/**
 * Lets get started.
 * @type {boolean}
 */
$.localize = true;

/**
 * @type {Logger}
 */
var logger = new Logger($.fileName, "/var/log/");

/**
 * Our base object.
 * @type {{}}
 */
var Utils = {};

/**
 * Turn off displaying alerts.
 */
Utils.displayAlertsOff = function() {
    userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
};

/**
 * Turn on displaying alerts.
 */
Utils.displayAlertsOn = function() {
    try {
        userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;
    }
    catch(e) {/* Exit Gracefully */}
}

/**
 * Get a value from an object or array.
 * @param   {object|array}    subject
 * @param   {string}          key
 * @param   {*}               dfault
 * @returns {*}
 */
Utils.get = function( subject, key, dfault ) {
    var value = dfault;
    if (typeof(subject[key]) != 'undefined') {
        value = subject[key];
    }
    return value;
};

/**
 * Open a file dialog.
 * @param   {File} file           The file object
 * @param   {String} title        The dialog title
 * @param   {String} file_filter  The file filter pattern
 * @returns {*}
 */
Utils.chooseFile = function(oFile, title, file_filter) {
    if (! oFile instanceof File) var oFile = new File();
    if (! title) var title  = LANG.CHOOSE_FILE;
    if (! filter) var filter = "*";
    return oFile.openDlg(
        title,
        file_filter,
        false
    );
};

/**
 * Gets the screen dimensions and bounds.
 * @returns {{left: *, top: *, right: *, bottom: *}}
 */
Utils.getScreenSize = function() {
    var screen;

    for (i=0; i<$.screens.length; i++) {
        if ($.screens[i].primary == true) {
            screen = $.screens[i];
            screen.width = screen.right - screen.left;
            screen.height = screen.bottom - screen.top;
        }
    }
    return screen;
};

/**
 * Create a new dialog, centered on screen.
 * @param type
 * @param width
 * @param height
 * @param title
 * @returns {window}
 */
Utils.window = function(type, title, width, height) {
    var dialog = new Window(
        type, title,
        [0, 0, width, height]
    );
    dialog.center();
    return dialog;
};

/**
 * Saves the file in AI format.
 * @param {document} doc            The document object to save
 * @param {string}   path           The file destination path
 * @param {int}      compatibility  The Adobe Illustrator format (version)
 * @return void
 */
Utils.saveFileAsAi = function( doc, path, compatibility ) {
    if (app.documents.length > 0) {
        var theDoc  = new File(path);
        var options = new IllustratorSaveOptions();
        if (typeof(compatibility) == 'undefined') {
            compatibility = Compatibility.ILLUSTRATOR19;
        }
        options.compatibility = compatibility;
        options.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
        options.pdfCompatible = true;
        doc.saveAs(theDoc, options);
    }
};

/**
 *
 * @param {string}  str
 * @returns {XML|string|void}
 */
Utils.trim = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
};

/**
 * Logging for this script.
 * @param {string} message      The logging text
 * @return void
 * @deprecated
 */
Utils.logger = function(message, line, filename) {

    if (! CONFIG) {
        CONFIG = {
            LOG_FOLDER    : "/var/log/",
            LOG_FILE_PATH : "/var/log/extendscript-utils-" + Utils.dateFormat(new Date().getTime()) + ".log"
        }
    }

    message = message + "\n" + $.error + "\n\nSTACK TRACE: \n\n" + $.stack;

    try {
        Utils.folder( CONFIG.LOG_FOLDER );
        Utils.write_file(CONFIG.LOG_FILE_PATH, "[" + new Date().toUTCString() + "] " + message);
    }
    catch(ex) {
        alert([line, filename, message].join(' - '));
    }
};

/**
 * Logging for this script.
 * @param {string}  path        The file path
 * @param {string}  txt         The text to write
 * @param {bool}    replace     Replace the file
 * @return void
 */
Utils.write_file = function( path, txt, replace ) {
    try {
        var file = new File( path );
        if (replace && file.exists) {
            file.remove();
            file = new File( path );
        }
        file.open("e", "TEXT", "????");
        file.seek(0,2);
        $.os.search(/windows/i)  != -1 ? file.lineFeed = 'windows'  : file.lineFeed = 'macintosh';
        file.writeln(txt);
        file.close();
    }
    catch(ex) {
        try { file.close(); }
        catch(ex) {/* Exit Gracefully*/}
    }
};

/**
 * Writes a file and calls a callback.
 * @param   {string}    path        The file path
 * @param   {string}    txt         The text to write
 * @param   {function}  callback    The callback to execute.
 * @returns {*}                     The result of the callback.
 */
Utils.write_and_call = function( path, txt, callback ) {
    try {
        var file = new File( path );
        if (file.exists) {
            file.remove();
            file = new File( path );
        }
        file.open("e", "TEXT", "????");
        file.seek(0,2);
        $.os.search(/windows/i)  != -1 ? file.lineFeed = 'windows'  : file.lineFeed = 'macintosh';
        file.writeln(txt);
        file.close();
        return callback.call(this, file);
    }
    catch(ex) {
        try {
            file.close();
        }
        catch(ex) {/* Exit Gracefully*/}
        throw ex;
    }
};

/**
 *
 * @param {string}  path
 * @param {object}  json
 * @param {bool}    replace
 */
Utils.write_json_file = function( path, json, replace ) {
    try {
        Utils.write_file(path, Utils.objectToString(json), replace);
    }
    catch(ex) {
        Utils.logger(ex, $.line, $.fileName);
    }
};

/**
 * Reads the contents of a file.
 * @param   {string}  filepath
 * @returns {string}
 */
Utils.read_file = function( filepath ) {

    var content = "";

    var theFile = new File(filepath);

    if (theFile) {

        try {
            if (theFile.alias) {
                while (theFile.alias) {
                    theFile = theFile.resolve().openDlg(
                        LANG.CHOOSE_FILE,
                        "",
                        false
                    );
                }
            }
        }
        catch(ex) {
            dialog.presetsMsgBox.text = ex.message;
        }

        try {
            theFile.open('r', undefined, undefined);
            if (theFile !== '') {
                content = theFile.read();
                theFile.close();
            }
        }
        catch(ex) {

            try { theFile.close(); }catch(ex){};
            Utils.logger(ex, $.line, $.fileName);
        }
    }
    return content;
};

/**
 *
 * @param {string}  filepath
 * @returns {*}
 */
Utils.read_json_file = function(filepath) {
    var contents, result;
    try {
        if ( contents = Utils.read_file( filepath ) ) {
            result = JSON.parse(contents);
            if ( typeof(result) != 'object') {
                result = null;
            }
        }
    }
    catch(ex) {
        Utils.logger(ex, $.line, $.fileName);
    }
    return result;
};

/**
 * Replace Mac's tilde home alias with full path.
 * @param {string}      path    The path to de-mac.
 * @returns {string}
 */
Utils.expand_path = function(path, root_path) {
    return path.replace('~/', root_path);
};

/**
 * Get saved configuration JSON.
 * @param {String}  config_file     Path to the config file.
 * @returns {{}}
 */
Utils.get_config = function(config_file) {
    var configFile = new File(config_file);
    if (configFile.exists) {
        return JSON.parse(Utils.read_file(configFile));
    }
    return {};
};

/**
 *
 * @param {string}  filepath
 * @param {bool}    mustconfirm
 */
Utils.deleteFile = function( filepath, mustconfirm ) {
    try {
        if (mustconfirm && ! confirm(LANG.CONFIRM_DELETE_PRESET)) {
            return;
        }
        new File(filepath).remove();
    }
    catch(ex) {
        Utils.logger($.line + ' - ' + $.fileName + ' - ' + $.error);
    }
};

/**
 * Initialize a folder.
 * @param {string}  path
 */
Utils.folder = function( path ) {
    var theFolder = new Folder( path );
    if (! theFolder.exists) {
        theFolder.create();
    }
    return theFolder;
};

/**
 * Get all files in sub-folders.
 * @param   {string}  srcFolder
 * @returns {Array}
 */
Utils.getFilesInSubfolders = function( srcFolder ) {

    var allFiles, theFolders, svgFileList;

    if ( ! srcFolder instanceof Folder) return;

    allFiles    = srcFolder.getFiles();
    theFolders  = [];
    svgFileList = [];

    for (var x=0; x < allFiles.length; x++) {
        if (allFiles[x] instanceof Folder) {
            theFolders.push(allFiles[x]);
        }
    }

    if (theFolders.length == 0) {
        svgFileList = srcFolder.getFiles(/\.svg$/i);
    }
    else {
        for (var x=0; x < theFolders.length; x++) {
            fileList = theFolders[x].getFiles(/\.svg$/i);
            for (var n = 0; n<fileList.length; n++) {
                svgFileList.push(fileList[n]);
            }
        }
    }
    return svgFileList;
};

/**
 * Format the date in YYYY-MM-DD format
 * @param {string}  date  The date in timestring format
 * @return {string} date string in YYYY-MM-DD format (2015-10-06)
 */
Utils.dateFormat = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

/**
 * Stringify an object.
 * @param   {object}  obj
 * @returns {string}
 */
Utils.objectToString = function(obj) {
    var items = [];
    for (key in obj) {
        var value = obj[key];
        if (typeof(value) == "array") {
            for (var i=0; i<value.length; i++) {
                value[i] = '"' + value[i] + '"';
            }
            value = '[' + value.join(',') + ']';
        }
        else if (typeof(value) == 'object') {
            value = objectToString(value);
        }
        items.push('"' + key + '": "' + value + '"');
    }
    return "{" + items.join(',') + "}";
};

/**
 * Align objects to nearest pixel.
 * @param {array}   sel     Selection array
 */
Utils.alignToNearestPixel = function(sel) {

    try {
        if (typeof sel != "object") {
            Utils.logger($.line + ' - ' + $.fileName + ' - ' + LANG.NO_SELECTION);
        }
        else {
            for (i = 0 ; i < sel.length; i++) {
                sel[i].left = Math.round(sel[i].left);
                sel[i].top = Math.round(sel[i].top);
            }
            redraw();
        }
    }
    catch(ex) {
        Utils.logger($.line + ' - ' + $.fileName + ' - ' + $.error);
    }
};

/**
 * Cleans up the filename/artboardname.
 * @param   {String}    name    The name to filter and reformat.
 * @returns  {String}            The cleaned up name.
 */
Utils.filterName = function(name) {
    return decodeURIComponent(name).replace(' ', '-');
}

/**
 * Test if all parents are visible & unlocked.
 * @param {object} item
 * @returns {boolean}
 */
Utils.isVisibleAndUnlocked = function(item) {
    return ! Utils.anyParentLocked(item) && ! Utils.anyParentHidden(item);
};

/**
 * Derived from P. J. Onori's Iconic SVG Exporter.jsx
 * @param {object} item
 * @returns {boolean}
 */
Utils.anyParentLocked = function(item) {
    while ( item.parent ) {
        if ( item.parent.locked ) {
            return true;
        }
        item = item.parent;
    }
    return false;
};

/**
 * Derived from P. J. Onori's Iconic SVG Exporter.jsx
 * @param {object} item
 * @returns {boolean}
 */
Utils.anyParentHidden = function(item) {
    while ( item.parent ) {
        if ( item.parent.hidden ) {
            return true;
        }
        item = item.parent;
    }
    return false;
};

/**
 * Groups selected items.
 * @returns void
 */
Utils.groupSelection = function() {
    try {
        app.executeMenuCommand('group');
    }
    catch(e) {
        alert(localize({en_US: "Items could not be grouped (line: %1, file: %2)"}, $.line, $.fileName));
    }
};

/**
 * Display a new progress bar.
 * @param maxvalue
 * @returns {*}
 */
Utils.showProgressBar = function(maxvalue) {

    var top, right, bottom, left;

    if ( bounds = Utils.getScreenSize() ) {
        left = Math.abs(Math.ceil((bounds.width/2) - (450/2)));
        top = Math.abs(Math.ceil((bounds.height/2) - (100/2)));
    }

    var progress = new Window("palette", 'Progress', [left, top, left + 450, top + 120]);
    progress.pnl = progress.add("panel", [10, 10, 440, 100], 'Progress');
    progress.pnl.progBar = progress.pnl.add("progressbar", [20, 45, 410, 60], 0, maxvalue);
    progress.pnl.progBarLabel = progress.pnl.add("statictext", [20, 20, 320, 35], "0 of " + maxvalue);

    progress.show();

    Utils.progress = progress;
};

/**
 * Updates the progress bar.
 * @param progress
 * @returns {*}
 */
Utils.updateProgress = function(message) {
    Utils.progress.pnl.progBar.value++;
    var val = Utils.progress.pnl.progBar.value;
    var max = Utils.progress.pnl.progBar.maxvalue;
    Utils.progress.pnl.progBarLabel.text = val + ' of ' + max + ' - ' + message;
    $.sleep(10);
    Utils.progress.update();
};

/**
 * Updates the progress bar.
 * @param progress
 * @returns {*}
 */
Utils.updateProgressMessage = function(message) {
    var val = Utils.progress.pnl.progBar.value;
    var max = Utils.progress.pnl.progBar.maxvalue;
    Utils.progress.pnl.progBarLabel.text = val + ' of ' + max + ' - ' + message;
    $.sleep(10);
    Utils.progress.update();
};

/**
 * Alias for localize function.
 * @param str
 * @param vars
 * @returns {*}
 */
Utils.i18n = function(str, vars) {
    return localize({en_US: str}, vars);
};

/**
 * Converts a string, array, or object to dash-separated string.
 * @param   {string|array|object}   subject    A string, array, or object to convert to a slug.
 * @returns {string}                           The cleaned up name.
 */
Utils.slugger = function(subject) {
    if (typeof(subject) == "array") {
        return subject.join('-');
    }
    else if (typeof(subject) == "object") {
        var bits = [];
        for (key in subject) {
            if (typeof(subject[key]) != "string") continue;
            bits.push(subject[key].toLowerCase());
        }
        return bits.join('-');
    }
    else if (typeof(subject) == "string") {
        return decodeURIComponent(subject).replace(' ', '-');
    }
    return subject;
};