import Papa from "papaparse"
import { readFileSync, readdirSync } from 'fs'
import { exec } from 'child_process'

const host = 'https://duas55yta5r2u.cloudfront.net'
const list = Papa.parse(readFileSync('resourceMeta.csv', 'utf-8')).data
const fileList = readdirSync("C:/Users/nulla/Desktop/temp/t7s")

for (const el of list) {
  if (!fileList.includes(el[0])) {
    const url = `${host}/download/${el[1]}/${el[0]}`
    console.log("downloading", el[0]);
    exec(`aria2c "${url}" -d "C:/Users/nulla/Desktop/temp/t7s"`, (error, stdout, stderr) => {
      if (error) {
        console.log(error.message);
      } else if (stderr) {
        console.log(stderr);
      }
    })
  }
}