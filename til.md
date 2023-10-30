# NODE JS의 기초

- 브라우저 밖에서 자바스크립트 코드를 실행할 수 있다
- 크롬에서 사용하는 v8 엔진(자바스크립트를 해석해주는 엔진) 사용
- 이벤트 기반의 비동기 I/O 프레임워크
  클라이언트가 http request를 nodeJS에 보내면, 이것들을 이벤트로 만들어서 queue에 차곡차곡 쌓아놓았다가 event loop이 event를 하나하나 실행하도록 되어 있고, 처리되어진 것을 다시 클라이언트에게 response로 반환한다. 바로바로 처리할 수 없는 이벤트들(외부 네트워크 통신, 파일 읽기)의 경우(무거운 job)에는 이벤트 루프가 일을 직접 처리하지 않고 non-blocking worker에서 일을 처리하고, 처리되면 다시 이벤트 루프에 결과를 반환하고, 이벤트 루프가 다시 그것을 클라이언트에게 반환한다. 즉, 모든 job들을 이벤트로 처리하고, 무거운 잡들은 non-blocking worker에게 보내서 비동기로 일을 처리한다는 의미
- CommonJS를 구현한 모듈 시스템
  브라우저 console에서 window.module1 = function() {return 'hello world'}로 모듈 구현 가능  
  노드는 파일형태로 모듈을 관리할 수 있는 CommonJS로 구현한다. 그 모듈의 종류에는 기본모듈, 써드파티 모듈, 사용자정의 모듈이 있다. require 명령어를 이용해 다양한 모듈을 사용할 수 있다.
- 노드는 기본적으로 비동기로 동작한다
  readFile() vs readFileSync(). readFile()은 비동기 readFileSync()는 동기로 동작한다.
  readFile()
  """
  const fs = require("fs");
  const data = fs.readFileSync("./data.txt", "utf8");
  console.log(data);
  """
  readFileSync()
  """
  const fs = require("fs");
  const data = fs.readFile("./data.txt", "utf8", function (err, data) {
  console.log(data);
  });
  console.log("first return");
  """
  이 경우에, first return이 먼저 출력되고, 콜백함수 안에 console.log 명령어가 나중에 실행된다. 즉 비동기.

# Hello world

"""
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader("Content-Type", "text/plain");
res.end("Hello world!");
});

server.listen(port, hostname, () => {
console.log(`Server running at http:${hostname}:${port}`);
});
"""

`curl -X GET 'localhost:3000' -v`  
다른 터미널을 띄워서 위 명령어로 브라우저를 이용하는 것을 대신하여 결과물을 볼 수 있다. -v는 상세내용을 볼 수 있다.

# Express framework

- 어플리케이션
  익스프레스의 인스턴스를 어플리케이션이라고 함.  
  서버에 필요한 기능인 미들웨어를 어플리케이션에 추가할 수 있다.  
  라우팅 설정을 할 수 있다.  
  서버를 요청 대기상태로 만들 수 있다.

- 미들웨어

  - 미들웨어는 함수들의 연속이다.
  - 로깅 미들웨어를 만들어보자.
    """
    function logger(request, response, next) {
    console.log('i am logger')
    next()
    }
    app.use(logger)
    """
    미들웨어 logger른 만들고, 'use'를 사용해서 미들웨어를 사용한다. next 콜백함수를 이용해서 미들웨어에서 빠져나오도록 해야 한다.

  - 써드파티 미들웨어를 사용해보자(morgan)
    `npm install morgan --save`
    """
    const morgan = require('morgan');
    app.use(morgan('dev'))
    """

  - 일반 미들웨어 vs 에러 미들웨어
    """
    const express = require("express");
    const app = express();
    const morgan = require("morgan");
    function commonMiddleware(req, res, next) {
    console.log("common middleware");
    next(new Error("error occurred"));
    }
    function errorMiddleware(err, req, res, next) {
    console.log(err);
    console.log(err.message);
    }
    app.use(commonMiddleware);
    app.use(errorMiddleware);
    const port = 3000;
    app.listen(port, function () {
    console.log("Server is running");
    });
    """
    첫번째 commonMiddleware 에서 next를 통해 리턴한 값이 app.use(errorMiddleware)의 err 파라미터로 사용되어 console.log로 에러를 출력해준다.

- 라우팅 : 각 경로에 맞는 결과를 설정하는 것
  요청 url에 대해 적절한 핸들러 함수로 연결해주는 것을 라우팅이라고 함.
  app 의 get(), post() 메소드로 구현할 수 있다.
  라우팅을 위한 전용 Router 클래스를 사용할 수도 있다.

- 요청객체(request)
  클라이언트의 요청 정보를 담은 객체를 요청객체라고 한다.  
  http 모듈의 request 객체를 래핑한 것이다.  
  req.params(), req.query(), req.body() 메소드를 주로 사용한다.

- 응답객체(response)
  클라이언트의 응답 정보를 담은 객체를 응답객체라고 한다.
  http 모듈의 response 객체를 래핑한 것이다.
  res.send(), res.status(), req.json() 메소드를 주로 사용한다.

# http 요청

모든 자원은 명사로 식별한다.  
http 경로로 자원을 요청한다.  
예제) GET /user, Post /user

- http 메소드  
  GET : 자원을 조회  
  POST : 자원을 생성  
  PUT : 자원을 갱신  
  DELETE : 자원을 삭제

- http 상태코드  
  1xx : 아직 처리중  
  2xx : 자 여기 있어. 200/성공(GET, PUT), 201/작성됨(POST), 204/내용없음(DELETE)  
  3xx : 잘 가  
  4xx : 니가 문제임. 400/잘못된 요청, 401/권한없음, 404/찾을 수 없음, 409/충돌  
  5xx : 내가 문제임. 500/서버 에러

# 테스트 주도 개발(TDD)

- TDD : Test Driven Development
- mocha, should, superTest
- 개발시에는 시간이 더 오래 걸릴 수 있지만, 유지보수에 유리
- Mocha : 테스트 수트/describe()로 구현, 실제 테스트/it()으로 구현
  `npm install mocha --save-dev`
  `node_modules/.bin/mocha utils.spec.js` 와 같이 실행
  assert 노드 모듈 사용하여 검증함 `assert.equal(result, "Hello");`
- Should : 노드 assert 를 테스트 코드에서는 사용하지 말고 서드파티 라이브러리를 사용하라고 함.  
  Should는 테스트 라이브러리이고, 가독성 높은 테스트 코드를 만들 수 있다.
- SuperTest : 지금까지 한 것은 unit test임. SuperTest는 통합 테스트용 라이브러리임.  
   내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.
  """
  const app = require("./index");
  const request = require("supertest");
  describe("GET /users is ", () => {
  it("to return users' list", (done) => {
  request(app)
  .get("/users")
  .end((err, res) => {
  console.log(res.body);
  done();
  });
  });
  });
  """
  done은 콜백함수로 맨 마지막에 호출해주면 됨. describe, it, request 의 사용을 살펴보자.

# 첫 API 테스트 만들기

package.json의 test script 부분을 `mocha index.spec.js`로 바꾸어준다.

- 성공시  
  유저 객체를 담은 배열로 응답한다  
  최대 limit 개수만큼 응답한다
- 실패시  
  limit이 숫자형이 아니면 400을 응답한다  
  offset이 숫자형이 아니면 400을 응답한다

# GET /user/:id

- 성공시  
  id가 1인 유저 객체를 반환한다.
- Error  
  id가 숫자가 아닐 경우 400으로 응답한다.  
  id로 유저를 찾을 수 없는 경우 404로 응답한다.
