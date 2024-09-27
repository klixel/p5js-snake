let speed_modifier = 0.1;
let n = 15;
let d = 50;

class Segment {
    constructor(x, y, d, angle) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.angle = angle;
    }

    show() {
        circle(this.x, this.y, this.d);
        // line(this.x, this.y, this.x + this.d * cos(this.angle) / 2, this.y + this.d * sin(this.angle) / 2);
    }
}

let segments = Array();

function getWidth(i) {
    if (i == 0) {
        return 40;
    } else {
        return max(10, 50 - 5 * i);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    segments = Array(n).fill().map((_, i) => new Segment(100 + 50 * i, 100, getWidth(i), 0));
}

function draw() {
    background(220);

    let dx = mouseX - segments[0].x;
    let dy = mouseY - segments[0].y;
    let angle = atan2(dy, dx);

    segments[0].x += dx * speed_modifier
    segments[0].y += dy * speed_modifier
    segments[0].angle = angle;

    segments[0].show();

    for (let i = 1; i < n; i++) {
        let prev = segments[i - 1];
        let s = segments[i];

        dx = prev.x - s.x;
        dy = prev.y - s.y;

        s.x += dx * speed_modifier;
        s.y += dy * speed_modifier;

        s.angle = atan2(dy, dx);

        s.show();


        line(prev.x + prev.d * cos(prev.angle + PI / 2) / 2, prev.y + prev.d * sin(prev.angle + PI / 2) / 2,
            s.x + s.d * cos(s.angle + PI / 2) / 2, s.y + s.d * sin(s.angle + PI / 2) / 2);

        line(prev.x + prev.d * cos(prev.angle - PI / 2) / 2, prev.y + prev.d * sin(prev.angle - PI / 2) / 2,
            s.x + s.d * cos(s.angle - PI / 2) / 2, s.y + s.d * sin(s.angle - PI / 2) / 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (key === '=' && n < 20) {
        segments.push(new Segment(segments[n - 1].x, segments[n - 1].y, getWidth(n), 0))
        n += 1
    }

    if (key === '-' && n > 5) {
        segments.pop()
        n -= 1
    }
}