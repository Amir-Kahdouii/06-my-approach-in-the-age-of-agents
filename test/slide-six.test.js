import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const DIST_FILE_URL = `file://${path.resolve('dist/index.html')}`
const CHROME_PATH = '/usr/bin/google-chrome'

test('Slide 6 scales its display type to the standard presentation stage', async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  })
  const page = await browser.newPage()

  try {
    await page.setViewport({ width: 1440, height: 700 })
    await page.goto(DIST_FILE_URL, { waitUntil: 'load' })
    for (let index = 0; index < 6; index += 1) {
      await page.keyboard.press('ArrowRight')
      await new Promise((resolve) => setTimeout(resolve, 120))
    }

    const layout = await page.$eval('.slide-six', (slide) => {
      const stage = document.querySelector('.presentation-stage').getBoundingClientRect()
      const title = slide.querySelector('h1')
      const copy = slide.querySelector('.slide-six-copy').getBoundingClientRect()
      return {
        titleSize: Number.parseFloat(getComputedStyle(title).fontSize),
        stageWidth: stage.width,
        copyInsideStage: copy.top >= stage.top && copy.bottom <= stage.bottom,
      }
    })

    assert.ok(layout.titleSize <= layout.stageWidth * 0.23, 'The display type must scale from the stage, not the browser viewport')
    assert.equal(layout.copyInsideStage, true, 'Slide 6 copy must remain within the standard stage')
  } finally {
    await browser.close()
  }
})
