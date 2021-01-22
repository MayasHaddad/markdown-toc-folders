# markdown-toc-folders

[markdown-toc](https://github.com/jonschlinkert/markdown-toc) recursively usable on a folder.

## Install

```sh
npm i -g markdown-toc-folders
```

## CLI

```
Usage: toc [options]

Options:
      --version      Show version number                                       [boolean]
  -i, --ignore       files and directories to ignore                             [array]
  -o, --output-file  path to the file to which output the Table of Content      [string]
  -h, --help         Show help                                                 [boolean]

Examples:
  toc . -i foo.md dist/ -o README.md  builds Table of Content recursively for all files 
                                      in current directory excluding foo.md and dist/* 
                                      and writes the result to README.md
```
