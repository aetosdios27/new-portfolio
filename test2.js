const { getEntry } = require("./src/lib/content.ts");
console.log(getEntry("blog", "building-webnotes") ? "FOUND" : "NOT FOUND");
