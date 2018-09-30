$(function() {
    $("#start").click(function() {
        val = parseInt($("#inpVal").val());
        
        arr = new Array(val + 1);
        for (var i = 0; i <= val; i++) {
            arr[i] = new Array(val + 1);
        }
        arr[0][0] = 1;
        start();
    });
});

function sum(a, b) {
    a = typeof a === 'undefined' ? 0 : a;
    b = typeof b === 'undefined' ? 0 : b;
    return a + b;
}

function start() {
    var row = 0;
    var s = $("#table");
    var str = "<tr><td id='c0_0'>1</td></tr>";
    for (var i = 1; i <= val; i++) {
        str += "<tr>";
        for (var j = 0; j <= i; j++) {
            arr[i][j] = sum(arr[i - 1][j - 1], arr[i - 1][j]);
            str += `<td id='c${i + '_' + j}'>${arr[i][j]}</td>`;
        }
        str += "</tr>";
    }
    str += "</table>";
    s.html(str);

    for (var i = 0; i <= val; i++) {
        for (var j = 0; j <= i; j++) {
            $(`#c${i}_${j}`).hide();
        }
    }
    showOneByOne();
}

function unhightlightRow(row) {
    for (var i = 0; i <= row; i++) {
        unhightlight(row, i);
    }
}

function showOneByOne() {
    var row = 0;
    function outerLoop() {
        if (row > val) return;
        var col = 0;
        innerLoop();
        function innerLoop() {
            if (col > row) {
                unhightlightRow(row - 1);
                unhightlightRow(row);
                ++row;
                setTimeout(outerLoop, LOOP_TIME);
            }
            else {
                unhightlight(row - 1, col - 2);
                unhightlight(row, col - 1);
                hightlight(row - 1, col - 1); toggleBorder(row - 1, col - 1, "right");
                hightlight(row - 1, col); toggleBorder(row - 1, col, "left"); toggleBorder(row - 1, col, "bottom");
                hightlight(row, col); toggleBorder(row, col, "top");
                $(`#c${row}_${col}`).fadeIn();
                ++col;
                setTimeout(innerLoop, LOOP_TIME);
            }   
        }
    }   
    outerLoop();
}

function toggleBorder(i, j, or) {
    if ($(`#c${i}_${j}`).css("border-" + or) == "none")
        $(`#c${i}_${j}`).css("border-" + or, "1px solid #009688");
    else
        $(`#c${i}_${j}`).css("border-" + or, "none");
}

function hightlight(i, j) {
    $(`#c${i}_${j}`).css("border", "3px solid orange");
}

function unhightlight(i, j) {
    $(`#c${i}_${j}`).css("border", "1px solid #009688");
}