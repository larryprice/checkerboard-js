describe("GridBuilder", function () {
  describe("makeCell", function () {
    it("makes zeroth cell", function () {
      var cell = GridBuilder.makeCell(0, 0, 200, 100);
      expect(cell.topLeft.x).toBe(0);
      expect(cell.topLeft.y).toBe(0);
      expect(cell.bottomRight.x).toBe(200);
      expect(cell.bottomRight.y).toBe(100);
    });

    it("makes arbitrary cell", function () {
      var cell = GridBuilder.makeCell(3, 5, 200, 100);
      expect(cell.topLeft.x).toBe(600);
      expect(cell.topLeft.y).toBe(500);
      expect(cell.bottomRight.x).toBe(800);
      expect(cell.bottomRight.y).toBe(600);
    });
  });

  describe("build", function () {
    it("returns an empty list given no horizontal cells", function () {
      expect(GridBuilder.build(100, 100, 0, 10).length).toBe(0);
    });
    it("returns an empty list given no vertical cells", function () {
      expect(GridBuilder.build(100, 100, 10, 0).length).toBe(0);
    });
    it("returns an empty list given no height", function () {
      expect(GridBuilder.build(0, 100, 10, 10).length).toBe(0);
    });
    it("returns an empty list given no width", function () {
      expect(GridBuilder.build(100, 0, 10, 10).length).toBe(0);
    });
    it("returns a list of 1 cell", function () {
      var cells = GridBuilder.build(10, 10, 1, 1);
      expect(cells.length).toBe(1);
      expect(cells[0].length).toBe(1);
      var cell = cells[0][0];
      expect(cell.topLeft.x).toBe(0);
      expect(cell.topLeft.y).toBe(0);
      expect(cell.bottomRight.x).toBe(10);
      expect(cell.bottomRight.y).toBe(10);
    });
    it("returns a list of 6 cells", function () {
      var cells = GridBuilder.build(60, 20, 3, 2);
      expect(cells.length).toBe(2);

      expect(cells[0].length).toBe(3);
      expect(cells[0][0].topLeft.x).toBe(0);
      expect(cells[0][0].topLeft.y).toBe(0);
      expect(cells[0][0].bottomRight.x).toBe(20);
      expect(cells[0][0].bottomRight.y).toBe(10);
      expect(cells[0][1].topLeft.x).toBe(20);
      expect(cells[0][1].topLeft.y).toBe(0);
      expect(cells[0][1].bottomRight.x).toBe(40);
      expect(cells[0][1].bottomRight.y).toBe(10);
      expect(cells[0][2].topLeft.x).toBe(40);
      expect(cells[0][2].topLeft.y).toBe(0);
      expect(cells[0][2].bottomRight.x).toBe(60);
      expect(cells[0][2].bottomRight.y).toBe(10);

      expect(cells[1].length).toBe(3);
      expect(cells[1][0].topLeft.x).toBe(0);
      expect(cells[1][0].topLeft.y).toBe(10);
      expect(cells[1][0].bottomRight.x).toBe(20);
      expect(cells[1][0].bottomRight.y).toBe(20);
      expect(cells[1][1].topLeft.x).toBe(20);
      expect(cells[1][1].topLeft.y).toBe(10);
      expect(cells[1][1].bottomRight.x).toBe(40);
      expect(cells[1][1].bottomRight.y).toBe(20);
      expect(cells[1][2].topLeft.x).toBe(40);
      expect(cells[1][2].topLeft.y).toBe(10);
      expect(cells[1][2].bottomRight.x).toBe(60);
      expect(cells[1][2].bottomRight.y).toBe(20);
    });
  });
});