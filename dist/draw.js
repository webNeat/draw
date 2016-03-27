/** 
 * Types
 * 
 * Point : {x:Number, y:Number}
 * Vector : {u:Number, v:Number}
 * LineEquation : {a:Number, b:Number, c:Number} 
 *      c == null => y = a x + b
 *      a == null => x = c
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

/**
 * Draws a shape into the context
 * @param  {Object} ctx   2D context of the canvas
 * @param  {Shape}  shape 
 * @return {void}
 */
var draw = function (ctx, shape) {
    ctx.beginPath();
    switch(shape.type){
        case 'segment':
            drawSegment(ctx, shape.start, shape.end)
        break
        case 'polygon':
            drawPolygon(ctx, shape.points)
        break
        case 'circle':
            drawCircle(ctx, shape.center, shape.radius)
        break
        case 'arc':
            drawArc(ctx, shape.center, shape.radius, shape.startAngle, shape.endAngle)
        break
        case 'rectangle':
            drawRectangle(ctx, shape.topLeft, shape.bottomRight)
        break
    }
    ctx.stroke()
}

/**
 * Draw a segment
 * @param  {Object} ctx   2D context of the canvas
 * @param  {Point}  start
 * @param  {Point}  end
 * @return {void}
 */
var drawSegment = function (ctx, start, end) {
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
}

/**
 * Draws a polygon
 * @param  {Object}  ctx     2D context of the canvas
 * @param  {[Point]} points
 * @return {void}
 */
var drawPolygon = function (ctx, points) {
    ctx.moveTo(points[0].x, points[0].y)
    var i = 1
    while (i < points.length) {
        ctx.lineTo(points[i].x, points[i].y)
        i ++
    }
    ctx.closePath()
}

/**
 * Draws a circle
 * @param  {Object} ctx   2D context of the canvas
 * @param  {Point}  center
 * @param  {Number} radius
 * @return {void}
 */
var drawCircle = function (ctx, center, radius) {
    drawArc(ctx, center, radius, 0, 2 * Math.PI)
}

/**
 * Draws an arc of circle
 * @param  {Object} ctx        2D context of the canvas
 * @param  {Point}  center
 * @param  {Number} radius
 * @param  {Number} startAngle starting angle in radian
 * @param  {Number} endAngle   ending angle in radian
 * @return {void}
 */
var drawArc = function (ctx, center, radius, startAngle, endAngle) {
    startAngle = 2 * Math.PI - startAngle
    endAngle = 2 * Math.PI - endAngle
    ctx.arc(center.x, center.y, radius, startAngle, endAngle)
}

/**
 * Draws a rectangle
 * @param  {Object} ctx         2D context of the canvas
 * @param  {Point}  topLeft     the top-left corner point
 * @param  {Point}  bottomRight the bottom-right corner point
 * @return {void}
 */
var drawRectangle = function (ctx, topLeft, bottomRight) {
    var width = bottomRight.x - topLeft.x,
        height = bottomRight.y - topLeft.y
    ctx.strokeRect(topLeft.x, topLeft.y, width, height)
}