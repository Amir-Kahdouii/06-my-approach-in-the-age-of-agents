# راه‌اندازی React/Vite و خروجی تک‌فایل آفلاین

Type: task
Status: complete
Blocked by: none
Spec: `../spec.md`

## هدف

زیرساخت پروژه را به‌گونه‌ای آماده کن که توسعه با React/Vite انجام شود و build نهایی تنها یک فایل مستقل `dist/index.html` تولید کند.

## محدوده

- ایجاد پروژه‌ی React/Vite در ریشه‌ی repository بدون حذف فایل‌های موجود
- تعریف scriptهای حداقل `dev` و `build`
- پیکربندی base و asset handling سازگار با اجرای مستقیم `file://` و subpathهای GitHub Pages
- افزودن و پیکربندی plugin تک‌فایل Vite
- افزودن Vazirmatn به‌صورت dependency یا asset محلی و اطمینان از inline شدن آن در build
- آماده‌کردن ورودی React، reset پایه و metadata فارسی سند
- فراهم‌کردن روشی برای inline شدن سه تصویر موجود در خروجی
- عدم وابستگی runtime به CDN، API یا فونت آنلاین

## خارج از محدوده

- ساخت محتوای ۱۳ اسلاید
- ناوبری، speaker notes و fullscreen
- QR Code و کارت‌های شبکه‌های اجتماعی
- Workflow انتشار

## معیارهای پذیرش

- `npm install` یک lockfile ایجاد یا به‌روزرسانی کند.
- `npm run dev` یک صفحه‌ی React فارسی با `lang="fa"` و `dir="rtl"` نمایش دهد.
- `npm run build` بدون خطا اجرا شود.
- `dist/` برای اجرای ارائه فقط شامل `index.html` باشد.
- `dist/index.html` با `file://` و بدون اینترنت باز شود و JavaScript، CSS و Vazirmatn فعال باشند.
- هیچ درخواست ضروری شبکه در runtime انجام نشود.
- فایل‌های فعلی `image.png`، `image (1).png` و `image (2).png` حذف یا overwrite نشوند.

## راستی‌آزمایی

- اجرای `npm run build`
- بررسی محتوای `dist/`
- بازکردن مستقیم `dist/index.html`
- بررسی Network مرورگر در حالت Offline

## Comments

- پیاده‌سازی در commit `24b4809` انجام شد. `npm run build` با موفقیت اجرا شد و
  `dist/` فقط شامل `index.html` است؛ JavaScript، CSS، Vazirmatn و هر سه تصویر به
  خروجی inline شده‌اند. بازشدن مستقیم با `file://` در Chrome نیز بررسی شد.
