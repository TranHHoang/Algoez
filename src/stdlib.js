function hightlightLine(line) {
    var lines = $(`.code div`).toArray();
    for (var i = 0; i < lines.length; i++) {
        unhightlightLine(i);
    }
    $(`.code #l${line}`).css({
        "background-color": "white",
        "color": "#009688"
    });
}

LOOP_TIME = 1000;

window.addEventListener("message", function(e) {
    // alert(e.data)
    if (e.data.split(" ")[0] === "color")
        setInterval(setColorAll(e.data.split(" ")[1], e.data.split(" ")[2]), 100);
    else if (e.data.split(" ")[0] === "speed") 
        LOOP_TIME = parseInt(e.data.split(" ")[1]);
}, false);

function setColorAll(old, newColor) {
    for (var i = 0; i < $("*").toArray().length; i++) {
        var e = $("*")[i];
        // setColor(color);
        // alert(rgb2hex($(this).css("color")))
        if (rgb2hex($(e).css("background-color")) === old) {
            $(e).css("background-color", newColor);
        }
        if (rgb2hex($(e).css("color")) === old) {
            $(e).css("color", newColor);
        }
        if (rgb2hex($(e).css("border-color")) === old) {
            $(e).css("border-color", newColor);
        }
    }
    // $("#browse").attr("href", "browse.html?color=" + cl);

    function rgb2hex(rgb){
        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*\d*\)/);
        return ("#" +
        ("0" + parseInt(rgb[1]).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2]).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3]).toString(16)).slice(-2)).toUpperCase();
    }
}

function unhightlightLine(line) {
    $(`.code #l${line}`).css({
        "background-color": "",
        "color": ""
    });
}

function setLine(line) {
    parent.postMessage(line, "*");
}

function printDesc(mes) {
    $("#details").html(mes);
}
  
function hightlight(id) {
    $("#" + id).css("border", "5px solid orange");
}

function rand(max, min = 1) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function randLength() {
    return rand(20, 5);
}

function randElement() {
    return rand(100);
}

function deactiveCell(id) {
    $("#" + id).css({"background-color": "#009688", color: "white"});
    unhightlight(id);
}
  
function setHightlightRes(id) {
    $("#" + id).css("border", "5px solid red");
}
  
function unhightlight(id) {
    $("#" + id).css("border", "3px solid #009688");
}