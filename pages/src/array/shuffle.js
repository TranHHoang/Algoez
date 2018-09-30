$(function() {
    $("#start").click(function() {

      a = $("#inpArray").val().split(',');
      var str = "";
      
      listLen = a.length;
  
      for (var i = 0; i < a.length; i++) {
        str += `<span class="cell" id="a${i}">${a[i]}</span>`;
      }
  
      $("#arrayDisplay").html(str);
      // Start
      id = listLen + 1;
      start();
    });
  
    $("#rand").click(function() {
      $("#inpArray").val(randElement());
      $("#inpVal").val("");

      var arrTmp = [];
  
      listLen = randLength();
      for (var i = 0; i < listLen; i++) {
        arrTmp.push(randElement());
      }
  
      arrTmp.sort(function(a, b) { return a - b; });
      for (var i = 1; i < listLen; i++) {
        $("#inpArray").val(arrTmp);
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
    });
  } 

  function start() {
    var i = listLen;
    
    var randPos = 0;
    function loop() {
      setLine(0);
      deactiveCell("a" + i);
      unhightlight("a" + randPos);
      --i;
      if (i == 0) {
        deactiveCell("a0");
        printDesc("Done");
        return;
      }
      setTimeout(setLine, LOOP_TIME / 8, 1);
      randPos = rand(i);


      hightlight("a" + i); hightlight("a" + randPos);
      printDesc(`Pick random element from index 0 to index ${i}. Choose index ${randPos} and swap it with current index ${i}`);
      swap(i, randPos);
      // parent.hightlightLine(2);
      setTimeout(setLine, LOOP_TIME / 4, 2);

      setTimeout(loop, LOOP_TIME);
    }
    setTimeout(loop, 1000);
  }