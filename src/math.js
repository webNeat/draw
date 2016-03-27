/** 
 * Types
 * 
 * Point : {x:Number, y:Number}
 * Vector : {u:Number, v:Number}
 * LineEquation : {a:Number, b:Number, c:Number} 
 * 		c == null => y = a x + b
 * 		a == null => x = c
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
	return intersect(bisector(a, b), bisector(b, c))
}

/**
 * Returns the intersection point of two lines based on their equations
 * @param  {LineEquation} eq1
 * @param  {LineEquation} eq2
 * @return {Point}
 */
var intersect = function (eq1, eq2) {
	if (eq1.a == eq2.a) {
		console.error('The two lines are parallel !')
		return null
	}
	if (eq1.a == null) {
		return {
			x: eq1.c,
			y: eq2.a * eq1.c + eq2.b
		}
	}
	if (eq2.a == null)
		return {
			x: eq2.c,
			y: eq1.a * eq2.c + eq1.b
		}
	var x = (eq2.b - eq1.b) / (eq1.a - eq2.a)
	return {
		x: x,
		y: eq1.a * x + eq1.b
	}
}

/**
 * Returns the perpendicular bisector equation of the segment 
 * defined by two given points
 * @param  {Point} a 
 * @param  {Point} b
 * @return {LineEquation}
 */
var bisector = function (a, b) {
	var m = midpoint(a, b),
		ve = perpendicular(vector(a, b))
	if (ve.u == 0)
		return {
			a: null,
			b: null,
			c: m.x
		}
	var s = ve.v / ve.u
	return {
		a: s,
		b: m.y - s * m.x
	}
}

/**
 * Returns the midpoint of the segment defined by two points
 * @param  {Point} a
 * @param  {Point} b
 * @return {Point}
 */
var midpoint = function (a, b) {
	return {
		x: (a.x + b.x) / 2,
		y: (a.y + b.y) / 2
	}
} 

/**
 * Returns the perpendicular vector to a vector
 * @param  {Vector} ve
 * @return {Vector}
 */
var perpendicular = function (ve) {
	return {
		u: - ve.v,
		v: ve.u
	}
}