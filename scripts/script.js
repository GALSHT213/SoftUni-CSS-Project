var next = $("#next");
var images = $(".image-gallery");
window.onload = function () {

    $("#next").click(function () {
        swap("clockwise");
    });
    $("#prev").click(function () {
        swap("counter-clockwise");
    })
    
    $(".active").children().first().click(function () {
        let category = $(".active").find(".single-image").attr("id");
        $(".active").children().first().addClass("active--blur");
        $(".images-carousel").addClass("images-carousel--grid_active");
        $(`#${category}-gallery`).removeClass("hide-visiblity");

        $("#next").addClass("hidden");
        $("#prev").addClass("hidden");

        $(".grid-gallery").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function (e) {
            
            $(".gallery-img-overlay").addClass("animate-height");
            
            $(".item-labels span:nth-child(3)").css("bottom", "0");
            $(".item-labels span:nth-child(1)").css("bottom", "-50px");
    
            $(".gallery-img-overlay").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
            function(e) {
                $(".gallery-img").addClass("active--opacity");
            })
    
        });
    })

    $("#back").click(function() {
        let category = $(".active").find(".single-image").attr("id");
        $(".active").children().first().removeClass("active--blur");
        $(".images-carousel").removeClass("images-carousel--grid_active");
        $($(".active").find("h1")).addClass("heading--active");
        $(`#${category}-gallery`).addClass("hide-visiblity");
        $("#next").removeClass("hidden");
        $("#prev").removeClass("hidden");

        $(".gallery-img-overlay").removeClass("animate-height");

        $(".gallery-img").removeClass("active--opacity");
        $(".images-carousel").removeClass("hide-visiblity");

        $(".item-labels span:nth-child(3)").css("bottom", "-50px");
        $(".item-labels span:nth-child(1)").css("bottom", "0");
    });

    $("#about").click(function () {

        $("#next").addClass("hidden");
        $("#prev").addClass("hidden");

        $(".about-wrapper").addClass("active--height");
        $(".images-carousel").addClass("hidden--height");

        $(".item-labels span:nth-child(1)").css("bottom", "-50px");
        $(".item-labels span:nth-child(2)").css("bottom", "0");
    });

    $("#gallery").click(function() {
        $("#next").removeClass("hidden");
        $("#prev").removeClass("hidden");

        $(".about-wrapper").removeClass("active--height");
        $(".images-carousel").removeClass("hidden--height");

        $(".item-labels span:nth-child(1)").css("bottom", "0");
        $(".item-labels span:nth-child(2)").css("bottom", "-50px");
    });

}


function swap(direction) {
    let carousel = document.querySelector(".images-carousel");
    var percent;
    if (direction == "clockwise") {
        percent = getStyleValue(carousel, "(", "%") - 120;
    } else {
        percent = getStyleValue(carousel, "(", "%") + 120;
    }

    carousel.style.transform = `translate3d(${percent}%, 0, 0)`;

    let activeIndex;
    for (let i = 0; i < images.length; i++) {
        if ($(images[i]).hasClass("active")) {
            activeIndex = i;
        }
    }

    for (let i = 0; i < images.length; i++) {
        let currentImage = $(images[i]);
        if (getStyleValue(images[i], ":", "%") + percent == 0) {
            currentImage.addClass("active");
            currentImage.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                function (e) {
                    $(currentImage.find("h1")).addClass("heading--active");
                });
        } else {
            currentImage.removeClass("active");
            $(currentImage.find("h1")).removeClass("heading--active");
            $(currentImage.find(".single-image")).removeClass("active--scale");
        }
    }

    if (direction == "clockwise") {
        images[activeIndex].style.left = `${getStyleValue(images[activeIndex], ":", "%")}%`;
        images[(activeIndex + 1) % images.length].style.left = `${getStyleValue(images[(activeIndex + 1) % images.length], ":", "%")}%`;
        images[(activeIndex + 2) % images.length].style.left = `${getStyleValue(images[(activeIndex + 2) % images.length], ":", "%") + 360}%`;
    } else {
        images[activeIndex].style.left = `${getStyleValue(images[activeIndex], ":", "%")}%`;
        images[(activeIndex + 1) % images.length].style.left = `${getStyleValue(images[(activeIndex + 1) % images.length], ":", "%") - 360}%`;
        images[(activeIndex + 2) % images.length].style.left = `${getStyleValue(images[(activeIndex + 2) % images.length], ":", "%")}%`;
    }

    $(".active").children().first().click(function () {
        let category = $(".active").find(".single-image").attr("id");
        $(".active").children().first().addClass("active--blur");
        $(".images-carousel").addClass("images-carousel--grid_active");
        $(`#${category}-gallery`).removeClass("hide-visiblity");
        $("#next").addClass("hidden");
        $("#prev").addClass("hidden");


        $(".grid-gallery").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function (e) {

                $(".gallery-img-overlay").addClass("animate-height");

                $(".item-labels span:nth-child(3)").css("bottom", "0");
                $(".item-labels span:nth-child(1)").css("bottom", "-50px");

                $(".gallery-img-overlay").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                    function (e) {
                        $(".gallery-img").addClass("active--opacity");
                    })

            });
    })
}

function getStyleValue(element, from, to) {
    let transformStyle = element.getAttribute("style");

    let firstIndex = transformStyle.indexOf(from);
    let secondIndex = transformStyle.indexOf(to);
    let percent = transformStyle.substr(firstIndex + 1, (secondIndex - firstIndex) - 1);
    return parseInt(percent.trim(), 0);
}