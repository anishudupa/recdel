#!/usr/bin/env node
import { Option, program } from "commander"
import chalk from "chalk";
import { readFilesFromPath , reqFiles , deleteFiles } from "../utils/index.js";
program
.version('1.0.0')
.description('delete files for a given file types')
.requiredOption('-p, --path <path>', "relative path of the folder (if you are on windows, conevert all '\\' to '/')")
.requiredOption('-ft, --file-types [types...]', 'file types to delete')
.addOption(new Option('-c, --current', 'use current directory').implies({path: './'}))
.action(async (options) => {
    try {
        const {fileTypes, path} = options;
        const allFiles = await readFilesFromPath(path)
        const requiredFiles = reqFiles(allFiles, fileTypes)
        if(requiredFiles.length == 0) {
            throw new Error('file does not exist')
        }
        deleteFiles(requiredFiles, path)
        console.log(chalk.hex('#39FF14').bold(`yay!! ${requiredFiles.length} files deleted successfully`))
    } catch (error) {
        console.log(chalk.hex('#EE4B2B').bold(error.message))
        process.exit(1)
    }
})

program.parse(process.argv)