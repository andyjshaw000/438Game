let bg;
let x1;
let y1;
let x2;
let y2;
let player;
let playerhealth;
let score;
let experience;
let level;
let experiencepoints;
let enemies;
let time;
let framecounter;
let bullets;
let bombs;
let healths;
let PLAYERSPEED;
let BULLETDAMAGE;
let PLAYERMAXHEALTH;
let rotators;
let rotatorson;
let bouncer;
let bounceron;
let BOUNCESPEED;
let xdirection;
let ydirection;
let wateron;
let waterfield;
let fireballs;
let fireballon;
let fireballct;
let RESISTANCE;
let FIREBALLDAMAGE;
let WATERFIELDDAMAGE;
let BOUNCERDAMAGE;
let ROTATORDAMAGE;
let backgroundsounds;
let bombsound;
let healthsound;
// let experiencesound;
let sun;
let selectability;
let sunlevelup;
let waterlevelup;
let firelevelup;
let airlevelup;
let earthlevelup;
let speedlevelup;
let healthlevelup;
let defenselevelup;
let testimage;
let test2image;
let enemyimage;
let enemyimage2;
let fireimage;
let waterimage;
let airimage;
let earthimage;
let sunimage;
let bombimage;
let healthimage;
let experienceimage;
let standleft;
let standright;
let facing;
let rightattack;
let leftattack;
let losesound;
let powerups = {0:["Add a Fireball", "Fireballs burn through enemies dealing massive damage!"], 1:["Add a Stonewall", "Indestructible stones surround you, preventing enemies from getting near you. Enemies hit are permanently slowed."], 2:["Increase Speed", "Move faster to dodge and weave past enemies."], 3:["Increase Health", "More health makes you able to take more damage for longer."], 4:["Increase Defense", "Bolster your armor and take less damage from enemies."], 5:["Power up your Airball", "Enemies won't know when it's coming, but when it does, it's too late."], 6:["Increase Sun Orb Damage", "Shadows try to avoid the sun as much as possible, as it does massive damage."], 7:["Power up your Waterfield", "Surround yourself in an endless whirlpool that slows enemies in the tide."]};

p5.disableFriendlyErrors = true;

function preload() {
  standleft = loadAnimation("images/left1.png");
  standright = loadAnimation("images/right1.png");
  leftattack = loadAnimation("images/leftattack.png");
  rightattack = loadAnimation("images/rightattack.png");
  testimage = loadAnimation("images/right2.png", 3);
  testimage.frameDelay = 12;
  test2image = loadAnimation("images/left2.png", 3);
  test2image.frameDelay = 12;
  enemyimage2 = loadAnimation("images/enemy2.png");
  enemyimage = loadAnimation("images/enemy.png");
  fireimage = loadAnimation("images/fire.png");
  waterimage = loadAnimation("images/water1.png", 9);
  waterimage.frameDelay = 8;
  airimage = loadAnimation("images/air.png");
  earthimage = loadAnimation("images/earth.png");
  sunimage = loadAnimation("images/sun.png");
  bombimage = loadAnimation("images/bomb.png");
  healthimage = loadAnimation("images/health.png");
  experienceimage = loadAnimation("images/experience.png");
  let musicnumber = Math.ceil(random(3));
  soundFormats("mp3");
  backgroundsounds = loadSound("music/background" + musicnumber + ".mp3");
  losesound = loadSound("music/lose");
  bombsound = loadSound("music/bomb");
  healthsound = loadSound("music/health");
  // experiencesound = loadSound("music/experience");
  selectability = loadSound("music/selectability");
  sun = loadSound("music/sunorb");
  waterlevelup = loadSound("music/water");
  firelevelup = loadSound("music/fireballs");
  airlevelup = loadSound("music/air");
  earthlevelup = loadSound("music/earth");
  speedlevelup = loadSound("music/speed");
  healthlevelup = loadSound("music/healthincrease");
  defenselevelup = loadSound("music/defense");
  sunlevelup = loadSound("music/sun");
}
// to do:
// save high score, if they have completed tutorial, maybe upgrade drops that can be equipped
// add pause
// add magnet
// balance defense
// add projectile enemies
// health bar under player in red box
// enemy damaged sound
// add boss levels
// add sword damage
// add play again
// clean up code with cull and waterfield.layer
// balance game
// cleaner visuals

window.setup = () => {
  waterfield = new Sprite();
  waterfield.visible = false;
  // had to ungroup, hide it, and make a new sprite to make it under the player
  player = new Sprite(windowWidth / 2, windowHeight / 2, 20, 40);
  resetstats();
  groupinit();
  physicsinit();
  visualinit();
  timecounter();
  createCanvas(windowWidth, windowHeight);
	while (experience.length < 30) {
    new experience.Sprite();
    experience.x = () => random(0, windowWidth);
    experience.y = () => random(0, windowHeight);
	}
  overlapchecker();
  backgroundmusic();
  let imagenumber = Math.ceil(random(5));
  bg = loadImage("images/" + imagenumber + "-min.jpg");
};

function backgroundmusic() {
  backgroundsounds.play();
  backgroundsounds.loop();
  backgroundsounds.setVolume(.02);
  userStartAudio();
}

function visualinit() {
  enemies.addAnimation("enemyimage", enemyimage);
  enemies.addAnimation("enemyimage2", enemyimage2);
  waterfield.addAnimation("waterimage", waterimage);
  player.addAnimation("rightattack", rightattack);
	player.addAnimation("leftattack", leftattack);
  player.addAnimation("right", testimage);
	player.addAnimation("left", test2image);
  player.addAnimation("standright", standright);
	player.addAnimation("standleft", standleft);
  bouncer.addAnimation("airimage", airimage);
  rotators.addAnimation("earthimage", earthimage);
  fireballs.addAnimation("fireimage", fireimage);
  bullets.addAnimation("sunimage", sunimage);
  healths.addAnimation("healthimage", healthimage);
  bombs.addAnimation("bombimage", bombimage);
  experience.addAnimation("experienceimage", experienceimage);
}

function resetstats() {
  facing = "right";
  x1 = 0;
  y1 = 0;
  x2 = windowWidth;
  y2 = windowHeight;
  playerhealth = 100;
  PLAYERMAXHEALTH = 100;
  score = 0;
  experiencepoints = 10;
  // experiencepoints = 29;
  level = 0;
  time = 1;
  // time = 600;
  framecounter = 0;
  PLAYERSPEED = 3.25;
  // PLAYERSPEED = 5;
  BULLETDAMAGE = 540;
  rotatorson = false;
  bounceron = false;
  xdirection = 1;
  ydirection = 1;
  wateron = false;
  fireballon = false;
  fireballct = 0;
  RESISTANCE = 1;
  FIREBALLDAMAGE = 320;
  WATERFIELDDAMAGE = 0;
  BOUNCERDAMAGE = 1250;
  ROTATORDAMAGE = 550;
  BOUNCESPEED = 14;
}

function groupinit() {
  bombs = new Group();
  rotators = new Group();
  healths = new Group();
  bullets = new Group();
  bouncer = new Group();
  // waterfield = new Group();
  enemies = new Group();
	experience = new Group();
  fireballs = new Group();
}

function physicsinit() {
  // bullets.shapeColor = color("orange");
  // bullets.rotateToDirection = true;
  // player.color = "yellow";
  // bombs.color = "black";
  player.autoCull = false;
  bombs.diameter = 20;
  // rotators.color = "brown";
  rotators.diameter = 60;
  // healths.color = "orange";
  healths.diameter = 30;
  // fireballs.color = "red"
  fireballs.diameter = 80;
	// experience.color = "lightgreen";
	experience.diameter = 10;
  player.collider = "kinematic";
  player.rotationLock = true;
  // player.bounciness = 0.001;
  // enemies.mass = 0;
  // bouncer.isSuperFast = true;
  bouncer.friction = 0;
  bouncer.x = player.x;
  bouncer.y = player.y;
  // bouncer.color = "purple";
  bouncer.diameter = 55;
  waterfield.diameter = 180;
  // waterfield.color = color(0,0,240,67);
  enemies.width = 15;
  enemies.height = 30;
  // enemies.color = "black";
  enemies.rotationLock = true;
}

function overlapchecker() {
  player.overlaps(experience, experiencecollect);
  enemies.collides(player, damagetoplayer);
  player.overlaps(bullets);
  player.overlaps(bombs, bombcollect);
  player.overlaps(healths, healthcollect);
  player.overlaps(rotators);
  player.overlaps(fireballs);
  player.overlaps(waterfield);
  player.overlaps(bouncer);

  experience.overlaps(experience);
  experience.overlaps(bullets);
  experience.overlaps(enemies);
  experience.overlaps(bombs);
  experience.overlaps(healths);
  experience.overlaps(rotators);
  experience.overlaps(bouncer);
  experience.overlaps(waterfield);
  experience.overlaps(fireballs);

  enemies.overlaps(bombs);
  enemies.overlaps(healths);
  fireballs.overlapping(enemies, fireballdamagetoenemy);
  rotators.collides(enemies, rotatordamagetoenemy);
  bouncer.overlaps(enemies, bouncerdamagetoenemy);
  waterfield.overlapping(enemies, waterfielddamagetoenemy);
  bullets.collides(enemies, bulletdamagetoenemy);

  bullets.overlaps(bullets);
  bullets.overlaps(bombs);
  bullets.overlaps(healths);
  bullets.overlaps(rotators);
  bullets.overlaps(bouncer);
  bullets.overlaps(waterfield);
  bullets.overlaps(fireballs);

  bombs.overlaps(bombs);
  bombs.overlaps(healths);
  bombs.overlaps(rotators);
  bombs.overlaps(bouncer);
  bombs.overlaps(waterfield);
  bombs.overlaps(fireballs);

  healths.overlaps(healths);
  healths.overlaps(rotators);
  healths.overlaps(bouncer);
  healths.overlaps(waterfield);
  healths.overlaps(fireballs);

  rotators.overlaps(rotators);
  rotators.overlaps(bouncer);
  rotators.overlaps(waterfield);
  rotators.overlaps(fireballs);

  bouncer.overlaps(waterfield);
  bouncer.overlaps(fireballs);

  waterfield.overlaps(fireballs);

  fireballs.overlaps(fireballs);
}

function timecounter() {
  setInterval(function() {
    time += 1;
  }, 1000);
}

function experiencecollect(player, experience) {
  // experiencesound.play();
  // experiencesound.setVolume(.05);
  experience.remove();
  experiencepoints += 1;
  checklevel();
}

function bombcollect(player, bomb) {
  bombsound.play();
  bombsound.setVolume(.25);
  bomb.remove();
  for (let i = 0; i < enemies.length; i++) {
    bombdamagetoenemy(bomb, enemies[i]);
  }
}

function healthcollect(player, health) {
  healthsound.play();
  healthsound.setVolume(.25);
  health.remove();
  playerhealth = PLAYERMAXHEALTH;
}

function damagetoplayer(player) {
  playerhealth -= RESISTANCE * time / 700;
  fill(255, 0, 0, 25);
  rect(0, 0, windowWidth, windowHeight);
}

function bulletdamagetoenemy(weapon, enemy) {
  enemy.life -= BULLETDAMAGE;
  enemykilledupdate(enemy);
  weapon.remove();
}

function fireballdamagetoenemy(weapon, enemy) {
  enemy.life -= FIREBALLDAMAGE;
  enemykilledupdate(enemy);
}

function waterfielddamagetoenemy(weapon, enemy) {
  enemy.life -= WATERFIELDDAMAGE;
  if (enemy.drag != -2 && wateron) {
    enemy.drag = -1;
  }
  enemykilledupdate(enemy);
}

function bouncerdamagetoenemy(weapon, enemy) {
  enemy.life -= BOUNCERDAMAGE;
  enemykilledupdate(enemy);
}

function rotatordamagetoenemy(weapon, enemy) {
  enemy.life -= ROTATORDAMAGE;
  enemy.drag = -2;
  enemykilledupdate(enemy);
}

function bombdamagetoenemy(weapon, enemy) {
  enemy.life = 0;
  enemykilledupdate(enemy);
}

function enemykilledupdate(enemy) {
  if (enemy.life <= 0) {
    if (random(10) > 3) {
      new experience.Sprite(enemy.x, enemy.y);
    }
    if (random(1000) > 998.5) {
      new bombs.Sprite(enemy.x - 10, enemy.y - 10);
    }
    if (random(1000) > 998.25) {
      new healths.Sprite(enemy.x + 10, enemy.y - 10);
    }
    enemy.remove();
    score += 100 + time;
  }
}

function checklevel() {
  if (experiencepoints < 268) {
    level = experiencepoints / 10;
  } else {
    level = Math.pow(experiencepoints, 1 / 1.7);
  }
  if (experiencepoints % 30 === 0 && experiencepoints < 240 || experiencepoints === 250 || experiencepoints === 324 || experiencepoints === 421 || experiencepoints === 529 || experiencepoints === 646 || experiencepoints === 773 || experiencepoints === 909 || experiencepoints === 1054 || experiencepoints === 1207 || experiencepoints === 1370 || experiencepoints === 1540 || experiencepoints === 1719 || experiencepoints === 1905 || experiencepoints === 2100 || experiencepoints === 2303 || experiencepoints === 2512 || experiencepoints === 2729 || experiencepoints === 2953 || experiencepoints === 3185 || experiencepoints === 3424 || experiencepoints === 3670 || experiencepoints === 3923 || experiencepoints === 4183 || experiencepoints === 4450 || experiencepoints === 4724 || experiencepoints === 5004) {
    redraw();
    selectability.play();
    selectability.setVolume(.1);
    generateleveloptions();
  }
}

function generateleveloptions() {
  fill(0,0,0,180);
  rect(0, 0, windowWidth, windowHeight);
  let option1 = Math.floor(random(0, 8));
  let option2 = Math.floor(random(0, 8));
  let option3 = Math.floor(random(0, 8));
  while (option2 === option1) {
    option2 = Math.floor(random(0, 8));
  }
  while (option3 === option1 || option3 === option2) {
    option3 = Math.floor(random(0, 8));
  }
  let options = [option1, option2, option3];
  for (let i = 0; i < 3; i++) {
    let buttonback = createButton(powerups[options[i]][1]);
    buttonback.style("border-radius", "45px");
    if (options[i] === 0) {
      buttonback.style("background-image", "radial-gradient(#FDFF7A 21%, #FF4040 80%)");
    } else if (options[i] === 1) {
      buttonback.style("background-image", "radial-gradient(#B0B0B0 21%, #8C5400 80%)");
    } else if (options[i] === 2) {
      buttonback.style("background-image", "radial-gradient(#F4FF00 21%, #FF0000 80%)");
    } else if (options[i] === 3) {
      buttonback.style("background-image", "radial-gradient(#FFE6E6 21%, #FF1515 80%)");
    } else if (options[i] === 4) {
      buttonback.style("background-image", "radial-gradient(#C8C8C8 21%, #333333 80%)");
    } else if (options[i] === 5) {
      buttonback.style("background-image", "radial-gradient(#DDFFFD 21%, #54FFF5 90%)");
    } else if (options[i] === 6) {
      buttonback.style("background-image", "radial-gradient(#FFD654 21%, #FFF054 80%)");
    } else if (options[i] === 7) {
      buttonback.style("background-image", "radial-gradient(#5BB5D6 21%, #548AFF 80%)");
    }
    buttonback.style("color", "#373737");
    buttonback.style("font-size", "28px");
    buttonback.style("border", "3px solid black");
    buttonback.size(windowWidth / 4, 2 * windowHeight / 3);
    buttonback.position(i * windowWidth / 3 + 1 * windowWidth / 26, 1 * windowHeight / 5);
    let button = createButton(powerups[options[i]][0]);
    button.style("border-radius", "5px");
    button.style("background-color", "white");
    button.style("border", "1px solid");
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(i * windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 20);
    button.attribute = options[i];
    noLoop();
    button.mousePressed(() => {
    if (button.attribute === 0) {
      if (!fireballon) {
        fireballon = true;
      }
      fireballct += 1;
      FIREBALLDAMAGE += 50;
      firelevelup.play();
      firelevelup.setVolume(.3);
    } else if (button.attribute === 1) {
      rotatorson = true;
      new rotators.Sprite();
      ROTATORDAMAGE += 25;
      earthlevelup.play();
      earthlevelup.setVolume(.08);
    } else if (button.attribute === 2) {
      PLAYERSPEED += .25;
      speedlevelup.play();
      speedlevelup.setVolume(.2);
    } else if (button.attribute === 3) {
      let healthgained = PLAYERMAXHEALTH;
      PLAYERMAXHEALTH += healthgained;
      playerhealth += healthgained;
      healthlevelup.play();
      healthlevelup.setVolume(.3);
    } else if (button.attribute === 4) {
      if (RESISTANCE > .5) {
        RESISTANCE -= .2;
      } else if (RESISTANCE > .1) {
        RESISTANCE -= .1;
      } else {
        RESISTANCE = .01;
      }
      defenselevelup.play();
      defenselevelup.setVolume(.2);
    } else if (button.attribute === 5) {
      if (!bounceron) {
        new bouncer.Sprite();
        bounceron = true;
      } else {
        BOUNCESPEED += 1;
        BOUNCERDAMAGE += 300;
      }
      airlevelup.play();
      airlevelup.setVolume(.25);
    } else if (button.attribute === 6) {
      BULLETDAMAGE += 300;
      sunlevelup.play();
      sunlevelup.setVolume(.15);
    } else if (button.attribute === 7) {
      if (!wateron) {
        // new waterfield.Sprite();
        WATERFIELDDAMAGE = 4;
        waterfield.visible = true;
        wateron = true;
      } else {
        WATERFIELDDAMAGE += .6;
      }
      waterlevelup.play();
      waterlevelup.setVolume(.2);
    }
    let buttons = selectAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
    }
    loop();
  });

  }
}

function spawnenemy() {
  let enemy = new enemies.Sprite();
  enemy.life = 100 + Math.pow(time, 1.35);
  if (random(2) > 1) {
    if (random(2) > 1) {
      enemy.x = random(0, player.x + windowWidth / 2);
      enemy.y = player.y - windowHeight / 2;
    } else {
      enemy.x = random(0, player.x + windowWidth / 2);
      enemy.y = player.y + windowHeight / 2;
    }
  } else {
    if (random(2) > 1) {
      enemy.x = player.x - windowWidth / 2;
      enemy.y = random(0, player.y + windowHeight / 2);
    } else {
      enemy.x = player.x + windowWidth / 2;
      enemy.y = random(0, player.y + windowHeight / 2);
    }
  }
}

window.mousePressed = () => {
    sun.play();
    sun.setVolume(.2);
    let bullet = new bullets.Sprite(player.x, player.y, 15, 15);
    bullet.moveTowards(mouse.x + player.mouse.x, mouse.y + player.mouse.y);
    bullet.speed = 20;
    if (facing === "right") {
      player.ani = "rightattack";
    } else {
      player.ani = "leftattack";
    }
};

window.draw = () => {
  if (Math.floor(playerhealth) <= 0) {
    backgroundsounds.setVolume(.005);
    losesound.play();
    losesound.setVolume(.3);
    let buttonback = createButton("Game over. The shadows have taken over the land and soon the Sun.");
    buttonback.style("border-radius", "15px");
    buttonback.style("background-image", "radial-gradient(red 21%, black 80%)");
    buttonback.style("color", "white");
    buttonback.style("border", "none");
    buttonback.style("font-size", "30px");
    buttonback.size(windowWidth / 2, 2 * windowHeight / 3);
    buttonback.position(windowWidth / 6 + 2 / 24 * windowWidth, 1 * windowHeight / 5);
    let button = createButton("Score: " + score);
    button.style("background-color", "black");
    button.style("color", "white");
    button.style("border", "none");
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 20);
    noLoop();
  }
  for (let i = 0; i < bullets.length; i ++) {
    if (bullets[i].x > player.x + 2 * windowWidth / 3 || bullets[i].y > player.y + 2 * windowHeight / 3 || bullets[i].x < player.x - 2 * windowWidth / 3 || bullets[i].y < player.y - 2 * windowHeight / 3) {
      bullets[i].remove();
    }
  }
  framecounter += 1;
  clear();
  image(bg, x1, y1, windowWidth + 8, windowHeight + 8);
  image(bg, x2, y2, windowWidth + 8, windowHeight + 8);
  image(bg, x1, y2, windowWidth + 8, windowHeight + 8);
  image(bg, x2, y1, windowWidth + 8, windowHeight + 8);
  if (time > 20) {
    fill(250, 250, 210, 30);
    rect(0, 0, windowWidth, windowHeight);
  }
  if (x1 < -windowWidth){
    x1 = windowWidth;
  } else if (x1 > windowWidth) {
    x1 = -windowWidth;
  }
  if (x2 < -windowWidth){
    x2 = windowWidth;
  } else if (x2 > windowWidth) {
    x2 = -windowWidth;
  }
  if (y1 < -windowHeight){
    y1 = windowHeight;
  } else if (y1 > windowHeight) {
    y1 = -windowHeight;
  }
  if (y2 < -windowHeight){
    y2 = windowHeight;
  } else if (y2 > windowHeight) {
    y2 = -windowHeight;
  }

  if (framecounter % 150 === 0 && time > 20) {
    for (let i = 0; i < time * Math.pow(windowWidth, 2) / 15000000; i++) {
      if (enemies.length < Math.pow(windowWidth, 2) / 12000) {
        spawnenemy();
      }
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x > player.x + 2 * windowWidth / 3 || enemies[i].y > player.y + 2 * windowHeight / 3 || enemies[i].x < player.x - 2 * windowWidth / 3 || enemies[i].y < player.y - 2 * windowHeight / 3) {
      enemies[i].remove();
      // if (enemies.length < Math.pow(windowWidth, 2) / 12000) {
      spawnenemy();
      // }
      // fix so you cant run through
    }
    // enemies[i].moveTo(player.x, player.y, 2.5 + time / 300);
    let enemydirection = Math.atan2(player.y - enemies[i].y, player.x - enemies[i].x) * 180 / Math.PI;
    enemies[i].direction = enemydirection;
    enemies[i].speed = 2.5 + time / 300;
    if (enemies[i].x < player.x) {
      enemies[i].ani = "enemyimage2";
    } else {
      enemies[i].ani = "enemyimage";
    }
    enemies[i].life += 1;
    if (enemies[i].drag === -1) {
      // enemies[i].moveTo(player.x, player.y, .25 * (2.5 + time / 300));
      enemies[i].speed = .25 * (2.5 + time / 300);
      enemies[i].drag = 0;
    }
    if (enemies[i].drag === -2) {
      // enemies[i].moveTo(player.x, player.y, .75 * (2.5 + time / 300));
      enemies[i].speed = .75 * (2.5 + time / 300);
      // enemies[i].move(30, angleTo(player.x, player.y, 0), 2.5 + time / 300);
    }
  }
  for (let i = 0; i < experience.length; i++) {
    // if (experience[i].x > player.x + 2 * windowWidth || experience[i].y > player.y + 2 * windowHeight || experience[i].x < player.x - 2 * windowWidth || experience[i].y < player.y - 2 * windowHeight) {
    //   experience[i].remove();
    // }
    if (experience[i].life <= 99997300) {
      experience[i].remove();
      experiencepoints += 1;
    }
  }
  if (kb.pressing("down") && kb.pressing("left")) {
    player.ani = "left";
    facing = "left";
    player.move(PLAYERSPEED * 1.5, 135, PLAYERSPEED - 1);
    y1 -= PLAYERSPEED - 1;
    y2 -= PLAYERSPEED - 1;
    x1 += PLAYERSPEED - 1;
    x2 += PLAYERSPEED - 1;
	} else if (kb.pressing("down") && kb.pressing("right")) {
    player.ani = "right";
    facing = "right";
    player.move(PLAYERSPEED * 1.5, 45, PLAYERSPEED - 1);
    y1 -= PLAYERSPEED - 1;
    y2 -= PLAYERSPEED - 1;
    x1 -= PLAYERSPEED - 1;
    x2 -= PLAYERSPEED - 1;
	} else if (kb.pressing("up") && kb.pressing("left")) {
    player.ani = "left";
    facing = "left";
    player.move(PLAYERSPEED * 1.5, 225, PLAYERSPEED - 1);
    y1 += PLAYERSPEED - 1;
    y2 += PLAYERSPEED - 1;
    x1 += PLAYERSPEED - 1;
    x2 += PLAYERSPEED - 1;
	} else if (kb.pressing("up") && kb.pressing("right")) {
    player.ani = "right";
    facing = "right";
    x1 -= PLAYERSPEED - 1;
    x2 -= PLAYERSPEED - 1;
    y1 += PLAYERSPEED - 1;
    y2 += PLAYERSPEED - 1;
    player.move(PLAYERSPEED * 1.5, 315, PLAYERSPEED - 1);
	} else if (kb.pressing("right")) {
    player.ani = "right";
    facing = "right";
    x1 -= PLAYERSPEED;
    x2 -= PLAYERSPEED;
		player.move(PLAYERSPEED * 1.5, "right", PLAYERSPEED);
	} else if (kb.pressing("left")) {
    player.ani = "left";
    facing = "left";
    x1 += PLAYERSPEED;
    x2 += PLAYERSPEED;
    player.move(PLAYERSPEED * 1.5, "left", PLAYERSPEED);
  } else if (kb.pressing("up")) {
    y1 += PLAYERSPEED;
    y2 += PLAYERSPEED;
    player.move(PLAYERSPEED * 1.5, "up", PLAYERSPEED);
	} else if (kb.pressing("down")) {
    player.move(PLAYERSPEED * 1.5, "down", PLAYERSPEED);
    y1 -= PLAYERSPEED;
    y2 -= PLAYERSPEED;
	} else {
    if (facing === "right") {
      player.ani = "standright";
    } else {
      player.ani = "standleft";
    }
  }
  if (time <= 24) {
    let texttutorial = ["Fight against the shadow warriors who are plotting to attack the Sun.", "Shoot sun orbs with LMB and use your abilities to defeat them.",
        "Be careful not to get near the shadows.", "Move around with WASD and dodge their necrotic attacks.",
        "As you defeat more shadows, they'll drop sun souls.", "Use these souls to level up and become stronger.",
        "As you collect souls, you'll gain powers.",
        "Help save the Sun from danger. Good luck!"];
    fill("white");
    stroke(50);
    strokeWeight(1.5);
    textSize(30);
    textAlign(CENTER);
    text(texttutorial[Math.floor(time / 3)], windowWidth / 2, 120);
    // player.x = constrain(player.x, 0, windowWidth);
    // player.y = constrain(player.y, 0, windowHeight);
  }
  if (time > 20) {
    textSize(17);
    textAlign(CENTER);
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(windowWidth * 3 / 10, windowHeight * 1 / 10, windowWidth * 4 / 10, windowHeight * 1 / 20);
    noStroke();
    fill("green");
    rect(windowWidth * 3 / 10, windowHeight * 1 / 10, map(level- Math.floor(level), 0, 1, 0, windowWidth * 4 / 10), windowHeight * 1 / 20);
    fill("black");
    textFont("Courier New");
    text("Score: " + score, windowWidth - 140, windowHeight * 1 / 20);
    let minutes = Math.floor(time / 60);
    let extraSeconds = time % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    text("Time: " + minutes + ":" + extraSeconds, 0 + 80, windowHeight * 1 / 20);
    text("Health: " + Math.floor(playerhealth) + "/" + PLAYERMAXHEALTH, windowWidth * 10 / 13, windowHeight * 2 / 15);
    textSize(20);
    textFont("Arial");
    text("Level: " + Math.floor(level), windowWidth / 2, windowHeight * 1 / 11);
  }
  if (rotatorson) {
    for (let i = 1; i < rotators.length + 1; i++) {
      let spacing = (i * 2 * Math.PI / rotators.length);
      let circularx = Math.cos(framecounter / 20) * Math.cos((spacing));
      let circulary = Math.sin(framecounter / 20) * Math.sin((spacing));
      rotators[i - 1].x = player.x + 150 * circularx;
      rotators[i - 1].y = player.y + 150 * circulary;
    }
  }
  if (bounceron) {
    bouncer.x = constrain(bouncer.x, player.x - windowWidth / 2, player.x + windowWidth / 2);
    bouncer.y = constrain(bouncer.y, player.y - windowHeight / 2, player.y + windowHeight / 2);
    bouncer.x += BOUNCESPEED * xdirection;
    bouncer.y += BOUNCESPEED * ydirection;
    if (bouncer.x > player.x + windowWidth / 2 || bouncer.x < player.x - windowWidth / 2) {
      xdirection *= -1;
    }
    if (bouncer.y > player.y + windowHeight / 2 || bouncer.y < player.y - windowHeight / 2) {
      ydirection *= -1;
    }
  }
  waterfield.x = player.x;
  waterfield.y = player.y;
  camera.x = player.x;
  camera.y = player.y;
  if (fireballon && framecounter % 180 === 0) {
    for (let i = 0; i < fireballct; i++) {
      let fireball = new fireballs.Sprite();
      fireball.x = player.x;
      fireball.y = player.y;
      fireball.speed = 40;
      let spacing = (i * 2 * Math.PI / fireballct) + Math.PI / 2;
      fireball.moveTowards(player.x + 200 * Math.cos(spacing), player.y + 200 * Math.sin(spacing));
      if (fireballs[i].x > player.x + 2 * windowWidth / 3 || fireballs[i].y > player.y + 2 * windowHeight / 3 || fireballs[i].x < player.x - 2 * windowWidth / 3 || fireballs[i].y < player.y - 2 * windowHeight / 3) {
        fireballs[i].remove();
      }
    }
    if (facing === "right") {
      player.ani = "rightattack";
    } else {
      player.ani = "leftattack";
    }
  }
  if (time % 180 === 0) {
    enemies.remove();
    // for (let i = 0; i < enemies.length; i++) {
    //   enemies[i].remove();
    // }
    experience.remove();
    bombs.remove();
    healths.remove();
    bullets.remove();
    fireballs.remove();
    // clear();
    time += 1;
  }
};