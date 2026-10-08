# انتشار GitHub Pages و کنترل کیفیت نهایی

Type: task
Status: open
Blocked by: 01, 02, 03, 04, 05, 06
Spec: `../spec.md`

## هدف

Workflow رسمی GitHub Pages را اضافه کن و تمام معیارهای پذیرش spec را روی build نهایی کنترل کن تا فایل تک‌صفحه‌ای آماده‌ی ضبط و انتشار باشد.

## محدوده

- ایجاد `.github/workflows/deploy-pages.yml`
- trigger روی push شاخه‌ی `main` و `workflow_dispatch`
- permissionهای `contents: read`، `pages: write` و `id-token: write`
- job build با نصب dependencyها از lockfile و اجرای production build
- upload محتوای `dist/` با action رسمی Pages artifact
- job deploy با action رسمی GitHub Pages
- تعریف environment و concurrency مناسب انتشار Pages
- اجرای کنترل کیفیت نهایی روی navigation، notes، motion، تصاویر، لینک‌ها، QRها، accessibility و offline build
- اصلاح فقط defectهایی که مانع برآورده‌شدن spec هستند

## معیارهای پذیرش

- workflow از actionهای رسمی GitHub Pages استفاده کند.
- dependencyها به‌صورت deterministic از lockfile نصب شوند.
- artifact منتشرشده شامل `dist/index.html` تک‌فایلی باشد.
- workflow به نام repository یا subpath ثابت وابسته نباشد.
- `npm run build` در محیط تمیز موفق باشد.
- `dist/index.html` با `file://` و حالت Offline کامل کار کند.
- ارائه دقیقاً ۱۳ اسلاید و زمان کل ۷ دقیقه و ۴۵ ثانیه داشته باشد.
- فقط ArrowLeft/ArrowRight اسلایدها را جابه‌جا و فقط `N` notes را toggle کند.
- سه تصویر در جای درست و بدون distortion نمایش داده شوند.
- چهار لینک صحیح و چهار QR قابل اسکن باشند.
- در ۱۹۲۰×۱۰۸۰ و ۱۲۸۰×۷۲۰ هیچ overflow، crop یا هم‌پوشانی ناخواسته وجود نداشته باشد.
- reduced motion، focus states، `aria-live`، altها و contrast قابل قبول باشند.
- console در flow عادی خطا نداشته باشد و runtime request خارجی ضروری ثبت نشود.

## راستی‌آزمایی

- نصب dependencyها با روش lockfile و اجرای `npm run build`
- بازکردن مستقیم build در حالت Offline
- پیمایش کامل رفت و برگشت ارائه با کیبورد
- بازبینی همه‌ی speaker notes و زمان‌های تجمعی
- تست viewport در ۱۹۲۰×۱۰۸۰، ۱۲۸۰×۷۲۰ و یک موبایل باریک
- تست reduced motion و keyboard-only navigation
- validate کردن syntax فایل workflow و، پس از push، مشاهده‌ی نتیجه‌ی GitHub Actions

## Comments
