// api logic

var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "beck" },
  { id: 3, name: "chris" },
];

const index = function (req, res) {
  // req.query.limit is string like '2', you have to change it as number by using parseInt(str, 십진수)
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    // if limit is not number,
    return res.status(400).end();
  }
  res.json(users.slice(0, limit)); // slice(index, limit) : index부터 limit - 1 index까지 배열을 반환.
};

const show = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    // if id is not number
    return res.status(400).end();
  }
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
};

const destroy = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
};

const create = function (req, res) {
  const name = req.body.name;

  if (!name) {
    return res.status(400).end();
  }

  const isConflict = users.filter((user) => user.name === name).length;

  if (isConflict) {
    return res.status(409).end();
  }

  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
};

const update = function (req, res) {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  user.name = name;

  res.json(user);
};

module.exports = {
  index,
  show,
  destroy,
  create,
  update,
};
