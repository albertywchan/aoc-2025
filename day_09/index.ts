import Heap from "heap-js";
import { GeoJSONReader, GeometryFactory } from "../lib/jsts";
import { parseInputAsText } from "../utils";

type Coordinate = [number, number];

type Rectangle = {
  coordinates: Coordinate[];
  area: number;
};

function parseCoordinate(tile: string): Coordinate {
  return tile.split(",").map(Number) as Coordinate;
}

function getArea([x1, y1]: Coordinate, [x2, y2]: Coordinate): number {
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
}

function getRectangleCoordinates(
  [x1, y1]: Coordinate,
  [x2, y2]: Coordinate
): Coordinate[] {
  const minCol = Math.min(x1, x2);
  const maxCol = Math.max(x1, x2);
  const minRow = Math.min(y1, y2);
  const maxRow = Math.max(y1, y2);
  return [
    [minCol, minRow],
    [maxCol, minRow],
    [maxCol, maxRow],
    [minCol, maxRow],
    [minCol, minRow],
  ];
}

async function partOne() {
  const redTiles = await parseInputAsText(import.meta.dir);

  let maxArea = -Infinity;
  for (let i = 0; i < redTiles.length; i++) {
    for (let j = 0; j < i; j++) {
      const tile1 = redTiles[i];
      const tile2 = redTiles[j];
      if (!tile1 || !tile2) continue;

      const c1 = parseCoordinate(tile1);
      const c2 = parseCoordinate(tile2);
      if (!c1 || !c2) continue;

      const area = getArea(c1, c2);
      maxArea = Math.max(area, maxArea);
    }
  }
  console.log(maxArea);
}

async function partTwo() {
  const redTiles = await parseInputAsText(import.meta.dir);

  const floorCoordinates = redTiles.map(parseCoordinate);
  floorCoordinates.push(floorCoordinates[0] ?? [0, 0]);

  const reader = new GeoJSONReader(new GeometryFactory());
  const floorPolygon = reader.read({
    type: "Polygon",
    coordinates: [floorCoordinates],
  });

  const rectangles = new Heap<Rectangle>((a, b) => b.area - a.area);

  for (let i = 0; i < floorCoordinates.length - 1; i++) {
    for (let j = 0; j < i; j++) {
      const c1 = floorCoordinates[i];
      const c2 = floorCoordinates[j];
      if (!c1 || !c2) continue;

      const coordinates = getRectangleCoordinates(c1, c2);
      const area = getArea(c1, c2);

      rectangles.push({ coordinates, area });
    }
  }

  let maxArea = -Infinity;
  while (rectangles.length > 0) {
    const popped = rectangles.pop();
    if (!popped) continue;
    const { coordinates, area } = popped;
    const rectanglePolygon = reader.read({
      type: "Polygon",
      coordinates: [coordinates],
    });

    if (floorPolygon.contains(rectanglePolygon)) {
      maxArea = area;
      break;
    }
  }
  console.log(maxArea);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
