exports.formatDate = list => {
  let formatedList = [];
  list.forEach((obj, index) => {
    formatedList[index] = { ...obj };
    formatedList[index].created_at = new Date(
      formatedList[index].created_at
    ).toUTCString();
  });

  return formatedList;
};

exports.makeRefObj = objArray => {
  let refObj = {};
  objArray.forEach(value => {
    refObj[value.title] = value.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const renameKeys = (objArray, keyToChange, newKey) => {
    let newArray = [];
    objArray.forEach((obj, index) => {
      newArray[index] = obj;
      let value = obj[keyToChange];
      newArray[index][newKey] = value;
      delete newArray[index][keyToChange];
    });
    return newArray;
  };

  let newComments = renameKeys(comments, "created_by", "author");
  newComments = renameKeys(newComments, "belongs_to", "article_id");

  if (articleRef === undefined) {
    return newComments;
  } else {
    newComments = newComments.map(comment => {
      for (let i = 0; i < Object.keys(articleRef).length; i++) {
        if (Object.keys(articleRef)[i] === comment.article_id) {
          comment.article_id = Object.values(articleRef)[i];
          return comment;
        }
      }
    });
    return newComments;
  }
};
