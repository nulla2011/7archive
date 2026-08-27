import Papa from "papaparse"
import { readFileSync, writeFileSync } from 'fs'

let data = []
for (let index = 0; index < 16; index++) {
  data = data.concat(Papa.parse(readFileSync(`C:/Users/nulla/Desktop/temp/resource_meta/resource_meta_${index.toString(16)}`, 'utf-8').trim()).data)
}
data.sort((a, b) => a[0].localeCompare(b[0]))
const sum = data.reduce((p, c) => p + parseInt(c[3]), 0)
console.log('total: ', sum);
writeFileSync("resourceMeta.csv", Papa.unparse(data))