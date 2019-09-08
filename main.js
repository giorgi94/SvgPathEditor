
let points = [
    {
        "x": 90,
        "y": 90,
    },
    {
        "control": 2,
        "points": [
            {
                "x": 132,
                "y": 278,
            },
            {
                "x": 300,
                "y": 290,
            }
        ]
    },
    {
        "x": 350,
        "y": 150,
    },
    {
        "control": 1,
        "points": [
            {
                "x": 494,
                "y": 77,
            }
        ]
    },
    {
        "x": 550,
        "y": 350,
    },
];




SVG.addPath({ points, attrs: { id: "mypath" } });


const path = SVG.paths[0];