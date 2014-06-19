describe("cell", function() {
  describe("row", function() {
    it("sets row at construction time", function() {
      var cell = new Cell(5);
      expect(cell.row).toBe(5);
    });
  });

  describe("column", function() {
    it("sets column at construction time", function() {
      var cell = new Cell(5, 10);
      expect(cell.column).toBe(10);
    });
  });
});
