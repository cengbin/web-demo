export function getDistance(x1, y1, x2, y2) {
  let p1 = {x: x1, y: y1}
  let p2 = {x: x2, y: y2}

  return Math.abs(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)))
}

export function getAngle(x1, y1, x2, y2, bo) {
  let p1 = {x: x1, y: y1}
  let p2 = {x: x2, y: y2}

  let radian = Math.atan2((p2.y - p1.y), (p2.x - p1.x)) // 弧度

  let angle = radian * (180 / Math.PI)

  return bo ? radian : angle
}