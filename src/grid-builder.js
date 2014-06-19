var GridBuilder = function () {
  function createGrid(canvasWidth, canvasHeight, rowCount, columnCount) {
    if (!canvasWidth || !canvasHeight || !rowCount || !columnCount) {
      return [];
    }

    var cells = [],
      cellWidth = canvasWidth / rowCount,
      cellHeight = canvasHeight / columnCount;

    for (var i = 0; i < columnCount; ++i) {
      cells.push([]);
      for (var j = 0; j < rowCount; ++j) {
        cells[i].push(makeCell(j, i, cellWidth, cellHeight))
      }
    }

    return cells;
  }

  function makeCell(row, column, cellWidth, cellHeight) {
    var topLeft = new Coordinate(row * cellWidth, column * cellHeight);
    return new Cell(
      topLeft,
      new Coordinate(topLeft.x + cellWidth, topLeft.y + cellHeight)
    );
  }

  return {
    build: createGrid,
    makeCell: makeCell
  }
}();