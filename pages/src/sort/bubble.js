$(function() {
    $("#start").click(function() {
        a = $.map($("#inpArray").val().split(','), function(v) { return parseInt(v); });
        var str = "";
      
        listLen = a.length;
    
        for (var i = 0; i < a.length; i++) {
            str += `<span class="cell" id="a${i}">${a[i]}</span>`;
        }
        $("#arrayDisplay").html(str);
        // Start
        sort();
    });
  
    $("#rand").click(function() {
      $("#inpArray").val(randElement());
  
      listLen = randLength();
      for (var i = 1; i < listLen; i++) {
        $("#inpArray").val($("#inpArray").val() + "," + randElement());
      }
    });
});
  
function swap(i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;

    $("#a" + i).fadeOut('slow', function() {
        $("#a" + i).before($("#a" + j)); 
        $("#a" + i).fadeIn('slow');
        
        $("#a" + i).attr("id", "a" + j);
        $("#a" + j).attr("id", "a" + i);
    });
    // $("#a" + i).css({'position': 'absolute'});
    // $("#a" + i).animate({'left': bPos.left}, "slow");
    // $("#a" + j).css({'position': 'absolute'});
    // $("#a" + j).animate({'left': aPos.left}, "slow");
    // $("#a" + i).css({'position': 'relative'});
    // $("#a" + j).css({'position': 'relative'});
}

function sort() {
    var i = listLen - 1;
    var j = 0;
    function outerLoop() {
        deactiveCell("a" + (i + 1));
        innerLoop();
        function innerLoop() {
            if (i == 0 && j == i) {
                deactiveCell("a0");
                printDesc("Sorting completed!");
                return;
            }
            unhightlight("a" + (j - 1));
            hightlight("a" + (j + 1)); hightlight("a" + j);
            if (a[j] > a[j + 1]) {
                printDesc(`Compare ${a[j]} with <b>${a[j + 1]}</b> &rarr;
                <b>${a[j]}</b> should locate after ${a[j + 1]}. We need to swap right here`);
                setTimeout(swap, LOOP_TIME, j, j + 1);
            }
            else {
                printDesc(`Compare ${a[j]} with <b>${a[j + 1]}</b> &rarr; Do not need to swap`);
            }
            if (j < i) {
                j++;
                // alert("inner" + j)
                if (j < i) setTimeout(innerLoop, LOOP_TIME * 2);
                else if (i > 0 && j == i) {
                    i--;
                    j = 0;
                    setTimeout(outerLoop, LOOP_TIME * 2);
                }
            }
            // unhightlightList(j, i + 1, 1);
        }
    }
    outerLoop();
}