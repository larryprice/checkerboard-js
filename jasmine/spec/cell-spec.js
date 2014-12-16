describe("Cell", function () {
  describe("topLeft", function () {
    it("sets top left at construction time", function () {
      var cell = new Cell(new Coordinate(5, 10));
      expect(cell.topLeft.x).toBe(5);
      expect(cell.topLeft.y).toBe(10);
    });
  });

  describe("bottomRight", function () {
    it("sets bottom right at construction time", function () {
      var cell = new Cell(new Coordinate(5, 10), new Coordinate(10, 25));
      expect(cell.bottomRight.x).toBe(10);
      expect(cell.bottomRight.y).toBe(25);
    });
  });
});