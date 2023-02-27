var startTime, endTime;
var bestTime = Number(localStorage.getItem("bestTime"));
var isStarted = false;

document.getElementById("start-button").addEventListener("click", function() {
  startGame();
});

document.getElementById("circle").addEventListener("click", function() {
  endGame();
});

function startGame() {
    isStarted = true;
    document.getElementById("start-button").style.display = "none";
    document.getElementById("instruction").style.display = "none";
    document.getElementById("circle").style.display = "block";
    document.getElementById("circle").style.backgroundColor = "red";
    setTimeout(function() {
      document.getElementById("circle").style.backgroundColor = "green";
      startTime = new Date();
    }, Math.random() * 2000 + 1000);
    
    if (bestTime) {
        document.getElementById("best-time-value").innerHTML = bestTime;
    }
}

function endGame() {
    if (!isStarted) {
        return;
    }
    
    if (document.getElementById("circle").style.backgroundColor === "green") {
        endTime = new Date();
        var reactionTime = (endTime - startTime) / 1000;
        document.getElementById("result").innerHTML = "Seu tempo foi de " + reactionTime + " segundos.";
    
        if (!bestTime || reactionTime < bestTime) {
            localStorage.setItem("bestTime", reactionTime);
            document.getElementById("best-time-value").innerHTML = reactionTime;
        }
    } else {
        document.getElementById("result").innerHTML = "Muito veloz!";
    }
    
    startTime = null;
    document.getElementById("circle").style.display = "none";
    document.getElementById("start-button").style.display = "block";
    document.getElementById("instruction").style.display = "block";
    
    isStarted = false;
}

if (bestTime) {
  document.getElementById("best-time").innerHTML = "Seu melhor tempo foi de " + bestTime + " segundos.";
}
