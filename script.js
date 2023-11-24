var imageSources = [
    "a.png", 
    "b.png",
    "c.png",
    "d.png",
    "e.png",
    "f.png", 
    "g.png",
    "h.png", 
    "i.png",
  ];
  var blockNumber = 8;
  var playerName = ""; 
  var playerScore;
  var score = 0;
  var gameTime = 120;
  var flipTime = 2;
  var stopTime;
  function saveLocalStorage(){
        
        var user = {
            Name: playerName,
            Score: score,
        }
      
        localStorage.setItem("user", JSON.stringify(user));
        //console.log(localStorage.getItem("user"));
    
  }
  // Select The Start Game Button
  document.querySelector(".control-buttons .startgame").onclick = function () {
    shuffleAllImages();
    //console.log("bforchhhh")
    // Prompt Window To Ask For Name
    playerName = prompt("What's Your Name?"); 
    saveLocalStorage();
    // If Name Is Empty
    if (playerName == null || playerName == "") {
      // Set Name To Unknown
      document.querySelector(".name span").innerHTML = "Unknown"; 
      // Name Is Not Empty
    } else {
      // Set Name To Your Name
      document.querySelector(".name span").innerHTML = playerName;
    } 
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
     //function show 
   
     var flipInterval = setInterval(() => {
      flipTime--;
       var elements = document.getElementsByClassName("game-block");
       var blocks = Array.from(elements);
      blocks.forEach((elements)=> elements.classList.add('is-flipped'));
      if(flipTime==0)
      {
        blocks.forEach((elements)=> elements.classList.remove('is-flipped'));
        clearInterval(flipInterval);
      }
      }, 1000);
  
  //function to remaining time
  
    stopTime = setInterval(function()  {
      gameTime--;
      var minute = parseInt(gameTime/60);
      var second = parseInt(gameTime % 60);
      document.getElementById("timer").textContent = 
      " Remaining Time: "+minute +":"+String(second).padStart(2, '0');
  
      if(gameTime == 0)
      {
        document.querySelector(".modal-content p").innerHTML =
        "Game Over! <br>"+" "+
        " Sorry "+ playerName +" "+
        "You Did Not Pass This Current Level <br> Go Ahead To Play Again! ";
        // Get the modal
      var modal = document.getElementById("myModal");
  
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
        location.reload(true);
      };
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
          location.reload(true); 
        }
      };
        clearInterval(stopTime);
      }
      }, 1000);
  
  };
  // when clicking on game level
  document.querySelector(".control-buttons .gamelevel").onclick = function () {
    if (document.getElementsByClassName("test1").length == 0) {
      var levelContainer = document.querySelector(".control-buttons .span .test");
      var easyLevel = document.createElement("div");
      easyLevel.innerHTML = "easy level";
      easyLevel.classList.add("test1", "easy");
      levelContainer.appendChild(easyLevel);
      let medianLevel = document.createElement("div");
      medianLevel.innerHTML = "median level";
      medianLevel.classList.add("test1", "median");
      levelContainer.appendChild(medianLevel);
      let highLevel = document.createElement("div");
      highLevel.innerHTML = "high level";
      highLevel.classList.add("test1", "high");
      levelContainer.appendChild(highLevel);
      console.log("trueeeeeeee" + levelContainer);
      makeClickOnGameLevel();
    }
  };
  function makeClickOnGameLevel() { 
    document
      .querySelector(".control-buttons .span .test .easy")
      .addEventListener("click", function () {
        console.log("you select easy level");
        blockNumber = 8;
        makeBlock("easy");
      });
    document
      .querySelector(".control-buttons .span .test .median")
      .addEventListener("click", function () {
        console.log("you select median level");
        blockNumber = 12;
        makeBlock("median");
      });
    document.querySelector(".control-buttons .span .test .high")
      .addEventListener("click", function () {
        console.log("you select high level");
        blockNumber = 16;
        makeBlock("high");
      });
  }
  // delete levels after click on it
  var levelsParent = document.getElementsByClassName("test")[0];
  var levels = levelsParent.children;
  
  function makeBlock(level) {
    let parent = document.getElementsByClassName("memory-game-blocks")[0];
    var existingBlocks = document.querySelectorAll(".memory-game-blocks .game-block");
    removeElements(existingBlocks);
    if (level == "easy") {
      for (let i = 0; i < 4; i++) {
        parent.appendChild(makeElement(i));
        parent.appendChild(makeElement(i));
      }
    } else if (level == "median") {
      for (let i = 0; i < 6; i++) {
        parent.appendChild(makeElement(i));
        parent.appendChild(makeElement(i));
      }
    } else if (level == "high") {
      console.log("you select high");
      for (let i = 0; i < 8; i++) {
        parent.appendChild(makeElement(i));
        parent.appendChild(makeElement(i));
      } 
    }
    var levels = document.querySelectorAll(".test1");
    removeElements(levels);
    shuffleAllImages();
  }
  function makeElement(index) { 
      let imageName = imageSources[index].substring(0, imageSources[index].length - 4);
      var container = document.createElement("div");
      container.classList.add("game-block");
      container.setAttribute("imagename", imageName);
      var frontFace = document.createElement("div");
      frontFace.classList.add("face", "front");
      container.appendChild(frontFace);
      var backFace = document.createElement("div");
      backFace.classList.add("face", "back");
      var imageElement = document.createElement("img");
      imageElement.setAttribute("src", "imgs/" + imageSources[index]);
      backFace.appendChild(imageElement);
      container.appendChild(backFace);
      return container;
  }
  function removeElements(elements) {
    for (let i = elements.length-1; i >= 0; i--) {
      elements[i].remove();
    }
  }
  // Effect Duration
  let duration = 2000;
   
  function shuffleAllImages() {
        var blocksContainer = document.querySelector(".memory-game-blocks");
        var blocks = Array.from(blocksContainer.children);
        var orderRange = Array.from(Array(blocks.length).keys());
        shuffle(orderRange);
        blocks.forEach((block, index) => {
              block.style.order = orderRange[index];
              block.addEventListener("click", function () {
                flipBlock(block);
              });
        });
  } 
  
  // Flip Block Function
  function flipBlock(selectedBlock) {
      selectedBlock.classList.add("is-flipped");
      var elements = document.getElementsByClassName("game-block");
      var blocks = Array.from(elements);
      var allFlippedBlocks = blocks.filter((flippedBlock) =>
          flippedBlock.classList.contains("is-flipped")
      );
  
      if (allFlippedBlocks.length === 2) {
          stopClicking();
          checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
      }
  }
  
  // Stop Clicking Function
  function stopClicking() {
      var blocksContainer = document.getElementsByClassName("memory-game-blocks")[0];
      blocksContainer.classList.add("no-clicking"); 
      setTimeout(() => {
          blocksContainer.classList.remove("no-clicking");
      }, duration);
  }
  
  // Check Matched Block
  function checkMatchedBlocks(firstBlock, secondBlock) {
      let triesElement = document.querySelector(".tries span");
      playerScore = document.querySelector('.score span');
  
      if (firstBlock.getAttribute("imagename") === secondBlock.getAttribute("imagename")) {
          firstBlock.classList.remove("is-flipped");
          secondBlock.classList.remove("is-flipped");
  
          firstBlock.classList.add("has-match");
          secondBlock.classList.add("has-match");
          gameFinishedOrNot();
          document.getElementById("success").play();
          document.getElementById("success1").play();
  
          ++score;
          saveLocalStorage();
          playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
  
      } else {
          triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
  
          setTimeout(() => {
              firstBlock.classList.remove("is-flipped");
              secondBlock.classList.remove("is-flipped");
          }, duration);
  
          document.getElementById("fail").play();
      }
  }
  
  // Shuffle Function
  function shuffle(array) {
    let current = array.length,
      temp,
      random;
    while (current > 0) {
      random = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[random];
      array[random] = temp;
    }
    return array;
  }
  
  function gameFinishedOrNot(){
        var elements = document.getElementsByClassName("game-block");
        var gameBlocks = Array.from(elements);
        var allCardsIsMatched = gameBlocks.filter((isMatchedBlock) =>
          isMatchedBlock.classList.contains("has-match")
        );
        console.log("number of blockNumber" + blockNumber);
        if (allCardsIsMatched.length === blockNumber) {
          let triesElement = document.querySelector(".tries span");
          let numberOfWrongTries = parseInt(triesElement.innerHTML);
          let scoreElement = document.querySelector(".score span");
          let scoreValue = parseInt(scoreElement.innerHTML)+1;
          if (playerName == null || playerName == "") {
            document.querySelector(".modal-content p").innerHTML =
              "Congrats, Your Score: "+ scoreValue+"  You Won But After " +
              numberOfWrongTries +
              " Wrong Tries.<br>So Go Ahead To Play Again! ";
          } else {
            document.querySelector(".modal-content p").innerHTML =
              "Congrats, " +
              playerName +
              "  Your Score: "+ scoreValue+" , You Won  But After " +
              numberOfWrongTries +
              " Wrong Tries.<br>So Go Ahead To Play Again! ";
          }
          var modal = document.getElementById("myModal");
          var span = document.getElementsByClassName("close")[0];
          modal.style.display = "block";
          span.onclick = function () {
            modal.style.display = "none";
            location.reload(true);
          };
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
              location.reload(true); 
            }
          };
          document.getElementById("FinalSuccess1").play();
          setTimeout(() => {
            document.getElementById("FinalSuccess2").play();
          }, 2000);
        }
  }
  