$(function() {
  $("#start").click(function() {
    $("#valToFind").html($("#inpVal").val());

    array = $("#inpArray").val().split(',');
    val = $("#inpVal").val();
    var str = "";
    
    listLen = array.length;

    for (var i = 0; i < array.length; i++) {
      str += `<span class="cell" id="a${i}">${array[i]}</span>`;
    }
    $("#arrayDisplay").html(str);
    // Start
    hightlight("valToFind");
    id = -1;
    iter(array, $("#inpVal").val());
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

function iter() {
  deactiveCell("a" + id);
  hightlight("a" + ++id);
  if (array[id] == val) {
    unhightlight("valToFind");
    setHightlightRes("a" + id);
    printDesc(`Found <b>${val}</b> at position <b>${id}</b>`);
  }
  else if (id < listLen) {
    printDesc(`Compare ${array[id]} with <b>${val}</b> &rarr; ${array[id]} != <b>${val}</b>`);
    setTimeout(iter, LOOP_TIME);
  }
  else {
    printDesc(`<b>${val}</b> not in array`);
  }
}