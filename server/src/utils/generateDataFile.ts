import * as fs from 'fs'
import * as path from 'path'
import { dedent } from 'ts-dedent'
import { nanoid } from 'nanoid'

const distPath: string = path && path.join(__dirname, '../../')

export const generateDataFile = (): void => {
  fs.mkdir(`${distPath}dist`, () => {
    fs.mkdir(`${distPath}dist/data`, () => {
      fs.writeFile(
        `${distPath}dist/data/todos.json`,
        dedent`[
          {
            "id": "${nanoid()}",
            "title": "React Hooks勉強",
            "description": "useState, useEffectについて"
          },
          {
            "id": "${nanoid()}",
            "title": "React Router勉強",
            "description": "useHistory, useLocationについて"
          },
          {
            "id": "${nanoid()}",
            "title": "Recoil勉強",
            "description": "atom, selectorについて"
          }
        ]`,
        (err) => {
          if (err) {
            console.error(err)
          } else {
            console.log('Data file generated successfully!')
          }
        }
      )
    })
  })
}
