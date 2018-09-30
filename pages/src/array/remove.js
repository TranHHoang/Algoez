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
    id = 0;
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
  });
});

function start() {
  function step1() {
    setTimeout(setLine, LOOP_TIME / 8, 0);

    printDesc("Find the position of item to be deleted");
    deactiveCell("a" + (id - 1));
    hightlight("a" + id);
    if (array[id] != val && id + 1 < listLen) {
      setTimeout(setLine, LOOP_TIME / 4, 1);

      ++id;
      setTimeout(step1, LOOP_TIME);
    }
    else {
      if (id + 1 < listLen) {
        setTimeout(setLine, LOOP_TIME / 8, 2);
        setTimeout(step2, LOOP_TIME);
      }
      else {
        printDesc(`Not found ${val} in array`);
        deactiveCell("a" + id);
      }
    }
  }
  function step2() {
    setLine(3);
    setTimeout(setLine, LOOP_TIME / 8, 4);

    printDesc(`Copy value from index ${id + 1} to index ${id}`);
    deactiveCell("a" + (id - 1));
    hightlight("a" + id); hightlight("a" + (id + 1));
    if (id + 1 < listLen) {
      setTimeout(function() {
        $("#a" + id).html($("#a" + ++id).html());
        setTimeout(step2, LOOP_TIME);
      }, LOOP_TIME / 2);
    }
    else {
      setTimeout(setLine, LOOP_TIME / 8, 5);

      setTimeout(function() {
        printDesc("Deallocate the last space in array");
        $("#a" + id).remove();
      }, LOOP_TIME);
    }
  }

  setTimeout(step1, LOOP_TIME);
}