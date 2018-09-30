$(function() {
  $("#start").click(function() {
    $("#valToFind").html($("#inpVal").val());

    array = $.map($("#inpArray").val().split(','), function(v) { return parseInt(v); });
    val = parseInt($("#inpVal").val());
    var str = "";
    
    listLen = array.length;

    for (var i = 0; i < array.length; i++) {
      str += `<span class="cell" id="a${i}">${array[i]}</span>`;
    }
    $("#arrayDisplay").html(str);
    // Start
    hightlight("valToFind");
    // init
    init();
    setLine(0);
    setTimeout(setLine, LOOP_TIME / 32, 1);
    
    find(array, $("#inpVal").val());
  });

  $("#rand").click(function() {
    var arrTmp = []

    listLen = randLength();
    for (var i = 0; i < listLen; i++) {
      arrTmp.push(randElement());
    }

    arrTmp.sort(function(a, b) { return a - b; });
    
    $("#inpArray").val(arrTmp);
    $("#inpVal").val(randElement());
  });
});

function init() {
  left = 0;
  right = listLen - 1;
  mid = -1;
}

function deactiveList(a, b, c) {
  for (var i = a; i != b; i += c) deactiveCell("a" + i);
}

function find() {
  setTimeout(setLine, LOOP_TIME >> 6, 2);
  setTimeout(setLine, LOOP_TIME >> 5, 3);

  deactiveCell("a" + mid);
  mid = Math.floor((left + right) / 2);
  hightlight("a" + mid);
  // alert(mid)
  // alert(typeof(array[mid]))
  setTimeout(setLine, LOOP_TIME >> 4, 3);

  setTimeout(setLine, LOOP_TIME >> 3, 4);
  setTimeout(setLine, LOOP_TIME >> 2, 6);
  if (array[mid] == val) {
    setTimeout(setLine, LOOP_TIME >> 1, 3);
    unhightlight("valToFind");
    setHightlightRes("a" + mid);
    printDesc(`Found <b>${val}</b> at position <b>${mid}</b>`);
  }
  else if (left < right) {
    // alert(val)
    if (array[mid] < val) {
      setTimeout(deactiveList, LOOP_TIME, left, mid, 1);
      left = mid + 1;
      printDesc(`Compare ${array[mid]} with <b>${val}</b>
        &rarr; ${array[mid]} &lt; <b>${val}</b> &rarr; <b>${val}</b> should exist on right side`);
    }
    else {
      setTimeout(deactiveList, LOOP_TIME, right, mid, -1);
      right = mid - 1;
      printDesc(`Compare ${array[mid]} with <b>${val}</b>
        &rarr; ${array[mid]} &lt; <b>${val}</b> &rarr; <b>${val}</b> should exist on left side`);
    }

    // hightlight("a" + Math.floor((left + right) / 2));
    setTimeout(find, LOOP_TIME * 4);
  }
  else {
    deactiveCell("a" + mid);
    printDesc(`<b>${val}</b> not in array`);
  }
}