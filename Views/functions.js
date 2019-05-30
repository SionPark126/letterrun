// Get the modals
var win_modal = document.getElementById('WinGame');
var lose_modal = document.getElementById('LoseGame');
// Get other buttons
var replay_btn1 = document.getElementById("replay_button_1");
var replay_btn2 = document.getElementById("replay_button_2");
var menu_btn1 = document.getElementById("menu_button_1");
var menu_btn2 = document.getElementById("menu_button_2");
var next_btn = document.getElementById("next_button");
// Get text
var win_text = document.getElementById('winText');
var lose_text = document.getElementById('loseText');

function preload() {
  var current = '';
  for (var i = 0; i < letterCount; i++) {
    current = letterArray[i]; // Collectable letters
    this.load.image(current, '../assets/' + current + '.png');
    if (i < WORD_LEN) {
      current = letterArray[i] + letterArray[i]; // Color-box letters
      this.load.image(current, '../assets/' + current + '.png');
      current = letterArray[i] + letterArray[i] + letterArray[i]; // Gray-box letters
      this.load.image(current, '../assets/' + current + '.png');
    }
  }
  this.load.image('door', '../assets/door.png'); //????? chest?
  for (var i = 1; i < 10; i++) {
    this.load.image('chest' + i, '../newAssets/chest/Chest' + (i) + '.png');
  }
  this.load.image('sky', '../newAssets/background/Background.png');
  this.load.image('ground', '../newAssets/background/Grass.png');
  this.load.image('autumnground', '../newAssets/background/AutumnGrass.png');
  this.load.image('winterground', '../newAssets/background/WinterGrass.png');
  this.load.audio('song', '../newAssets/bensound-endlessmotion.mp3');
  for (var i = 1; i < 18; i++) {
    this.load.image('water' + i, '../newAssets/Platform Game Assets/Water Animation/png/1x/image ' + (i) + '.png');
  }
  var color = localStorage.getItem("color");
  switch (color) {
    case "blue":
      for (var i = 0; i < 18; i++) {
        this.load.image('hero' + i, '../newAssets/character/BlueRun/' + (i + 1) + 'r.png');
      }
      this.load.image('idle', '../newAssets/character/BlueIdle/1R.png');
      this.load.image('jump', '../newAssets/character/BlueJump/up.png');
      this.load.image('fall', '../newAssets/character/BlueJump/down.png');
      break;
    case "grey":
      for (var i = 0; i < 18; i++) {
        this.load.image('hero' + i, '../newAssets/character/WhiteRun/' + (i + 1) + 'r.png');
      }
      this.load.image('idle', '../newAssets/character/WhiteIdle/1R.png');
      this.load.image('jump', '../newAssets/character/WhiteJump/up.png');
      this.load.image('fall', '../newAssets/character/WhiteJump/down.png');
      break;
    default:
      for (var i = 0; i < 18; i++) {
        this.load.image('hero' + i, '../newAssets/character/Run/' + (i + 1) + 'r.png');
      }
      this.load.image('idle', '../newAssets/character/Idle/1R.png');
      this.load.image('jump', '../newAssets/character/Jump/up.png');
      this.load.image('fall', '../newAssets/character/Jump/down.png');
      break;
  }
  console.log(color);
  this.load.image('enemy', '../newAssets/character/enemy.png');
  this.load.image('wall', '../assets/invisibleWall.png');
  this.load.image('mute', '../newAssets/buttons/mutebutton.png');
  this.load.image('sound', '../newAssets/buttons/soundbutton.png');
}


function update() {
  if (gameOver) {
    return;
  } else {
    timeAccrued = new Date().getTime() - startTime;
    timeAccrued = Math.round(timeAccrued / 1000);
    timeText.setText('Time: ' + timeAccrued)
    timeText.depth = 1;
  }
  if (player.y > 850) {
    gameOver = true;
    this.cameras.main.stopFollow();
    music.stop();
    lose_modal.style.display = "block";
  }
  if (cursors.left.isDown) {
    if (player.x < 20) {
      player.setVelocityX(0);
    } else {
      player.setVelocityX(-160);
    }
    player.flipX = true;
    if (player.body.touching.down) {
      player.anims.play('run', true);
    }
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.flipX = false;
    if (player.body.touching.down) {
      player.anims.play('run', true);
    }
  } else {
    player.setVelocityX(0);
    player.anims.play('stop');
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
  if (cursors.down.isDown) {
    player.setVelocityY(330);
  }
  if (player.body.velocity.y < 0) {
    player.anims.play('jump', true);
  }
  if (player.body.velocity.y > 50) {
    player.anims.play('fall', true);
  }
}

function chooseRandomLetter(str) {
  var index = Math.floor(Math.random() * str.length);
  var ret = '';
  ret += str.charAt(index);
  return ret;
}
// Updates letter board as the player collects the letter
function collectLetter(player, letter) {
  //letter.disableBody(true, true);

  var cur = '';
  for (i = 0; i < WORD_LEN; i++) {
    if (letter.myName === WORD.charAt(i)) {
      console.log(letter.myName)
      console.log(visitChecker)
      if (visitChecker[i] != "visited") { // Updates letter board
        x_for_board = 25;
        cur = WORD.charAt(i) + WORD.charAt(i);
        console.log(cur);
        x_for_board = x_for_board + (50 * i);
        console.log(x_for_board)
        tmp = this.add.sprite(x_for_board, 25, cur);
        tmp.setDisplaySize(40, 40);
        tmp.setScrollFactor(0);
        visitChecker[i] = "visited";
        letterBoard.push(letter.myName);
        break;
      } else {
        continue;
      }
    } else {
      console.log("wrong letter")

      //console.log(addTimeText.x)
      // tween.restart();
      startTime -= 300;
    }
  }
  letter.destroy()
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array;
}


function hitWall(enemy, wall) {
  var speed = enemy.body.velocity.x
  speed = -1 * speed;
  enemy.body.setVelocityX(speed);
  enemy.anims.play("enemyMove", true)
}


// Checks the letter board to either kill or take away a letter
function hitEnemy(player, enemy) {
  player.anims.play('stop')
  // Kills the player when no letter is collected
  if (letterBoard === undefined || letterBoard.length == 0) {
    this.physics.pause();
    gameOver = true;
    lose_modal.style.display = "block";
    music.stop();
    this.cameras.main.stopFollow();
  } else { // Takes away one random letter from the letter board
    var len = letterBoard.length;
    var index = Math.floor(Math.random() * len);
    var char = letterBoard[index];
    var x_ = 25;
    for (i = 0; i < WORD_LEN; i++) {
      if (char === WORD.charAt(i)) {
        if (visitChecker[i] === "visited") {
          // Update the letter board
          if (enemy.body.touching.left) {
            //player.setTint(0xff0000);
            player.x = player.x - 20;
            player.body.velocity.y = -150; // make it bounce??
          } else if (enemy.body.touching.right) {
            player.x = player.x + 20;
            player.body.velocity.y = -150; // make it bounce??
          } else if (enemy.body.touching.up) {
            player.body.velocity.y = -150; // make it bounce??
          }
          // Place the letter back to the platforms
          var letter = this.physics.add.sprite(xIndices[i], yIndices[i], char);
          if (char == 'w') {
            letter.setDisplaySize(50, 50);
          } else {
            letter.setDisplaySize(40, 40);
          }
          this.physics.add.collider(letter, platforms);
          this.physics.add.overlap(player, letter, collectLetter, null, this);
          letter.myName = char;
          var cur = char + char + char;
          x_ = 25 + (50 * i);
          var tmp = this.add.sprite(x_, 25, cur);
          tmp.setDisplaySize(40, 40);
          tmp.setScrollFactor(0);
          letterBoard.splice(index, 1);
          visitChecker[i] = "";
          break;
        }
      }
    }
  }
}

function placeLetter(letters, child) {
  if (index >= 25) {
    index = 0;
  }
  var temp = letters.create(position, child.y - 100, randomLetters[index]);
  temp.myName = randomLetters[index];
  index++;
  for (i = 0; i < WORD_LEN; i++) {
    if (temp.myName === WORD[i]) {
      if (xIndices[i] > 0) {
        continue;
      } else {
        xIndices[i] = position;
        yIndices[i] = child.y - 100;
        break;
      }
    }
  }
  r = Math.floor(Math.random() * 3);
  position += space[r];
}