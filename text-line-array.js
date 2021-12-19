
// text-line-array @ npm, text line array.

var DEAULT_MAX_LINE_NUMBER = 255;

//TextLineArrayClass( [lineArray] [, options] )
//options: { maxLineNumber, lineCallback } | maxLineNumber | lineCallback
function TextLineArrayClass(lineArray, options) {
	//arguments
	if (lineArray && !options && !(lineArray instanceof Array)) { options = lineArray; lineArray = null; }

	this.lineArray = lineArray || [];

	var typeofOptions = typeof options;

	if (typeofOptions === "function") this.lineCallback = options;
	else if (typeofOptions === "number") this.maxLineNumber = options;
	else if (options) {
		if (options.lineCallback) this.lineCallback = options.lineCallback;
		if (options.maxLineNumber) this.lineCallback = options.maxLineNumber;
	}
}

TextLineArrayClass.prototype = {
	lineArray: null,		//buffer

	maxLineNumber: DEAULT_MAX_LINE_NUMBER,
	lastLinePrefix: "",

	lineCallback: null,

	//.addText: function (text [, linePrefix] )
	addText: function (text, linePrefix) {
		//line prefix
		linePrefix = (linePrefix || "");

		var lineArray = this.lineArray;
		var lineCallback = this.lineCallback;

		//init line-array by linePrefix
		if (lineArray.length < 1) {
			lineArray[0] = linePrefix;
			if (linePrefix) this.lastLinePrefix = linePrefix;
		}

		var sa = text.split(/\r\n|\n\r|\n|\r/);

		//for last line in lineArray and the 1st line of the text
		if (linePrefix === this.lastLinePrefix) {
			lineArray[lineArray.length - 1] = lineArray[lineArray.length - 1] + sa[0];	//append to last
		}
		else {
			if (lineCallback) lineCallback(lineArray[lineArray.length - 1]);

			lineArray[lineArray.length] = linePrefix + sa[0];	//new line for new line-prefix
			this.lastLinePrefix = linePrefix;
		}

		//add the rest
		var i, imax = sa.length - 1, s;
		if (imax > 0) {
			if (lineCallback) lineCallback(lineArray[lineArray.length - 1]);

			for (i = 1; i <= imax; i++) {
				lineArray[lineArray.length] = s = linePrefix ? (linePrefix + sa[i]) : sa[i];
				if (lineCallback && i != imax) lineCallback(s);		//line-callback for previous line
			}
		}

		//keep max line number
		if (lineArray.length > this.maxLineNumber) lineArray.splice(0, lineArray.length - this.maxLineNumber);
	},

	//.addLine: function (textArray [, linePrefix] )
	addLine: function (textArray, linePrefix) {
		if (!(textArray instanceof Array)) textArray = [textArray];

		//line prefix
		linePrefix = linePrefix || "";

		var lineArray = this.lineArray;
		var lineCallback = this.lineCallback;

		//callback for last line
		if (lineCallback && lineArray.length > 0) lineCallback(lineArray[lineArray.length - 1]);

		var imax = textArray.length - 1, s;
		for (var i = 0; i <= imax; i++) {
			lineArray[lineArray.length] = s = linePrefix ? (linePrefix + textArray[i]) : textArray[i];
			if (lineCallback && i != imax) lineCallback(s);		//line-callback for previous line
		}

		//save .linePrefix
		if (linePrefix || this.lastLinePrefix) this.lastLinePrefix = linePrefix;

		//keep max line number
		if (lineArray.length > this.maxLineNumber) lineArray.splice(0, lineArray.length - this.maxLineNumber);
	},

	endLine: function () { return this.addLine(""); },

};

//shortcut
var shortcuts = { "add": "addText", "end": "endLine" };
for (var i in shortcuts) {
	TextLineArrayClass.prototype[i] = TextLineArrayClass.prototype[shortcuts[i]];
}

//module

module.exports = exports = function (lineArray, options) {
	return new TextLineArrayClass(lineArray, options);
}

exports.class = TextLineArrayClass;
