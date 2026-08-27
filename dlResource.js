import Papa from "papaparse"
import { readFileSync } from 'fs'
import { exec } from 'child_process'
import PromisePool from "./PromisePool.js"

const host = 'https://duas55yta5r2u.cloudfront.net'
const list = Papa.parse(readFileSync('resourceMeta.csv', 'utf-8')).data

const tasks = list.filter(el => el[1].startsWith("r100005")).map(el => () => new Promise((resolve, reject) => {
  const url = `${host}/download/${el[1]}/${el[0]}`
  console.log("downloading", el[0]);
  exec(`aria2c "${url}" -d "C:/Users/nulla/Desktop/temp/t7s_add"`, (error, stdout, stderr) => {
    if (error) {
      reject(error)
      console.log(error.message);
    } else if (stderr) {
      reject(stderr)
      console.log(stderr);
    } else {
      resolve()
    }
  })
}))
const promisePool = new PromisePool(tasks, { concurrency: 32 });
promisePool.run();