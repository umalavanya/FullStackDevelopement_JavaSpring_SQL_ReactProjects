// example.js - A complete Kaboom game example
// This is a platformer game with a player, enemies, collectibles, and hazards

// Initialize Kaboom
kaboom({
    width: 800,
    height: 600,
    background: [135, 206, 235], // Sky blue
    global: true,
    debug: true, // Enable debug mode
    scale: 2,
    crisp: true // Crisp pixel art rendering
});

// Load assets
loadSprite("player", "sprites/player.png");
loadSprite("enemy", "sprites/enemy.png");
loadSprite("coin", "sprites/coin.png");
loadSprite("platform", "sprites/platform.png");
loadSprite("spike", "sprites/spike.png");
loadSprite("door", "sprites/door.png");

// Load sounds (optional)
loadSound("jump", "sounds/jump.wav");
loadSound("coin", "sounds/coin.wav");
loadSound("hurt", "sounds/hurt.wav");
loadSound("win", "sounds/win.wav");

// Define game constants
const GRAVITY = 1600;
const JUMP_FORCE = 600;
const PLAYER_SPEED = 300;
const ENEMY_SPEED = 100;

// Game state
let score = 0;
let health = 3;
let currentLevel = 1;

// Main game scene
scene("game", (level = 1) => {
    // Set background color
    setBackground(135, 206, 235);
    
    // Add gravity to all objects
    setGravity(GRAVITY);
    
    // Create UI elements
    const scoreText = add([
        text("Score: 0"),
        pos(20, 20),
        fixed(), // Stays on screen regardless of camera
        z(100),
        color(255, 255, 255)
    ]);
    
    const healthText = add([
        text("Health: ❤️❤️❤️"),
        pos(20, 50),
        fixed(),
        z(100),
        color(255, 255, 255)
    ]);
    
    const levelText = add([
        text(`Level: ${level}`),
        pos(20, 80),
        fixed(),
        z(100),
        color(255, 255, 255)
    ]);
    
    // Create level layout
    const levelConfig = {
        width: 64,
        height: 64,
        pos: vec2(0, 0),
        "=": () => [
            sprite("platform"),
            area(),
            solid(),
            color(100, 100, 100),
            "platform"
        ],
        "@": () => [
            sprite("player"),
            area(),
            body(),
            anchor("center"),
            color(255, 255, 255),
            "player"
        ],
        "e": () => [
            sprite("enemy"),
            area(),
            body(),
            anchor("center"),
            color(255, 0, 0),
            "enemy",
            { dir: 1 }
        ],
        "c": () => [
            sprite("coin"),
            area(),
            anchor("center"),
            color(255, 255, 0),
            "coin"
        ],
        "^": () => [
            sprite("spike"),
            area(),
            anchor("center"),
            color(255, 0, 0),
            "spike"
        ],
        "D": () => [
            sprite("door"),
            area(),
            anchor("center"),
            color(0, 255, 0),
            "door"
        ]
    };
    
    // Level 1 layout
    const level1 = [
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "         c              ",
        "                        ",
        "    e          e        ",
        "                        ",
        "=====   =====   =========",
        "@                      D"
    ];
    
    // Level 2 layout
    const level2 = [
        "                        ",
        "                        ",
        "         c              ",
        "                        ",
        "    e          e        ",
        "                        ",
        "=====   =====   =========",
        "    c        c          ",
        "                ^       ",
        "@                      D"
    ];
    
    // Choose level based on parameter
    const currentLevelData = level === 1 ? level1 : level2;
    const levelInstance = addLevel(currentLevelData, levelConfig);
    
    // Get player reference
    const player = get("player")[0];
    
    if (!player) {
        debug.error("Player not found in level!");
        return;
    }
    
    // Set camera to follow player
    player.onUpdate(() => {
        camPos(player.pos);
    });
    
    // Player movement
    onKeyDown("left", () => {
        player.move(-PLAYER_SPEED, 0);
    });
    
    onKeyDown("right", () => {
        player.move(PLAYER_SPEED, 0);
    });
    
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
            play("jump");
        }
    });
    
    // Double jump ability
    let canDoubleJump = false;
    
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
            canDoubleJump = true;
            play("jump");
        } else if (canDoubleJump) {
            player.jump(JUMP_FORCE * 0.8);
            canDoubleJump = false;
            play("jump");
        }
    });
    
    // Reset double jump when grounded
    player.onGround(() => {
        canDoubleJump = true;
    });
    
    // Enemy AI movement
    onUpdate("enemy", (enemy) => {
        // Move enemy back and forth
        enemy.move(enemy.dir * ENEMY_SPEED, 0);
        
        // Check if enemy should turn around
        const leftCollision = enemy.isColliding(vec2(-10, 0));
        const rightCollision = enemy.isColliding(vec2(10, 0));
        
        if (leftCollision || rightCollision) {
            enemy.dir *= -1;
        }
    });
    
    // Collect coins
    player.onCollide("coin", (coin) => {
        destroy(coin);
        score += 10;
        scoreText.text = `Score: ${score}`;
        play("coin");
    });
    
    // Hit spikes
    player.onCollide("spike", () => {
        takeDamage();
    });
    
    // Enemy collision
    player.onCollide("enemy", (enemy) => {
        // Check if player is above enemy (stomping)
        if (player.pos.y < enemy.pos.y - 20) {
            destroy(enemy);
            player.jump(JUMP_FORCE * 0.5);
            score += 50;
            scoreText.text = `Score: ${score}`;
            play("coin");
        } else {
            takeDamage();
        }
    });
    
    // Reach door
    player.onCollide("door", () => {
        if (level < 2) {
            play("win");
            go("game", level + 1);
        } else {
            play("win");
            go("win");
        }
    });
    
    // Damage function
    function takeDamage() {
        health--;
        play("hurt");
        
        // Update health display
        let healthDisplay = "Health: ";
        for (let i = 0; i < health; i++) {
            healthDisplay += "❤️";
        }
        healthText.text = healthDisplay;
        
        // Flash player red
        player.color = RED;
        wait(0.2, () => {
            player.color = WHITE;
        });
        
        // Knockback
        player.jump(JUMP_FORCE * 0.5);
        
        // Check game over
        if (health <= 0) {
            go("gameover");
        }
    }
    
    // Pause functionality
    onKeyPress("p", () => {
        debug.paused = !debug.paused;
        add([
            text(debug.paused ? "PAUSED" : ""),
            pos(width() / 2, height() / 2),
            fixed(),
            anchor("center"),
            color(255, 255, 255),
            "pauseText"
        ]);
        
        if (!debug.paused) {
            destroyAll("pauseText");
        }
    });
    
    // Reset level
    onKeyPress("r", () => {
        go("game", level);
    });
});

// Game over scene
scene("gameover", () => {
    setBackground(0, 0, 0);
    
    add([
        text("GAME OVER", { size: 48 }),
        pos(width() / 2, height() / 2 - 50),
        anchor("center"),
        color(255, 0, 0)
    ]);
    
    add([
        text(`Final Score: ${score}`),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    add([
        text("Press SPACE to play again"),
        pos(width() / 2, height() / 2 + 50),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    onKeyPress("space", () => {
        score = 0;
        health = 3;
        currentLevel = 1;
        go("game");
    });
});

// Win scene
scene("win", () => {
    setBackground(0, 100, 0);
    
    add([
        text("YOU WIN!", { size: 48 }),
        pos(width() / 2, height() / 2 - 50),
        anchor("center"),
        color(255, 215, 0)
    ]);
    
    add([
        text(`Final Score: ${score}`),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    add([
        text("Press SPACE to play again"),
        pos(width() / 2, height() / 2 + 50),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    onKeyPress("space", () => {
        score = 0;
        health = 3;
        currentLevel = 1;
        go("game");
    });
});

// Start menu scene
scene("start", () => {
    setBackground(100, 100, 200);
    
    add([
        text("MY AWESOME GAME", { size: 48 }),
        pos(width() / 2, height() / 2 - 100),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    add([
        text("Arrow Keys: Move"),
        pos(width() / 2, height() / 2 - 20),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    add([
        text("Space: Jump/Double Jump"),
        pos(width() / 2, height() / 2 + 10),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    add([
        text("P: Pause | R: Reset Level"),
        pos(width() / 2, height() / 2 + 40),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    add([
        text("Press SPACE to Start"),
        pos(width() / 2, height() / 2 + 100),
        anchor("center"),
        color(255, 255, 255)
    ]);
    
    // Press space to start
    onKeyPress("space", () => {
        go("game");
    });
});

// Start the game
go("start");

// Debug controls
onKeyPress("f1", () => {
    debug.inspect = !debug.inspect;
});

onKeyPress("f2", () => {
    debug.clearLog();
});

onKeyPress("f3", () => {
    debug.showLog = !debug.showLog;
});

// Add frame rate display
onUpdate(() => {
    debug.log(`FPS: ${debug.fps()}`);
    debug.log(`Score: ${score}`);
    debug.log(`Health: ${health}`);
    debug.log(`Level: ${currentLevel}`);
});