import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const DIST_FILE_URL = `file://${path.resolve('dist/index.html')}`
const CHROME_PATH = '/usr/bin/google-chrome'

test('Slide 7 stays within the standard stage and reveals its focus on click', async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  })
  const page = await browser.newPage()

  try {
    await page.setViewport({ width: 1280, height: 720 })
    await page.goto(DIST_FILE_URL, { waitUntil: 'load' })

    for (let index = 0; index < 7; index += 1) {
      await page.keyboard.press('ArrowRight')
      await new Promise((resolve) => setTimeout(resolve, 60))
    }
    await page.waitForSelector('.slide-seven')

    const layout = await page.$eval('.slide-seven', (slide) => {
      const stage = document.querySelector('.presentation-stage').getBoundingClientRect()
      const circles = slide.querySelector('.focus-circles').getBoundingClientRect()
      const copy = slide.querySelector('.focus-copy').getBoundingClientRect()
      return {
        stageWidth: stage.width,
        stageHeight: stage.height,
        slideWidth: slide.getBoundingClientRect().width,
        slideHeight: slide.getBoundingClientRect().height,
        circlesInsideStage: circles.left >= stage.left && circles.right <= stage.right && circles.top >= stage.top && circles.bottom <= stage.bottom,
        copyInsideStage: copy.left >= stage.left && copy.right <= stage.right && copy.top >= stage.top && copy.bottom <= stage.bottom,
      }
    })

    assert.equal(layout.slideWidth, layout.stageWidth, 'Slide 7 must fill the non-full-screen stage width')
    assert.equal(layout.slideHeight, layout.stageHeight, 'Slide 7 must fill the non-full-screen stage height')
    assert.equal(layout.circlesInsideStage, true, 'The circle visual must remain inside the standard stage')
    assert.equal(layout.copyInsideStage, true, 'The text must remain inside the standard stage')

    const trigger = await page.$('.focus-trigger')
    assert.ok(trigger, 'Slide 7 must provide a click trigger for the circle transition')
    await trigger.click()
    await page.waitForSelector('.slide-seven.is-focused')

    const headline = await page.$eval('#slide-title-7', (element) => element.textContent.trim())
    assert.equal(headline, 'مسئله را کوچک کن، مسئلهٔ کوچک را حل کن', 'Slide 7 must use the revised final line')
  } finally {
    await browser.close()
  }
})
