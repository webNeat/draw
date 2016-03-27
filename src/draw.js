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
            drawArc(ctx, shape.center, shape.radius, shape.startAngle, shape.endAngle, shape.clockerwise)
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
var drawArc = function (ctx, center, radius, startAngle, endAngle, clockerwise) {
    ctx.arc(center.x, center.y, radius, startAngle, endAngle, clockerwise)
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