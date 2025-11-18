# Setup Users untuk Login

Karena tabel `auth.users` adalah tabel internal Supabase, kita perlu membuat user melalui Supabase Dashboard.

## 🔧 Cara Setup Users:

### **Method 1: Supabase Dashboard (Recommended)**

1. **Buka Supabase Dashboard** → Authentication → Users
2. **Klik "Add User"**
3. **Buat 2 users:**

   **Admin User:**
   - Email: `admin@rakamin.com`
   - Password: `admin123`
   - Email Confirm: ✅ (centang)

   **Applicant User:**
   - Email: `john.doe@example.com`
   - Password: `user123`
   - Email Confirm: ✅ (centang)

### **Method 2: Menggunakan Register di Aplikasi**

1. **Jalankan aplikasi** (`npm run dev`)
2. **Buat akun baru** melalui fitur register
3. **Login** dengan akun yang dibuat

## 🔐 Credentials untuk Testing:

Setelah setup, gunakan:

**Admin:**
- Email: `admin@rakamin.com`
- Password: `admin123`

**Applicant:**
- Email: `john.doe@example.com`
- Password: `user123`

## 📝 Catatan:

- Tabel `users` di database hanya untuk menyimpan profil user
- Authentication dikelola oleh Supabase Auth secara terpisah
- ID user di `auth.users` akan berbeda dengan ID di tabel `users` kita
- Aplikasi akan otomatis membuat profil di tabel `users` saat register

## ✅ Verifikasi:

Setelah setup, cek di:
- **Authentication → Users**: Harus ada 2 users
- **Table Editor → users**: Data profil user
- **Login di aplikasi**: Harus bisa login dengan credentials di atas