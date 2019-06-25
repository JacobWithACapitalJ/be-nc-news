const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe.only("formatDate", () => {
  it("when passed 0, it returns with the epoch date", () => {
    expect(formatDate([0])).to.eql(["Thu, 01 Jan 1970 00:00:00 GMT"]);
  });
  it("when passed a large number, it returns the correct date", () => {
    expect(formatDate([738139530000])).to.eql([
      "Sun, 23 May 1993 06:45:30 GMT"
    ]);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("returns an object with a name key, and a phone number", () => {
    const input = [
      { name: "vel", phoneNumber: "01134445566", address: "Northcoders, Leeds" }
    ];
    const actual = makeRefObj(input);
    const expected = {
      vel: "01134445566"
    };
    expect(actual).to.eql(expected);
  });
  it("works for a filled array of objects", () => {
    const input = [
      {
        name: "vel",
        phoneNumber: "01134445566",
        address: "Northcoders, Leeds"
      },
      {
        name: "ant",
        phoneNumber: "01612223344",
        address: "Northcoders, Manchester"
      },
      { name: "mitch", phoneNumber: "07777777777", address: null }
    ];
    const actual = makeRefObj(input);
    const expected = {
      vel: "01134445566",
      ant: "01612223344",
      mitch: "07777777777"
    };
    expect(actual).to.eql(expected);
  });
  it("takes two keys as arguments to create a ref object", () => {
    const input = [
      {
        name: "vel",
        phoneNumber: "01134445566",
        address: "Northcoders, Leeds"
      },
      {
        name: "ant",
        phoneNumber: "01612223344",
        address: "Northcoders, Manchester"
      },
      { name: "mitch", phoneNumber: "07777777777", address: null }
    ];
    const actual = makeRefObj(input, "name", "address");
    const expected = {
      vel: "Northcoders, Leeds",
      ant: "Northcoders, Manchester",
      mitch: null
    };
    expect(actual).to.eql(expected);
  });
});

describe("formatComments", () => {});
