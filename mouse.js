CLOCKWORKRT.components.register([
    {
        name: "mouse",
        description: "This component allows you to incorporate mouse support to your game, via two point collisions for the mouse hover and click. It also generates click events.",
        events: [
            {
                name: "#setup", code: function (event) {
                    var manifest = CLOCKWORKRT.API.getManifest();
                    this.var.w = manifest.screenResolution.w;
                    this.var.h = manifest.screenResolution.h;
                    this.var.listener_click = this.do.onclick.bind(this);
                    this.engine.var["#DOM"].addEventListener("mousedown", this.var.listener_click, false);
                    this.var.listener_move = this.do.onmove.bind(this);
                    this.engine.var["#DOM"].addEventListener("mousemove", this.var.listener_move, false);
                    this.var.listener_up = this.do.mouseup.bind(this);
                    this.engine.var["#DOM"].addEventListener("mouseup", this.var.listener_up, false);
                }
            },
            {
                name: "#exit", code: function (event) {
                    this.engine.var["#DOM"].removeEventListener("mousedown", this.var.listener_click, false);
                    this.engine.var["#DOM"].removeEventListener("mousemove", this.var.listener_move, false);
                    this.engine.var["#DOM"].removeEventListener("mouseup", this.var.listener_up, false);
                }
            },
            {
                name: "onclick", code: function (e) {
                    this.var.timer = -1;
                    this.engine.do.click({ x: this.var.$x, y: this.var.$y });
                }
            },
            {
                name: "onmove", code: function (e) {
                    var tx = e.offsetX == undefined ? e.layerX : e.offsetX;
                    var ty = e.offsetY == undefined ? e.layerY : e.offsetY;

                    //Transform the coordinates to the Spritesheet.js canvas
                    tx = this.var.w * tx / window.innerWidth;
                    var ypos = (window.innerHeight - this.var.h * window.innerWidth / this.var.w) / 2;
                    var height = (this.var.h * window.innerWidth / this.var.w);
                    ty = this.var.h * (ty - ypos) / height;

                    var camera = this.engine.getRenderingLibrary().getCamera();
                    this.var.$x = +tx + camera.x;
                    this.var.$y = +ty + camera.y;

                }
            },
            {
                name: "#loop", code: function (event) {
                    //We wait one iteration before deleting the click coordinates
                    if (this.var.timer == 1) {
                        //Remove clic collision
                        this.setCollider("click", {
                            x: NaN,
                            y: NaN
                        });
                        this.var.timer = 0;
                    }
                    if (this.var.timer == -1) {
                        //Set click collision
                        this.setCollider("click", {
                            x: 0,
                            y: 0
                        });
                        this.var.timer = 1;
                    }
                }
            }
        ],
        collision: {
            "point": [
                //Coordinates of the pointer
                { "#tag": "hover", "x": 0, "y": 0 },
                //Coordinates of the click
                { "#tag": "click", "x": NaN, "y": NaN }
            ]
        },
        triggers: [
            {
                "name": "click",
                "description": "This event will be triggered once the mouse is clicked",
                "dataSchema": {
                    "x": "<The x coordinate of the mouse>",
                    "y": "<The y coordinate of the mouse>"
                }
            }
        ]
    }
]);