import { cp, mkdir, readFile, rm, writeFile } from 'fs/promises'
import { join } from 'path'

const root = join(import.meta.dirname, '..')
const source = join(root, 'packages/govuk-frontend')
const target = join(root, 'package')

const pkg = JSON.parse(await readFile(join(source, 'package.json'), 'utf8'))

await rm(target, { recursive: true, force: true })
await mkdir(join(target, 'govuk'), { recursive: true })
await cp(join(source, 'dist'), join(target, 'dist'), { recursive: true })
await cp(join(root, 'LICENSE.txt'), join(target, 'LICENSE.txt'))

// Keep import paths used by navody.digital and priznanie-digital working
await writeFile(
  join(target, 'govuk/all.scss'),
  '@import "../dist/sdn/index";\n'
)

await writeFile(
  join(target, 'package.json'),
  `${JSON.stringify(
    {
      name: 'navody-digital-frontend',
      description:
        'Navody.Digital Frontend contains the code you need to start building a user interface for navody.digital',
      version: process.env.SDN_VERSION ?? '1.0.0-alpha.0',
      main: 'dist/sdn/index.bundle.js',
      module: 'dist/sdn/index.mjs',
      sass: 'dist/sdn/index.scss',
      exports: {
        '.': {
          sass: './dist/sdn/index.scss',
          import: './dist/sdn/index.mjs',
          require: './dist/sdn/index.bundle.js',
          default: './dist/sdn/index.bundle.js'
        },
        './dist/': './dist/',
        './package.json': './package.json',
        './*': {
          sass: './*',
          default: './*'
        }
      },
      sideEffects: ['*.css', '*.scss'],
      engines: pkg.engines,
      author: {
        name: 'Slovensko.Digital',
        email: 'navody@slovensko.digital'
      },
      repository: {
        type: 'git',
        url: 'https://github.com/slovensko-digital/navody-frontend.git'
      },
      bugs: {
        url: 'https://github.com/slovensko-digital/navody-frontend/issues'
      },
      homepage: 'https://github.com/slovensko-digital/navody-frontend#readme',
      keywords: ['navody.digital', 'slovensko.digital', 'govuk', 'frontend'],
      license: 'MIT'
    },
    null,
    2
  )}\n`
)
