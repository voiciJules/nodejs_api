const utils = require("./utils");
const should = require("should");

describe("utils.js is", () => {
  it("changes the first letter in capital ", () => {
    //
    const result = utils.capitalize("hello");
    result.should.be.equal("Hello");
  });
});
