/***************globel varaiable ***************/

var meterialObj = "FRONTALE"
$("#navTab ul li.navigation").click(function () {
  $("#navTab ul li").removeClass("active");
  $(this).addClass("active");
  switchTab(this.id)
  $("#sidebar .sidebarView").removeClass("active");
  $("#sidebar #" + this.id).addClass("active");
  $(".dropdown-content").hide();
});

$("#brandBtn").click(function () {
  $("#" + this.id + " .dropdown-content").toggle();
});

$("#navTab ul li#brandBtn").click(function () {
  $("#navTab ul li").removeClass("active");
  $(this).addClass("active");
});

/****************************************/

$("#frontBoxTab .gridView .inner-grid img").click(function () {
  var pos = $(this).attr("data")
  var img = $(this).attr("src")

  import('./module.js').then(o => o.setFrame(pos))
  import('./module.js').then(o => o.setFrontTexture("ASTA_PLASTICA_DX", img))

  // isBrandBtn = true;
  isFrontBoxTab = true;
  isColorBoxTab = false;
  isTemplesBoxTab = false;
  isEngravingBoxTab = false;
  isLensesBoxTab = false;

});

/****************/

$("#colorBoxTab .gridView .outer-grid img").click(function () {
  var img = $(this).attr("src")
  import('./module.js').then(o => o.setFrontTexture(meterialObj, img))
  isColorBoxTab = true;

});

$("#templesBoxTab .gridView .inner-grid img").click(function () {
  var img = $(this).attr("src")
  import('./module.js').then(o => o.setFrontTexture("ASTA_PLASTICA_DX", img))
  isTemplesBoxTab = true;

  //import('./module.js').then(o=> o.setFrontTexture("ASTA_METALLO_P_DX", img))
  //import('./module.js').then(o=> o.setFrontTexture("ASTA_METALLO_DX", "/img/EP0664.jpg"))
});


$("#colorBoxTab #NoEcoColor, #colorBoxTab #YesEcoColor").click(function () {
  $("#colorBoxTab #NoEcoColor, #colorBoxTab #YesEcoColor").removeClass("active");
  $(this).addClass("active");
  $('.NoEcoColor').removeClass("active")
  $('.YesEcoColor').removeClass("active")
  if (this.id == "NoEcoColor") {
    meterialObj = "FRONTALE"
    $('.NoEcoColor').addClass("active")
  } else {
    meterialObj = "FRONTALE"
    $('.YesEcoColor').addClass("active")
  }

});

/******************************Lense Tab onclick visible ***************/

$("#frontBoxTab #eyeglasses, #frontBoxTab #sunglasses").click(function () {
  // Remove "active" class from both eyeglasses and sunglasses
  $("#frontBoxTab #eyeglasses, #frontBoxTab #sunglasses").removeClass("active");

  // Add "active" class to the clicked element
  $(this).addClass("active");

  // Remove "active" class from all elements with class eyeglasses and sunglasses
  $('.eyeglasses, .sunglasses').removeClass("active");

  if (this.id === "eyeglasses") {
    // Hide elements related to sunglasses
    $('#navTab #lensesBoxTab').hide();
    $("#sunglassesImages").hide();


  } else {
    // Show elements related to sunglasses
    $('#navTab #lensesBoxTab').show();

    $("#sunglassesImages").show();
  }
});


$("#lensesBoxTab .gridView .outer-grid img").click(function () {
  var img = $(this).attr("src")
  import('./module.js').then(o => o.setFrontTexture("LENTE_DX", img))
  isLensesBoxTab = true;

  //import('./module.js').then(o=> o.setFrontTexture("LENTE_DX", "https://cdn.thema-optical.com/nuovo-configuratore-igreen/v1.0.11/img/LENS_REFLECTIONS.png"))
});
/***********************************/

// function switchTab(id) {
//   if (id == "templesBoxTab") {
//     const temple = [{
//         meshName: "temple",
//         gltf: "/img/model/rTemplePlast.gltf",
//         scale: 0.01,
//         isFlip: false,
//       },
//       {
//         meshName: "temple",
//         gltf: "/img/model/rTemplePlast.gltf",
//         scale: 0.01,
//         isFlip: true,
//       },
//     ];

//     import('./module.js').then(o => o.setTemple(temple))
//   } else if (id == "engravingBoxTab") {
//     import('./module.js').then(o => o.setTextView())
//   }
// }

import('./module.js').then(module => {
  const plasticButton = document.getElementById('materialPlastic');
  const metalButton = document.getElementById('materialMetal');

  ////
  plasticButton.addEventListener('click', () => switchTab('templesBoxTab', 'plastic'));
  metalButton.addEventListener('click', () => switchTab('templesBoxTab', 'metal'));
});


function switchTab(tabId, materialType) {
  let temple;

  if (materialType === 'plastic') {
    temple = [{
        meshName: 'temple',
        gltf: '/img/model/rTemplePlast.gltf',
        // colorCode: 'fffffff', 
        scale: 0.01,
        isFlip: false,
      },
      {
        meshName: 'temple',
        gltf: '/img/model/rTemplePlast.gltf',
        scale: 0.01,
        isFlip: true,
      },
    ];
  } else {
    import('./module.js').then(o => o.disposeTempleObject())
    temple = [{
        meshName: 'temple',
        gltf: '/img/model/rTempleMet.gltf',
        scale: 0.01,
        isFlip: false,
      },
      {
        meshName: 'temple',
        gltf: '/img/model/rTempleMet.gltf',
        scale: 0.01,
        isFlip: true,
      },
    ];
  }

  if (tabId === 'templesBoxTab') {
    import('./module.js').then(module => module.setTemplePos());
  } else if (tabId === 'engravingBoxTab') {
    import('./module.js').then(module => module.setTextView());
  }
}



// $(document).ready(function () {
//   const plasticButton = $('#materialPlastic');
//   const metalButton = $('#materialMetal');
//   const defaultImage = $('#defaultImage');
//   const plasticImage = $('#plasticImage');
//   const metalImage = $('#metalImage');

//   plasticButton.click(function () {
//     defaultImage.hide();
//     plasticImage.show();
//     metalImage.hide();
//   });

//   metalButton.click(function () {
//     defaultImage.hide();
//     plasticImage.hide();
//     metalImage.show();
//   });
// });





/**************************************************/





/*******************************************Next screen of Fronts (Inside/Outside)************/
$("#svgFront").show()
$("#svgRight").hide()
$("#svgLeft").hide()
var isSelectFront = true;
var isSelectRightInside = false;
var isSelectRightOutside = false;
var isSelectLeftOutside = false;
var isSelectLeftInside = false;

var selectFront = "";
var selectRightInside = "";
var selectRightOutside = "";
var selectLeftOutside = "";
var selectLeftInside = "";

$("#front-temple").click(function () {
  selectedEngraving(true, false, false, false, false)
  $(this).addClass("active")
  $("#right-temple, #left-temple").removeClass("active")
  $("#svgFront").show()
  $("#svgRight").hide()
  $("#svgLeft").hide()
});
$("#right-temple").click(function () {
  selectedEngraving(false, true, false, false, false)
  $(this).addClass("active")
  $("#front-temple, #left-temple").removeClass("active")
  $("#svgFront").hide()
  $("#svgRight").show()
  $("#svgLeft").hide()
});

$("#left-temple").click(function () {
  selectedEngraving(false, false, false, true, false)
  $(this).addClass("active")
  $("#front-temple, #right-temple").removeClass("active")
  $("#svgFront").hide()
  $("#svgRight").hide()
  $("#svgLeft").show()
});


/***********************************Color- FinshingTabs  */

$("#colorBoxTab #imageContainer").show()
$("#MattContainer").hide()
$("#NaturalContainer").hide()

$("#colorMatt").click(function () {
  $(this).addClass("active")
  $("#colorShiny, #colorNatural").removeClass("active")

  $("#colorBoxTab #imageContainer").hide()
  $("#MattContainer").show()
  $("#NaturalContainer").hide()
});

$("#colorShiny").click(function () {
  $(this).addClass("active")
  $("#colorMatt, #colorNatural").removeClass("active")

  $("#colorBoxTab #imageContainer").show()
  $("#MattContainer").hide()
  $("#NaturalContainer").hide()
});

$("#colorNatural").click(function () {
  $(this).addClass("active")
  $("#colorMatt, #colorShiny").removeClass("active")

  $("#colorBoxTab #imageContainer").hide()
  $("#MattContainer").hide()
  $("#NaturalContainer").show()
});

/*******************************************Eyeglasses and sunglasses */










/*******************************Select Engraving color********************/

$("#engravingBoxTab .outer-grid div").click(function () {
  var colorCode = $(this).attr("data")
  $("#textPath39").css("fill", "#" + colorCode);
  $(".svgRight-outside #textPath39").css("fill", "#" + colorCode);
  $(".svgRight-inside #textPath39").css("fill", "#" + colorCode);

  $(".svgLeft-outside #textPath39").css("fill", "#" + colorCode);
  $(".svgLeft-inside #textPath39").css("fill", "#" + colorCode);
  // isEngravingBoxTab = true;

});

$("#engravingBoxTab input[type=text]").on("input", function () {

  if (isSelectFront) {
    selectFront = $(this).val()
    $("#svgFront #textPath39").text(selectFront)
  } else if (isSelectRightOutside) {
    selectRightOutside = $(this).val()
    $(".svgRight-outside #textPath39").text(selectRightOutside)
  } else if (isSelectRightInside) {
    selectRightInside = $(this).val()
    $(".svgRight-inside #textPath39").text(selectRightInside)
  } else if (isSelectLeftOutside) {
    selectLeftOutside = $(this).val()
    $(".svgLeft-outside #textPath39").text(selectLeftOutside)
  } else if (isSelectLeftInside) {
    selectLeftInside = $(this).val()
    $(".svgLeft-inside #textPath39").text(selectLeftInside)

  }






  isEngravingBoxTab = true;

})




/**************************************Inside Outside ************/

$('.svgRight-outside').show()
$('.svgRight-inside').hide()
$("#svgRight .radiogroup input").change(function () {
  var selected = $(this).val()
  if (selected == "Outside") {
    selectedEngraving(false, true, false, false, false)
    $('.svgRight-outside').show()
    $('.svgRight-inside').hide()
  } else {
    selectedEngraving(false, false, true, false, false)
    $('.svgRight-outside').hide()
    $('.svgRight-inside').show()
  }
});


$('.svgLeft-outside').show()
$('.svgLeft-inside').hide()
$("#svgLeft .radiogroup input").change(function () {
  var selected = $(this).val()
  if (selected == "Outside") {
    selectedEngraving(false, false, false, true, false)
    $('.svgLeft-outside').show()
    $('.svgLeft-inside').hide()
  } else {
    selectedEngraving(false, false, false, false, true)
    $('.svgLeft-outside').hide()
    $('.svgLeft-inside').show()
  }
});






/*********************************Active images box-shadow ***********/

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".inner-grid img, #colorBoxTab .outer-grid img, .inner-grid div");

  images.forEach(element => {
    element.addEventListener("click", function () {
      images.forEach(item => item.classList.remove("active"));
      this.classList.add("active");
    });
  });
});





/********************Inside and Outside Engraving ***************** */

document.addEventListener("DOMContentLoaded", function () {
  const radioButtons = document.querySelectorAll(".radio-button");

  radioButtons.forEach(button => {
    button.addEventListener("click", function () {
      //alert(isSelectLeftOutside, isSelectRightOutside)
      radioButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

    });
  });
});


/********************Share button popup form  *********/
document.addEventListener("DOMContentLoaded", function () {
  var sharepopUp = document.getElementById("share-button");
  var contentbtn = document.getElementById("ShareBtn");
  var span = document.getElementsByClassName("close_btn")[0];

  contentbtn.onclick = function () {
    sharepopUp.style.display = "block";
  };

  span.onclick = function () {
    sharepopUp.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == sharepopUp) {
      sharepopUp.style.display = "none";
    }
  };
});


/********************Overlay Brand-btn***********************/


const brandBtn = document.getElementById('brandBtn');
const dropdownContainer = document.getElementById('dropdownContainer');
const overlay = document.getElementById('overlay');

brandBtn.addEventListener('click', toggleDropdown);
overlay.addEventListener('click', closeDropdown);

function toggleDropdown() {
  const isVisible = dropdownContainer.style.display === 'block';
  dropdownContainer.style.display = isVisible ? 'none' : 'block';
  overlay.style.display = isVisible ? 'none' : 'block';
}

function closeDropdown(event) {
  if (event.target === overlay || event.target === brandBtn) {
    dropdownContainer.style.display = 'none';
    overlay.style.display = 'none';
  }
}

/********************* Max Charaters Input **********/
// function changePlaceholder() {
//   var input = document.getElementById("myInput");

//   input.placeholder = "New Text When Focused";
// }


// function changeSearchPlaceholder() {
//   var input = document.getElementById("searchBar");

//   input.placeholder = '';
// }

/***************************************** */

$("#templesBoxTab #imageContainer").show()
$("#PlasticContainer").hide()

$("#materialMetal").click(function () {
  var temple = [{
      meshName: 'temple',
      gltf: '/img/model/rTempleMet.gltf',
      scale: 0.01,
      isFlip: false,
    },
    {
      meshName: 'temple',
      gltf: '/img/model/rTempleMet.gltf',
      scale: 0.01,
      isFlip: true,
    },
  ];
  import('./module.js').then(module => module.setTemple(temple));
  $(this).addClass("active")
  $("#materialPlastic").removeClass("active")

  $("#templesBoxTab #imageContainer").show()
  $("#PlasticContainer").hide()
});



$("#materialPlastic").click(function () {
  $(this).addClass("active")
  $("#materialMetal").removeClass("active")

  $("#templesBoxTab #imageContainer").hide()
  $("#PlasticContainer").show()


  var temple = [{
      meshName: 'temple',
      gltf: '/img/model/rTemplePlast.gltf',
      // colorCode: 'fffffff', 
      scale: 0.01,
      isFlip: false,
    },
    {
      meshName: 'temple',
      gltf: '/img/model/rTemplePlast.gltf',
      scale: 0.01,
      isFlip: true,
    },
  ];
  import('./module.js').then(module => module.setTemple(temple));


});





// $("#templesBoxTab #materialGun, #templesBoxTab #materialGold").click(function () {
//   $("#templesBoxTab #materialGun, #templesBoxTab #materialGold").removeClass("active");
//   $(this).addClass("active");
//   $('.materialGun').removeClass("active")
//   $('.materialGold').removeClass("active")
//   if (this.id == "materialGun") {
//     boltObj = "ABBELLITORE_DX_1"
//     $('.materialGun').addClass("active")
//     materialGun.style.color = "red"


//   } else {
//     boltObj = "ABBELLITORE_DX_1"
//     $('.materialGold').addClass("active")
//   }

// });

var bolt = "FRONTALE";

$("#templesBoxTab #materialGun, #templesBoxTab #materialGold").click(function () {
  $("#templesBoxTab #materialGun, #templesBoxTab #materialGold").removeClass("active");

  $(this).addClass("active");

  $('.materialGun').removeClass("active");
  $('.materialGold').removeClass("active");

  if (this.id == "materialGun") {
    bolt = "FRONTALE";
    // Assuming you have an element with the ID "bolt", you can set its background color like this:
    $('#bolt').css("background-color", "red");
  } else {
    bolt = "OTHER_VALUE"; // Change "OTHER_VALUE" to the desired value for the else branch.

    $('.materialGold').addClass("active");
  }
});

/********************************/


document.addEventListener("DOMContentLoaded", function () {
  const sunglassesButton = document.getElementById("sunglasses");
  const colorBoxTab = document.getElementById("colorBoxTab");

  sunglassesButton.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      colorBoxTab.classList.add("sunglasses-active");
    } else {
      colorBoxTab.classList.remove("sunglasses-active");
    }
  });
});



/********  zoom-in feature color  *******/

const scene = document.querySelector('.scene');
const colorBoxTab = document.getElementById('colorBoxTab');

let hasZoomed = false;

colorBoxTab.addEventListener('click', function () {
  if (!hasZoomed) {
    scene.classList.add('active');

    hasZoomed = true;
  }
});
/**********************************************/
if (window.location.pathname === '/home') {
  // Get references to the "RIGHT TEMPLE" and "LEFT TEMPLE" buttons
  var rightTempleButton = document.getElementById("right-temple");
  var leftTempleButton = document.getElementById("left-temple");
  var engravingBox = document.getElementById("engraving_sides");

  // Hide the buttons by setting their display property to "none"
  rightTempleButton.style.display = "none";
  leftTempleButton.style.display = "none";

  // Adjust the width of the 'engraving_sides' box to 100%
  engravingBox.style.width = "100%";

  // Check if the current page is "/home" and apply the CSS rule
  if (window.location.pathname === '/home') {
    var elementsWithFrontWeightClass = document.querySelectorAll(".frontWeigth");
    elementsWithFrontWeightClass.forEach(function (element) {
      element.style.width = "25%";
    });
  }
}




/****************************************/

function selectedEngraving(isSelectFrontp, isSelectRightOutsidep, isSelectRightInsidep, isSelectLeftOutsidep, isSelectLeftInsidep) {
  $("#engravingBoxTab input[type=text]").val("")
  isSelectFront = false;
  isSelectRightInside = false;
  isSelectRightOutside = false;
  isSelectLeftOutside = false;
  isSelectLeftInside = false;
  if (isSelectFrontp) {
    isSelectFront = true;
  }
  if (isSelectRightOutsidep) {
    isSelectRightOutside = true;
  }
  if (isSelectRightInsidep) {
    isSelectRightInside = true;
  }

  if (isSelectLeftOutsidep) {
    isSelectLeftOutside = true;
  }
  if (isSelectLeftInsidep) {
    isSelectLeftInside = true;
  }

}