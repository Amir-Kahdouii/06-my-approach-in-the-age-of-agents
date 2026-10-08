import { createRoot } from 'react-dom/client'
import 'vazirmatn/Vazirmatn-Variable-font-face.css'
import './styles.css'

import landingImage from '../image.png'
import ordersImage from '../image (1).png'
import kitchenImage from '../image (2).png'

const productPreviews = [
  { src: landingImage, alt: 'صفحهٔ اصلی محصول pro-food' },
  { src: ordersImage, alt: 'سفارش‌ها و پرداخت‌های pro-food' },
  { src: kitchenImage, alt: 'پنل کارکنان و منوی pro-food' },
]

function App() {
  return (
    <main className="bootstrap-screen" aria-label="ارائهٔ ساختن دیگر گلوگاه نیست">
      <section className="intro" aria-labelledby="presentation-title">
        <p className="kicker">روایت ساخت pro-food</p>
        <h1 id="presentation-title">
          ساختن دیگر
          <br />
          گلوگاه نیست<span className="cursor" aria-hidden="true" />
        </h1>
        <p className="summary">
          زیرساخت ارائه آماده است؛ در گام‌های بعدی، داستان یک سفارشِ فراموش‌شده به یک
          تجربهٔ کوچک و واقعی تبدیل می‌شود.
        </p>
      </section>

      <section className="preview-rail" aria-label="تصاویر آمادهٔ ارائه">
        {productPreviews.map((preview, index) => (
          <figure className="preview" key={preview.alt}>
            <img src={preview.src} alt={preview.alt} />
            <figcaption>تصویر {index + 1} برای اسلایدهای محصول</figcaption>
          </figure>
        ))}
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
