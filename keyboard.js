CLOCKWORKRT.components.push([
    {
        name: "keyboard",
        events: [
            {
                name: "#setup", code: function (event) {
                    var names = ["keyup", "keydown"];
                    var tokens = [];

                    for (var i in names) {
                        tokens[i] = this.execute_event.bind(this, names[i]);
                        window.addEventListener(names[i], tokens[i], false);
                    }
                    this.setVar("eventstoken", tokens);
                }
            },
            {
                name: "#exit", code: function (event) {
                    var tokens = this.getVar("eventstoken");
                    var names = ["keyup", "keydown"];
                    for (var i in names) {
                        window.removeEventListener(names[i], tokens[i], false);
                    }
                }
            },
            {
                name: "keydown", code: function (event) {
                    this.engine.execute_event("keyboardDown", { key: event.keyCode });

                }
            },
            {
                name: "keyup", code: function (event) {
                    this.engine.execute_event("keyboardUp", { key: event.keyCode });
                }
            }
        ]
    }
]);