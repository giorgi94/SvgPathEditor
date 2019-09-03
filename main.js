

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

    constructor({ root, type = 'vertex', x, y, r = 5, draggable = false }) {
        this.element = null

        this.root = root
        this.type = type

        this.x = x;
        this.y = y;
        this.r = r;

        this.draggable = draggable

        this.create(x, y, r, type)
    }

    static addPoint(opts) {
        return new Point(opts)
    }


    create(x, y, r, type) {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        const attrs = {
            class: `point ${type}`,
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
    }


}

const SVG = {
    root: document.querySelector('#drawing svg'),
    create(tagname, attrs = null) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", tagname);

        if (attrs) {
            for (let key in attrs) {
                el.setAttribute(key, attrs[key])
            }
        }

        this.root.appendChild(el)

        return el
    }
}


const c = Point.addPoint({
    root: SVG.root,
    x: 90,
    y: 90,
    draggable: true
})

const b = Point.addPoint({
    root: SVG.root,
    x: 290,
    y: 190,
    draggable: true
})
