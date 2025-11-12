// process-users.js
const fs = require("fs").promises;

async function main() {
  const inputPath = "./users.json";
  const outputPath = "./users.updated.json";

  const raw = await fs.readFile(inputPath, "utf8");
  const users = JSON.parse(raw);

  const updatedUsers = users.map((u) => ({
    ...u,
    age: u.age + 1,
    isActive: true,
  }));

  await fs.writeFile(outputPath, JSON.stringify(updatedUsers, null, 2), "utf8");

  console.log("Result :", outputPath);
}

main().catch((err) => {
  console.error(err);
});
