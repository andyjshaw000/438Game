let player;
let playerhealth;
let score;
let experience;
let level;
let experiencepoints;
let enemies;
let difficulty;
let time;
let framecounter;
let bullets;
let magnets;
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
let waterfielddiameter;
let wateron;
let waterfield;
let fireballs;
let fireballon;
let fireballct;
let RESISTANCE;

// to do:
// buttons popup for upgrades
// cleaner physics (fix experience and power up collisions)
// animations + visual improvements + sound (health, experience, font, background, music, enemies, player, weapon)
// clean up code (fix enemy spawn when running one direction, bouncing character makes them faster than their speed)
// make a game over
// make a menu
// tutorial with text content in middle and enemies dont spawn until 10 seconds in
// fix levelup glitch

window.setup = () => {
  resetstats();
  timecounter();
  createCanvas(windowWidth, windowHeight);
  magnets = new Group();
  magnets.color = "red";
  magnets.diameter = 20;
  bombs = new Group();
  bombs.color = "black";
  bombs.diameter = 20;
  rotators = new Group();
  rotators.color = "brown";
  rotators.diameter = 40;
  healths = new Group();
  healths.color = "orange";
  healths.diameter = 30;
  fireballs = new Group();
  fireballs.color = "red"
  fireballs.diameter = 80;
  bullets = new Group();
  enemies = new Group();
	experience = new Group();
	experience.color = "lightgreen";
	experience.diameter = 8;
  noStroke();
  player = new Sprite(windowWidth / 2, windowHeight / 2, 25, 25);
  player.color = "yellow";
  player.overlaps(experience, collect);
  player.overlaps(magnets, magnetcollect);
  player.overlaps(bombs, bombcollect);
  player.overlaps(healths, healthcollect);
  player.overlaps(bullets);
  player.overlaps(rotators)
  experience.overlaps(bullets);
  experience.overlaps(enemies);
	while (experience.length < 200) {
    // spawn less in beginning
    new experience.Sprite();
    experience.x = () => random(0, windowWidth);
    experience.y = () => random(0, windowHeight);
	}
  player.rotationLock = true;
  player.bounciness = 0.001;
};

function resetstats() {
  playerhealth = 100;
  PLAYERMAXHEALTH = 100;
  score = 0;
  experiencepoints = 90;
  level = 1;
  difficulty = 0;
  time = 0;
  framecounter = 0;
  PLAYERSPEED = 6;
  BULLETDAMAGE = 180;
  rotatorson = false;
  bounceron = false;
  xdirection = 1;
  ydirection = 1;
  waterfielddiameter = 20;
  wateron = false;
  fireballon = false;
  fireballct = 0;
  RESISTANCE = 1;
}

function timecounter() {
  // setInterval(function() {
  //   time += 1;
  // }, 1000);
  time = 300;
}

function collect(player, experience) {
  experience.remove();
  experiencepoints += 1;
}

function magnetcollect(player, magnet) {
  magnet.remove();
  // could make look cooler
  for (let i = 0; i < experience.length; i++) {
    experience[i].remove();
    experiencepoints += 1
  }
}

function bombcollect(player, bomb) {
  // could make look cooler
  bomb.remove();
  for (let i = 0; i < enemies.length; i++) {
    damagetoenemy(bomb, enemies[i]);
  }
}

function healthcollect(player, health) {
  // could make look cooler
  health.remove();
  playerhealth = PLAYERMAXHEALTH;
}

function damagetoplayer(enemy, player) {
  playerhealth -= RESISTANCE * Math.ceil(time / 60);
}

function damagetoenemy(weapon, enemy) {
  enemy.life -= BULLETDAMAGE;
  if (enemy.life < 1) {
    if (random(10) > 2) {
    new experience.Sprite(enemy.x, enemy.y);
    }
    if (random(1000) > 996) {
      new magnets.Sprite(enemy.x + 10, enemy.y + 10);
    }
    if (random(1000) > 998) {
      new bombs.Sprite(enemy.x - 10, enemy.y - 10);
    }
    if (random(1000) > 997) {
      new healths.Sprite(enemy.x + 10, enemy.y - 10);
    }
    enemy.remove();
    score += 100 + 5 * time;
  }
  // weapon.remove();
  // ^only for bullet
}

function checklevel() {
  if (experiencepoints < 268) {
    level = experiencepoints / 10;
  } else {
    level = Math.pow(experiencepoints, 1/1.7);
  }
  if (experiencepoints % 50 === 0 && experiencepoints < 268 || experiencepoints === 324 || experiencepoints === 421 || experiencepoints === 529 || experiencepoints === 646 || experiencepoints === 773 || experiencepoints === 909 || experiencepoints === 1054 || experiencepoints === 1207 || experiencepoints === 1370 || experiencepoints === 1540 || experiencepoints === 1719 || experiencepoints === 1905 || experiencepoints === 2100 || experiencepoints === 2303 || experiencepoints === 2512) {
    // noLoop();
    experiencepoints += 1;
    generateleveloptions();
  }
}

function generateleveloptions() {
  let powerups = {0:["Add a Fireball", "Fireballs burn through enemies dealing massive damage!"], 1:["Add a Stonewall", "Indestructible stones surround you, preventing enemies from getting near you"], 2:["Increase Speed", "Move faster to dodge and weave past enemies"], 3:["Increase Health", "More health makes you able to take more damage for longer"], 4:["Increase Defense", "Take less damage from enemies"], 5:["Power up your Airball", "Enemies won't know when it's coming, but it always comes back"], 6:["Increase your Sun Damage", "Shadows really don't like the sun"], 7:["Power up your Waterfield", "Surround yourself in an endless whirlpool"]};
  //  upgrade options:
  //  fireballs
  //  rotators
  //  speed
  //  health
  //  resistance
  //  bouncy
  //  water field
  //  bullet dmg/amount
  let option1 = Math.floor(random(0, 8));
  let option2 = Math.floor(random(0, 8));
  let option3 = Math.floor(random(0, 8));
  while (option2 === option1) {
    let option2 = Math.floor(random(0, 8));
  }
  while (option3 === option1 || option3 === option2) {
    let option3 = Math.floor(random(0, 8));
  }
  let options = [option1, option2, option3];
  for (let i = 0; i < 3; i++) {
    let button = createButton(powerups[options[i]][0]);
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(i * windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5);
    let card = rect(i * windowWidth / 3 + 2 * windowWidth / 35, windowHeight / 6, windowWidth / 10 + 4 * windowWidth / 35, 3 * windowHeight / 4);
    // fill("white");
    // let text = text(powerups[options[i]][1], i * windowWidth / 3 + 2 * windowWidth / 35, windowHeight / 6);
    noLoop();
    button.mousePressed(() => {
    RESISTANCE -= .08;
    PLAYERMAXHEALTH += 100;
    playerhealth += 100;
    PLAYERSPEED += 1;
    BULLETDAMAGE *= 10
    // ^should upgrade gun
    rotatorson = true;
    new rotators.Sprite();
    rotators.collides(enemies, damagetoenemy);
    rotators.overlaps(experience);
    if (!bounceron) {
      bouncer = new Sprite(player.x + 40, player.y + 40);
    }
    bouncer.color = "purple";
    bouncer.diameter = 20;
    bounceron = true;
    BOUNCESPEED = 10;
    bouncer.isSuperFast = true;
    bouncer.friction = 0;
    bouncer.overlaps(enemies, damagetoenemy);
    if (!wateron) {
      waterfield = new Sprite(player.x, player.y);
    }
    waterfield.color = color(0,0,240,67);
    waterfield.diameter += 20;
    wateron = true;
    waterfield.overlaps(enemies, damagetoenemy);
    // ^ really this should slow them down through friction
    waterfield.overlaps(experience);
    fireballon = true;
    fireballct += 1;
    player.overlaps(waterfield);
    player.overlaps(bouncer);
    player.overlaps(fireballs);
    let buttons = selectAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
    }
    // should remove all buttons
    // add a card description
    // only make a new sprite if (____on === false) for bouncer and water
    loop();
  });

  }
}

function spawnenemy() {
  let enemy = new enemies.Sprite();
  enemy.width = 3 * player.width / 4;
  enemy.height = 3 * player.height / 4;
  enemy.life = 100 + Math.pow(time, 1.1);
  enemy.color = "black";
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
  enemy.rotateToDirection = true;
  enemy.collides(player, damagetoplayer);
}


window.mousePressed = () => {
    // let bullet = new bullets.Sprite(player.x + 10 * ((mouse.x + player.mouse.x - player.x) / Math.abs(mouse.x + player.mouse.x - player.x)), player.y + 10 * ((mouse.y + player.mouse.y - player.y) / Math.abs(mouse.y + player.mouse.y - player.y)), 10, 10);
    let bullet = new bullets.Sprite(player.x, player.y, 10, 10);
    bullet.shapeColor = color("orange");
    bullet.rotateToDirection = true;
    bullet.moveTowards(mouse.x + player.mouse.x, mouse.y + player.mouse.y);
    bullet.speed = 20;
    bullet.collides(enemies, damagetoenemy);
}

window.draw = () => {
  // if (playerhealth < 1) {
  //   rect(windowWidth * 3 / 10, windowHeight * 1 / 10, windowWidth * 4 / 10, windowHeight * 8 / 10);
  //   fill(255, 255, 255);
  //   text("Score:" + score, windowWidth / 2, windowHeight / 2);
  //   noLoop();
  // }
  clear();
  checklevel();
  framecounter += 1;
  if (framecounter % 150 === 0) {
    for (let i = 0; i < time * (Math.pow(windowWidth, 2) / 1000000) / random(8, 50); i++) {
      if (enemies.length < Math.pow(windowWidth, 2) / 5000) {
        spawnenemy();
      }
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x > player.x + 2 * windowWidth / 3 || enemies[i].y > player.y + 2 * windowHeight / 3 || enemies[i].x < player.x - 2 * windowWidth / 3 || enemies[i].y < player.y - 2 * windowHeight / 3) {
      enemies[i].remove();
      spawnenemy();
      // fix so you cant run through
    }
    enemies[i].moveTo(player.x, player.y, 5 + time / 225);
    enemies[i].life += 1;
  }
  for (let i = 0; i < experience.length; i++) {
    if (experience[i].x > player.x + 2 * windowWidth || experience[i].y > player.y + 2 * windowHeight || experience[i].x < player.x - 2 * windowWidth || experience[i].y < player.y - 2 * windowHeight) {
      experience[i].remove();
      // experiencepoints += .01;
      // fix so you cant run through
    }
  }
  if (kb.pressing("down") && kb.pressing("left")) {
    player.move(PLAYERSPEED * 1.5, 135, PLAYERSPEED);
	} else if (kb.pressing("down") && kb.pressing("right")) {
    player.move(PLAYERSPEED * 1.5, 45, PLAYERSPEED - 1);
	} else if (kb.pressing("up") && kb.pressing("left")) {
    player.move(PLAYERSPEED * 1.5, 225, PLAYERSPEED - 1);
	} else if (kb.pressing("up") && kb.pressing("right")) {
    player.move(PLAYERSPEED * 1.5, 315, PLAYERSPEED - 1);
	} else if (kb.pressing("right")) {
		player.move(PLAYERSPEED * 1.5, "right", PLAYERSPEED);
	} else if (kb.pressing("left")) {
    player.move(PLAYERSPEED * 1.5, "left", PLAYERSPEED);
  } else if (kb.pressing("up")) {
    player.move(PLAYERSPEED * 1.5, "up", PLAYERSPEED);
	} else if (kb.pressing("down")) {
    player.move(PLAYERSPEED * 1.5, "down", PLAYERSPEED);
	}
  camera.x = player.x;
  camera.y = player.y;
  textSize(15);
  textAlign(CENTER);
  stroke(0);
  strokeWeight(1);
  noFill();
  rect(windowWidth * 3 / 10, windowHeight * 1 / 10, windowWidth * 4 / 10, windowHeight * 1 / 20);
  noStroke();
  fill("green");
  rect(windowWidth * 3 / 10, windowHeight * 1 / 10, map(level- Math.floor(level), 0, 1, 0, windowWidth * 4 / 10), windowHeight * 1 / 20);
  fill("black");
  text("Score:" + score, windowWidth - 100, windowHeight * 1 / 20);
  text("Health:" + playerhealth + "/" + PLAYERMAXHEALTH, windowWidth * 9 / 12, windowHeight * 2 / 15);
  text("Level:" + Math.floor(level), windowWidth / 2, windowHeight * 1 / 10);
  if (rotatorson) {
    for (let i = 1; i < rotators.length + 1; i++) {
      let spacing = (i * 2 * Math.PI / rotators.length);
      let circularx = Math.cos(framecounter / 20) * Math.cos((spacing));
      let circulary = Math.sin(framecounter / 20) * Math.sin((spacing));
      rotators[i - 1].x = player.x + 100 * circularx;
      rotators[i - 1].y = player.y + 100 * circulary;
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
  if (wateron) {
    waterfield.x = player.x;
    waterfield.y = player.y;
  }
  if (fireballon && framecounter % 200 === 0) {
    for (let i = 0; i < fireballct; i++) {
      let fireball = new fireballs.Sprite();
      fireball.x = player.x;
      fireball.y = player.y;
      fireball.overlaps(fireballs);
      fireball.overlaps(experience);
      fireballs.overlaps(enemies, damagetoenemy);
      fireballs.overlaps(rotators);
      fireballs.overlaps(waterfield);
      fireballs.overlaps(bouncer);
      let spacing = (i * 2 * Math.PI / fireballct);
      fireball.moveTowards(player.x + 200 * Math.cos(spacing), player.y + 200 * Math.sin(spacing));
      if (fireballs[i].x > player.x + 2 * windowWidth / 3 || fireballs[i].y > player.y + 2 * windowHeight / 3 || fireballs[i].x < player.x - 2 * windowWidth / 3 || fireballs[i].y < player.y - 2 * windowHeight / 3) {
        fireballs[i].remove();
      }
    }
    // need to find a way to reset fireballs every x frames
  }
};