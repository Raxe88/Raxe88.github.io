var opts = false;
var selected = 0;

function initVideo() {
  try {
    document.getElementById('video').bindToCurrentChannel();
  } catch (e) {
    console.log(e.message);
    // ignore
  }
  try {
    document.getElementById('video').setFullScreen(false);
  } catch (e) {
    console.log(e.message);
    // ignore
  }
}

function initApp() {
  try {
    var app = document.getElementById('appmgr').getOwnerApplication(document);
    app.show();
    //app.activate(); No fa res
  } catch (e) {
      console.log(e.message);
    // ignoremenu.html
  }
  setKeyset(0x1+0x2+0x4+0x8+0x10);
}

function setKeyset(mask) {
  // for HbbTV 0.5:
  try {
    var elemcfg = document.getElementById('oipfcfg');
    elemcfg.keyset.value = mask;
  } catch (e) {
    console.log("Not using HbbTV v0.5");
    // ignore
  }
  try {
    var elemcfg = document.getElementById('oipfcfg');
    elemcfg.keyset.setValue(mask);
  } catch (e) {
    console.log("Not using HbbTV v0.5");
    // ignore
  }
  // for HbbTV 1.0:
  try {
    var app = document.getElementById('appmgr').getOwnerApplication(document);
    app.privateData.keyset.setValue(mask);
    app.privateData.keyset.value = mask;
  } catch (e) {
    console.log("Not using HbbTV v1.0");
    // ignore
  }
}

function registerKeyEventListener() {
  document.addEventListener("keydown", function(e) {
    if (handleKeyCode(e.keyCode)) {
      e.preventDefault();
    }
  }, false);
}
