const {verifyToken} = require("../lib/jwt");

const verifyJwt =
  (block = true) =>
    (rq, res, next) => {
      const header = rq.headers["authorization"] || rq.headers["Authorization"];
      if (!header && block) {
        res.sendStatus(401);
        return;
      }
      if (header) {
        const [type, token] = header.split(/\s+/);
        if (!/bearer/i.test(type) && block) {
          return res.sendStatus(401);
        }

        verifyToken(token)
            .then((user) => {
              rq.user = user;
              next();
            })
            .catch(() => (block && res.sendStatus(401)) || next());
      } else {
        next();
      }
    };

module.exports = verifyJwt;
