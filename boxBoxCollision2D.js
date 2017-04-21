CLOCKWORKRT.collisions.register({
    shape1: "box",
    shape1dataSchema: {
        x: "<The x coordinate of the box>",
        y: "<The y coordinate of the box>",
        w: "<The width of the box>",
        h: "<The height of the box>"
    },
    shape2: "box",
    shape2dataSchema: {
        x: "<The x coordinate of the box>",
        y: "<The y coordinate of the box>",
        w: "<The width of the box>",
        h: "<The height of the box>"
    },
    description: "The collision happens when one box overlaps with the other.",
    detector: function (b1, b2, data) {
        if (!((b1.x + b1.w) > b2.x && (b2.x + b2.w) > b1.x && (b1.y + b1.h) > b2.y && (b2.y + b2.h) > b1.y)) {
            return false;
        } else {
            return true;
        }
    }
});