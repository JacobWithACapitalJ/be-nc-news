exports.formatDate = list => {
  list = list.map(time => {
    return (time = new Date(time).toUTCString());
    // .split(/[\s\:]/);
    // return (time = `${time[1]} ${time[2]} ${time[3]} ${time[4]}: ${time[5]}: ${
    //   time[6]
    // } UTC`);
  });
  return list;
};

exports.makeRefObj = (objArray, key = "name", value = "phoneNumber") => {
  let refObj = {};
  objArray.forEach(obj => (refObj[obj[key]] = obj[value]));
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
