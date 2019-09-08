const SVGResponsivePath = function ({ root, element, breakpoints, bounded = true }) {

    function setd(p) {
        element.setAttribute("d",
            p.map(e => Array.isArray(e) ? e.join(",") : e).join(" "));
    }

    function getd() {
        const d = element.getAttribute("d");

        return d.split(" ")
            .map(e => (e.indexOf(",") !== -1 ?
                e.split(",").map(i => parseFloat(i)) : e));
    }

    function onresize() {
        const rootWidth = root.getBoundingClientRect().width;
        const bps = breakpoints.map(b => b[0]);

        const index = bps.findIndex(b => b < rootWidth);


        if (index === 0) {
            return setd(breakpoints[index][1]);
        }

        if (index === -1) {
            return setd(breakpoints[bps.length - 1][1]);
        }

        const [w1, p1] = breakpoints[index];
        const [w2, p2] = breakpoints[index - 1];

        const t = (rootWidth - w1) / (w2 - w1);


        const p = p1.map((a, i) => {
            if (!Array.isArray(a)) {
                return a;
            }

            const b = p2[i];

            return [
                t * b[0] + (1 - t) * a[0],
                t * b[1] + (1 - t) * a[1],
            ].map(i => parseInt(i));
        });


        setd(p);
    }

    function init() {


        window.addEventListener("resize", onresize);

        onresize();
    }




    init();
};