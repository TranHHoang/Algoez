$(function() {
    $("#start").click(function() {
        val = parseInt($("#inpVal").val());
        start();
    });
});

function start() {
    var i = 2;
    $("#displayArea").html(`${val} = 1`);
    process();
    function process() {
        function getNextInt() {
            if (val == 1) {
                $("#title").html(`<b>Factorize ${$("#inpVal").val()} to prime factors completed!</b>`)
                $("#details").html("Done!");                
                return;
            }
            $("#title").html(`<b>Find the next integer that ${val} can divide by</b>`);
            if (val % i == 0) {
                $("#details").html(`${val} is divisible by ${i}`);
                setTimeout(divideUntilNot, LOOP_TIME);
                return;
            }
            $("#details").html(`${val} is not divisible by ${i}`);
            ++i;
            setTimeout(getNextInt, LOOP_TIME);
        }
        setTimeout(getNextInt, LOOP_TIME);
                
        function divideUntilNot() {
            $("#title").html(`<b>Divide ${val} by ${i} until it is not possible</b>`);
            if (val % i != 0) {
                setTimeout(getNextInt, LOOP_TIME);
                return;
            }
            val /= i;
            $("#displayArea").html($("#displayArea").html() + " * " + i);
            setTimeout(divideUntilNot, LOOP_TIME);
        }
    }
}
