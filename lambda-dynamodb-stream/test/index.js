const fs = require("fs");
const path = require("path");

const listModules = (dir) => {
  let list = [];
  const dirPath = path.join(__dirname, dir);

  const fileList = fs.readdirSync(dirPath, "utf-8");

  for (let i = 0; i < fileList.length; i++) {
    const stat = fs.lstatSync(path.join(dirPath, fileList[i]));
    if (stat.isDirectory()) {
      const subPathFileList = listModules(dir + fileList[i] + "/");
      if (subPathFileList) {
        list = list.concat(subPathFileList);
      }
    } else {
      const modulePath = dir + fileList[i];
      let moduleName = modulePath.replace(/^\.\/modules(.*)\/index\.\w+$/, "$1");
      moduleName = moduleName.replace(/^\.\/modules(.*)\.\w+$/, "$1");

      const fileExtension = modulePath.split(".").pop().toLowerCase();
      if (fileExtension == "js") {
        list.push({
          path: moduleName,
          file: modulePath,
        });
      }
    }
  }
  return list;
};

const fileName = process.env.npm_config_name;

if (fileName) {
  describe(`[---- Run one test file ----]`, () => {
    it(`Run test file:./modules/${fileName}.js`, () => {
      require(`./modules/${fileName}.js`);
    });
  });
} else {
  const modules = listModules("./modules/");

  describe(`[---- Run all test file ----]`, () => {
    modules.forEach((f) => {
      it(`Run test file:./modules/${f.path}.js`, () => {
        require(f.file);
      });
    });
  });
}

