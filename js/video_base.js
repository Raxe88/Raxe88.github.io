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
  console.log("Init app videoplayer");
  try {
    var app = document.getElementById('appmgr').getOwnerApplication(document);
    app.show();
    //app.activate();
  } catch (e) {
    console.log(e.message);
    // ignore
  }
  setKeyset(0x1+0x2+0x4+0x8+0x10);
}

function setKeyset(mask) {
  // for HbbTV 0.5:
  try {
    var elemcfg = document.getElementById('oipfcfg');
    elemcfg.keyset.value = mask;
  } catch (e) {
    // ignore
  }
  try {
    var elemcfg = document.getElementById('oipfcfg');
    elemcfg.keyset.setValue(mask);
  } catch (e) {
    // ignore
  }
  // for HbbTV 1.0:
  try {
    var app = document.getElementById('appmgr').getOwnerApplication(document);
    app.privateData.keyset.setValue(mask);
    app.privateData.keyset.value = mask;
  } catch (e) {
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

/**
 * Inicialitza el menú guardant a la variable 'opts' els elements de la taula 
 * d'accions del menú i selecciona el primer
 */
function menuInit() {
  opts = document.getElementById('menu').getElementsByTagName('li');
  menuSelect(0);
}

/**
 * Mètode que canvia visualment l'opció per la seleccionada canviant un
 * nom de classe d'un atribut HTML anomenat 'lisel' que pinta després el CSS
 * @param {Opció} selected Indica la posició a la que es vol moure
 */
function menuSelect(i) {

  //Evita que es passi el límit d'opcions disponibles a seleccionar fent esquerra i dreta
  if (i<=0) {
    i = 0;
  } else if (i>=opts.length) {
    i = opts.length-1;
  }
  
  selected = i;
  
  //Esborra i actualitza el tag 'lisel' pel CSS
  for (i=0; i<opts.length; i++) {
    opts[i].className = selected==i ? 'lisel' : '';
  }
}

function showStatus(succss, txt) {
  var elem = document.getElementById('status');
  if(elem==null){
  return;
  }
  elem.className = succss ? 'statok' : 'statfail';
  if (!txt) {
    elem.innerHTML = '';
    return;
  }
  elem.innerHTML = '<b>Status:<'+'/b><br />'+txt;
  if (succss) {
    setInstr('Test succeeded, please execute the next test<br />(press OK).');
    if (opts) menuSelect(selected+1);
  } else {
    setInstr('Test failed, please return to test menu<br />(press OK).');
    if (opts) menuSelect(opts.length-1);
  }
}

function setInstr(txt) {
  document.getElementById('instr').innerHTML = txt;
}

