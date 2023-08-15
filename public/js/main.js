
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




$("#frontBoxTab .gridView .inner-grid img").click(function () {
    var pos = $(this).attr("data")
    import('./module.js').then(o=> o.setFrame(pos))
  });

  $("#colorBoxTab .gridView .outer-grid img").click(function () {
    var img = $(this).attr("src") 
    import('./module.js').then(o=> o.setFrontTexture(meterialObj, img))
  });
  $("#templesBoxTab .gridView .inner-grid img").click(function () {
    var img = $(this).attr("src") 
    import('./module.js').then(o=> o.setFrontTexture("MAT_METAL_GREY", img))
  });
  $("#eyeglasses, #sunglasses").click(function () {
    $("#eyeglasses, #sunglasses").removeClass("active");
    $(this).addClass("active");
    $('.eyeglasses').removeClass("active")
    $('.sunglasses').removeClass("active")
    if(this.id == "eyeglasses"){
        meterialObj = "FRONTALE"
        $('.eyeglasses').addClass("active")
    }else{
        meterialObj = "LENTE_DX"
        $('.sunglasses').addClass("active")
    }

  });

  

  function switchTab(id){
    if(id =="templesBoxTab"){
        const temple = [
                {
                  meshName: "temple",
                  gltf: "/img/model/rTemplePlast.gltf",
                  scale: 0.01,
                  isFlip: false,
                },
                {
                  meshName: "temple",
                  gltf: "/img/model/rTemplePlast.gltf",
                  scale: 0.01,
                  isFlip: true,
                },
              ];
            
        import('./module.js').then(o=> o.setTemple(temple))
    }else if(id =="engravingBoxTab"){
        import('./module.js').then(o=> o.setTextView())
    }
  }