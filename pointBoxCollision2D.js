CLOCKWORKRT.collisions.register({
    shape1: "point",
    shape1dataSchema: {
        x: "<The x coordinate of the point>",
        y: "<The y coordinate of the point>"
    },
    shape2: "box",
    shape2dataSchema: {
        x: "<The x coordinate of the box>",
        y: "<The y coordinate of the box>",
        w: "<The width of the box>",
        h: "<The height of the box>"
    },
    description:"The collision happens when the point is inside the box.",
    detector: function (p, b, data) {
        if (p.x >= b.x && p.y >= b.y && p.x <= b.x + b.w && p.y <= b.y + b.h) {
            data.x = (p.x - b.x) / b.w;
            data.y = (p.y - b.y) / b.h;
            return true;
        } else {
            return false;
        }
    }
});