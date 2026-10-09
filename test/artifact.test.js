import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const DIST_DIR = path.resolve('dist')
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html')

test('Seam 2: dist directory exists and contains single index.html file', () => {
  assert.equal(fs.existsSync(DIST_DIR), true, 'dist/ directory must exist')
  const files = fs.readdirSync(DIST_DIR)
  assert.deepEqual(files, ['index.html'], 'dist/ must only contain a single index.html file')
})

test('Seam 2: dist/index.html is completely self-contained with no external resource dependencies', () => {
  assert.equal(fs.existsSync(INDEX_HTML_PATH), true, 'dist/index.html must exist')
  const html = fs.readFileSync(INDEX_HTML_PATH, 'utf8')

  // Check that html has substantial size due to inline assets
  assert.ok(html.length > 500_000, 'index.html must inline assets (fonts, images, js, css)')

  // Check no external stylesheet links
  const externalStylesheets = html.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\/[^"']+["']/gi) || []
  assert.deepEqual(externalStylesheets, [], 'No external remote stylesheet links allowed')

  // Check no external script sources
  const externalScripts = html.match(/<script[^>]+src=["']https?:\/\/[^"']+["']/gi) || []
  assert.deepEqual(externalScripts, [], 'No external remote scripts allowed')

  // Check no external font url(...) references
  const externalFonts = html.match(/url\(\s*['"]?https?:\/\/[^'")]+['"]?\s*\)/gi) || []
  assert.deepEqual(externalFonts, [], 'No remote url(...) fonts/assets allowed in CSS')

  // Check that local script/link tags don't point to external missing files
  const looseScriptSrc = html.match(/<script[^>]+src=["'](?!\s*data:)[^"']+["']/gi) || []
  assert.deepEqual(looseScriptSrc, [], 'All scripts must be inlined; no external file src attributes')

  const looseLinkCss = html.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["'](?!\s*data:)[^"']+["']/gi) || []
  assert.deepEqual(looseLinkCss, [], 'All CSS must be inlined; no loose external stylesheet links')
})

test('Seam 2: dist/index.html contains all 3 required product images embedded inline', () => {
  const html = fs.readFileSync(INDEX_HTML_PATH, 'utf8')

  // Landing page image, orders image, kitchen image inlined as data:image/png;base64
  const dataImages = html.match(/data:image\/png;base64,[A-Za-z0-9+/=]+/g) || []
  assert.ok(dataImages.length >= 3, 'At least 3 embedded base64 PNG images must be present in the bundle')
})
