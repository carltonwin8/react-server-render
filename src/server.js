require("babel-register")({ presets: ["react"] });
const path = require("path");
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const Index = require("./pages/index");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.send(ReactDOMServer.renderToString(React.createElement(Index)))
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
