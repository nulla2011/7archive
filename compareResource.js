import { readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import Papa from "papaparse"

const path = "D:/Game_data/t7s/Archive_full/download/normal/r100004"
const metaList = Papa.parse(readFileSync('resourceMeta.csv', 'utf-8')).data
const promisifiedExec = promisify(exec)
let fileList = []
// for (let index = 0; index <= 39; index++) {
//   const indexNum = String(index).padStart(2, '0')
//   const { stdout } = await promisifiedExec(`unzip -v "${join(path, `normal_${indexNum}.zip`)}"`)
//   fileList = fileList.concat(stdout.split('\n').slice(3, -3).map(l => l.trim().split(/\s+/).concat([indexNum])))
// }
const setup = JSON.parse(readFileSync('D:/Game_data/t7s/Archive_full/setup_resource.json', 'utf-8'))
fileList = [...setup.revisionList["964"], ...setup.revisionList["100001"], ...setup.revisionList["100003"], ...setup.revisionList["100004"]]
for (const file of fileList) {
  // if (!metaList.map(l => l[0]).includes(file[7])) {
  //   console.log(file[8], file[7]);
  // }
  if (!metaList.map(l => l[0]).includes(file.name)) {
    console.log(file.name);
  }
}