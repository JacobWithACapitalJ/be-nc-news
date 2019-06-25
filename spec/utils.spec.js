const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDate", () => {
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
  it("makes an key value pair from the values of article_id and title for a single object in an array", () => {
    expect(makeRefObj([{ article_id: 1, title: "A" }])).to.eql({ A: 1 });
  });
  it("returns a ref object for multiple objects in an array", () => {
    const array = [
      {
        article_id: 1,
        title: "A",
        topic: "mitch",
        author: "a",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        article_id: 2,
        title: "B",
        topic: "mitch",
        author: "a",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(makeRefObj(array)).to.eql({ A: 1, B: 2 });
  });
});

describe.only("formatComments", () => {
  it("replaces 'created_by' with author", () => {
    const array = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    expect(formatComments(array)[0]).to.include.keys("author");
  });
  it('replaces key "belongs_to" to "article_id"', () => {
    const array = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    expect(formatComments(array)[0]).to.include.keys("article_id");
  });
  it('replaces the values of "belongs_to" with the values in articleRef', () => {
    const array = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const ref = { "They're not exactly dogs, are they?": 1 };
    const expected = formatComments(array, ref);
    expect(expected[0].article_id).to.equal(1);
  });
  it("works for multiple objects in an array", () => {
    it('replaces the values of "belongs_to" with the values in articleRef', () => {
      const array = [
        {
          body: "hello",
          belongs_to: "the world",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389
        },
        {
          body: "hi",
          belongs_to: "northcoders",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389
        }
      ];
      const ref = { "the world": 1, northcoders: 2 };
      const expected = formatComments(array, ref);
      expect(expected[0].article_id).to.equal(1);
    });
  });
});
