import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'vazirmatn/Vazirmatn-Variable-font-face.css'
import './styles.css'

import landingImage from '../image.png'
import ordersImage from '../image (1).png'
import kitchenImage from '../image (2).png'
import { destinations } from './destinations.jsx'

const PlaceholderSlide = ({ slide }) => (
  <section className="placeholder-slide" aria-labelledby={`slide-title-${slide.id}`}>
    <p>ارائهٔ «ساختن دیگر گلوگاه نیست»</p>
    <h1 id={`slide-title-${slide.id}`}>{slide.title}</h1>
    <span aria-hidden="true" className="typing-cursor" />
  </section>
)

const StorySlide = ({ children, className = '', labelledBy, ...props }) => (
  <section className={`story-slide ${className}`} aria-labelledby={labelledBy} {...props}>
    {children}
  </section>
)

const SlideOne = () => (
  <StorySlide className="slide-one" labelledBy="slide-title-1">
    <div className="corner-pie-motif" aria-hidden="true">
      <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="130" cy="130" r="120" fill="rgba(226, 246, 213, 0.28)" stroke="rgba(22, 51, 0, 0.06)" strokeWidth="1.5" />
        <path d="M 130 130 L 130 20 A 110 110 0 1 1 38 190 Z" fill="rgba(226, 246, 213, 0.55)" />
        <path d="M 130 130 L 38 190 A 110 110 0 0 1 130 20 Z" fill="rgba(159, 232, 112, 0.32)" stroke="rgba(22, 51, 0, 0.08)" strokeWidth="1" />
        <circle cx="130" cy="130" r="48" fill="#ffffff" stroke="rgba(22, 51, 0, 0.06)" strokeWidth="1.5" />
        <circle cx="130" cy="130" r="22" fill="rgba(159, 232, 112, 0.2)" />
        <circle cx="210" cy="205" r="75" fill="rgba(240, 248, 235, 0.65)" stroke="rgba(22, 51, 0, 0.08)" strokeWidth="1.5" />
        <path d="M 210 205 L 210 135 A 70 70 0 0 1 275 230 Z" fill="rgba(159, 232, 112, 0.45)" />
        <circle cx="210" cy="205" r="30" fill="#ffffff" stroke="rgba(22, 51, 0, 0.05)" strokeWidth="1" />
        <circle cx="65" cy="245" r="18" fill="rgba(226, 246, 213, 0.85)" stroke="rgba(159, 232, 112, 0.6)" strokeWidth="1.5" />
        <circle cx="130" cy="130" r="135" stroke="rgba(22, 51, 0, 0.08)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
    </div>
    <div className="slide-one-copy">
      <h1 id="slide-title-1">ساختن دیگه زمان‌بر نیست</h1>
      <p className="story-question">سوال مهم: چه چیزی بسازیم؟</p>
    </div>
  </StorySlide>
)

const SlideTwo = () => {
  const [revealed, setRevealed] = useState(false)

  return (
    <StorySlide
      className={`slide-two ${revealed ? 'is-revealed' : 'is-initial'}`}
      labelledBy="slide-title-2"
      onClick={() => setRevealed((prev) => !prev)}
      tabIndex={0}
      role="region"
      aria-label="اسلاید ۲: برای نمایش سؤال اصلی کلیک کنید"
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          setRevealed((prev) => !prev)
        }
      }}
    >
      <div className="corner-chart-motif" aria-hidden="true">
        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-badge">
              <span className="chart-pulse-dot" />
              رشد AI
            </span>
            <span className="chart-trend-tag">نمایی ↑</span>
          </div>
          <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="exponential-chart-svg">
            <defs>
              <linearGradient id="exponentialFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9fe870" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#9fe870" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="exponentialStroke" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#163300" />
                <stop offset="65%" stopColor="#163300" />
                <stop offset="100%" stopColor="#9fe870" />
              </linearGradient>
            </defs>
            <line x1="25" y1="120" x2="225" y2="120" stroke="rgba(22, 51, 0, 0.14)" strokeWidth="1" />
            <line x1="25" y1="80" x2="225" y2="80" stroke="rgba(22, 51, 0, 0.08)" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="25" y1="40" x2="225" y2="40" stroke="rgba(22, 51, 0, 0.08)" strokeDasharray="3 3" strokeWidth="1" />
            <path
              d="M 28 120 C 85 119, 140 105, 172 70 C 192 48, 208 28, 220 16 L 220 120 Z"
              fill="url(#exponentialFill)"
            />
            <path
              d="M 28 120 C 85 119, 140 105, 172 70 C 192 48, 208 28, 220 16"
              stroke="url(#exponentialStroke)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="exponential-curve-path"
            />
            <circle cx="220" cy="16" r="9" fill="rgba(159, 232, 112, 0.45)" />
            <circle cx="220" cy="16" r="4" fill="#163300" stroke="#9fe870" strokeWidth="2.5" />
            <path d="M 221 117 L 226 120 L 221 123" stroke="rgba(22, 51, 0, 0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="chart-footer">
            <span>سرعت ساخت</span>
            <span className="chart-val">100×</span>
          </div>
        </div>
      </div>

      <div className={`question-shift ${revealed ? 'is-revealed' : 'is-initial'}`} aria-hidden="true">
        <span className="question-text">چطور بسازم؟</span>
        <span className="question-arrow-box">
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 10H4" />
            <path d="M9 15l-5-5 5-5" />
          </svg>
        </span>
      </div>

      <div className={`slide-two-answer ${revealed ? 'is-revealed' : 'is-hidden'}`}>
        <p>با رشد AI، سؤال اصلی عوض شده</p>
        <h1 id="slide-title-2">چی بسازم؟</h1>
        <small>سریع‌تر ساختن، مسئله‌ی درست را انتخاب نمی‌کند.</small>
      </div>

      {!revealed && (
        <div className="slide-two-click-cue" aria-hidden="true">
          <span className="click-cue-pulse" />
          <span>برای مشاهدهٔ سؤال اصلی کلیک کنید</span>
        </div>
      )}
    </StorySlide>
  )
}

const SlideThree = () => (
  <StorySlide className="slide-three" labelledBy="slide-title-3">
    <div className="slide-three-copy">
      <p className="story-kicker">ایده از داخل یک تب مرورگر بیرون نمی‌آید</p>
      <h1 id="slide-title-3">برای پیدا کردن ایده،<br />از پشت میز بلند می‌شوم.</h1>
    </div>
    <div className="verbs" aria-label="دیدن، پرسیدن، تجربه‌کردن"><span>دیدن</span><span>پرسیدن</span><span>تجربه‌کردن</span></div>
  </StorySlide>
)

const cycleSteps = ['زندگی', 'مسئله', 'نمونه', 'استفاده', 'یادگیری']
const SlideFour = () => (
  <StorySlide className="slide-four" labelledBy="slide-title-4">
    <p className="story-kicker">چرخه‌ی من</p>
    <h1 id="slide-title-4">زندگی ← مسئله ← نمونه ← استفاده ← یادگیری</h1>
    <ol className="learning-cycle">
      {cycleSteps.map((step, index) => <li key={step}><span>{step}</span>{index < cycleSteps.length - 1 && <i aria-hidden="true" />}</li>)}
    </ol>
    <p className="cycle-caption">یک مسئله‌ی کوچک، یک نمونه‌ی سبک، یک یادگیری واقعی.</p>
  </StorySlide>
)

const SlideFive = () => (
  <StorySlide className="slide-five" labelledBy="slide-title-5">
    <div className="order-story-copy">
      <p className="story-kicker">باشگاه خودمان، بعد از تمرین</p>
      <h1 id="slide-title-5">تمرین تمام شد.<br />غذا هنوز شروع نشده بود.</h1>
      <p>آشپز سفارش دوستم را فراموش کرده بود.</p>
    </div>
    <div className="receipt-queue" aria-label="صف سفارش‌ها">
      <p>صف سفارش‌ها</p>
      <div className="receipt receipt-complete"><span>پروتئین + برنج</span><b>آماده</b></div>
      <div className="receipt receipt-lost"><span>سفارش دوست من</span><b>؟</b></div>
      <div className="receipt receipt-complete"><span>املت سبزیجات</span><b>آماده</b></div>
    </div>
  </StorySlide>
)

const SlideSix = () => (
  <StorySlide className="slide-six" labelledBy="slide-title-6">
    <div className="failed-frame" aria-hidden="true" />
    <div className="slide-six-copy">
      <p>نسخه‌ی اول را برای</p>
      <h1 id="slide-title-6">همه</h1>
      <p>ی باشگاه‌ها ساختم.</p>
      <small>و قبل از حل یک مسئله، در نیازهای بی‌پایان گم شدم.</small>
    </div>
  </StorySlide>
)

const SlideSeven = () => (
  <StorySlide className="slide-seven" labelledBy="slide-title-7">
    <div className="focus-copy">
      <p className="story-kicker">دایره را کوچک کن</p>
      <h1 id="slide-title-7">نه همه‌ی باشگاه‌ها؛<br />همین باشگاه. همین آدم‌ها. همین مسئله.</h1>
      <p>اگر اینجا کار کرد، بعداً فرصت گسترش وجود دارد.</p>
    </div>
    <div className="focus-circles" aria-hidden="true"><span className="focus-circle">باشگاه‌ها</span><span className="focus-circle">آدم‌ها</span><span className="focus-circle">مسئله‌ها</span><span className="focus-point" /></div>
  </StorySlide>
)

const BrowserFrame = ({ src, alt, className = '', children }) => (
  <div className={`product-browser ${className}`}>
    <div className="browser-chrome" aria-hidden="true"><span /><span /><span /><b>pro-food</b></div>
    <div className="product-image-wrap">
      <img src={src} alt={alt} />
      {children}
    </div>
  </div>
)

const SlideEight = () => (
  <StorySlide className="slide-eight" labelledBy="slide-title-8">
    <div className="product-intro-copy">
      <p className="story-kicker">pro-food</p>
      <h1 id="slide-title-8">سفارش قبل از<br />پایان تمرین</h1>
      <p>یک راه‌حل سبک برای اینکه سفارش، همان لحظه به آشپزخانه برسد.</p>
    </div>
    <BrowserFrame src={landingImage} alt="صفحهٔ اصلی pro-food برای سفارش غذای باشگاه" className="landing-browser" />
  </StorySlide>
)

const SlideNine = () => (
  <StorySlide className="slide-nine" labelledBy="slide-title-9">
    <div className="payment-copy">
      <p className="story-kicker">تصمیمی برای همین context</p>
      <h1 id="slide-title-9">پرداخت آنلاین؟<br /><em>حذف شد.</em></h1>
      <p>ما همدیگر را می‌شناسیم.<br />پرداخت در پایان انجام می‌شود.</p>
    </div>
    <div className="payment-visual">
      <BrowserFrame src={ordersImage} alt="نمای سفارش‌ها و پرداخت‌ها در pro-food" />
      <span className="payment-strike" aria-hidden="true">درگاه پرداخت</span>
    </div>
  </StorySlide>
)

const SlideTen = () => (
  <StorySlide className="slide-ten" labelledBy="slide-title-10">
    <div className="kitchen-heading">
      <p className="story-kicker">آشپزخانه هم یک کاربر است</p>
      <h1 id="slide-title-10">سفارش‌ها دیده<br />می‌شوند. نیازها هم.</h1>
    </div>
    <div className="kitchen-visual">
      <BrowserFrame src={kitchenImage} alt="پنل کارکنان pro-food شامل سفارش‌ها و آیتم‌های منو" />
      <ul className="kitchen-callouts" aria-label="ارزش‌های پنل کارکنان">
        <li>مدیریت سفارش</li>
        <li>غذاهای محبوب</li>
        <li>نیاز مشتری</li>
      </ul>
    </div>
  </StorySlide>
)

const SlideEleven = () => (
  <StorySlide className="slide-eleven" labelledBy="slide-title-11">
    <p className="result-kicker">نتیجه‌ی واقعی</p>
    <h1 id="slide-title-11">سفارش گم‌شده:<strong>صفر</strong></h1>
    <p>نه یک وعده‌ی بزرگ؛<br />یک مشکل واقعی که دیگر تکرار نمی‌شود.</p>
    <span className="result-mark" aria-hidden="true">✓</span>
  </StorySlide>
)

const SlideTwelve = () => (
  <StorySlide className="slide-twelve" labelledBy="slide-title-12">
    <div className="failure-copy">
      <p className="story-kicker">سریع و ارزان تجربه کن</p>
      <h1 id="slide-title-12">نسخه‌ی اولت باید<br />اجازه داشته باشد<br /><em>شکست بخورد.</em></h1>
    </div>
    <div className="experiment-path" aria-label="کوچک بساز، واقعی امتحان کن، دوباره بساز">
      <span>کوچک بساز</span><i aria-hidden="true" /><span>واقعی امتحان کن</span><i aria-hidden="true" /><span>دوباره بساز</span>
    </div>
  </StorySlide>
)

const SlideThirteen = () => (
  <StorySlide className="slide-thirteen" labelledBy="slide-title-13">
    <div className="slide-thirteen-header">
      <p className="story-kicker">دنبال ایده‌ات برو</p>
      <h1 id="slide-title-13">
        خلق‌کردن برای من سرگرم‌کننده است؛
        <br />
        امیدوارم تو هم مسئله‌ی خودت را بسازی.
      </h1>
      <p className="final-motto">در زندگی بگرد. کوچک شروع کن. منتشر کن.</p>
    </div>

    <div className="destination-cards-grid" aria-label="مسیرهای ارتباطی و دنبال‌کردن محصول و فعالیت‌های امیر">
      {destinations.map((dest) => (
        <a
          key={dest.id}
          href={dest.url}
          target="_blank"
          rel="noreferrer noopener"
          className="glass-link-card destination-card"
          onClick={(e) => e.stopPropagation()}
          aria-label={`${dest.label} (${dest.handle}) - باز شدن در برگه جدید`}
        >
          <div className="dest-card-top">
            <div className="dest-badge">
              <span className="dest-icon-wrap" aria-hidden="true">{dest.icon}</span>
              <span className="dest-label">{dest.label}</span>
            </div>
            <span className="dest-external-indicator" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 17L7 7" />
                <path d="M17 7H7v10" />
              </svg>
            </span>
          </div>

          <div className="dest-card-body">
            <p className="dest-desc">{dest.description}</p>
            <span className="dest-handle" dir="ltr">{dest.handle}</span>
          </div>

          <div className="dest-card-bottom">
            <div className="qr-container">
              {dest.qr}
            </div>
            <span className="qr-hint">اسکن با دوربین گوشی</span>
          </div>
        </a>
      ))}
    </div>
  </StorySlide>
)

const slides = [
  { id: 1, title: 'ساختن دیگه زمان‌بر نیست', durationSeconds: 30, cumulativeSeconds: 30, notes: 'این روزها بیشتر از همیشه کد می‌زنم، اما کمتر از قبل نگران خودِ کدنویسی‌ام. ابزارهای هوش مصنوعی فاصله‌ی بین یک ایده و یک نمونه‌ی قابل استفاده را خیلی کوتاه کرده‌اند. چیزی که ذهن من را درگیر کرده، دیگر این نیست که آیا می‌توانم چیزی را بسازم؛ سؤال مهم این است که چه چیزی بسازیم؟', component: SlideOne },
  { id: 2, title: 'از چطور بسازم؟ به چی بسازم؟', durationSeconds: 35, cumulativeSeconds: 65, notes: 'قبلاً بخش بزرگی از هزینه و زمان یک ایده صرف پیاده‌سازی می‌شد. امروز می‌توانیم با کمک AI در چند ساعت چیزی بسازیم که قبلاً چند روز یا چند هفته زمان می‌خواست. اما سریع‌تر ساختن لزوماً یعنی بهتر ساختن؟ اگر مسئله‌ی درستی انتخاب نکرده باشیم، فقط با سرعت بیشتری چیزی را ساخته‌ایم که کسی به آن نیاز ندارد.', component: SlideTwo },
  { id: 3, title: 'برای پیدا کردن ایده، از پشت میز بلند می‌شوم.', durationSeconds: 35, cumulativeSeconds: 100, notes: 'روشی که این روزها امتحان می‌کنم خیلی ساده است. به‌جای شروع از تکنولوژی یا یک بازار خیلی بزرگ، بیشتر به زندگی روزمره نگاه می‌کنم. آدم‌ها کجا معطل می‌شوند؟ چه کاری را هر روز با اصطکاک انجام می‌دهند؟ چه چیزی آن‌ها را کلافه می‌کند؟ مسئله‌های خوب معمولاً در یک جلسه‌ی ایده‌پردازی پیدا نمی‌شوند؛ باید آن‌ها را از نزدیک زندگی کرد.', component: SlideThree },
  { id: 4, title: 'زندگی ← مسئله ← نمونه ← استفاده ← یادگیری', durationSeconds: 30, cumulativeSeconds: 130, notes: 'چرخه‌ای که برای خودم ساخته‌ام این است: وارد زندگی واقعی شو، یک مسئله‌ی کوچک و مشخص پیدا کن، سبک‌ترین راه‌حل ممکن را بساز و آن را دست آدم واقعی بده. اگر استفاده شد و واقعاً کار کسی را بهتر کرد، آن وقت ارزش دارد زمان بیشتری برای بالغ‌کردنش بگذارم. اگر نه، چیزی یاد گرفته‌ام و سراغ تجربه‌ی بعدی می‌روم.', component: SlideFour },
  { id: 5, title: 'تمرین تمام شد. غذا هنوز شروع نشده بود.', durationSeconds: 40, cumulativeSeconds: 170, notes: 'یکی از همین مسئله‌ها در باشگاه خودمان جلوی چشمم بود. دوستم قبل از تمام‌شدن تمرین غذا سفارش داده بود تا بعد از تمرین آماده باشد. تمرین تمام شد، اما خبری از غذا نبود. بعد از کلی انتظار فهمیدیم آشپز سفارش را فراموش کرده. این فقط یک باگ نرم‌افزاری نبود؛ اصلاً نرم‌افزاری وجود نداشت. یک سفارش شفاهی بین شلوغی باشگاه و آشپزخانه گم شده بود.', component: SlideFive },
  { id: 6, title: 'نسخه‌ی اول را برای همه‌ی باشگاه‌ها ساختم.', durationSeconds: 40, cumulativeSeconds: 210, notes: 'اولین واکنش من همان اشتباه آشنای یک برنامه‌نویس بود: بیایید یک راه‌حل عمومی برای همه‌ی باشگاه‌ها بسازیم. سناریوهای مختلف، نیازهای مختلف و قابلیت‌های زیاد. خیلی زود در contextهای متفاوت و user storyهای بی‌پایان گم شدم. قبل از اینکه یک مسئله را خوب حل کنم، داشتم برای آدم‌هایی که نمی‌شناختم محصول طراحی می‌کردم. نسخه‌ی اول شکست خورد و اتفاقاً لازم بود شکست بخورد.', component: SlideSix },
  { id: 7, title: 'نه همه‌ی باشگاه‌ها؛ همین باشگاه. همین آدم‌ها. همین مسئله.', durationSeconds: 35, cumulativeSeconds: 245, notes: 'شکست نسخه‌ی اول یک چیز مهم یادم داد: صورت مسئله باید مرز داشته باشد. تصمیم گرفتم فعلاً بازار بزرگ، مقیاس و قابلیت‌های آینده را فراموش کنم. فقط مسئله‌ی خودمان در باشگاه خودمان را برای یک گروه کوچک از آدم‌هایی که می‌شناختم حل کنم. اگر این راه‌حل اینجا کار کرد، بعداً فرصت گسترش وجود دارد.', component: SlideSeven },
  { id: 8, title: 'سفارش قبل از پایان تمرین', durationSeconds: 35, cumulativeSeconds: 280, notes: 'نتیجه شد pro-food؛ یک راه‌حل سبک برای سفارش آنلاین غذای باشگاه. ورزشکار قبل از تمام‌شدن تمرین منو را می‌بیند و سفارش می‌دهد. آشپزخانه سفارش را همان لحظه دریافت می‌کند و می‌تواند آن را پیگیری کند. محصول قرار نیست فعلاً همه‌چیز باشد؛ فقط قرار است نگذارد سفارش کسی دوباره فراموش شود.', component: SlideEight },
  { id: 9, title: 'پرداخت آنلاین؟ حذف شد.', durationSeconds: 35, cumulativeSeconds: 315, notes: 'مثلاً پرداخت آنلاین را حذف کردم. چرا؟ چون در این باشگاه آدم‌ها همدیگر را می‌شناسند و به هم اعتماد دارند. پرداخت می‌تواند در پایان انجام شود. اضافه‌کردن درگاه، خطاهای پرداخت و تسویه فقط تجربه‌ی اول را سنگین‌تر می‌کرد. راه‌حل خوب لزوماً راه‌حلی نیست که قابلیت بیشتری دارد؛ راه‌حلی است که دقیقاً به‌اندازه‌ی مسئله ساخته شده.', component: SlideNine },
  { id: 10, title: 'سفارش‌ها دیده می‌شوند. نیازها هم.', durationSeconds: 35, cumulativeSeconds: 350, notes: 'سمت دیگر ماجرا آشپزخانه بود. حالا کارکنان فقط یک لیست شفاف از سفارش‌ها ندارند؛ می‌توانند بفهمند کدام غذاها محبوب‌ترند و مشتری‌ها واقعاً چه می‌خواهند. یک مشکل کوچک عملیاتی کم‌کم به داده‌ای تبدیل شد که تصمیم‌های بعدی آشپزخانه را بهتر می‌کند. اما این ارزش اضافه از همان مسئله‌ی ساده شروع شد، نه از یک داشبورد پر از نمودار.', component: SlideTen },
  { id: 11, title: 'سفارش گم‌شده: صفر', durationSeconds: 30, cumulativeSeconds: 380, notes: 'مهم‌ترین نتیجه برای من یک عدد درآمدی عجیب یا هزاران کاربر نبود. نتیجه این بود که مشکل سفارش‌های گم‌شده کاملاً حل شد. یک گروه کوچک از آدم‌های واقعی از چیزی که ساخته بودم استفاده کردند و کارشان بهتر شد. همین برای ادامه‌دادن یک ایده، سیگنال خیلی باارزش‌تری از حدس و هیجان اولیه است.', component: SlideEleven },
  { id: 12, title: 'نسخه‌ی اولت باید اجازه داشته باشد شکست بخورد.', durationSeconds: 45, cumulativeSeconds: 425, notes: 'برداشت من این نیست که با AI هر ایده‌ای موفق می‌شود. برعکس، حالا می‌توانیم شکست را ارزان‌تر کنیم. نسخه‌ی اول قرار نیست کامل باشد؛ حتی باید اجازه داشته باشد شکست بخورد. هدفش این است که چیزی به ما یاد بدهد که با فکرکردن پشت میز یاد نمی‌گیریم. من این روزها تلاش می‌کنم سریع‌تر و ارزان‌تر تجربه کنم؛ تجربه‌ی ساختن یک SaaS برای خودم، با مسئله‌ای که خودم لمس کرده‌ام و با کمک ابزارهای AI.', component: SlideTwelve },
  { id: 13, title: 'خلق‌کردن برای من سرگرم‌کننده است؛ امیدوارم تو هم مسئله‌ی خودت را بسازی.', durationSeconds: 40, cumulativeSeconds: 465, notes: 'برای من creator بودن قبل از هر چیز سرگرم‌کننده است. pro-food فقط اولین نمونه از این شیوه‌ی زندگی و ساختن است و می‌خواهم تجربه‌ها و پروژه‌های بعدی را هم به اشتراک بگذارم. اگر ایده‌ای داری، منتظر نسخه‌ی کامل یا لحظه‌ی بی‌نقص نمان. در زندگی واقعی دنبالش بگرد، کوچک شروعش کن، آن را دست یک آدم واقعی بده و اجازه بده نتیجه مسیر بعدی را نشانت دهد.', component: SlideThirteen },
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
