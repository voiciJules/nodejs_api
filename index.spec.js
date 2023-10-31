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

  describe("if it fails ", () => {
    it("if id is not number, returns 400 status code", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });

    it("if we can not find information with id, returns 404 status code", (done) => {
      request(app).get("/users/999").expect(404).end(done);
    });
  });
});

describe("DELETE /users/:id ", () => {
  describe("if it succeeds ", () => {
    it("it returns 204 status code", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });

  describe("if it fails", () => {
    it("if id is not number, it returns 400 status code", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("POST /users", () => {
  describe("if it succeeds ", () => {
    let name = "daniel",
      body;

    // before 부분을 통해서 아래 부분에 계속 반복되서 사용될 부분을 미리 정의해주는 것
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("it returns created user object", (done) => {
      body.should.have.property("id");
      done();
    });

    it("it returns the created name", (done) => {
      body.should.have.property("name", name);
      done();
    });
  });

  describe("if it fails ", () => {
    it("if there is no name parameter, it returns 400 status code", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });

    it("if the name is in the user list, it returns 409 status code", (done) => {
      request(app)
        .post("/users")
        .send({ name: "daniel" })
        .expect(409)
        .end(done);
    });
  });
});
