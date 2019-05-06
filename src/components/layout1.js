const React = require("react");

module.exports = props => {
  return (
    <html>
      <head>
        <title>Carlton</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};
