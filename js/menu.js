  //<![CDATA[
    var isVisible = true;
    function toggleAppVisible(){
      var curAppMgr = document.getElementById('appmgr').getOwnerApplication(document);
      if (isVisible) {
        curAppMgr.hide();
        isVisible = false;
        document.location.href = './index.html';
      } else {
        curAppMgr.show();
        isVisible = true;
      }
    };
    function menuSelect(i,isUp) {
      if (i == 0) {
        selected = 1;
        return;
      }
      if (isHeaderIndex(i)) {
        if (isUp) {
          i = i-1;
        }else{
          i = i+1;
        }
      }
      if (i<=0) {
        i = 0;
      } else if (i>=opts.length) {
        i = opts.length-1;
      }
      selected = i;
      var scroll = Math.max(0, Math.min(opts.length-13, selected-6));
      for (i=0; i<opts.length; i++) {
        if (selected == i) {
          jopts.eq(i).addClass("active");
        }else{
          jopts.eq(i).removeClass("active");
        }
      } 
    };
    function runStep(name){
        document.location.href = 'video_player.html?video_idx=' + selected 
    };
    function handleKeyCode(kc) {
      if (kc==VK_RED) {
        toggleAppVisible();
        return true;
      }
      if (kc==VK_UP) {
        menuSelect(selected-1,true);
        return true;
      } else if (kc==VK_DOWN) {
        menuSelect(selected+1,false);
        return true;
      } else if (kc==VK_ENTER) {
        var liid = opts[selected].getAttribute('name');
        if (liid=='exit') {
          document.location.href = '../index.php';
        } else {
          runStep(liid);
        }
        return true;
      }
      return false;
    }
    
    window.onload = function(){
      jopts = $("#menu").find("li");
      opts = document.getElementById('menu').getElementsByTagName('li');
      menuSelect(0,false);
      initApp();
      registerKeyEventListener();
    };
    function isHeaderIndex(i) {
      return opts[i].className == 'nav-header';
    }
//]]>