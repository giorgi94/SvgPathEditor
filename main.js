
const points = [
    {
        "x": 90,
        "y": 90,
        "r": 5,
        "draggable": true
    },
    {
        "control": 2,
        "points": [
            {
                "x": 132,
                "y": 278,
                "r": 5,
                "draggable": true
            },
            {
                "x": 300,
                "y": 290,
                "r": 5,
                "draggable": true
            }
        ]
    },
    {
        "x": 350,
        "y": 150,
        "r": 5,
        "draggable": true
    },
    {
        "control": 1,
        "points": [
            {
                "x": 494,
                "y": 77,
                "r": 5,
                "draggable": true
            }
        ]
    },
    {
        "x": 550,
        "y": 350,
        "r": 5,
        "draggable": true
    }
]


SVG.addPath({ points, attrs: { id: 'mypath' } })