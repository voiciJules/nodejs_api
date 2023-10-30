const app = require("./index");
const should = require("should");
const request = require("supertest");

describe("GET /users is ", () => {
  // 성공시,
  // 유저객체를 담은 배열로 응답한다.
  describe("if it succeeds, ", () => {
    it("it returns users' list", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
});
