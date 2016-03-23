/**
 * Functions to create different geometric shapes:
 * 
 * Segment: 	{type:segment', start:Point, end:Point}
 * Arc: 		{type:'arc', center:Point, radius:Number,
 * 					startingAngle:Number, endingAngle:Number}
 * Circle: 		{type:'circle', center:Point, radius:Number}
 * Rectangle: 	{type:'rectangle', topLeft:Point, bottomRight:Point}
 * Polygon: 	{type:'polygon', points:[Point]}
 */

/**
 * Creates a segment from two points
 * @param  {Point} a Starting point
 * @param  {Point} b Ending point
 * @return {Segment}
 */
var segment = function (a, b) {
	return {
		type: 'segment',
		start: a,
		end: b
	}
}

/**
 * Creates a polygon from an array of points
 * @param  {[Point]} points
 * @return {Polygon}
 */
var polygon = function (points) {
	return {
		type: 'polygon',
		points: points
	}
}

/**
 * Creates a circle
 * @param  {Point} center
 * @param  {Number} radius
 * @return {Circle}
 */
var circle = function (center, radius) {
	return {
		type: 'circle',
		center: center,
		radius: radius
	}
}

/**
 * Creates an arc from three points
 * @param  {Point} a
 * @param  {Point} b
 * @param  {Point} c
 * @return {Arc}
 */
var arc = function (a, b, c) {
	var center = circleCenterFromThreePoints(a, b, c)
	return {
		type: 'arc', 
		center: center,
		radius: distanceBetween(a, center),
		startAngle: angleOf(vector(center, a)), 
		endAngle: angleOf(vector(center, c))
	}
}

/**
 * Creates a rectangle from two points
 * @param  {Point} topLeft     the point at the top-left corner
 * @param  {Point} bottomRight the point at the bottom-left corner
 * @return {Rectangle}
 */
var rectangle = function (topLeft, bottomRight) {
	return {
		type: 'rectangle',
		topLeft: topLeft,
		bottomRight: bottomRight
	}
}