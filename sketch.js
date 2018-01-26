var circles = [];
var player = {};
var amt = 30;
var scl = 1;
var startSize = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = makecircle(startSize);
    player.pos = createVector(width / 2, height / 2);

    for (var i = 0; i < amt; i++) {
        circles.push(makecircle());
    }

    colorMode(HSB, 255);
    frameRate(30);
}

function draw() {
    clear();
    background(0);
    scl = (startSize / player.size);
    scale(scl);

    if (mouseX !== 0 && mouseY !== 0) {
        player.pos.x = mouseX;
        player.pos.y = mouseY;
    }

    circles.forEach(circle => {
        circle.pos.add(circle.vel);
        if (circle.pos.x - circle.size / 2 > width || // left
            circle.pos.y - circle.size / 2 > height || // bottom
            circle.pos.y + circle.size / 2 < 0 || // top
            circle.pos.x + circle.size / 2 < 0) { // right
            circles.splice(circles.indexOf(circle), 1);
            circles.push(makecircle());
        } else {
            fill(circle.color, 255, 255, 150);
            ellipse(circle.pos.x/scl, circle.pos.y/scl, circle.size, circle.size);
            textAlign(CENTER, CENTER);
            textSize(circle.size/2);
            fill(255);
            text(circle.size, circle.pos.x/scl, circle.pos.y/scl);

            if (Math.hypot(player.pos.x/scl - circle.pos.x/scl, player.pos.y/scl - circle.pos.y/scl) <= player.size / 2 / 2 + circle.size / 2 / 2) {
                if (player.size > circle.size) {
                    player.size += Math.floor((circle.size / player.size) * 10);

                    circles.splice(circles.indexOf(circle), 1);
                    circles.push(makecircle());
                } else if (player.size < circle.size) {
                    player.size = startSize;

                    for (var i = 0; i < amt; i++) {
                        circles.shift();
                        circles.push(makecircle());
                    }
                }
            }
        }
    });

    fill(player.color, 255, 255, 150);
    ellipse(player.pos.x/scl, player.pos.y/scl, player.size, player.size);
    textAlign(CENTER, CENTER);
    textSize(player.size / 2);
    fill(255);
    text(player.size, player.pos.x/scl, player.pos.y/scl);
}

function makecircle(size) {
    var circle = {
        size: size !== undefined ? size : Math.round(random(player.size - 25, player.size + 150)),
        pos: Math.round(random()) === 1 ?
            createVector(Math.round(random()) * width, random() * height) :
            createVector(random() * width, Math.round(random()) * height),
        color: random(360)
    };
    circle.vel = createVector(
        Math.round((circle.pos.x) / (width)) === 0 ? random() : 0 - random(),
        Math.round((circle.pos.y) / (height)) === 0 ? random() : 0 - random()
    );

    if (circle.pos.y === 0) {
        circle.pos.y = 0 - circle.size / 2;
    } else if (circle.pos.x === 0) {
        circle.pos.x = 0 - circle.size / 2;
    } else if (circle.pos.x/scl === width) {
        circle.pos.x = width/scl + circle.size / 2;
    } else if (circle.pos.y/scl === height) {
        circle.pos.y = height/scl + circle.size / 2;

    }

    return circle;
}
