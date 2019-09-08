const SVGResponsivePath = function ({ root, element, breakpoints }) {


    class Path {
        constructor({ root }) {
            this.element = null;
            this.root = root;
        }

        get d() {
            const d = this.element.getAttribute("d");

            return d.split(" ")
                .map(e => (e.indexOf(",") !== -1 ?
                    e.split(",").map(i => parseFloat(i)) : e));
        }

        set d(p) {
            this.element.setAttribute("d",
                p.map(e => Array.isArray(e) ? e.join(",") : e).join(" "));
        }
    }


    return {
        root,
        element,
        breakpoints,
        path: new Path(root)
    };
};