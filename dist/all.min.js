// Make an instance of two and place it on the page.
var elem = document.getElementById('bork');
var params = { width: document.body.clientWidth, height: document.body.clientHeight };
var two = new Two(params).appendTo(elem);


// From clrs.cc
var colors = [
	"#7FDBFF",
	"#0074D9",
	"#01FF70",
	"#001F3F",
	"#39CCCC",
	"#3D9970",
	"#2ECC40",
	"#FF4136",
	"#85144B",
	"#FF851B",
	"#B10DC9",
	"#FFDC00",
	"#F012BE",
	"#aaa",
	"#fff",
	"#111",
	"#ddd"
];

// Load Skullz
var skullz = [];
for (var i = 0; i < 100; i++)
{
	skullz.push(two.interpret(document.getElementById('skullySkull')));
}

// Loop through skulls and fuck about with them
for (var i = skullz.length - 1; i >= 0; i--)
{
	skullz[i].translation.x = Math.random()*params.width - skullz[i].getBoundingClientRect().width;
	skullz[i].translation.y = Math.random()*params.height - skullz[i].getBoundingClientRect().height;
	skullz[i].fill = colors[Math.floor(Math.random() * colors.length)];
	skullz[i].opacity = 0.5;
}

// Render
two.update();