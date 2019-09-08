import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

let nuxt = null

test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '../..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir
  config.dev = false
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

test('Route /sign-in exists and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/auth/sign-in', context)
  t.true(html.includes('<h3>Please sign in to site.</h3>'))
})

test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})
