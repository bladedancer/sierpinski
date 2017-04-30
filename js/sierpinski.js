(function () {
  var divider = 3;
  var points;
  var location;
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var running;

  function getPoints(n) {
    var container = document.querySelector(".container");
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    var points = [];

    for (var i = 0; i < n; ++i) {
      points.push({
        x: width * Math.random(),
        y: height * Math.random()
      });
    }
    return points;
  }

  // Targets evenly spaced around circle
  function getSatrt() {
    var container = document.querySelector(".container");
    return {x: container.offsetWidth/2, y: container.offsetHeight/2};
  }

  // Targets evenly spaced around circle
  function getTargets(n) {
    var container = document.querySelector(".container");
    var center = {x: container.offsetWidth/2, y: container.offsetHeight/2};
    var radius = Math.min(container.offsetWidth, container.offsetHeight) / 2.1;
    var points = [];
    var theta = ((Math.PI*2) / n);

    for (var i = 0; i < n; ++i) {
      var angle = (theta * i);
      points.push({
        x: center.x + (radius * Math.cos(angle)),
        y: center.y + (radius * Math.sin(angle))
      });
    }
    return points;
  }


  function resize() {
    var container = document.querySelector(".container");
    ctx.canvas.width  = container.offsetWidth;
    ctx.canvas.height = container.offsetHeight;
  }

  function drawTargets() {
    for (var i = 0; i < points.length; ++i) {
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, 5, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    }
  }

  function walk() {
    if (!running) {
      return;
    }

    // Do 100 at a time for spped
    for (var i = 0; i < 100; ++i) {
      ctx.beginPath();
      ctx.fillRect(location.x, location.y,1,1)
      //ctx.arc(location.x, location.y, 5, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();

      // Move to next
      var target = points[Math.floor(Math.random() * points.length)];

      location = {
        x: Math.floor(location.x + ((target.x - location.x)/divider)),
        y: Math.floor(location.y + ((target.y - location.y)/divider))
      };
    }
    setTimeout(walk, 0);
  }

  function stop() {
    running = false;
  }

  function go() {
    running = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var targets = parseInt(document.getElementById("targets").value);
    divider = parseFloat(document.getElementById("divider").value);
    // points = getPoints(targets);
    // location = getPoints(1)[0];
    points = getTargets(targets);
    location = getSatrt();
    drawTargets();
    walk();
  }

  function bind() {
    document.getElementById("go").onclick = go;
    document.getElementById("stop").onclick = stop;
  }

  resize();
  bind();
})();
