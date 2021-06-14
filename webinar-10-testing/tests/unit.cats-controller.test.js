const { updateCat } = require("../controllers/cats-controllers");
const Cats = require("../repositories/cats");

jest.mock("../repositories/cats");

describe("Unit testing Cats controllers", () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 1 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(data => data),
  };
  const next = jest.fn();

  test("updateCat: cat exists", async () => {
    const updatedCat = { id: 3, name: "Barsik", age: 3 };
    Cats.updateCat = jest.fn(() => {
      return updatedCat;
    });

    const result = await updateCat(req, res, next);

    expect(result).toBeDefined();
    expect(result.status).toEqual("success");
    expect(result.code).toEqual(200);
    expect(result.cat).toEqual(updatedCat);
  });

  test("updateCat: cat not found", async () => {
    Cats.updateCat = jest.fn();

    const result = await updateCat(req, res, next);

    expect(result).toBeDefined();
    expect(result.status).toEqual("error");
    expect(result.code).toEqual(404);
    expect(result.message).toEqual("The cat was not found");
  });

  test("updateCat: error handler", async () => {
    Cats.updateCat = jest.fn(() => {
      throw new Error("Some error occured!");
    });

    await updateCat(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
