kaboom({
   global: true,
});

loadSprite("yeti", "https://i.imgur.com/OqVwAm6.png");
loadSprite("bg", "/Users/abc/Downloads/image.jpg");

scene("main", () => {
   // Add background sprite
   add([
      sprite("bg"),
      scale(width() / 240, height() / 240), // Adjust the size of the background
      origin("topleft"),
   ]);
   
   const yeti = add([
      sprite("yeti"),
      pos(80, 80),
      color(255, 188, 0), 
      body(),
   ]);
   
   // Add the ground
   add([
      rect(width(), 12),
      pos(0, 280),
      origin("topleft"),
      solid(),
   ]);
   
   // Controls for jump and movement
   const JUMP_FORCE = 320;
   const MOVE_SPEED = 120;
   
   keyPress("space", () => {
      yeti.jump(JUMP_FORCE);
   });
   
   keyDown("left", () => {
      yeti.move(-MOVE_SPEED, 0);
   });
   
   keyDown("right", () => {
      yeti.move(MOVE_SPEED, 0);
   });
});

start("main");
