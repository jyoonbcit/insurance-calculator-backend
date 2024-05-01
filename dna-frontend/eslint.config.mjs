import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from "eslint-config-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
const compat = new FlatCompat({ baseDirectory: _dirname, recommendedConfig: pluginJs.configs.recommended })

export default [
  {
    ignores: ["**/.angular/"]
  },
  ...compat.extends('standard-with-typescript'),
  eslintConfigPrettier,
]