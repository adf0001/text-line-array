# text-line-array
text line array

# Install
```
npm install text-line-array
```

# Usage & Api
```javascript

text_line_array = require("text-line-array");

//TextLineArrayClass( [lineArray] [, options] )
//options: { maxLineNumber=255, lineCallback } | maxLineNumber | lineCallback
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

console.log(tla.lineArray.join("\n"));

/*
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
*/

```
