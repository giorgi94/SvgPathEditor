

function dragPoint(point) {

    const root = point.root
    const element = point.element

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();

        if (e.which !== 1) {
            return;
        }

        pos3 = e.clientX;
        pos4 = e.clientY;

        root.onmouseup = closeDragElement;
        root.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        point.move(-pos1, -pos2)
    }

    function closeDragElement() {
        root.onmouseup = null;
        root.onmousemove = null;
    }
}

class Point {

    constructor({ root, x, y, r = 5,
        path = null, type = 'vertex', draggable = false,
    }) {
        this.element = null

        this.root = root
        this.type = type

        this.path = path;

        this.x = x;
        this.y = y;
        this.r = r;

        this.draggable = draggable

        this.create()
    }

    static addPoint(opts) {
        return new Point(opts)
    }


    create() {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        const attrs = {
            class: `point ${this.type}`,
            cx: this.x,
            cy: this.y,
            r: this.r
        }

        for (let key in attrs) {
            this.element.setAttribute(key, attrs[key])
        }

        if (this.draggable) {
            dragPoint(this)
        }

        this.root.appendChild(this.element)
    }

    move(dx, dy) {
        const x = this.pos.x + dx
        const y = this.pos.y + dy

        this.pos = { x, y }
    }


    get pos() {
        const x = parseInt(this.element.getAttribute('cx'))
        const y = parseInt(this.element.getAttribute('cy'))

        return { x, y }
    }

    set pos({ x, y }) {
        this.element.setAttribute('cx', x || this.x)
        this.element.setAttribute('cy', y || this.y)

        this.path.onChange()
    }


}

class Path {
    constructor({ root, points }) {

        this.element = null;

        this.root = root;
        this._points = points;

        this.points = [];

        this.create();
        this.setPoints();
        this.setPath();
    }

    create() {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.element.onChange = this.onChange

        const attrs = {
            class: 'path',
            d: 'M 0,0'
        }

        for (let key in attrs) {
            this.element.setAttribute(key, attrs[key])
        }

        this.root.insertBefore(this.element, this.root.firstElementChild)
    }

    setPoints() {
        this.points = this._points.map(p => {

            if (!p.control) {
                return new Point({
                    root: this.root,
                    path: this.element,
                    ...p
                })
            }

            return {
                control: p.control,
                points: p.points.map(q => {
                    return new Point({
                        type: 'control',
                        root: this.root,
                        path: this.element,
                        ...q
                    })
                })
            }
        })
    }

    setPath() {
        let d = [];
        for (let item of this.points) {

            if (item instanceof Point) {
                let { x, y } = item.pos;
                d.push(`${x},${y}`)
            } else {
                d.push(item.control)
                for (let p of item.points) {
                    let { x, y } = p.pos;
                    d.push(`${x},${y}`)
                }
            }

        }

        this.element.setAttribute('d', 'M ' + d.join(' '))
    }


    onChange = () => {
        this.setPath()
    }
}


const SVG = {
    root: document.querySelector('#drawing svg'),
}


const path = new Path({
    root: SVG.root,
    points: [
        {
            x: 90,
            y: 90,
            draggable: true
        },
        {
            control: 'C',
            points: [
                {
                    x: 290,
                    y: 190,
                    draggable: true
                },
                {
                    x: 300,
                    y: 290,
                    draggable: true
                }
            ]
        },
        {
            x: 350,
            y: 150,
            draggable: true
        },
        {
            control: 'Q',
            points: [
                {
                    x: 350,
                    y: 250,
                    draggable: true
                },
            ]
        },
        {
            x: 550,
            y: 350,
            draggable: true
        },
    ]
})