$(function() {
    $("#start").click(function() {
        val = $("#inpVal").val().toUpperCase();
        from = $("#inpFrom").val();
        to = $("#inpTo").val();

        $("#from").html(`<b>(${val})<sub>${from}</sub></b>`);
        $("#to").html(`<b>base ${to}</b>`);

        start();

        toBase10();
    });
});

function start() {
    var convertedVal = toBase10();
    $("#details").html(`First, try to convert ${val} (base ${from}) to base 10`);
    setTimeout(function() { $("#displayArea").fadeOut("slow"); }, 1000);
    setTimeout(contructTable, 2000, convertedVal);
}

function toBase10() {
    var s = "";

    for (var i = val.length - 1, k = 0; i >= 0; i--, k++) {
        s = `${val[i]}x${from}<sup>${k}</sup> + ` + s;
    }

    s = `<p>${$("#from").html()} = ${s.slice(0, s.length - 3)}<br> &rarr; 
        <b>(${parseInt(val, from)})<sub>10</sub></b></p>`;
    $("#displayArea").html(s);
    return parseInt(val, from);
}

function contructTable(val) {
    // alert(val)
    $("#displayArea").fadeIn("slow");
    $("#details").html(`Then, convert ${val} (base 10) to base ${to}`);
    
    var s = "<table>";
    var arr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    s += `<tr><td>${val}</td><td style='border-bottom: 2px solid #009688'>${to}</td></tr>`;

    total = 0;
    var tmp = val;
    while (tmp > 0) {
        s += `<tr><td>${Math.floor(tmp / to)}</td><td id=c${total++}>${arr[tmp % to]}</td></tr>`;
        tmp = Math.floor(tmp / to);
    }

    s += "</table>"
    $("#displayArea").html(s);

    setTimeout(writeResult, 1000);
}

function writeResult() {
    $("#details").html(`${$("#from").html()} &rarr; (`);
    for (; total > 0; total--) {
        $("#details").html($("#details").html() + $(`#c${total - 1}`).html());
        $(`#c${total - 1}`).fadeOut("slow");
    }
    $("#details").html($("#details").html() + `)<sub>${to}</sub>`);
}