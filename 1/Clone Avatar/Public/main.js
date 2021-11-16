// -----JS CODE-----
// @input Asset.Texture cameraTex
// @input Asset.Texture maskTex
// @input Asset.Material[] cloneMats
// @input Component.Image[] cloneImgs
// @input Component.Text countdownText
// @input SceneObject choices

var delayTime = 3;
var currentIndex = 0;
var cloneCount = 0;
var hasStarted = false;

for (var i = 0; i < script.cloneImgs.length; i++) {
  script.cloneImgs[i].enabled = false;
}

function createClone(index) {
  print('Making clone ' + (index + 1));
  script.cloneMats[index].mainPass.baseTex = script.cameraTex.copyFrame();
  script.cloneMats[index].mainPass.opacityTex = script.maskTex.copyFrame();
  script.cloneImgs[index].enabled = true;
}

var delayedEvent = script.createEvent('DelayedCallbackEvent');
delayedEvent.bind(function() {
  createClone(currentIndex);
  currentIndex += 1;
  if (currentIndex < cloneCount) {
    delayedEvent.reset(delayTime);
  }
});

function startCloning(num) {
  print(num);
  hasStarted = true;
  script.choices.enabled = false;
  cloneCount = num;
  delayedEvent.reset(delayTime);
}

script.createEvent('UpdateEvent').bind(function() {
  if (hasStarted && currentIndex < cloneCount) {
    var timeRemaining = Math.floor(delayedEvent.getTimeLeft());
    var displayTime = delayTime - timeRemaining;
    script.countdownText.text = displayTime.toString();
  } else {
    script.countdownText.text = '';
  }
});

script.api.triggerClones = startCloning;