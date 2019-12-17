var next = get("#next");
var images = getAll("image-gallery");
window.onload = function () {
    event(next, "click", function () {
        swap("clockwise");
    });

}


function swap(direction) {
    let carousel = get(".images-carousel");
    var percent;
    if (direction == "clockwise") {
         percent = getStyleValue(carousel, "(", "%") - 120;
    } else {
        percent = getStyleValue(carousel, "(", "%") + 120;
    }

    carousel.style.transform = `translate3d(${percent}%, 0, 0)`;

    let activeIndex;
    for (let i = 0; i < images.length; i++) {
        if (has(images[i], "active")) {
            activeIndex = i;
        }
    }

    for (let i = 0; i < images.length; i++) {
        if (getStyleValue(images[i], ":", "%") + percent == 0) {
            addClass(images[i], "active");
        } else {
            removeClass(images[i], "active");
        }
    }

    if (direction == "clockwise") {
        images[activeIndex].style.left = `${getStyleValue(images[activeIndex], ":", "%")}%`;
        images[(activeIndex + 1) % images.length].style.left = `${getStyleValue(images[(activeIndex + 1) % images.length], ":", "%")}%`;
        images[(activeIndex + 2) % images.length].style.left = `${getStyleValue(images[(activeIndex + 2) % images.length], ":", "%") + 360}%`;
    } else {
        images[activeIndex].style.left = `${getStyleValue(images[activeIndex], ":", "%")}%`;
        images[(activeIndex + 1) % images.length].style.left = `${getStyleValue(images[(activeIndex + 1) % images.length], ":", "%")}%`;
        images[(activeIndex + 2) % images.length].style.left = `${getStyleValue(images[(activeIndex + 2) % images.length], ":", "%") - 360}%`;
    }



}

function getStyleValue(element, from, to) {
    let transformStyle = element.getAttribute("style");

    let firstIndex = transformStyle.indexOf(from);
    let secondIndex = transformStyle.indexOf(to);
    let percent = transformStyle.substr(firstIndex + 1, (secondIndex - firstIndex) - 1);
    return parseInt(percent.trim(), 0);
}

function get(selector) {
    return document.querySelector(selector);
}
function getAll(targetClass) {
    return document.getElementsByClassName(targetClass);
}
function has(element, targetClass) {
    return element.classList.contains(targetClass);
}
function id(id) {
    return document.getElementById(id);
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