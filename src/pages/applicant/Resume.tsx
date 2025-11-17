import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { Navbar } from '@/components/shared/Navbar';
import { WebcamCapture } from '@/components/applicant/WebcamCapture';
import CustomDatePicker from '@/components/shared/DatePicker';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { getJobById } from '@/data/dummyData';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';
import type { ApplicationData, Gender } from '@/types';

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const domicileOptions = [
  { label: "Jakarta", value: "jakarta" },
  { label: "Bandung", value: "bandung" },
  { label: "Surabaya", value: "surabaya" },
  { label: "Medan", value: "medan" },
  { label: "Semarang", value: "semarang" },
  { label: "Yogyakarta", value: "yogyakarta" },
];

export const Resume: React.FC = () => {
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

  const handleSelectChange = (field: keyof ApplicationData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                <div className="w-24 h-24 rounded-full bg-neutral-30 flex items-center justify-center overflow-hidden -mt-2">
                  {formData.profilePicture ? (
                    <img 
                      src={formData.profilePicture} 
                      alt="Profile" 
                      className="object-cover w-full h-full" 
                    />
                  ) : (
                    <span className="text-neutral-60">No Photo</span>
                  )}
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowWebcam(true)}
                  className="flex items-center gap-2"
                >
                  <MdOutlineFileUpload className="w-4 h-4" />
                  Take a Picture
                </Button>
              </div>

              {/* Form Fields */}
              <Input
                label="Full Name"
                value={formData.fullName || ''}
                onChange={handleInputChange('fullName')}
                required
                error={errors.fullName}
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={handleInputChange('email')}
                required
                error={errors.email}
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone || ''}
                onChange={handleInputChange('phone')}
                prefix="+62"
                placeholder="81XXXXXXXXXX"
                error={errors.phone}
              />
              
              {/* Gender Radio Buttons */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-90 mb-2">
                  Gender
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
                        className="w-4 h-4 text-primary-main border-neutral-40 focus:ring-primary-focus"
                      />
                      <span className="text-neutral-90">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <CustomDatePicker
                label="Date of Birth"
                selected={formData.dateOfBirth || null}
                onChange={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date || undefined }))}
                placeholder="Select date of birth"
              />
              
              <Select
                label="Domicile"
                options={domicileOptions}
                value={formData.domicile || ''}
                onChange={handleSelectChange('domicile')}
                placeholder="Select city"
              />
              
              <Input
                label="LinkedIn Profile"
                type="url"
                value={formData.linkedin || ''}
                onChange={handleInputChange('linkedin')}
                placeholder="https://linkedin.com/in/username"
                error={errors.linkedin}
              />
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
            className="px-8 py-3"
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </div>

      {/* Webcam Modal */}
      {showWebcam && (
        <Modal onClose={() => setShowWebcam(false)}>
          <WebcamCapture 
            onCapture={handlePhotoCapture} 
            required={false}
          />
        </Modal>
      )}
    </div>
  );
};