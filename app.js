var fs =  require('fs')
var coordinates = fs.readFileSync('coordinates.txt', 'utf8');
var grid = coordinates.split('\n')[0];
var bounds = [];
for(var line = 0; line < grid.length; line++){
    bounds.push(grid[line])
}

let input = coordinates.split('\n')[2];
let startingLocation = coordinates.split('\n')[1];

const directions = ["N", "E", "S", "W"];
let x = Number(startingLocation.charAt(0)), y = Number(startingLocation.charAt(1));
let direction = directions.findIndex((d) => d == startingLocation.charAt(2));

const directionMovement = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let isValid = true;

input.split("").forEach((instruction) => {
  if (!isValid) return;

  switch (instruction) {
    case "L":
      if (direction > 0) direction--;
      else direction = 3;
      break;
    case "R":
      if (direction < 3) direction++;
      else direction = 0;
      break;
    case "M":
      var movement = directionMovement[direction];
      x += movement[0];
      y += movement[1];
      break;
    default:
      break;
  }
  if (x < 0 || x >= bounds[0]) isValid = false;
  if (y < 0 || y >= bounds[1]) isValid = false;
});

if (isValid) 
  console.log([x, y], directions[direction]);
else 
  console.log("Out of bounds");
