// global, for html page
text_line_array = require("../text-line-array.js");

module.exports = {

	"text_line_array()": function (done) {

		//TextLineArrayClass( [lineArray] [, options] )
		//options: { maxLineNumber, lineCallback } | maxLineNumber | lineCallback
		var tla = text_line_array();

		//.addText: function (text [, linePrefix] )
		tla.add("a");
		tla.add("b\nc");
		tla.add("d\n");
		tla.add("\ne\n");
		tla.add("e2");
		tla.add("f", "p1:");
		tla.add("g\nh", "p1:");
		tla.add("i\nj", "p2:");
		tla.add("k");
		tla.add("k2");
		//.addLine: function (textArray [, linePrefix] )
		tla.addLine(["k3", "k4"]);
		tla.add("k5");
		tla.addLine(["k6", ""]);
		tla.add("k7");
		tla.addLine("k8");

		console.log(tla.lineArray);

		done(!(
			tla.lineArray.join("\n") === [
				"ab",
				"cd",
				"",
				"e",
				"e2",
				"p1:fg",
				"p1:h",
				"p2:i",
				"p2:j",
				"kk2",
				"k3",
				"k4k5",
				"k6",
				"k7",
				"k8",
			].join("\n")
		));
	},

	"prefix at first": function (done) {

		var tla = text_line_array();

		tla.add("f", "p1:");
		tla.add("g\nh", "p1:");
		tla.add("i\nj", "p2:");
		tla.add("k");
		tla.add("k2");

		console.log(tla.lineArray);

		done(!(
			tla.lineArray.join("\n") === [
				"p1:fg",
				"p1:h",
				"p2:i",
				"p2:j",
				"kk2",
			].join("\n")
		));
	},

	"lineCallback": function (done) {

		var buf = [];
		var cb = function (s) { buf.push(s); }

		var tla = text_line_array({ lineCallback: cb });

		tla.add("f", "p1:");
		tla.add("g\nh", "p1:");
		tla.add("i\nj", "p2:");
		tla.add("k");
		tla.add("k2");

		tla.end();	//like eof, for line-callback

		console.log(tla.lineArray);
		console.log(buf);

		done(!(
			tla.lineArray.join("\n") === (buf.join("\n") + "\n")
		));
	},

	"isEmpty()/clear()/toString()": function (done) {

		var tla = text_line_array();

		//.isEmpty()
		if (!tla.isEmpty()) { done("isEmpty fail"); return; }
		tla.add("");
		if (!tla.isEmpty()) { done("isEmpty fail"); return; }

		tla.add("f", "p1:");
		tla.add("g\nh", "p1:");
		tla.add("i\nj", "p2:");

		tla.clear();
		if (!tla.isEmpty()) { done("isEmpty fail"); return; }

		tla.add("k");
		tla.add("k2");

		console.log(tla.lineArray);

		done(!(
			//.toString()
			("" + tla) == [
				"kk2",
			].join("\n")
		));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
