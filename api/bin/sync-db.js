const models = require("../../models");

// force:true 는 기존에 db가 있더라도 데이터를 다 없애고 새로 시작하는 옵션

module.exports = () => {
  const options = {
    force: process.env.NODE_ENV === "test" ? true : false,
  };
  return models.sequelize.sync(options);
};
