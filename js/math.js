/** 
 * Types
 * 
 * Point : {x:Number, y:Number}
 * Vector : {u:Number, v:Number}
 */

/**
 * Creates a point
 * @param  {Number} x
 * @param  {Number} y
 * @return {Point}
 */
var point = function (x, y) {
	return {x: x, y: y}
}

/**
 * makes a vector from two points
 * @param  {Point} a the starting point of the vector
 * @param  {Point} b the ending point of the vector
 * @return {Vector}
 */
var vector = function (a, b) {
	return {
		u: b.x - a.x,
		v: b.y - a.y
	}
}

/**
 * Returns the angle of a vector in radian
 * @param  {Vector} ve 
 * @return {Number}
 */
var angleOf = function (ve) {
	var angle = Math.atan2(ve.v, ve.u)
    return (angle < 0) ? (2 * Math.PI + angle) : angle
}

/**
 * Returns the distance between two points
 * @param  {Point} a
 * @param  {Point} b
 * @return {Number}
 */
var distanceBetween = function (a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

/**
 * Returns the center of a circle from three points of on it.
 * @param  {Point} a
 * @param  {Point} b
 * @param  {Point} c
 * @return {Point}
 */
var circleCenterFromThreePoints = function (a, b, c) {
	var ab = vector(a, b)
	var bc = vector(b, c)
    var dab = ab.v / ab.u;
    var dbc = bc.v / bc.u;

    var center = {}
    center.x = (dab * dbc * (a.y - c.y) + dbc * (a.x + b.x)- dab * (b.x + c.x)) / (2 * (dbc - dab))
    center.y = (a.y + b.y) / 2 - (center.x - (a.x + b.x) / 2) / dab

    center.x = parseInt(center.x)
    center.y = parseInt(center.y)
    return center;
}