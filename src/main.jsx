import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'vazirmatn/Vazirmatn-Variable-font-face.css'
import './styles.css'

import landingImage from '../image.png'
import ordersImage from '../image (1).png'
import kitchenImage from '../image (2).png'

const PlaceholderSlide = ({ slide }) => (
  <section className="placeholder-slide" aria-labelledby={`slide-title-${slide.id}`}>
    <p>ارائهٔ «ساختن دیگر گلوگاه نیست»</p>
    <h1 id={`slide-title-${slide.id}`}>{slide.title}</h1>
    <span aria-hidden="true" className="typing-cursor" />
  </section>
)

const slides = [
  { id: 1, title: 'ساختن دیگر گلوگاه نیست', durationSeconds: 30, cumulativeSeconds: 30, notes: 'این روزها بیشتر از همیشه کد می‌زنم، اما کمتر از قبل نگران خودِ کدنویسی‌ام. ابزارهای هوش مصنوعی فاصله‌ی بین یک ایده و یک نمونه‌ی قابل استفاده را خیلی کوتاه کرده‌اند. چیزی که ذهن من را درگیر کرده، دیگر این نیست که آیا می‌توانم چیزی را بسازم؛ سؤال سخت‌تر این است که اصلاً چه چیزی ارزش ساختن دارد؟', component: PlaceholderSlide },
  { id: 2, title: 'از چطور بسازم؟ به چه بسازم؟', durationSeconds: 35, cumulativeSeconds: 65, notes: 'قبلاً بخش بزرگی از هزینه و زمان یک ایده صرف پیاده‌سازی می‌شد. امروز می‌توانیم با کمک AI در چند ساعت چیزی بسازیم که قبلاً چند روز یا چند هفته زمان می‌خواست. اما سریع‌تر ساختن لزوماً یعنی بهتر ساختن؟ اگر مسئله‌ی درستی انتخاب نکرده باشیم، فقط با سرعت بیشتری چیزی را ساخته‌ایم که کسی به آن نیاز ندارد.', component: PlaceholderSlide },
  { id: 3, title: 'برای پیدا کردن ایده، از پشت میز بلند می‌شوم.', durationSeconds: 35, cumulativeSeconds: 100, notes: 'روشی که این روزها امتحان می‌کنم خیلی ساده است. به‌جای شروع از تکنولوژی یا یک بازار خیلی بزرگ، بیشتر به زندگی روزمره نگاه می‌کنم. آدم‌ها کجا معطل می‌شوند؟ چه کاری را هر روز با اصطکاک انجام می‌دهند؟ چه چیزی آن‌ها را کلافه می‌کند؟ مسئله‌های خوب معمولاً در یک جلسه‌ی ایده‌پردازی پیدا نمی‌شوند؛ باید آن‌ها را از نزدیک زندگی کرد.', component: PlaceholderSlide },
  { id: 4, title: 'زندگی ← مسئله ← نمونه ← استفاده ← یادگیری', durationSeconds: 30, cumulativeSeconds: 130, notes: 'چرخه‌ای که برای خودم ساخته‌ام این است: وارد زندگی واقعی شو، یک مسئله‌ی کوچک و مشخص پیدا کن، سبک‌ترین راه‌حل ممکن را بساز و آن را دست آدم واقعی بده. اگر استفاده شد و واقعاً کار کسی را بهتر کرد، آن وقت ارزش دارد زمان بیشتری برای بالغ‌کردنش بگذارم. اگر نه، چیزی یاد گرفته‌ام و سراغ تجربه‌ی بعدی می‌روم.', component: PlaceholderSlide },
  { id: 5, title: 'تمرین تمام شد. غذا هنوز شروع نشده بود.', durationSeconds: 40, cumulativeSeconds: 170, notes: 'یکی از همین مسئله‌ها در باشگاه خودمان جلوی چشمم بود. دوستم قبل از تمام‌شدن تمرین غذا سفارش داده بود تا بعد از تمرین آماده باشد. تمرین تمام شد، اما خبری از غذا نبود. بعد از کلی انتظار فهمیدیم آشپز سفارش را فراموش کرده. این فقط یک باگ نرم‌افزاری نبود؛ اصلاً نرم‌افزاری وجود نداشت. یک سفارش شفاهی بین شلوغی باشگاه و آشپزخانه گم شده بود.', component: PlaceholderSlide },
  { id: 6, title: 'نسخه‌ی اول را برای همه‌ی باشگاه‌ها ساختم.', durationSeconds: 40, cumulativeSeconds: 210, notes: 'اولین واکنش من همان اشتباه آشنای یک برنامه‌نویس بود: بیایید یک راه‌حل عمومی برای همه‌ی باشگاه‌ها بسازیم. سناریوهای مختلف، نیازهای مختلف و قابلیت‌های زیاد. خیلی زود در contextهای متفاوت و user storyهای بی‌پایان گم شدم. قبل از اینکه یک مسئله را خوب حل کنم، داشتم برای آدم‌هایی که نمی‌شناختم محصول طراحی می‌کردم. نسخه‌ی اول شکست خورد و اتفاقاً لازم بود شکست بخورد.', component: PlaceholderSlide },
  { id: 7, title: 'نه همه‌ی باشگاه‌ها؛ همین باشگاه. همین آدم‌ها. همین مسئله.', durationSeconds: 35, cumulativeSeconds: 245, notes: 'شکست نسخه‌ی اول یک چیز مهم یادم داد: صورت مسئله باید مرز داشته باشد. تصمیم گرفتم فعلاً بازار بزرگ، مقیاس و قابلیت‌های آینده را فراموش کنم. فقط مسئله‌ی خودمان در باشگاه خودمان را برای یک گروه کوچک از آدم‌هایی که می‌شناختم حل کنم. اگر این راه‌حل اینجا کار کرد، بعداً فرصت گسترش وجود دارد.', component: PlaceholderSlide },
  { id: 8, title: 'سفارش قبل از پایان تمرین', durationSeconds: 35, cumulativeSeconds: 280, notes: 'نتیجه شد pro-food؛ یک راه‌حل سبک برای سفارش آنلاین غذای باشگاه. ورزشکار قبل از تمام‌شدن تمرین منو را می‌بیند و سفارش می‌دهد. آشپزخانه سفارش را همان لحظه دریافت می‌کند و می‌تواند آن را پیگیری کند. محصول قرار نیست فعلاً همه‌چیز باشد؛ فقط قرار است نگذارد سفارش کسی دوباره فراموش شود.', productImage: landingImage, component: PlaceholderSlide },
  { id: 9, title: 'پرداخت آنلاین؟ حذف شد.', durationSeconds: 35, cumulativeSeconds: 315, notes: 'مثلاً پرداخت آنلاین را حذف کردم. چرا؟ چون در این باشگاه آدم‌ها همدیگر را می‌شناسند و به هم اعتماد دارند. پرداخت می‌تواند در پایان انجام شود. اضافه‌کردن درگاه، خطاهای پرداخت و تسویه فقط تجربه‌ی اول را سنگین‌تر می‌کرد. راه‌حل خوب لزوماً راه‌حلی نیست که قابلیت بیشتری دارد؛ راه‌حلی است که دقیقاً به‌اندازه‌ی مسئله ساخته شده.', productImage: ordersImage, component: PlaceholderSlide },
  { id: 10, title: 'سفارش‌ها دیده می‌شوند. نیازها هم.', durationSeconds: 35, cumulativeSeconds: 350, notes: 'سمت دیگر ماجرا آشپزخانه بود. حالا کارکنان فقط یک لیست شفاف از سفارش‌ها ندارند؛ می‌توانند بفهمند کدام غذاها محبوب‌ترند و مشتری‌ها واقعاً چه می‌خواهند. یک مشکل کوچک عملیاتی کم‌کم به داده‌ای تبدیل شد که تصمیم‌های بعدی آشپزخانه را بهتر می‌کند. اما این ارزش اضافه از همان مسئله‌ی ساده شروع شد، نه از یک داشبورد پر از نمودار.', productImage: kitchenImage, component: PlaceholderSlide },
  { id: 11, title: 'سفارش گم‌شده: صفر', durationSeconds: 30, cumulativeSeconds: 380, notes: 'مهم‌ترین نتیجه برای من یک عدد درآمدی عجیب یا هزاران کاربر نبود. نتیجه این بود که مشکل سفارش‌های گم‌شده کاملاً حل شد. یک گروه کوچک از آدم‌های واقعی از چیزی که ساخته بودم استفاده کردند و کارشان بهتر شد. همین برای ادامه‌دادن یک ایده، سیگنال خیلی باارزش‌تری از حدس و هیجان اولیه است.', component: PlaceholderSlide },
  { id: 12, title: 'نسخه‌ی اولت باید اجازه داشته باشد شکست بخورد.', durationSeconds: 45, cumulativeSeconds: 425, notes: 'برداشت من این نیست که با AI هر ایده‌ای موفق می‌شود. برعکس، حالا می‌توانیم شکست را ارزان‌تر کنیم. نسخه‌ی اول قرار نیست کامل باشد؛ حتی باید اجازه داشته باشد شکست بخورد. هدفش این است که چیزی به ما یاد بدهد که با فکرکردن پشت میز یاد نمی‌گیریم. من این روزها تلاش می‌کنم سریع‌تر و ارزان‌تر تجربه کنم؛ تجربه‌ی ساختن یک SaaS برای خودم، با مسئله‌ای که خودم لمس کرده‌ام و با کمک ابزارهای AI.', component: PlaceholderSlide },
  { id: 13, title: 'خلق‌کردن برای من سرگرم‌کننده است؛ امیدوارم تو هم مسئله‌ی خودت را بسازی.', durationSeconds: 40, cumulativeSeconds: 465, notes: 'برای من creator بودن قبل از هر چیز سرگرم‌کننده است. pro-food فقط اولین نمونه از این شیوه‌ی زندگی و ساختن است و می‌خواهم تجربه‌ها و پروژه‌های بعدی را هم به اشتراک بگذارم. اگر ایده‌ای داری، منتظر نسخه‌ی کامل یا لحظه‌ی بی‌نقص نمان. در زندگی واقعی دنبالش بگرد، کوچک شروعش کن، آن را دست یک آدم واقعی بده و اجازه بده نتیجه مسیر بعدی را نشانت دهد.', component: PlaceholderSlide },
]

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function App() {
  const stageRef = useRef(null)
  const [{ slideIndex, transitionDirection }, setPresentation] = useState({
    slideIndex: 0,
    transitionDirection: 'forward',
  })
  const [notesOpen, setNotesOpen] = useState(false)
  const [fullscreenAvailable] = useState(() => Boolean(document.fullscreenEnabled))
  const currentSlide = slides[slideIndex]
  const CurrentSlide = currentSlide.component
  const progress = useMemo(() => ((slideIndex + 1) / slides.length) * 100, [slideIndex])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setPresentation((current) => {
          if (current.slideIndex === slides.length - 1) return current
          return { slideIndex: current.slideIndex + 1, transitionDirection: 'forward' }
        })
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setPresentation((current) => {
          if (current.slideIndex === 0) return current
          return { slideIndex: current.slideIndex - 1, transitionDirection: 'backward' }
        })
      }
      if (event.key.toLowerCase() === 'n') setNotesOpen((open) => !open)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const enterFullscreen = async () => {
    if (stageRef.current?.requestFullscreen) await stageRef.current.requestFullscreen()
  }

  return (
    <main className="presentation-shell" aria-label="ارائهٔ ساختن دیگر گلوگاه نیست">
      <section ref={stageRef} className={`presentation-stage direction-${transitionDirection}`} aria-describedby="slide-announcement">
        <div className="progress-track" aria-hidden="true"><span className="progress-line" style={{ inlineSize: `${progress}%` }} /></div>
        <div className={`slide-transition slide-transition-${transitionDirection}`} key={currentSlide.id}>
          <CurrentSlide slide={currentSlide} />
        </div>
        <div className="stage-controls">
          <p className="notes-hint">یادداشت‌ها <kbd>N</kbd></p>
          <p className="slide-counter" dir="ltr">{String(slideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</p>
          {fullscreenAvailable && <button className="fullscreen-button" type="button" onClick={enterFullscreen}>تمام‌صفحه</button>}
        </div>
        {notesOpen && (
          <aside className="speaker-notes" id="speaker-notes" aria-label="یادداشت گوینده">
            <div className="notes-heading"><p>یادداشت گوینده</p><span aria-hidden="true">N</span></div>
            <h2>{currentSlide.title}</h2>
            <dl><div><dt>زمان هدف</dt><dd dir="ltr">{formatTime(currentSlide.durationSeconds)}</dd></div><div><dt>زمان تجمعی</dt><dd dir="ltr">{formatTime(currentSlide.cumulativeSeconds)}</dd></div></dl>
            <p>{currentSlide.notes}</p>
          </aside>
        )}
      </section>
      <p className="sr-only" id="slide-announcement" aria-live="polite">اسلاید {slideIndex + 1} از {slides.length}: {currentSlide.title}</p>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
