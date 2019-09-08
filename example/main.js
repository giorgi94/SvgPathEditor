/* globals SVG */

let points = [{ "x": 25, "y": 26 }, { "control": 2, "points": [{ "x": 132, "y": 278 }, { "x": 300, "y": 290 }] }, { "x": 392, "y": 188 }, { "control": 2, "points": [{ "x": 494, "y": 77 }, { "x": 745, "y": 443 }] }, { "x": 847, "y": 290 }, { "control": 2, "points": [{ "x": 904, "y": 202 }, { "x": 1156, "y": 270 }] }, { "x": 1213, "y": 472 }];

SVG.root = document.querySelector("#drawing svg");


SVG.addPath({ points, attrs: { id: "my path" } });


const path = SVG.paths[0];