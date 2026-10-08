# پیاده‌سازی سیستم بصری فارسی و حرکت اسلایدها

Type: task
Status: open
Blocked by: 02
Spec: `../spec.md`

## هدف

زبان بصری مینیمال و روشن ارائه را بر اساس `DESIGN.md` پیاده‌سازی کن و حرکت را به انتقال جهت‌دار و هدفمند محدود کن.

## محدوده

- تعریف CSS custom properties برای Forest Ink، Lime Voltage، Linen Mist، Fog، Charcoal و Paper
- استفاده‌ی کامل از Vazirmatn با وزن‌های مناسب متن و تیتر
- ساخت type scale واکنش‌گرا با `clamp()` و خوانایی حداقل ۷۲۰p
- ایجاد primitiveهای محدود مورد نیاز: slide surface، display heading، browser/product frame، pill/tag و glass link card
- استفاده‌ی غالب از زمینه‌های روشن و حداکثر دو اسلاید تیره
- تعریف موتیف cursor سبز برای استفاده‌ی محدود در روایت
- transition افقی ۴۵۰ تا ۶۵۰ میلی‌ثانیه متناسب با جهت کلید، بدون fade عمومی
- جلوگیری از ناهماهنگی state و جهت در فشردن سریع کلیدها
- اجرای sequence هر اسلاید فقط هنگام ورود آن
- پشتیبانی کامل از `prefers-reduced-motion: reduce`
- focus state واضح و contrast حداقل WCAG AA

## محدودیت‌های طراحی

- گرادیان تزئینی استفاده نشود.
- glass card فقط برای لینک‌های اسلاید پایانی آماده شود.
- از grid کارت‌های هم‌شکل، شماره‌گذاری تزئینی اسلایدها و chrome رایج templateهای SaaS پرهیز شود.
- تنها دیاگرام اصلی، مسیر «زندگی تا یادگیری» باشد.
- حرکت خودکار فقط برای sequence هدفمند ورود هر اسلاید مجاز است.

## خارج از محدوده

- قرار دادن متن نهایی تمام اسلایدها
- ساخت QR Codeها
- انتشار GitHub Pages

## معیارهای پذیرش

- theme با tokens ثبت‌شده در spec و `DESIGN.md` هم‌خوان باشد.
- متن ضروری در خروجی ۱۹۲۰×۱۰۸۰ کوچک‌تر از ۱۸ پیکسل نباشد.
- هیچ محتوایی در ۱۲۸۰×۷۲۰ از stage بیرون نزند.
- transition رو به جلو و عقب جهت درست داشته باشد.
- rapid navigation به index یا DOM ناسازگار منجر نشود.
- در reduced motion جابه‌جایی فوری و sequenceهای غیرضروری غیرفعال شوند.
- focus لینک‌ها و دکمه‌ها واضح باشد.
- اسلایدها از نظر ظاهر یک ارائه‌ی اختصاصی داستانی باشند، نه dashboard یا landing page عمومی.

## راستی‌آزمایی

- بررسی دستی theme در ۱۹۲۰×۱۰۸۰ و ۱۲۸۰×۷۲۰
- چند بار فشردن سریع ArrowLeft و ArrowRight
- فعال‌کردن reduced motion در DevTools یا سیستم‌عامل
- بررسی keyboard focus و contrast اجزای اصلی

## Comments
