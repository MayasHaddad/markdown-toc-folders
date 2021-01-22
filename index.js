#!/usr/bin/env node

const toc = require("markdown-toc");
const walk = require("./walk");
const path = require("path");
const fs = require("fs/promises");
const yargs = require("yargs");

const args = yargs
  .usage("Usage: $0 [options]")
  .option("ignore", {
    alias: "i",
    type: "array",
    description: "files and directories to ignore",
  })
  .option("output-file", {
    alias: "o",
    type: "string",
    description: "path to the file to which output the Table of Content",
  })
  .help()
  .alias("help", "h")
  .example(
    "$0 . -i foo.md dist/ -o README.md",
    "builds a Table of Content recursively for all files in current directory excluding foo.md and dist/* and writes the result to README.md"
  ).argv;

const run = async () => {
  const { _, ignore: ignoredPaths, "output-file": outputFile } = args;
  const res = await walk(_[0]);
  const markdownFiles = res?.filter((name) => name.endsWith(".md"));
  const files = markdownFiles?.map((e) => path.relative(process.cwd(), e));
  const withoutIgnoredPaths = files?.filter(
    (e) => !ignoredPaths?.find((ignoredPath) => e.startsWith(ignoredPath))
  );

  let result = "";
  for (let file of withoutIgnoredPaths) {
    const currentFileContent = await fs.readFile(`./${file}`, "utf-8");
    const fileResult = toc(currentFileContent).content;
    result = `${result}\n${fileResult.replaceAll(
      "(#",
      `(./${encodeURIComponent(file)}#`
    )}`;
  }

  result = `## Table of Content${result}`;

  if (!outputFile) {
    console.log(result);
    return;
  }

  fs.writeFile(outputFile, result, "utf8");
};

run();
