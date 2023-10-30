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
    // 최대 리미트 갯수만큼 응답한다.
    it("return max limit of user list", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  // 실패시
  describe("if it fails, ", () => {
    // 리미트 값이 숫자가 아니면, 400 실패코드를 반환한다.
    it("if limit is not number, it returns 400 status code", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /users/1 ", () => {
  describe("if it succeeds ", () => {
    it("returns user object with id=1", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
});
