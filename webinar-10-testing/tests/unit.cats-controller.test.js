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

  test("updateCat: success", async () => {
    const updatedCat = { id: 3, name: "Barsik", age: 3 };
    Cats.updateCat = jest.fn(() => {
      return updatedCat;
    });

    const result = await updateCat(req, res, next);
    expect(result.status).toEqual("success");
    expect(result.code).toEqual(200);
    expect(result.cat).toEqual(updatedCat);
  });
});
