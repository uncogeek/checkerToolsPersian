$(function (){
  // initialize codes here
  $("#resultcardnumber, #resultNationalId, #resultSheba").hide();
});


function validateCard(card) {
  if (typeof card === 'undefined'
    || card === null
    || card.length !== 16) {
    return false;
  }
  let cardTotal = 0;
  for (let i = 0; i < 16; i += 1) {
    const c = Number(card[i]);
    if (i % 2 === 0) {
      cardTotal += ((c * 2 > 9) ? (c * 2) - 9 : (c * 2));
    } else {
      cardTotal += c;
    }
  }
  return (cardTotal % 10 === 0);
}


function doCheckCardBank(){

  if($("#checkbankcard").val().length == 0){
    alert('ورودی خالی است');
    return;
  }

  //remove all none number character from textarea
  var temp = $('#checkbankcard').val();
  temp = temp.replace(/-/gi,'');
  temp = temp.replace(/ /gi,'');


  $('#checkbankcard').val(temp);

  // check if already we calculated before
  $("#resultcardnumber").empty();
  $("#resultcardnumber").show();

  $(function(){

    var countTrue = 0;
    var countFalse = 0;
    var lines = [];
    $.each($('#checkbankcard').val().split(/\n/), function(i, line){
      if(line){
        lines.push(line);
      }
    });
    console.log(lines);
    for(var i = lines.length -1; i >=0; i--){
      console.log(lines[i]);
      var result = validateCard(lines[i]);

      if(result == true){
        countTrue++
        // if we want to see true card numbers
        // $("#resultcardnumber").append("<span class='rowgreen'>" + lines[i] + " => " + "True"  + "</span><br>");
      } else {
        countFalse++;
        $("#resultcardnumber").append( "<span class='rowred'>" + lines[i] + "  " +  "اشتباه" + "</span><br>");
      }
    }
    $("#resultcardnumber").prepend("تعداد صحیح: " + countTrue + "<br>");
    $("#resultcardnumber").prepend("تعداد اشتباه: " + countFalse+ "<br>");
    $("#resultcardnumber").prepend( "<b></b>"+"نتیجه " + "</b><br>");

  });

}



function doCheckCodeMili(){
  if($("#checkNationalId").val().length == 0){
    alert('ورودی خالی است');
    return;
  }
  //remove all none number character from textarea
  var temp = $('#checkNationalId').val();
  temp = temp.replace(/-/gi,'');
  temp = temp.replace(/ /gi,'');
  $('#checkNationalId').val(temp);

  // check if already we calculated before
  $("#resultNationalId").empty();
  $("#resultNationalId").show();

  $(function(){

    var countTrue = 0;
    var countFalse = 0;
    var lines = [];
    $.each($('#checkNationalId').val().split(/\n/), function(i, line){
      if(line){
        lines.push(line);
      }
    });
    console.log(lines);
    for(var i = lines.length -1; i >=0; i--){
      console.log(lines[i]);
      var result = checkMelliCode(lines[i]);

      if(result == true){
        countTrue++
        // if we want to see true card numbers
        // $("#resultcardnumber").append("<span class='rowgreen'>" + lines[i] + " => " + "True"  + "</span><br>");
      } else {
        countFalse++;
        $("#resultNationalId").append("<span class='rowred'>" + lines[i] + "  " +  "اشتباه" + "</span><br>");
      }
    }
    $("#resultNationalId").prepend("تعداد صحیح: " + countTrue + "<br>");
    $("#resultNationalId").prepend("تعداد اشتباه: " + countFalse+ "<br>");
  });

}



function doCheckSHeba(){
  if($("#checkSheba").val().length == 0){
    alert('ورودی خالی است');
    return;
  }
  //remove all none number character from textarea
  var temp = $('#checkSheba').val();
  temp = temp.replace(/-/gi,'');
  temp = temp.replace(/ /gi,'');


  $('#checkSheba').val(temp);

  // check if already we calculated before
  $("#resultSheba").empty();
  $("#resultSheba").show();

  $(function(){

    var countTrue = 0;
    var countFalse = 0;
    var lines = [];
    $.each($('#checkSheba').val().split(/\n/), function(i, line){
      if(line){
        lines.push(line);
      }
    });
    console.log(lines);
    for(var i = lines.length -1; i >=0; i--){
      console.log(lines[i]);
      var result = validateIranianSheba(lines[i]);

      if(result == true){
        countTrue++
        // if we want to see true card numbers
        // $("#resultcardnumber").append("<span class='rowgreen'>" + lines[i] + " => " + "True"  + "</span><br>");
      } else {
        countFalse++;
        $("#resultSheba").append("<span class='rowred'>" + lines[i] + "  " +  "اشتباه" + "</span><br>");
      }
    }
    $("#resultSheba").prepend("تعداد صحیح: " + countTrue + "<br>");
    $("#resultSheba").prepend("تعداد اشتباه: " + countFalse+ "<br>");
  });

}



function checkMelliCode(meli_code) {
  if (meli_code.length == 10) {
    if (meli_code == '1111111111' ||
      meli_code == '0000000000' ||
      meli_code == '2222222222' ||
      meli_code == '3333333333' ||
      meli_code == '4444444444' ||
      meli_code == '5555555555' ||
      meli_code == '6666666666' ||
      meli_code == '7777777777' ||
      meli_code == '8888888888' ||
      meli_code == '9999999999') {
      return false;
    }
    c = parseInt(meli_code.charAt(9));
    n = parseInt(meli_code.charAt(0)) * 10 +
      parseInt(meli_code.charAt(1)) * 9 +
      parseInt(meli_code.charAt(2)) * 8 +
      parseInt(meli_code.charAt(3)) * 7 +
      parseInt(meli_code.charAt(4)) * 6 +
      parseInt(meli_code.charAt(5)) * 5 +
      parseInt(meli_code.charAt(6)) * 4 +
      parseInt(meli_code.charAt(7)) * 3 +
      parseInt(meli_code.charAt(8)) * 2;
    r = n - parseInt(n / 11) * 11;
    if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function iso7064Mod97_10(iban) {
  var remainder = iban,
    block;

  while (remainder.length > 2){
    block = remainder.slice(0, 9);
    remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
  }

  return parseInt(remainder, 10) % 97;
}

function validateIranianSheba(str) {
  var pattern = /IR[0-9]{24}/;

  if (str.length !== 26) {
    return false;
  }

  if (!pattern.test(str)) {
    return false;
  }

  var newStr = str.substr(4);
  var d1 = str.charCodeAt(0) - 65 + 10;
  var d2 = str.charCodeAt(1) - 65 + 10;
  newStr += d1.toString() + d2.toString() + str.substr(2, 2);

  var remainder = iso7064Mod97_10(newStr);
  if (remainder !== 1) {
    return false;
  }

  return true;
};



function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}