var journeyButton = get("#journey-button");
var headings = get(".headings");
var journeyTimeline = get("#journey-timeline");
var journey = get(".journey");
var imageMain = get(".image-main");
var test = get(".test");
var overlay = get(".gradient-overlay")
var journeyHeadings = get("#journey-headings");
var background = get("#locations-background");
var firstImageContainer = get("#first-image-container");

window.onload = function () {
    event(journeyButton, "click", function() {
        hide([headings, journeyTimeline, overlay]);
        show([journey]);
        animate(imageMain, "image-main-shrink");
        
        event(imageMain, "animationend", function () {
            show([test]);
            animate(journeyHeadings, "journey-headings-appear");
            hide([imageMain]);
        })
        
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
function addClass(element, targetClass) { 
    element.classList.add(targetClass);
}
function removeClass(element, targetClass) {
    element.classList.remove(targetClass);
}
function animate(element, animationClass) {
    element.className = "";
    addClass(element, animationClass);
}