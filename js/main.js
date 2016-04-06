var loadingInterval = 0;

function init() {
  canvas = document.getElementById("canvasGame");
  scene = new createjs.Stage(canvas);

  messageField = new createjs.Text("Loading", "bold 24px Helvetica", "#FFFFFF");
  messageField.maxWidth = 1000;
  messageField.textAlign = "center";
  messageField.x = canvas.width / 2;
  messageField.y = canvas.height / 2;
  scene.addChild(messageField);
  scene.update();

  var manifest = [  
      {id:"floor", src:"img/background1.png"},
      {id:"clouds", src:"img/background2.png"}
  ];

  preload = new createjs.LoadQueue();  
  preload.addEventListener("complete", doneLoading);  
  preload.addEventListener("progress", updateLoading);  
  preload.loadManifest(manifest);  
}

function updateLoading() {  
  messageField.text = "Loading " + (preload.progress*100|0) + "%"
  scene.update();
}

function doneLoading(event) {
 clearInterval(loadingInterval);
 messageField.text = "Click to start";
 watchRestart();
}

function watchRestart() {  
  canvas.onclick = handleClick;
  scene.addChild(messageField);
  scene.update();
}

function handleClick() { 
  scene.removeChild(messageField);
  restart();
}

function restart() {  
  scene.removeAllChildren();
  floorImage = preload.getResult("floor");
  floor = new createjs.Bitmap(floorImage);       
  floor.x = 0;
  floor.y = 192;
  cloudsImage = preload.getResult("clouds");
  clouds = new createjs.Bitmap(cloudsImage);       
  clouds.x = 0;
  clouds.y = 0;
  floor2 = new createjs.Bitmap(floorImage);  
  floor2.x = 674;  
  floor2.y = 192;  
  clouds2 = new createjs.Bitmap(cloudsImage);  
  clouds2.x = 640;  
  clouds2.y = 0;
  scene.addChild(clouds, clouds2, floor, floor2);
  scene.update();

  if (!createjs.Ticker.hasEventListener("tick")) {  
   createjs.Ticker.addEventListener("tick", tick);
  } 
}

function tick(event) {  
  clouds.x = clouds.x-1;
  floor.x = floor.x-2;
  clouds2.x = clouds2.x-1;  
  floor2.x = floor2.x-2; 
  if (floor.x == -674){  
    floor.x = 674;
  }
  if (floor2.x == -674){  
    floor2.x = 674;
  }
  if (clouds.x == -640){  
    clouds.x = 640;
  }
  if (clouds2.x == -640){  
    clouds2.x = 640;
  }
  scene.update(event);
}

(function(){
  new init();
}(init));
