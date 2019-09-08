/* globals SVGEditor SVGResponsivePath */

const root = document.querySelector(".drawing svg");

let points = [{ "x": 40, "y": 148 }, { "control": 2, "points": [{ "x": 119, "y": 14 }, { "x": 404, "y": 370 }] }, { "x": 656, "y": 254 }, { "control": 2, "points": [{ "x": 940, "y": 125 }, { "x": 745, "y": 443 }] }, { "x": 1084, "y": 284 }, { "control": 2, "points": [{ "x": 1272, "y": 195 }, { "x": 1500, "y": 326 }] }, { "x": 1444, "y": 470 }];


// SVGEditor.root = root;
// SVGEditor.addPath({ points, attrs: { id: "my path" } });
// const path = SVGEditor.paths[0];

const breakpoints = [
    [1529, ["M", [40, 148], "C", [119, 14], [404, 370], [656, 254], "C", [940, 125], [745, 443], [1084, 284], "C", [1272, 195], [1500, 326], [1444, 470]]],
    [1289, ["M", [40, 148], "C", [119, 14], [404, 370], [656, 254], "C", [940, 125], [745, 443], [967, 339], "C", [1272, 195], [1099, 388], [1265, 465]]],
    [1122, ["M", [40, 148], "C", [119, 14], [404, 370], [656, 254], "C", [940, 125], [745, 443], [924, 289], "C", [1016, 209], [1099, 388], [948, 471]]],
    [863, ["M", [40, 148], "C", [119, 14], [200, 374], [437, 188], "C", [574, 82], [557, 374], [723, 212], "C", [827, 112], [756, 396], [844, 427]]]
];

// SVGResponsivePath({
//     root,
//     element: document.querySelector("#mypath"),
//     breakpoints,
//     bounded: true
// });