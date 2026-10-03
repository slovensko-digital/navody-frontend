import { glob, readFile, rm, writeFile } from 'fs/promises'
import { join } from 'path'

import { scripts, styles, task } from '@govuk-frontend/tasks'
import gulp from 'gulp'

/**
 * Build SDN layer (src/sdn) into dist/sdn
 *
 * @type {import('@govuk-frontend/tasks').TaskFunction}
 */
export const compile = (options) => {
  const sdn = {
    ...options,
    srcPath: join(options.basePath, 'sdn'),
    destPath: join(options.destPath, 'sdn')
  }

  return gulp.series(
    task.name("copy:assets 'sdn'", () =>
      gulp
        .src('assets/**/*', {
          base: sdn.srcPath,
          cwd: sdn.srcPath,
          encoding: false
        })
        .pipe(gulp.dest(sdn.destPath))
    ),
    task.name("compile:scss 'sdn'", () =>
      styles.compile('index.scss', {
        ...sdn,
        configPath: join(options.basePath, 'postcss.config.mjs'),
        filePath({ dir }) {
          return join(dir, 'navody-digital.min.css')
        }
      })
    ),
    task.name("postcss:scss 'sdn'", () =>
      styles.compile('**/*.scss', {
        ...sdn,
        configPath: join(options.basePath, 'postcss.config.mjs')
      })
    ),
    task.name("compile:js 'sdn'", () =>
      scripts.compile('index.mjs', {
        ...sdn,
        configPath: join(options.basePath, 'rollup.publish.config.mjs')
      })
    ),
    task.name("compile:js 'sdn minified'", () =>
      scripts.compile('index.mjs', {
        ...sdn,
        configPath: join(options.basePath, 'rollup.release.config.mjs'),
        filePath({ dir }) {
          return join(dir, 'navody-digital.min.js')
        }
      })
    ),

    // Point imports from dist/sdn to dist/govuk instead of src/govuk
    task.name("fix:paths 'sdn'", async () => {
      await rm(join(sdn.destPath, 'src'), { recursive: true, force: true })

      for await (const file of glob('**/*.{mjs,scss}', { cwd: sdn.destPath })) {
        const path = join(sdn.destPath, file)
        const contents = await readFile(path, 'utf8')
        const govukPath = file.endsWith('.mjs') ? '../govuk/' : 'govuk/'
        await writeFile(path, contents.replaceAll('src/govuk/', govukPath))
      }
    })
  )
}
