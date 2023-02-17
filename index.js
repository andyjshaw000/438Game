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
let powerups = {0:["Add a Fireball", "Fireballs burn through enemies dealing massive damage!"], 1:["Add a Stonewall", "Indestructible stones surround you, preventing enemies from getting near you"], 2:["Increase Speed", "Move faster to dodge and weave past enemies"], 3:["Increase Health", "More health makes you able to take more damage for longer"], 4:["Increase Defense", "Take less damage from enemies"], 5:["Power up your Airball", "Enemies won't know when it's coming, but it always comes back"], 6:["Increase Sun Orb Damage", "Shadows really don't like the sun"], 7:["Power up your Waterfield", "Surround yourself in an endless whirlpool"]};
//  upgrade options:
//  fireballs
//  rotators
//  speed
//  health
//  resistance
//  bouncy
//  water field
//  bullet dmg/amount

// to do:
// different color card based on powerup
// collision clean up
// animations + visual improvements + sound (health, experience, font, background, music, enemies, player, weapon)
// clean up code (fix enemy spawn when running one direction, bouncing character makes them faster than their speed)
// make a game over
// make a menu
// tutorial with text content in middle and enemies dont spawn until 10 seconds in

window.setup = () => {
  resetstats();
  timecounter();
  createCanvas(windowWidth, windowHeight);
  bombs = new Group();
  bombs.color = "black";
  bombs.diameter = 20;
  rotators = new Group();
  rotators.color = "brown";
  rotators.diameter = 60;
  healths = new Group();
  healths.color = "orange";
  healths.diameter = 30;
  fireballs = new Group();
  fireballs.color = "red"
  fireballs.diameter = 80;
  bullets = new Group();
  bouncer = new Group();
  waterfield = new Group();
  enemies = new Group();
	experience = new Group();
	experience.color = "lightgreen";
	experience.diameter = 8;
  noStroke();
  player = new Sprite(windowWidth / 2, windowHeight / 2, 25, 25);
  player.color = "yellow";
  player.overlaps(experience, collect);
  player.overlaps(bombs, bombcollect);
  player.overlaps(healths, healthcollect);
  player.overlaps(bullets);
  player.overlaps(rotators);
  player.overlaps(fireballs);
  player.collider = "kinematic";
  experience.overlaps(bullets);
  experience.overlaps(enemies);
  fireballs.overlaps(rotators);
  fireballs.overlaps(fireballs);
	while (experience.length < 400) {
    // spawn less in beginning
    new experience.Sprite();
    experience.x = () => random(0, windowWidth);
    experience.y = () => random(0, windowHeight);
	}
  player.rotationLock = true;
  player.bounciness = 0.001;
  fireballs.overlaps(experience);
  fireballs.overlapping(enemies, fireballdamagetoenemy);
  enemies.mass = 0;
  overlapchecker();
};

function resetstats() {
  playerhealth = 100;
  PLAYERMAXHEALTH = 100;
  score = 0;
  experiencepoints = 90;
  level = 1;
  time = 290;
  framecounter = 0;
  PLAYERSPEED = 4;
  BULLETDAMAGE = 180;
  rotatorson = false;
  bounceron = false;
  xdirection = 1;
  ydirection = 1;
  wateron = false;
  fireballon = false;
  fireballct = 0;
  RESISTANCE = 1;
  FIREBALLDAMAGE = 200;
  WATERFIELDDAMAGE = 1.75;
  BOUNCERDAMAGE = 500;
  ROTATORDAMAGE = 350;
  BOUNCESPEED = 15;
}

function overlapchecker() {
  let sprites = [player, experience, enemies, bullets, bombs, healths, rotators, bouncer, waterfield, fireballs];
}

function timecounter() {
  setInterval(function() {
    time += 1;
  }, 1000);
  // time = 300;
}

function collect(player, experience) {
  experience.remove();
  experiencepoints += 1;
  checklevel();
}

function bombcollect(player, bomb) {
  // could make look cooler
  bomb.remove();
  for (let i = 0; i < enemies.length; i++) {
    bombdamagetoenemy(bomb, enemies[i]);
  }
}

function healthcollect(player, health) {
  // could make look cooler
  health.remove();
  playerhealth = PLAYERMAXHEALTH;
}

function damagetoplayer(enemy, player) {
  playerhealth -= RESISTANCE * Math.ceil(time / 60);
  fill(255,0,0,30);
  rect(0, 0, windowWidth, windowHeight);
}

// function damagetoenemy(weapon, enemy) {
//   enemy.life -= BULLETDAMAGE;
//   if (enemy.life < 1) {
//     if (random(10) > 2) {
//     new experience.Sprite(enemy.x, enemy.y);
//     }
//     if (random(1000) > 998) {
//       new bombs.Sprite(enemy.x - 10, enemy.y - 10);
//     }
//     if (random(1000) > 997) {
//       new healths.Sprite(enemy.x + 10, enemy.y - 10);
//     }
//     enemy.remove();
//     score += 100 + 5 * time;
//   }
//   // weapon.remove();
//   // ^only for bullet
// }

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
  enemy.drag = -1;
  enemykilledupdate(enemy);
}

function bouncerdamagetoenemy(weapon, enemy) {
  enemy.life -= BOUNCERDAMAGE;
  enemykilledupdate(enemy);
}

function rotatordamagetoenemy(weapon, enemy) {
  enemy.life -= ROTATORDAMAGE;
  enemykilledupdate(enemy);
}

function bombdamagetoenemy(weapon, enemy) {
  enemy.life = 0;
  enemykilledupdate(enemy);
}

function enemykilledupdate(enemy) {
  if (enemy.life < 1) {
    if (random(10) > 2) {
    new experience.Sprite(enemy.x, enemy.y);
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
}

function checklevel() {
  if (experiencepoints < 268) {
    level = experiencepoints / 10;
  } else {
    level = Math.pow(experiencepoints, 1/1.7);
  }
  if (experiencepoints % 50 === 0 && experiencepoints < 268 || experiencepoints === 324 || experiencepoints === 421 || experiencepoints === 529 || experiencepoints === 646 || experiencepoints === 773 || experiencepoints === 909 || experiencepoints === 1054 || experiencepoints === 1207 || experiencepoints === 1370 || experiencepoints === 1540 || experiencepoints === 1719 || experiencepoints === 1905 || experiencepoints === 2100 || experiencepoints === 2303 || experiencepoints === 2512) {
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
    // buttonback.style("background-color", "white");
    // buttonback.style("border", "2px solid lightgrey");
    buttonback.style("border-radius", "15px");
    buttonback.style("background-image", "radial-gradient(#FDFF7A 21%, #FFD87A 80%)");
    // buttonback:hover.style("background-position", "right center");
    buttonback.style("font-size", "35px");
    buttonback.size(windowWidth / 4, 2 * windowHeight / 3);
    buttonback.position(i * windowWidth / 3 + 1 * windowWidth / 26, 1 * windowHeight / 5);
    let button = createButton(powerups[options[i]][0]);
    button.style("background-color", "white");
    button.style("border", "1px, solid");
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(i * windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 20);
    button.attribute = options[i];
    // let text = text("hi", 1, 1);
    // new cards.Sprite(i * windowWidth / 3 + 2 * windowWidth / 35 + player.x, windowHeight / 6, windowWidth / 10 + 4 * windowWidth / 35, 3 * windowHeight / 4);
    // cards.text = "Hello!";
    // card.textColor = "white";
    // fill("white");
    // let text = text(powerups[options[i]][1], i * windowWidth / 3 + 2 * windowWidth / 35, windowHeight / 6);
    // let text = text("hi", 1, 1);
    noLoop();
    button.mousePressed(() => {
    if (button.attribute === 0) {
      if (!fireballon) {
        fireballon = true;
      }
      fireballct += 1;
    } else if (button.attribute === 1) {
      rotatorson = true;
      new rotators.Sprite();
      rotators.collides(enemies, rotatordamagetoenemy);
      rotators.overlaps(experience);
    } else if (button.attribute === 2) {
      PLAYERSPEED += 1;
    } else if (button.attribute === 3) {
      let healthgained = PLAYERMAXHEALTH;
      PLAYERMAXHEALTH += healthgained;
      playerhealth += healthgained;
    } else if (button.attribute === 4) {
      if (RESISTANCE > .5) {
        RESISTANCE -= .2;
      } else if (RESISTANCE > .1) {
        RESISTANCE -= .1;
      } else {
        RESISTANCE = .01;
      }
    } else if (button.attribute === 5) {
      if (!bounceron) {
        new bouncer.Sprite();
        bouncer.x = player.x;
        bouncer.y = player.y;
        bounceron = true;
        // bouncer.isSuperFast = true;
        // bouncer.friction = 0;
      } else {
        BOUNCESPEED += 2;
        BOUNCERDAMAGE += 100;
      }
      bouncer.color = "purple";
      bouncer.diameter = 55;
      bouncer.overlaps(enemies, bouncerdamagetoenemy);
      bouncer.overlaps(fireballs);
      player.overlaps(bouncer);
    } else if (button.attribute === 6) {
      BULLETDAMAGE += 220;
    } else if (button.attribute === 7) {
      if (!wateron) {
        new waterfield.Sprite(player.x, player.y);
        waterfield.diameter = 150;
      }
      waterfield.color = color(0,0,240,67);
      waterfield.diameter += 40;
      wateron = true;
      waterfield.overlapping(enemies, waterfielddamagetoenemy);
      waterfield.overlaps(experience);
      waterfield.overlaps(fireballs);
      player.overlaps(waterfield);
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
    bullet.collides(enemies, bulletdamagetoenemy);
}

window.draw = () => {
  // if (playerhealth < 1) {
  //   fill(255,0,0,120);
  //   rect(0, 0, windowWidth, windowHeight);
  //   // fill(255, 255, 255);
  //   // rect(windowWidth * 3 / 10, windowHeight * 1 / 10, windowWidth * 4 / 10, windowHeight * 8 / 10);
  //   text("Score:" + score, windowWidth / 2, windowHeight / 2);
  //   noLoop();
  // }
  framecounter += 1;
  // if (framecounter % 6 === 0) {
  clear();
  // }
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
    enemies[i].moveTo(player.x, player.y, 3 + time / 225);
    if (enemies[i].drag === -1) {
      enemies[i].moveTo(player.x, player.y, .15 * (5 + time / 225));
      enemies[i].drag = 0;
    }
    enemies[i].life += 1;
  }
  for (let i = 0; i < experience.length; i++) {
    if (experience[i].x > player.x + 2 * windowWidth || experience[i].y > player.y + 2 * windowHeight || experience[i].x < player.x - 2 * windowWidth || experience[i].y < player.y - 2 * windowHeight) {
      experience[i].remove();
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
  text("Health:" + Math.floor(playerhealth) + "/" + PLAYERMAXHEALTH, windowWidth * 9 / 12, windowHeight * 2 / 15);
  text("Level:" + Math.floor(level), windowWidth / 2, windowHeight * 1 / 10);
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
  if (wateron) {
    waterfield.x = player.x;
    waterfield.y = player.y;
    // player.text = waterfield.x;
  }
  if (fireballon && framecounter % 200 === 0) {
    for (let i = 0; i < fireballct; i++) {
      let fireball = new fireballs.Sprite();
      fireball.x = player.x;
      fireball.y = player.y;
      // fireballs.overlaps(experience);
      // fireballs.overlaps(enemies, damagetoenemy);
      fireball.speed = 40;
      let spacing = (i * 2 * Math.PI / fireballct);
      fireball.moveTowards(player.x + 200 * Math.cos(spacing), player.y + 200 * Math.sin(spacing));
      if (fireballs[i].x > player.x + 2 * windowWidth / 3 || fireballs[i].y > player.y + 2 * windowHeight / 3 || fireballs[i].x < player.x - 2 * windowWidth / 3 || fireballs[i].y < player.y - 2 * windowHeight / 3) {
        fireballs[i].remove();
      }
    }
    // need to find a way to reset fireballs every x frames
  }
  if (time % 90 === 0) {
    for (let i = 1; i < allSprites.length; i++) {
      allSprites[i].remove();
    }
  }
  // player.text = bouncer.x;
};