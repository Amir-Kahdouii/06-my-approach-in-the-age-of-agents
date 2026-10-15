import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import jsQR from 'jsqr'
import { PNG } from 'pngjs'

const DIST_FILE_URL = `file://${path.resolve('dist/index.html')}`
const CHROME_PATH = '/usr/bin/google-chrome'

async function launchBrowser() {
  return await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  })
}

function decodeQrFromPngBuffer(pngBuffer) {
  const png = PNG.sync.read(pngBuffer)
  const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height)
  return code ? code.data : null
}

test('Seam 3: End-to-End Headless QA on file:// with offline mode and navigation checks', async () => {
  const browser = await launchBrowser()
  const page = await browser.newPage()

  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message)
  })

  try {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(DIST_FILE_URL, { waitUntil: 'load' })

    // Enable offline mode to guarantee no network requests are required
    await page.setOfflineMode(true)

    // 1. Initial State (Slide 1)
    let counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '01 / 13', 'Presentation must start on slide 1')

    const slide1Title = await page.$eval('#slide-title-1', (el) => el.textContent.trim())
    assert.ok(slide1Title.includes('ساختن دیگه'), 'Slide 1 title must be present')

    // 2. Keyboard Isolation: Non-navigation keys must not advance
    await page.keyboard.press('ArrowLeft') // Lower boundary
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '01 / 13', 'ArrowLeft at slide 1 must not change slide')

    await page.keyboard.press('Space')
    await page.keyboard.press('Enter')
    await page.keyboard.press('PageDown')
    await page.keyboard.press('PageUp')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowUp')
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '01 / 13', 'Non-arrow keys must not change slide')

    // Click on presentation shell must not advance slide
    await page.click('.presentation-shell')
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '01 / 13', 'Clicking shell must not advance slide')

    // 3. Speaker Notes Toggle with 'N'
    let notesExist = await page.$('.speaker-notes')
    assert.equal(notesExist, null, 'Speaker notes should be initially closed')

    await page.keyboard.press('n')
    await page.waitForSelector('.speaker-notes')
    const slide1Notes = await page.$eval('.speaker-notes p:last-child', (el) => el.textContent.trim())
    assert.ok(slide1Notes.includes('این روزها بیشتر از همیشه'), 'Slide 1 notes must match spec')

    await page.keyboard.press('n') // Close notes
    await page.waitForSelector('.speaker-notes', { hidden: true })

    // 3.5. Slide 2 Interactive Click-to-Reveal and Content Verification
    await page.keyboard.press('ArrowRight')
    await new Promise((r) => setTimeout(r, 60))
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '02 / 13', 'Must be on slide 2')

    // Verify initial unrevealed state
    let slide2State = await page.$eval('.slide-two', (el) => el.className)
    assert.ok(slide2State.includes('is-initial'), 'Slide 2 must initially be unrevealed')
    let isHidden = await page.$eval('.slide-two-answer', (el) => el.className)
    assert.ok(isHidden.includes('is-hidden'), 'Slide 2 answer must initially be hidden')

    // Verify exponential line chart motif exists at top-left
    const chartExists = await page.$('.corner-chart-motif')
    assert.ok(chartExists, 'Slide 2 must have exponential line chart motif')

    // Click slide-two to reveal
    await page.click('.slide-two')
    await new Promise((r) => setTimeout(r, 100))

    slide2State = await page.$eval('.slide-two', (el) => el.className)
    assert.ok(slide2State.includes('is-revealed'), 'Slide 2 must be revealed after click')
    const slide2Title = await page.$eval('#slide-title-2', (el) => el.textContent.trim())
    assert.equal(slide2Title, 'چی بسازم؟', 'Slide 2 heading must be "چی بسازم؟"')
    const slide2Kicker = await page.$eval('.slide-two-answer p', (el) => el.textContent.trim())
    assert.equal(slide2Kicker, 'با رشد AI، سؤال اصلی عوض شده', 'Slide 2 kicker must match spec')

    // 4. Step through slides to check product images on Slides 8, 9, 10
    // Advance to Slide 8 (press ArrowRight 6 more times from slide 2)
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('ArrowRight')
      await new Promise((r) => setTimeout(r, 60))
    }
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '08 / 13', 'Must be on slide 8')

    // Slide 8 image check
    const img8 = await page.$eval('.slide-eight img', (el) => ({
      src: el.src,
      alt: el.alt,
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      objectFit: window.getComputedStyle(el).objectFit,
    }))
    assert.ok(img8.naturalWidth > 0, 'Slide 8 image must load successfully')
    assert.equal(img8.objectFit, 'contain', 'Slide 8 image must have object-fit: contain')
    assert.ok(img8.alt.includes('پرو فود'), 'Slide 8 image must have Persian alt text')

    // Advance to Slide 9
    await page.keyboard.press('ArrowRight')
    await new Promise((r) => setTimeout(r, 60))
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '09 / 13', 'Must be on slide 9')

    const img9 = await page.$eval('.slide-nine img', (el) => ({
      src: el.src,
      alt: el.alt,
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      objectFit: window.getComputedStyle(el).objectFit,
    }))
    assert.ok(img9.naturalWidth > 0, 'Slide 9 image must load successfully')
    assert.equal(img9.objectFit, 'contain', 'Slide 9 image must have object-fit: contain')

    // Advance to Slide 10
    await page.keyboard.press('ArrowRight')
    await new Promise((r) => setTimeout(r, 60))
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '10 / 13', 'Must be on slide 10')

    const img10 = await page.$eval('.slide-ten img', (el) => ({
      src: el.src,
      alt: el.alt,
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      objectFit: window.getComputedStyle(el).objectFit,
    }))
    assert.ok(img10.naturalWidth > 0, 'Slide 10 image must load successfully')
    assert.equal(img10.objectFit, 'contain', 'Slide 10 image must have object-fit: contain')

    // 5. Advance to Slide 13
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowRight')
      await new Promise((r) => setTimeout(r, 60))
    }
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '13 / 13', 'Must be on slide 13')

    // Upper boundary: pressing ArrowRight stays on slide 13
    await page.keyboard.press('ArrowRight')
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '13 / 13', 'Upper boundary: ArrowRight stays on slide 13')

    // Check Speaker Notes total cumulative duration on Slide 13
    await page.keyboard.press('n')
    await page.waitForSelector('.speaker-notes')
    const timings = await page.$$eval('.speaker-notes dd', (els) => els.map((el) => el.textContent.trim()))
    assert.deepEqual(timings, ['0:40', '7:45'], 'Slide 13 target duration must be 0:40 and cumulative must be 7:45')
    await page.keyboard.press('n')

    // 6. Slide 13 Destination Cards and Link Attributes
    const cards = await page.$$eval('.destination-card', (els) =>
      els.map((el) => {
        const rect = el.getBoundingClientRect()
        return {
          href: el.getAttribute('href'),
          target: el.getAttribute('target'),
          rel: el.getAttribute('rel'),
          label: el.querySelector('.dest-label')?.textContent?.trim(),
          handle: el.querySelector('.dest-handle')?.textContent?.trim(),
          x: rect.x,
        }
      })
    )

    assert.equal(cards.length, 3, 'Exactly 3 destination cards must exist on slide 13')

    const expectedUrls = [
      'https://github.com/amirmahdikahdouii',
      'https://www.linkedin.com/in/amir-mahdi-kahdouii',
      'https://t.me/amirkahdouii',
    ]

    for (let i = 0; i < 3; i++) {
      assert.equal(cards[i].href, expectedUrls[i], `Card ${i + 1} href must be ${expectedUrls[i]}`)
      assert.equal(cards[i].target, '_blank', `Card ${i + 1} target must be _blank`)
      assert.equal(cards[i].rel, 'noreferrer noopener', `Card ${i + 1} rel must be "noreferrer noopener"`)
    }

    // Verify RTL order: GitHub is rightmost and Telegram is leftmost
    assert.ok(cards[0].x > cards[1].x, 'Card 1 must be to the right of Card 2 in RTL')
    assert.ok(cards[1].x > cards[2].x, 'Card 2 must be to the right of Card 3 in RTL')

    // 7. QR Code Decodability using jsQR
    const qrContainers = await page.$$('.qr-container')
    assert.equal(qrContainers.length, 3, 'Must have 3 QR containers')

    for (let i = 0; i < 3; i++) {
      const qrScreenshot = await qrContainers[i].screenshot({ type: 'png' })
      const decodedUrl = decodeQrFromPngBuffer(qrScreenshot)
      assert.equal(decodedUrl, expectedUrls[i], `QR code ${i + 1} must decode to ${expectedUrls[i]}`)
    }

    // 8. Full Backward Navigation with ArrowLeft to Slide 1
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('ArrowLeft')
      await new Promise((r) => setTimeout(r, 40))
    }
    counter = await page.$eval('.slide-counter', (el) => el.textContent.trim())
    assert.equal(counter, '01 / 13', 'Navigating backwards 12 times must return to slide 1')

    // 9. Viewport and Responsiveness Checks (no horizontal overflow)
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 390, height: 844 },
    ]

    for (const vp of viewports) {
      await page.setViewport(vp)
      await new Promise((r) => setTimeout(r, 100))
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      assert.equal(hasHorizontalScroll, false, `Viewport ${vp.width}x${vp.height} must not have horizontal scroll overflow`)
    }

    // 10. Prefers-Reduced-Motion Check
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    const animDuration = await page.evaluate(() => {
      const el = document.querySelector('.slide-transition')
      return window.getComputedStyle(el).animationDuration
    })
    assert.equal(animDuration, '0s', 'prefers-reduced-motion must set animation-duration to 0s')

    // 11. Accessibility: lang, dir, title, aria-live
    const lang = await page.$eval('html', (el) => el.getAttribute('lang'))
    const dir = await page.$eval('html', (el) => el.getAttribute('dir'))
    const title = await page.title()
    const ariaLive = await page.$eval('#slide-announcement', (el) => el.getAttribute('aria-live'))

    assert.equal(lang, 'fa', 'html lang must be "fa"')
    assert.equal(dir, 'rtl', 'html dir must be "rtl"')
    assert.equal(title, 'ساختن دیگر گلوگاه نیست', 'Page title must match spec')
    assert.equal(ariaLive, 'polite', 'Slide announcement must have aria-live="polite"')

    // 12. Console Errors Check
    assert.deepEqual(consoleErrors, [], 'There must be zero console errors during normal execution flow')
  } finally {
    await browser.close()
  }
})
