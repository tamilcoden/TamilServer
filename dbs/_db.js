const Path = require("path");
const glob = require("glob");
const dirPath = Path.resolve(__dirname, "./").replace(/\\/g, "/");
const apiFiles = glob.sync("dbs/**/[!_]*.js", {
  nodir: true,
});

let data = {};
apiFiles.forEach((fpath) => {
  filePath = dirPath + fpath.substring(3);

  console.log("filePath", filePath);
  const api = require(filePath);
  let [, url] = filePath.split("dbs/");
  url = url.slice(0, url.length - 3);
  data[url.replace(/\//g, "-")] = api;
});
module.exports = () => {
  return data;
};
