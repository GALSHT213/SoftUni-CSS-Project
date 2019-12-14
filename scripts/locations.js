var journeyButton = get("#journey-button");
var headings = get("#headings");
var journeyTimeline = get("#journey-timeline");
var journey = get(".journey");

window.onload = function () {
    event(journeyButton, "click", function() {
        hide([headings, journeyTimeline]);
        show([journey]);
    })
}

function get(selector) {
    return document.querySelector(selector);
}
function event(element, event, func) {
    element.addEventListener(event, func);
}
function hide(elements) {
    for (let element of elements) {
        element.classList.add("hidden")
    }
}
function show(elements) { 
    for (let element of elements) {
        element.classList.remove("hidden")
    }
}