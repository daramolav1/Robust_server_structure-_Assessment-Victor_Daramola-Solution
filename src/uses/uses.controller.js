const uses = require("../data/uses-data");

function list(req, res) {
  const { urlId } = req.params;
  res.json({
    data: uses.filter(
      urlId ? (uses) => uses.urlId == Number(urlId) : () => true
    ),
  });
}

function usesExists(req, res, next) {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));

  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({
    status: 404,
    message: `Use id not found: ${useId}`,
  });
}

function read(req, res) {
  res.json({ data: res.locals.use });
}

function destroy(req, res, next) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));

  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [usesExists, read],
  delete: [usesExists, destroy],
};
