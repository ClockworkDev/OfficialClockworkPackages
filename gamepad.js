CLOCKWORKRT.components.register([
    {
        name: "gamepad",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.setVar("buttons", [
                        { buttonIndex: 0, name: "A" },
                        { buttonIndex: 1, name: "B" },
                        { buttonIndex: 2, name: "X" },
                        { buttonIndex: 3, name: "Y" },
                        { buttonIndex: 4, name: "LB" },
                        { buttonIndex: 5, name: "RB" },
                        { buttonIndex: 8, name: "Select" },
                        { buttonIndex: 9, name: "Start" },
                        { buttonIndex: 10, name: "LThumb" },
                        { buttonIndex: 11, name: "RThumb" },
                        { buttonIndex: 12, name: "DU" },
                        { buttonIndex: 13, name: "DD" },
                        { buttonIndex: 14, name: "DL" },
                        { buttonIndex: 15, name: "DR" }]);
                    this.setVar("buttonsPressed", {});
                }
            },
            {
                name: "#loop", code: function (event) {
                    var that = this;
                    navigator.getGamepads().forEach(function (pad, i) {
                        if (pad) {
                            var axis1X = pad.axes[0];
                            var axis1Y = pad.axes[1];
                            var axis2X = pad.axes[2];
                            var axis2Y = pad.axes[3];
                            var buttonLeftTrigger = pad.buttons[6]; //.value, .pressed
                            var buttonRightTrigger = pad.buttons[7];
                            that.engine.execute_event("gamepadAxis", { values: [{ x: axis1X, y: axis1Y }, { x: axis2X, y: axis2Y }], player: i });
                            that.engine.execute_event("gamepadTrigger", { leftValue: buttonLeftTrigger, rightValue: buttonRightTrigger, player: i  });
                            var buttons = that.getVar("buttons");
                            var buttonsPressed = that.getVar("buttonsPressed");
                            if (!buttonsPressed[i]) {
                                buttonsPressed[i] = {};
                            }
                            var mybuttonsPressed = buttonsPressed[i];
                            mybuttonsPressed["#connected"] = true;
                            buttons.forEach(function (button) {
                                if (button.buttonIndex < pad.buttons.length) {
                                    if (mybuttonsPressed[button.buttonIndex] != pad.buttons[button.buttonIndex].pressed) {
                                        if (pad.buttons[button.buttonIndex].pressed == true) {
                                            that.engine.execute_event("gamepadDown", { name: button.name, player: i });
                                        } else if (mybuttonsPressed[button.buttonIndex] == true) {
                                            that.engine.execute_event("gamepadUp", { name: button.name, player: i });
                                        }
                                    }
                                    mybuttonsPressed[button.buttonIndex] = pad.buttons[button.buttonIndex].pressed;
                                }
                            });
                        } else {
                            var buttonsPressed = that.getVar("buttonsPressed");
                            if (buttonsPressed[i] && buttonsPressed[i]["#connected"]) {
                                that.engine.execute_event("gamepadDisconnected", { player: i });
                                buttonsPressed[i]["#connected"] = false;
                            }
                        }
                    })
                }
            }
        ]
    }
]);