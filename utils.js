function capitalize(str) {
  console.log(str[0].toUpperCase + str[1]);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  capitalize: capitalize,
};
