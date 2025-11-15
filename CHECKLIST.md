# Development Checklist

## ✅ Project Setup
- [x] Initialize project with Vite + React + TypeScript
- [x] Setup folder structure
- [x] Create TypeScript types and interfaces
- [x] Create environment configuration
- [ ] Install additional dependencies (if needed)

## 📦 Shared Components
- [ ] Button component with variants and states
- [ ] Input component with validation display
- [ ] Modal component with overlay
- [ ] Select component with options
- [ ] Badge component for status display
- [ ] Table component with sorting
- [ ] Pagination component
- [ ] Notification/Toast component

## 👨‍💼 Admin Features

### Job Management
- [ ] Job List page with grid/card layout
- [ ] Job Card component with status badge
- [ ] Create Job Modal/Page
- [ ] Job Form with all fields (title, description, etc.)
- [ ] Job Form Configuration component (mandatory/optional/off)
- [ ] Edit Job functionality
- [ ] Delete Job with confirmation
- [ ] Job filtering by status
- [ ] Job search functionality
- [ ] Job sorting options

### Candidate Management
- [ ] Candidate Table component
- [ ] Resizable columns implementation
- [ ] Reorderable columns (drag & drop)
- [ ] Column sorting
- [ ] Candidate filtering
- [ ] Candidate search
- [ ] Pagination for candidates
- [ ] View candidate detail modal
- [ ] Update application status
- [ ] Export candidates to CSV (optional)

## 👩‍💻 Applicant Features

### Job Browsing
- [ ] Job List page for applicants
- [ ] Job Card component for applicants
- [ ] Job Detail page
- [ ] Job filtering and search
- [ ] Active jobs only filter

### Application Process
- [ ] Application Form page
- [ ] Dynamic form field rendering
- [ ] Form validation based on configuration
- [ ] File upload for resume
- [ ] Webcam capture component
- [ ] Hand gesture detection (1, 2, 3 fingers)
- [ ] Auto-capture after gesture sequence
- [ ] Image preview and retake
- [ ] Profile picture requirement (intern vs full-time)
- [ ] Form submission
- [ ] Success/Error feedback
- [ ] Application confirmation page

## 🔐 Authentication
- [ ] Auth Context implementation
- [ ] Login page
- [ ] Register page
- [ ] Role selection (Admin/Applicant)
- [ ] Protected routes
- [ ] Logout functionality
- [ ] Session persistence

## 🗄️ Data Management

### API/Storage
- [ ] API client setup
- [ ] Job Service implementation
- [ ] Application Service implementation
- [ ] Auth Service implementation
- [ ] Storage Service (LocalStorage or Supabase)
- [ ] Error handling
- [ ] Loading states

### State Management
- [ ] useAuth hook
- [ ] useJobs hook
- [ ] useApplications hook
- [ ] useWebcam hook
- [ ] useHandGesture hook
- [ ] useTable hook

## 🎨 UI/UX
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading indicators
- [ ] Empty states
- [ ] Error states
- [ ] Confirmation dialogs
- [ ] Notification system
- [ ] Toast messages
- [ ] Accessibility (ARIA labels, keyboard navigation)

## 🧪 Testing & Quality
- [ ] Form validation testing
- [ ] Error handling testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Gesture detection testing
- [ ] File upload testing

## 🚀 Deployment
- [ ] Environment variables configuration
- [ ] Build optimization
- [ ] Production build testing
- [ ] Deployment to hosting (Vercel/Netlify/etc.)
- [ ] Supabase setup (if using)

## 📝 Documentation
- [x] README.md with setup instructions
- [x] API specification
- [x] Component structure guide
- [x] Implementation guide
- [ ] User guide (optional)

## 🎯 Optional Enhancements
- [ ] Dark mode
- [ ] Email notifications
- [ ] Advanced filtering
- [ ] Analytics dashboard
- [ ] Bulk actions
- [ ] Interview scheduling
- [ ] Resume parsing
- [ ] Application timeline
- [ ] Candidate notes
- [ ] Team collaboration features

## 🐛 Known Issues / TODO
- [ ] Fix TypeScript path alias issues
- [ ] Fix ESLint warnings
- [ ] Optimize hand gesture detection performance
- [ ] Add retry logic for failed API calls
- [ ] Improve error messages

---

## Development Phases

### Phase 1: Foundation (Week 1)
- Setup & configuration
- Shared components
- Basic routing
- Authentication

### Phase 2: Admin Core (Week 2)
- Job management CRUD
- Job form configuration
- Basic candidate list

### Phase 3: Applicant Core (Week 3)
- Job browsing
- Application form
- Dynamic form rendering
- Basic submission

### Phase 4: Advanced Features (Week 4)
- Candidate table (resize/reorder)
- Webcam & gesture detection
- File uploads
- Notifications

### Phase 5: Polish (Week 5)
- UI/UX improvements
- Error handling
- Testing
- Documentation
- Deployment

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Notes
- Prioritaskan fitur mandatory terlebih dahulu
- Test setiap fitur sebelum lanjut ke fitur berikutnya
- Commit changes secara berkala
- Buat branch untuk setiap fitur besar
