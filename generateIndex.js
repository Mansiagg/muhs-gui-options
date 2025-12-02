const fs = require("fs");
const path = require("path");

const mainFolder = __dirname;
const items = fs.readdirSync(mainFolder, { withFileTypes: true });

let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Folder Index</title>
</head>
<body>
<h1>Folders List</h1>
<ul>
`;

items.forEach(item => {
    if (item.isDirectory()) {
        html += `<li><a href="./${item.name}/" target="_blank">${item.name}</a></li>\n`;
    }
});

html += `
</ul>
</body>
</html>
`;

fs.writeFileSync(path.join(mainFolder, "index.html"), html);
console.log("index.html created successfully!");
