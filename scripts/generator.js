require("babel-register")({ presets: ["react"] });
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const path = require("path");
const fs = require("fs");
const chokidar = require("chokidar");
const prettier = require("prettier");

const debounce = require("./debounce");

const watcher = chokidar.watch("src", { ignored: /^\./, persistent: true });
watcher
  .on("add", function(path) {
    //console.log("File", path, "has been added");
    //watcherAddLog(path);
    //debouncedAddLog(path);
    debouncedGenerate();
  })
  .on("change", function(path) {
    console.log("File", path, "has been changed");
  })
  .on("unlink", function(path) {
    console.log("File", path, "has been removed");
  })
  .on("error", function(error) {
    console.error("Error happened", error);
  });

const watcherAddLog = path => console.log("File", path, "has been added");
const debouncedAddLog = debounce(watcherAddLog, 1000);

const generate = async () => {
  const files = fs.readdirSync(path.join(__dirname, "../src/pages"));
  files.forEach(file => {
    try {
      const page = require(path.join(__dirname, "../src/pages", file));
      const pageStr = ReactDOMServer.renderToString(React.createElement(page));
      const pretty = prettier.format(pageStr, { parser: "babel" });
      const outStr = pretty.replace("</html>;", "</html>");
      const outDir = path.join(__dirname, "../dist");
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
      const outFile = path.join(outDir, file.replace(".js", ".html"));
      fs.writeFileSync(outFile, outStr);
      console.log(`Processed ${file}`);
    } catch (e) {
      console.log(`Failed on file ${file} with`, e);
    }
  });
};
const debouncedGenerate = debounce(generate, 1000);
