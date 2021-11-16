// -----JS CODE-----
// @input int numberOfClones
// @input Component.ScriptComponent controller

script.createEvent("TapEvent").bind(function() {
    script.controller.api.triggerClones(script.numberOfClones)
});