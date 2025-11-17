import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { WebcamCapture } from '@/components/applicant/WebcamCapture';
import CustomCalendar from '@/components/shared/CustomCalendar';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { getJobById } from '@/data/dummyData';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';
import type { ApplicationData, Gender } from '@/types';

const genderOptions = [
  { label: "He/him (Male)", value: "male" },
  { label: "She/her (Female)", value: "female" },
];

const domicileOptions = [
  { label: "Kabupaten Aceh Barat - Aceh", value: "aceh-barat" },
  { label: "Kota Jakarta Pusat - DKI Jakarta", value: "jakarta-pusat" },
  { label: "Kota Bandung - Jawa Barat", value: "bandung" },
  { label: "Kota Surabaya - Jawa Timur", value: "surabaya" },
  { label: "Kota Medan - Sumatera Utara", value: "medan" },
  { label: "Kota Semarang - Jawa Tengah", value: "semarang" },
  { label: "Kota Yogyakarta - DI Yogyakarta", value: "yogyakarta" },
];

export const Resume: React.FC = function Resume() {
  // Country data for phone input
  const countryList = [
    { name: 'Indonesia', code: '+62', flag: 'https://flagcdn.com/id.svg' },
    { name: 'Palestine', code: '+62', flag: 'https://flagcdn.com/ps.svg' },
    { name: 'Poland', code: '+62', flag: 'https://flagcdn.com/pl.svg' },
    { name: 'Portugal', code: '+62', flag: 'https://flagcdn.com/pt.svg' },
    { name: 'Puerto Rico', code: '+62', flag: 'https://flagcdn.com/pr.svg' },
    // Add more countries as needed
  ];

  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const filteredCountries = countryList.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch)
  );
  // Ref for dropdown to detect outside click
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showCountryDropdown &&
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);
  const inputRefs: Record<string, React.RefObject<HTMLInputElement | HTMLDivElement | null>> = {
    fullName: useRef<HTMLInputElement | HTMLDivElement | null>(null),
    email: useRef<HTMLInputElement | HTMLDivElement | null>(null),
    phone: useRef<HTMLInputElement | HTMLDivElement | null>(null),
    dateOfBirth: useRef<HTMLInputElement | HTMLDivElement | null>(null),
    domicile: useRef<HTMLInputElement | HTMLDivElement | null>(null),
    linkedin: useRef<HTMLInputElement | HTMLDivElement | null>(null),
  };
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const job = jobId ? getJobById(jobId) : null;
  
  const [formData, setFormData] = useState<ApplicationData>({
    fullName: '',
    email: user?.email || '',
    phone: '',
    gender: undefined,
    dateOfBirth: undefined,
    linkedin: '',
    domicile: '',
    profilePicture: '',
  });
  const [showWebcam, setShowWebcam] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ApplicationData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSelectChange = (field: keyof ApplicationData) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoCapture = (photo: string) => {
    setFormData(prev => ({ ...prev, profilePicture: photo }));
    setShowWebcam(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.phone && !formData.phone.match(/^8[1-9][0-9]{8,11}$/)) {
      newErrors.phone = 'Invalid phone format (example: 81234567890)';
    }
    
    if (formData.linkedin && !formData.linkedin.match(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/)) {
      newErrors.linkedin = 'Invalid LinkedIn URL format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      // Define field order to scroll to topmost error
      const fieldOrder = ['fullName', 'dateOfBirth', 'domicile', 'phone', 'email', 'linkedin'];
      const errorKeys = Object.keys(errors);
      
      // Find first error field in order
      const firstErrorField = fieldOrder.find(field => errorKeys.includes(field));
      
      if (firstErrorField && inputRefs[firstErrorField]?.current) {
        inputRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if ('focus' in inputRefs[firstErrorField].current) {
          (inputRefs[firstErrorField].current as HTMLInputElement | HTMLDivElement).focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    try {
      // TODO: Submit application to API
      console.log('Application submitted:', formData);
      addNotification({
        type: 'success',
        title: 'Application Submitted',
        message: 'Your application has been submitted successfully!'
      });
      navigate('/applicant');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-neutral-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-90 mb-2">Job Not Found</h2>
          <Button onClick={() => navigate('/applicant')}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-20 flex flex-col">
      {/* Main Content - Scrollable */}
      <div className="flex-1 flex justify-center px-6 py-8 pb-20">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm">
          {/* Form Content */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <button 
                  onClick={() => navigate('/applicant')}
                  className="p-2 hover:bg-neutral-30 border-2 border-neutral-30 rounded-lg transition-colors"
                >
                  <IoArrowBackOutline className="w-5 h-5 text-neutral-90" />
                </button>
                <h1 className="text-xl font-semibold text-neutral-90">
                  Apply {job.title} at {job.companyName}
                </h1>
              </div>
              <p className="text-danger-main font-semibold text-sm ml-11">
                * Required
              </p>
            </div>

            <div className="space-y-6 px-11">
              {/* Profile Picture */}
              <div className="flex flex-col items-start space-y-4">
                <label className="block text-sm font-medium text-neutral-90">
                  Profile Picture
                </label>
                <div className="w-32 h-32 rounded-full bg-neutral-30 flex items-center justify-center overflow-hidden -mt-2">
                  {formData.profilePicture ? (
                    <img 
                      src={formData.profilePicture} 
                      alt="Profile" 
                      className="object-cover w-32 h-32" 
                    />
                  ) : (
                    <span className="text-neutral-60">No Photo</span>
                  )}
                </div>
                <Button 
                  type="button" 
                  variant="neutral" 
                  onClick={() => setShowWebcam(true)}
                  className="w-36 h-8 flex items-center gap-2 border-2 border-neutral-40 rounded-lg"
                >
                  <MdOutlineFileUpload className="w-4 h-4" />
                  Take a Picture
                </Button>
              </div>

              {/* Full Name */}
              <div ref={inputRefs.fullName}>
                <Input
                  label="Full Name"
                  value={formData.fullName || ''}
                  onChange={handleInputChange('fullName')}
                  placeholder="Enter your full name"
                  required
                  error={errors.fullName}
                />
              </div>

              {/* Date of Birth */}
              <div ref={inputRefs.dateOfBirth}>
                <CustomCalendar
                  label="Date of Birth"
                  value={formData.dateOfBirth || null}
                  onChange={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date || undefined }))}
                  placeholder="Select date of birth"
                  required
                  error={errors.dateOfBirth}
                />
              </div>

              {/* Gender (Pronoun) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-90 mb-2">
                  Pronoun
                </label>
                <div className="flex gap-6">
                  {genderOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={option.value}
                        checked={formData.gender === option.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
                        className="w-4 h-4 text-primary-main border-neutral-40 focus:ring-primary-focus accent-primary-main"
                      />
                      <span className="text-neutral-90">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Domicile */}
              <div ref={inputRefs.domicile}>
                <Select
                  label="Domicile"
                  options={domicileOptions}
                  value={formData.domicile || ''}
                  onChange={handleSelectChange('domicile')}
                  placeholder="Choose your domicile"
                  variant="input"
                />
              </div>

              {/* Phone Number */}
              <div ref={inputRefs.phone}>
                {/* Phone Number with Country Code Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-neutral-90">
                    Phone number<span className="text-danger-main">*</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    {/* Flag Dropdown */}
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        className="flex items-center px-2 py-2 border-2 rounded-lg bg-white min-w-[40px]"
                        onClick={() => setShowCountryDropdown(prev => !prev)}
                      >
                        <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-5 rounded-full" />
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg border">
                          <div className="p-3 border-b">
                            <input
                              type="text"
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder="Search"
                              value={countrySearch}
                              onChange={e => setCountrySearch(e.target.value)}
                            />
                          </div>
                          <ul className="max-h-60 overflow-y-auto">
                            {filteredCountries.map(country => (
                              <li
                                key={country.code + country.name}
                                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-neutral-30"
                                onClick={() => { setSelectedCountry(country); setShowCountryDropdown(false); }}
                              >
                                <div className="flex items-center gap-2">
                                  <img src={country.flag} alt={country.name} className="w-5 h-5 rounded-full" />
                                  <span>{country.name}</span>
                                </div>
                                <span>{country.code}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    {/* Phone Input with Country Code on Left */}
                    <div className="flex flex-1 items-center">
                      <span className="px-3 py-2 border-2 border-r-0 rounded-l-lg bg-neutral-10 text-neutral-90 font-semibold">
                        {selectedCountry.code}
                      </span>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border-2 rounded-r-lg focus:border-primary-main"
                        placeholder="81XXXXXXXXXX"
                        value={formData.phone || ''}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        onFocus={e => e.target.classList.add('border-primary-main')}
                        onBlur={e => e.target.classList.remove('border-primary-main')}
                      />
                    </div>
                  </div>
                  {errors.phone && <span className="text-danger-main text-xs mt-1">{errors.phone}</span>}
                </div>
              </div>

              {/* Email */}
              <div ref={inputRefs.email}>
                <Input
                  label="Email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleInputChange('email')}
                  placeholder="Enter your email address"
                  required
                  error={errors.email}
                />
              </div>

              {/* LinkedIn Profile */}
              <div ref={inputRefs.linkedin}>
                <Input
                  label="LinkedIn Profile"
                  type="text"
                  value={formData.linkedin || ''}
                  onChange={handleInputChange('linkedin')}
                  placeholder="https://linkedin.com/in/username"
                  error={errors.linkedin}
                />
                {formData.linkedin &&
                  /^https?:\/\/(www\.)?linkedin\.com\/.+/.test(formData.linkedin) && (
                    <div className="flex items-center gap-2 mt-2 text-teal-700">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="font-medium">URL address found</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center px-6">
        <div className="w-full max-w-3xl bg-white border-t border-neutral-40 p-6 flex justify-center">
          <Button 
            type="submit" 
            loading={isSubmitting}
            className="max-w-2xl w-full px-8 h-10 font-semibold"
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </div>

      {/* Webcam Modal */}
      {showWebcam && (
        <Modal isOpen={showWebcam} title="Take a Picture" onClose={() => setShowWebcam(false)}>
          <WebcamCapture 
            onCapture={handlePhotoCapture} 
            required={false}
          />
        </Modal>
      )}
    </div>
  );
};