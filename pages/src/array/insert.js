$(function() {
  $("#start").click(function() {
    $("#valToFind").html($("#inpVal").val());
    $("#pos").html($("#inpPos").val());

    array = $("#inpArray").val().split(',');
    val = $("#inpVal").val();
    pos = parseInt($("#inpPos").val());
    var str = "";
    
    listLen = array.length;

    for (var i = 0; i < array.length; i++) {
      str += `<span class="cell" id="a${i}">${array[i]}</span>`;
    }

    $("#arrayDisplay").html(str);
    // Start
    id = listLen + 1;
    start();
  });

  $("#rand").click(function() {
    $("#inpArray").val(randElement());
    $("#inpVal").val("");

    listLen = randLength();
    for (var i = 1; i < listLen; i++) {
      $("#inpArray").val($("#inpArray").val() + "," + randElement());
    }
    $("#inpVal").val(randElement());
    $("#inpPos").val(rand(listLen));
  });
});

function start() {
  function step1() {
    setLine(0);

    printDesc("Allocates an empty slot at the end of the array and increases size by 1");
    array.push('-');
    $("#arrayDisplay").html($("#arrayDisplay").html() + `<span class="cell" id="a${listLen}">${array[listLen]}</span>`);
    ++listLen;
  }
  function step2() {
    setTimeout(setLine, LOOP_TIME / 8, 1);

    printDesc(`Copy value from index ${id - 1} to index ${id}`);
    deactiveCell("a" + (id + 1));
    hightlight("a" + id); hightlight("a" + (id - 1));
    
    setTimeout(setLine, LOOP_TIME / 4, 2);
    if (id > pos) {
      setTimeout(function() {
        $("#a" + id).html($("#a" + --id).html());
        setTimeout(step2, LOOP_TIME);
      }, LOOP_TIME / 2);
    }
    else {
      setTimeout(function() {
        setTimeout(setLine, LOOP_TIME / 8, 3);

        printDesc("Assign inserted position to the value we want to insert");
        $("#a" + id).html(val);
        setHightlightRes("a" + id);
        unhightlight("a" + (id - 1));
      }, LOOP_TIME);
    }
  }

  setTimeout(step1, LOOP_TIME);
  setTimeout(step2, LOOP_TIME * 2);
}