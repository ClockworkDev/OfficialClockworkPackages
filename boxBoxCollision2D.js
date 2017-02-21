CLOCKWORKRT.collisions.push({
    shape1: "box",
    shape2: "box",
    detector: function (b1, b2, data) {
        if (!((b1.x + b1.w) > b2.x && (b2.x + b2.w) > b1.x && (b1.z + b1.h) > b2.z && (b2.z + b2.h) > b1.z)) {
            return false;
        } else {
            return true;
        }
    }
});