# 🎨 Color Palette - Hiring Management App

## Cara Menggunakan Warna di Tailwind

Semua warna sudah dikonfigurasi di `tailwind.config.js`. Anda tinggal pakai sebagai Tailwind classes:

---

## 🎨 Neutral Colors (Gray Scale)

| Style Name | Hex Code | Tailwind Class | Penggunaan |
|------------|----------|----------------|------------|
| Neutral / 10 | #FFFFFF | `bg-neutral-10` `text-neutral-10` | White background, white text |
| Neutral / 20 | #FAFAFA | `bg-neutral-20` | Hover background, secondary background |
| Neutral / 30 | #EDEDED | `bg-neutral-30` | Pressed background, disabled background |
| Neutral / 40 | #E0E0E0 | `border-neutral-40` | Default border, stroke, divider |
| Neutral / 50 | #C2C2C2 | `border-neutral-50` | Border, stroke, divider |
| Neutral / 60 | #9E9E9E | `text-neutral-60` | Disabled text |
| Neutral / 70 | #757575 | `text-neutral-70` | Helper text, subtitle |
| Neutral / 80 | #616161 | `text-neutral-80` | Placeholder, table title, caption |
| Neutral / 90 | #404040 | `text-neutral-90` | Paragraph, enabled text, dark background |
| Neutral / 100 | #1D1F20 | `text-neutral-100` | Heading, main text, selected text |

### Contoh Penggunaan:
```tsx
// Background
<div className="bg-neutral-10">White background</div>
<div className="bg-neutral-20 hover:bg-neutral-30">Hover effect</div>

// Text
<h1 className="text-neutral-100 font-bold">Heading</h1>
<p className="text-neutral-90">Paragraph text</p>
<span className="text-neutral-70">Helper text</span>
<input placeholder="..." className="placeholder:text-neutral-80" />

// Border & Divider
<div className="border border-neutral-40">Default border</div>
<hr className="border-neutral-40" />
```

---

## 🔵 Primary Colors (Teal/Cyan)

| Style Name | Hex Code | Tailwind Class | State |
|------------|----------|----------------|-------|
| Primary / Main | #01959F | `bg-primary-main` `text-primary-main` | Default |
| Primary / Surface | #F3FBFC | `bg-primary-surface` | Light background |
| Primary / Border | #40B5C0 | `border-primary-border` | Border color |
| Primary / Hover | #01777F | `hover:bg-primary-hover` | Hover state |
| Primary / Pressed | #01595F | `active:bg-primary-pressed` | Active/pressed |
| Primary / Focus | #01959F (20%) | `focus:ring-primary-focus` | Focus ring |

### Contoh Penggunaan:
```tsx
// Button Primary
<button className="bg-primary-main hover:bg-primary-hover active:bg-primary-pressed text-white">
  Primary Button
</button>

// Badge with primary color
<span className="bg-primary-surface text-primary-main border border-primary-border px-3 py-1 rounded">
  Active
</span>

// Link dengan primary color
<a href="#" className="text-primary-main hover:text-primary-hover underline">
  View Details
</a>

// Card dengan primary accent
<div className="bg-white border-l-4 border-primary-main p-4">
  Highlighted card
</div>
```

---

## 🟡 Secondary Colors (Yellow/Orange)

| Style Name | Hex Code | Tailwind Class | State |
|------------|----------|----------------|-------|
| Secondary / Main | #FBC037 | `bg-secondary-main` | Default |
| Secondary / Surface | #FFFCF5 | `bg-secondary-surface` | Light background |
| Secondary / Border | #FEEABC | `border-secondary-border` | Border color |
| Secondary / Hover | #F8A92F | `hover:bg-secondary-hover` | Hover state |
| Secondary / Pressed | #FA9810 | `active:bg-secondary-pressed` | Active/pressed |
| Secondary / Focus | #FBC037 (20%) | `focus:ring-secondary-focus` | Focus ring |

### Contoh Penggunaan:
```tsx
// Alternative Button
<button className="bg-secondary-main hover:bg-secondary-hover text-neutral-100">
  Save as Draft
</button>

// Warning Badge
<span className="bg-secondary-surface text-secondary-main border border-secondary-border px-3 py-1 rounded">
  Pending Review
</span>

// Highlight text
<div className="bg-secondary-surface border-l-4 border-secondary-main p-4">
  <p className="text-neutral-90">Important notice</p>
</div>
```

---

## 🔴 Danger Colors (Red)

| Style Name | Hex Code | Tailwind Class | State |
|------------|----------|----------------|-------|
| Danger / Main | #E01428 | `bg-danger-main` | Default |
| Danger / Surface | #FFF9FA | `bg-danger-surface` | Light background |
| Danger / Border | #F5B1B7 | `border-danger-border` | Border color |
| Danger / Hover | #BC1121 | `hover:bg-danger-hover` | Hover state |
| Danger / Pressed | #700A14 | `active:bg-danger-pressed` | Active/pressed |
| Danger / Focus | #E01428 (20%) | `focus:ring-danger-focus` | Focus ring |

### Contoh Penggunaan:
```tsx
// Delete Button
<button className="bg-danger-main hover:bg-danger-hover text-white px-4 py-2 rounded">
  Delete
</button>

// Error Message
<div className="bg-danger-surface border-l-4 border-danger-main p-4">
  <p className="text-danger-main font-medium">Error occurred!</p>
  <p className="text-neutral-90 text-sm">Please check your input.</p>
</div>

// Rejected Badge
<span className="bg-danger-surface text-danger-main border border-danger-border px-3 py-1 rounded">
  Rejected
</span>

// Error Input
<input className="border-2 border-danger-main focus:ring-2 focus:ring-danger-focus" />
<p className="text-danger-main text-sm mt-1">This field is required</p>
```

---

## 🟠 Warning Colors (Orange)

| Style Name | Hex Code | Tailwind Class | State |
|------------|----------|----------------|-------|
| Warning / Main | #CA7336 | `bg-warning-main` | Default |
| Warning / Surface | #FCF7F3 | `bg-warning-surface` | Light background |
| Warning / Border | #FEB17B | `border-warning-border` | Border color |
| Warning / Hover | #B1652F | `hover:bg-warning-hover` | Hover state |
| Warning / Pressed | #985628 | `active:bg-warning-pressed` | Active/pressed |
| Warning / Focus | #CA7336 (20%) | `focus:ring-warning-focus` | Focus ring |

### Contoh Penggunaan:
```tsx
// Warning Alert
<div className="bg-warning-surface border-l-4 border-warning-main p-4">
  <p className="text-warning-main font-medium">⚠️ Warning</p>
  <p className="text-neutral-90 text-sm">Your session will expire soon.</p>
</div>

// Warning Button
<button className="bg-warning-main hover:bg-warning-hover text-white px-4 py-2 rounded">
  Proceed with Caution
</button>

// Pending Badge
<span className="bg-warning-surface text-warning-main border border-warning-border px-3 py-1 rounded">
  Under Review
</span>
```

---

## 🟢 Success Colors (Green)

| Style Name | Hex Code | Tailwind Class | State |
|------------|----------|----------------|-------|
| Success / Main | #43936C | `bg-success-main` | Default |
| Success / Surface | #F7F7F7 | `bg-success-surface` | Light background |
| Success / Border | #BBDCCA | `border-success-border` | Border color |
| Success / Hover | #367A59 | `hover:bg-success-hover` | Hover state |
| Success / Pressed | #20573D | `active:bg-success-pressed` | Active/pressed |
| Success / Focus | #43936C (20%) | `focus:ring-success-focus` | Focus ring |

### Contoh Penggunaan:
```tsx
// Success Message
<div className="bg-success-surface border-l-4 border-success-main p-4">
  <p className="text-success-main font-medium">✓ Success!</p>
  <p className="text-neutral-90 text-sm">Your application has been submitted.</p>
</div>

// Approved Badge
<span className="bg-success-surface text-success-main border border-success-border px-3 py-1 rounded">
  Approved
</span>

// Success Button
<button className="bg-success-main hover:bg-success-hover text-white px-4 py-2 rounded">
  Confirm
</button>
```

---

## 🎯 Panduan Pemilihan Warna

### Buttons
- **Primary action**: `primary-main` (#01959F - Teal)
- **Secondary action**: `secondary-main` (#FBC037 - Yellow)
- **Destructive action**: `danger-main` (#E01428 - Red)
- **Outline/Ghost**: `outline` with `primary-main` border

### Status Badges
- **Active/Approved**: `success-main` (#43936C - Green)
- **Pending/Draft**: `secondary-main` (#FBC037 - Yellow)
- **Rejected/Error**: `danger-main` (#E01428 - Red)
- **Warning**: `warning-main` (#CA7336 - Orange)
- **Inactive**: `neutral-60` (#9E9E9E - Gray)

### Text Hierarchy
- **Heading**: `text-neutral-100` (#1D1F20 - Darkest)
- **Body**: `text-neutral-90` (#404040)
- **Caption**: `text-neutral-80` (#616161)
- **Helper**: `text-neutral-70` (#757575)
- **Disabled**: `text-neutral-60` (#9E9E9E)

### Backgrounds
- **Primary**: `bg-neutral-10` (#FFFFFF - White)
- **Secondary**: `bg-neutral-20` (#FAFAFA)
- **Hover**: `bg-neutral-20` → `bg-neutral-30`
- **Disabled**: `bg-neutral-30` (#EDEDED)

### Borders
- **Default**: `border-neutral-40` (#E0E0E0)
- **Focus**: Use semantic `border-{color}-main`
- **Divider**: `border-neutral-40` or `border-neutral-50`

---

## 💡 Tips Accessibility

```tsx
// ✅ GOOD - Kontras tinggi
<button className="bg-primary-main text-white">Good contrast</button>

// ❌ BAD - Kontras rendah
<button className="bg-neutral-20 text-neutral-40">Poor contrast</button>

// ✅ GOOD - Focus visible
<input className="border-neutral-40 focus:ring-2 focus:ring-primary-focus focus:border-primary-main" />

// ✅ GOOD - Disabled state jelas
<button disabled className="bg-neutral-30 text-neutral-60 cursor-not-allowed">
  Disabled
</button>
```

---

## 🚀 Quick Reference

### Background Colors
```tsx
bg-neutral-{10|20|30|40|50|60|70|80|90|100}
bg-primary-{main|surface|border|hover|pressed}
bg-secondary-{main|surface|border|hover|pressed}
bg-danger-{main|surface|border|hover|pressed}
bg-warning-{main|surface|border|hover|pressed}
bg-success-{main|surface|border|hover|pressed}
```

### Text Colors
```tsx
text-neutral-{10|20|30|40|50|60|70|80|90|100}
text-primary-{main|hover|pressed}
text-secondary-{main|hover|pressed}
text-danger-{main|hover|pressed}
text-warning-{main|hover|pressed}
text-success-{main|hover|pressed}
```

### Border Colors
```tsx
border-neutral-{10|20|30|40|50|60|70|80|90|100}
border-primary-{main|border}
border-secondary-{main|border}
border-danger-{main|border}
border-warning-{main|border}
border-success-{main|border}
```

Happy coding! 🎨
