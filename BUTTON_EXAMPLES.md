# 🎨 Button Component - Panduan Penggunaan

## Warna Tombol Sesuai Desain

### 1️⃣ **Primary Button** (#01959F - Teal)
```tsx
<Button variant="primary" className="px-6 py-3">
  Submit Application
</Button>

// States:
// Normal: bg #01959F
// Hover: bg #01777F  
// Pressed: bg #01595F
// Focus: ring dengan opacity 20%
```

### 2️⃣ **Alternative Button** (#FBC037 - Yellow)
```tsx
<Button variant="alternative" className="px-6 py-3">
  Save as Draft
</Button>

// States:
// Normal: bg #FBC037
// Hover: bg #F8A92F
// Pressed: bg #FA9810
// Focus: ring dengan opacity 20%
```

### 3️⃣ **Outline Button** (#FFFFFF - White with border)
```tsx
<Button variant="outline" className="px-6 py-3">
  Cancel
</Button>

// States:
// Normal: white bg, #01959F border
// Hover: #F3FBFC bg
// Pressed: #40B5C0 bg dengan opacity
// Focus: ring dengan opacity 20%
```

---

## 📏 Ukuran Custom (Sesuai Desain Anda)

Karena desain Anda memiliki ukuran berbeda-beda, gunakan `className` untuk custom:

```tsx
// Button kecil
<Button variant="primary" className="w-24 h-10 text-sm">
  Login
</Button>

// Button sedang
<Button variant="primary" className="w-40 h-12 text-base">
  Submit
</Button>

// Button besar
<Button variant="primary" className="w-full h-14 text-lg font-semibold">
  Apply Now
</Button>

// Button dengan padding custom
<Button variant="outline" className="px-8 py-3 text-base">
  View Details
</Button>

// Button icon + text
<Button variant="alternative" className="px-6 py-2.5 gap-2">
  <IconDownload className="w-5 h-5" />
  Download
</Button>
```

---

## 🎨 Menggunakan Color Palette di Component Lain

### Neutral Colors
```tsx
// Background
className="bg-neutral-10"  // White
className="bg-neutral-20"  // Hover background
className="bg-neutral-30"  // Disabled background

// Text
className="text-neutral-100" // Heading
className="text-neutral-90"  // Paragraph
className="text-neutral-80"  // Placeholder
className="text-neutral-70"  // Helper text
className="text-neutral-60"  // Disabled text

// Border
className="border border-neutral-40" // Default border
className="border border-neutral-50" // Alternative border
```

### Semantic Colors
```tsx
// Success (Green #43936C)
<Badge className="bg-success-surface text-success-main border border-success-border">
  Approved
</Badge>

// Danger (Red #E01428)
<Button variant="primary" className="bg-danger-main hover:bg-danger-hover">
  Delete
</Button>

// Warning (Orange #CA7336)
<Alert className="bg-warning-surface border-l-4 border-warning-main">
  Warning message
</Alert>
```

---

## 📖 Contoh Implementasi Real

### Form Submit Buttons
```tsx
<div className="flex gap-3">
  <Button 
    variant="outline" 
    className="w-32 h-11"
    onClick={onCancel}
  >
    Cancel
  </Button>
  
  <Button 
    variant="primary" 
    className="w-48 h-11 font-semibold"
    type="submit"
    loading={isSubmitting}
  >
    Submit Application
  </Button>
</div>
```

### Card Actions
```tsx
<div className="flex justify-between items-center">
  <Button variant="outline" className="px-4 py-2 text-sm">
    View Details
  </Button>
  
  <Button variant="alternative" className="px-6 py-2 text-sm font-medium">
    Apply Now
  </Button>
</div>
```

### Full Width Button
```tsx
<Button 
  variant="primary" 
  className="w-full h-12 text-base font-semibold"
>
  Sign In
</Button>
```

### Disabled State
```tsx
<Button 
  variant="primary" 
  className="px-6 py-3"
  disabled
>
  Not Available
</Button>

// Otomatis jadi:
// - bg: #EDEDED (neutral-30)
// - text: #9E9E9E (neutral-60)
// - cursor: not-allowed
// - opacity: 50%
```

### Loading State
```tsx
<Button 
  variant="primary" 
  className="w-40 h-12"
  loading={isLoading}
>
  Processing...
</Button>

// Otomatis tampilkan spinner animasi
```

---

## 🎨 Tailwind Classes yang Sering Dipakai

### Width (Lebar)
```tsx
w-20   // 80px
w-24   // 96px
w-32   // 128px
w-40   // 160px
w-48   // 192px
w-64   // 256px
w-full // 100%
```

### Height (Tinggi)
```tsx
h-8    // 32px
h-10   // 40px
h-11   // 44px
h-12   // 48px
h-14   // 56px
h-16   // 64px
```

### Padding
```tsx
px-4 py-2    // 16px horizontal, 8px vertical
px-6 py-3    // 24px horizontal, 12px vertical
px-8 py-4    // 32px horizontal, 16px vertical
```

### Font Size & Weight
```tsx
text-xs   // 12px
text-sm   // 14px
text-base // 16px
text-lg   // 18px
text-xl   // 20px

font-normal    // 400
font-medium    // 500
font-semibold  // 600
font-bold      // 700
```

### Spacing (Gap, Margin)
```tsx
gap-2  // 8px
gap-3  // 12px
gap-4  // 16px

mt-4   // margin-top 16px
mb-6   // margin-bottom 24px
mx-auto // margin horizontal auto (center)
```

---

## ✅ Best Practices

1. **Gunakan variant untuk warna**: `variant="primary"`, `variant="alternative"`, `variant="outline"`
2. **Gunakan className untuk ukuran**: Karena setiap button ukurannya beda
3. **Konsisten dengan spacing**: Gunakan Tailwind spacing scale (4, 6, 8, dll)
4. **Disabled state otomatis**: Cukup tambah `disabled` prop
5. **Loading state**: Tambah `loading` prop untuk spinner

---

## 🚀 Tips Coding

```tsx
// ✅ GOOD - Fleksibel
<Button variant="primary" className="w-48 h-12 text-base font-semibold">
  Submit
</Button>

// ❌ BAD - Hardcode style
<Button style={{ width: '192px', height: '48px', fontSize: '16px' }}>
  Submit
</Button>

// ✅ GOOD - Reusable pattern
const SubmitButton = ({ children, ...props }) => (
  <Button variant="primary" className="w-full h-12 font-semibold" {...props}>
    {children}
  </Button>
);

// Pakai:
<SubmitButton loading={isLoading}>Submit Application</SubmitButton>
```

Happy coding! 🎉
