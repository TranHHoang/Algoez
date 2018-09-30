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
        $("#a" + i).html(a[i]);
        $("#a" + j).html(a[j]);
        $("#a" + i).fadeIn('slow');
        
        // $("#a" + i).attr("id", "a" + j);
        // $("#a" + j).attr("id", "a" + i);
    });
    // $("#a" + i).css({'position': 'absolute'});
    // $("#a" + i).animate({'left': bPos.left}, "slow");
    // $("#a" + j).css({'position': 'absolute'});
    // $("#a" + j).animate({'left': aPos.left}, "slow");
    // $("#a" + i).css({'position': 'relative'});
    // $("#a" + j).css({'position': 'relative'});
}

function unhightlightList(a, b, c) {
    for (var i = a; i != b; i += c) unhightlight("a" + i);
}

function sort() {
    var i = 0;
    var j = 1;
    function outerLoop() {
        deactiveCell("a" + (i - 1));
        var min = a[i];
        var minId = i;

        $("#minVal").html(min);
        
        printDesc("Finding the minimum value on the remaining array");
        unhightlightList(i, listLen, 1);

        setHightlightRes("a" + minId);
        setTimeout(innerLoop, LOOP_TIME);
        function innerLoop() {
            if (j == listLen) {
                deactiveCell("a" + i);
                printDesc("Sorting completed!");
                return;
            }
            // hightlight("a" + (j + 1)); 
            hightlight("a" + j);
            if (a[j] < min) {
                $("#minVal").html(a[j]);
                min = a[j];

                unhightlight("a" + minId);
                minId = j;
                setHightlightRes("a" + minId);
            }
            if (j < listLen) {
                if (!isRes("a" + (j - 1)) && j - 1 != minId)
                    unhightlight("a" + (j - 1));
                j++;
                // alert("inner" + j)
                if (j < listLen) setTimeout(innerLoop, LOOP_TIME);
                else if (i < listLen && j == listLen) {
                    printDesc("Swap the minimum value to a right position");
                    swap(i, minId);
                    i++;
                    j = i + 1;
                    setTimeout(outerLoop, LOOP_TIME);
                }
            }
            // unhightlightList(j, i + 1, 1);
        }
    }
    outerLoop();
}