function start() {
    var size = parseInt(document.getElementById("inp_num").value);
    contructTable(size);
    sieve(size);
}
function contructTable(size) {
    h = Math.min(size, 30);
    w = Math.ceil(size / h);
    txt = "<table>";
    k = 0;
    for (i = 0; i < w; i++) {
        txt += "<tr>";
        for (j = 0; j < h; j++) {
            if (k + 1 > size) break;
            txt += "<td id='c" + (k + 1) + "'>" + ++k + "</td>";
        }
        txt += "</tr>"
    }
    txt += "</table>";

    document.getElementById("table").innerHTML = txt;
}

function sieve(size) {
    var d = new Array(size + 1);
    for (i = 0; i <= size; i++) d[i] = true;

    d[0] = d[1] = false;

    setLine(0);
    setTimeout(setLine, LOOP_TIME >> 6, 1);

    setColor(1, "#009688");

    var i = 2, j = i * i, cl = "#009688";
    document.getElementById("desc").innerHTML = `Removing all multiple of ${i}`;
    function loop() {
        // alert(j);
        if (j > size) {
            while (!d[++i]) {
                setTimeout(setLine, LOOP_TIME >> 5, 2);
                setTimeout(setLine, LOOP_TIME >> 4, 3);
            }
            if (i > Math.sqrt(size)) {
                document.getElementById("desc").innerHTML = "Done";                     
                return;
            }
            // cl = "#009688";
            j = i * i;
            document.getElementById("desc").innerHTML = `Removing all multiple of ${i}`;
        }           

        setTimeout(setLine, LOOP_TIME >> 5, 4);
        setTimeout(setLine, LOOP_TIME >> 4, 5);
        setTimeout(setLine, LOOP_TIME >> 3, 6);

        if (d[i]) {
            if (d[j]) {
                d[j] = false;
                setColor(j, cl);
            }
            j += i;
            setTimeout(loop, LOOP_TIME);
        }
    }
    loop();
}

function setColor(cell, color) {
    document.getElementById("c" + cell).style.backgroundColor = color;
    document.getElementById("c" + cell).style.color = "white";            
}