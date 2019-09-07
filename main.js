

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

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            r: this.r,
            draggable: this.draggable
        }
    }

    static addPoint(opts) {
        return new Point(opts)
    }


    create() {
        this.element = document.createElementNS(
            "http://www.w3.org/2000/svg", 'circle');

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
        this.x = x || this.x
        this.y = y || this.y

        this.element.setAttribute('cx', this.x)
        this.element.setAttribute('cy', this.y)

        this.path.onChange()
    }


}

class Path {
    constructor({ root, points = [], attrs = null }) {
        this.controls = ['L', 'Q', 'C']

        this.element = null;
        this.polyline = null;

        this.root = root;
        this.attrs = attrs;

        this.points = [];

        this.init(points);
    }


    init(points) {
        if (!this.element) {
            this.create();
        }

        this.Points = points;
        this.setPath();
    }

    create() {
        this.element = document.createElementNS(
            "http://www.w3.org/2000/svg", 'path');
        this.polyline = document.createElementNS(
            "http://www.w3.org/2000/svg", 'polyline');
        this.element.onChange = () => {
            this.setPath()
        }

        if (this.attrs) {
            for (let key in this.attrs) {
                this.element.setAttribute(key, this.attrs[key])
            }
        }


        this.element.setAttribute('d', '')

        this.root.insertBefore(this.polyline, this.root.firstElementChild)
        this.root.insertBefore(this.element, this.root.firstElementChild)
    }

    set Points(points) {
        this.points = points.map(p => {

            if (!p.control) {
                return new Point({
                    root: this.root,
                    path: this.element,
                    ...p
                })
            }

            return {
                control: this.controls[p.control],
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

    get Points() {
        let d = [];
        for (let item of this.points) {

            if (item instanceof Point) {
                d.push(item.toJSON())
            } else {
                d.push({
                    control: this.controls.indexOf(item.control),
                    points: item.points.map(i => i.toJSON())
                })
            }
        }

        return d;
    }

    setPath() {
        let d = [];

        if (this.points.length === 0) {
            return
        }


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

        this.polyline.setAttribute('points',
            d.filter(p => p.indexOf(',') !== -1).join(' '))

        this.element.setAttribute('d', 'M ' + d.join(' '))
    }

    get d() {
        const d = this.element.getAttribute('d')

        return d.split(' ')
            .map(e => (e.indexOf(',') !== -1 ?
                e.split(',').map(i => parseFloat(i)) : e))
    }

    set d(p) {
        this.element.setAttribute('d',
            p.map(e => Array.isArray(e) ? e.join(',') : e).join(' '))
    }

}


const SVG = {
    root: document.querySelector('#drawing svg'),
    paths: [],
    addPath(opts) {
        this.paths.push(new Path({
            root: this.root,
            ...opts
        }))
    }
}

const points = [
    {
        x: 90,
        y: 90,
        draggable: true
    },
    {
        control: 2,
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
        control: 1,
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



SVG.addPath({ points, attrs: { id: 'mypath' } })