const passport = require("passport");
const guard = require("../helpers/guard");
const { HttpCodes } = require("../helpers/constants");

describe("Unit testing guard middleware", () => {
  const user = { token: "fake-token" };
  const req = { get: jest.fn(header => `Bearer ${user.token}`), user };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(data => data),
  };
  const next = jest.fn();

  test("when user exists", () => {
    passport.authenticate = jest.fn((strategy, options, callback) => () => {
      callback(null, user);
    });

    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("when user does not exist", () => {
    passport.authenticate = jest.fn((strategy, options, callback) => () => {
      callback(null, false);
    });

    guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: HttpCodes.UNAUTHORIZED,
      message: "Invalid credentials.",
    });
  });

  test("when error occured", () => {
    passport.authenticate = jest.fn((strategy, options, callback) => () => {
      const error = new Error("No user.");
      callback(error, false);
    });

    guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: HttpCodes.UNAUTHORIZED,
      message: "Invalid credentials.",
    });
  });

  test("when token is wrong", () => {
    passport.authenticate = jest.fn((strategy, options, callback) => () => {
      callback(null, { token: "wrong-token" });
    });

    guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: HttpCodes.UNAUTHORIZED,
      message: "Invalid credentials.",
    });
  });
});
