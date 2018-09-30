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

function resetIndex() {
    var cells = $(".cell");
    for (var i = 0; i < listLen; i++) {
        $(cells[i]).attr("id", "a" + i);
    }
}

function insertBefore(i, j) {
    a[i] = a[j];

    $("#a" + i).fadeOut('slow', function() {
        $("#a" + i).before($("#a" + j)); 
        $("#a" + i).fadeIn('slow');
        
        unhightlight("a" + i);
        unhightlight("a" + j);
        resetIndex();
    });

    // $("#a" + i).css({'position': 'absolute'});
    // $("#a" + i).animate({'left': bPos.left}, "slow");
    // $("#a" + j).css({'position': 'absolute'});
    // $("#a" + j).animate({'left': aPos.left}, "slow");
    // $("#a" + i).css({'position': 'relative'});
    // $("#a" + j).css({'position': 'relative'});
}

function sort() {
    var i = 1;
    var j = 0;
    function outerLoop() {
        // deactiveCell("a" + (i + 1));
        var key = a[i];
        var inserted = false;
        setHightlightRes("a" + i);
        innerLoop();
        function innerLoop() {
            // alert($(`#a${j + 1}`).css("border-color"))
            if ($(`#a${j + 1}`).css("border-color") != "rgb(255, 0, 0)")
                unhightlight("a" + (j + 1));
            hightlight("a" + j);
            if (a[j] > key) {
                printDesc(`Compare ${a[j]} with <b>${key}</b> &rarr; <b>${a[j]}</b> should locate after.`);
                // a[j + 1] = a[j];
                // $(`#a${j + 1}`).html($(`#a${j}`).html());
                // setTimeout(swap, 1000, j, j + 1);
            }
            else {
                printDesc(`Compare ${a[j]} with <b>${key}</b> &rarr; Insert ${key} before.`);
                insertBefore(j + 1, i);
                inserted = true;
            }
            if (j >= 0) {
                j--;
                // alert("inner" + j)
                if (j >= 0) setTimeout(innerLoop, LOOP_TIME);
                else if (inserted || i < listLen && j == -1) {
                    if (!inserted) {
                        insertBefore(j + 1, i);
                    }
                    i++;
                    if (i == listLen) {
                        printDesc("Sorting comleted!");
                        return;
                    }
                    j = i - 1;
                    setTimeout(outerLoop, LOOP_TIME);
                }
            }
            // unhightlightList(j, i + 1, 1);
        }
    }
    outerLoop();
}