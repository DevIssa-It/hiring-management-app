import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { JobFormConfig } from './JobFormConfig';
import { InlineSpinner } from '../shared/LoadingSpinner';
import type { FieldRequirement, Job, JobFormConfiguration, EmploymentType } from '@/types';

export interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: Job;
  onSave: (job: Partial<Job>) => Promise<void>;
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isOpen,
  onClose,
  job,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    jobName: '',
    jobType: '',
    jobDescription: '',
    candidateCount: 0,
    minSalary: 0,
    maxSalary: 0,
  });

  const [errors, setErrors] = useState({
    jobName: false,
    jobType: false,
    jobDescription: false,
    candidateCount: false,
  });

  const [formConfig, setFormConfig] = useState<JobFormConfiguration>({
    fullName: 'mandatory' as FieldRequirement,
    email: 'mandatory' as FieldRequirement,
    phone: 'mandatory' as FieldRequirement,
    gender: 'mandatory' as FieldRequirement,
    dateOfBirth: 'optional' as FieldRequirement,
    linkedin: 'optional' as FieldRequirement,
    portfolio: 'off' as FieldRequirement,
    domicile: 'mandatory' as FieldRequirement,
    expectedSalary: 'off' as FieldRequirement,
    availability: 'off' as FieldRequirement,
    profilePicture: 'optional' as FieldRequirement,
    resume: 'mandatory' as FieldRequirement,
    coverLetter: 'optional' as FieldRequirement,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs untuk scroll ke field yang error
  const jobNameRef = useRef<HTMLDivElement>(null);
  const jobTypeRef = useRef<HTMLDivElement>(null);
  const jobDescriptionRef = useRef<HTMLDivElement>(null);
  const candidateCountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (job) {
      setFormData({
        jobName: job.title || '',
        jobType: job.type || '',
        jobDescription: job.description || '',
        candidateCount: job.candidatesNeeded || 0,
        minSalary: job.salaryRange?.min || 0,
        maxSalary: job.salaryRange?.max || 0,
      });
      if (job.formConfiguration) {
        setFormConfig(job.formConfiguration);
      }
    }
  }, [job]);

  const validateForm = () => {
    const newErrors = {
      jobName: !formData.jobName.trim(),
      jobType: !formData.jobType,
      jobDescription: !formData.jobDescription.trim(),
      candidateCount: formData.candidateCount <= 0,
    };

    setErrors(newErrors);

    // Scroll ke field pertama yang error
    if (newErrors.jobName && jobNameRef.current) {
      jobNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.jobType && jobTypeRef.current) {
      jobTypeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.jobDescription && jobDescriptionRef.current) {
      jobDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.candidateCount && candidateCountRef.current) {
      candidateCountRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return !Object.values(newErrors).some(error => error);
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      await onSave({
        title: formData.jobName || 'Untitled Job',
        type: formData.jobType,
        description: formData.jobDescription,
        candidatesNeeded: formData.candidateCount,
        salaryRange: {
          min: formData.minSalary,
          max: formData.maxSalary,
        },
        formConfiguration: formConfig,
        status: 'draft', // Status draft, belum publish
      });
      
      // Reset form
      setFormData({
        jobName: '',
        jobType: '',
        jobDescription: '',
        candidateCount: 0,
        minSalary: 0,
        maxSalary: 0,
      });
      setErrors({
        jobName: false,
        jobType: false,
        jobDescription: false,
        candidateCount: false,
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to save draft: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        title: formData.jobName,
        type: formData.jobType,
        description: formData.jobDescription,
        candidatesNeeded: formData.candidateCount,
        salaryRange: {
          min: formData.minSalary,
          max: formData.maxSalary,
        },
        formConfiguration: formConfig,
        status: 'active', // Status active, publish ke applicant
      });
      
      // Reset form dan errors
      setFormData({
        jobName: '',
        jobType: '',
        jobDescription: '',
        candidateCount: 0,
        minSalary: 0,
        maxSalary: 0,
      });
      setErrors({
        jobName: false,
        jobType: false,
        jobDescription: false,
        candidateCount: false,
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to save job: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const footer = (
    <>
      <Button 
        variant="outline" 
        onClick={handleSaveDraft} 
        disabled={isSubmitting}
        type="button"
        className="w-32 h-8 text-sm font-semibold">
        {isSubmitting ? (
          <div className="flex items-center gap-1">
            <InlineSpinner size="sm" color="primary" />
            Saving
          </div>
        ) : 'Save as Draft'}
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
        type="button"
        className="w-32 h-8 text-sm font-semibold">
        {isSubmitting ? (
          <div className="flex items-center gap-1">
            <InlineSpinner size="sm" />
            Publishing
          </div>
        ) : 'Publish Job'}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Job Opening"
      footer={footer}
      size="xl">

      <div className="space-y-6">
        <div className="space-y-4">
          {/* Job Name */}
          <div ref={jobNameRef}>
            <Input
              label="Job Name"
              placeholder="Ex: Front End Engineer"
              value={formData.jobName}
              onChange={(val) => {
                setFormData({ ...formData, jobName: val });
                if (errors.jobName) setErrors({ ...errors, jobName: false });
              }}
              error={errors.jobName ? 'Job name is required' : ''}
              required
            />
          </div>

          {/* Job Type */}
          <div ref={jobTypeRef}>
            <Select
              label="Job Type"
              placeholder="Select Job Type"
              value={formData.jobType}
              onChange={(e) => {
                setFormData({ ...formData, jobType: e.target.value });
                if (errors.jobType) setErrors({ ...errors, jobType: false });
              }}
              options={[
                { value: 'full-time', label: 'Full Time' },
                { value: 'part-time', label: 'Part Time' },
                { value: 'contract', label: 'Contract' },
                { value: 'internship', label: 'Internship' },
              ]}
              error={errors.jobType ? 'Job type is required' : ''}
              required
            />
          </div>

          {/* Job Description */}
          <div ref={jobDescriptionRef}>
            <label className="block text-sm font-medium text-neutral-90 mb-2">
              Job Description
              <span className="text-danger-main ml-1">*</span>
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-lg text-neutral-100 focus:ring-2 focus:ring-primary-focus outline-none transition-all ${
                errors.jobDescription
                  ? 'border-danger-main focus:border-danger-main'
                  : 'border-neutral-40 focus:border-primary-focus'
              }`}
              rows={4}
              placeholder="Enter job description"
              value={formData.jobDescription}
              onChange={(e) => {
                setFormData({ ...formData, jobDescription: e.target.value });
                if (errors.jobDescription) setErrors({ ...errors, jobDescription: false });
              }}
            />
            {errors.jobDescription && (
              <p className="mt-1 text-sm text-danger-main">Job description is required</p>
            )}
          </div>

          {/* Candidate Count */}
          <div ref={candidateCountRef}>
            <Input
              label="Number of Candidate Needed"
              type="number"
              placeholder="Ex: 5"
              value={formData.candidateCount.toString()}
              onChange={(val) => {
                setFormData({ ...formData, candidateCount: parseInt(val) || 0 });
                if (errors.candidateCount) setErrors({ ...errors, candidateCount: false });
              }}
              error={errors.candidateCount ? 'Number of candidates must be greater than 0' : ''}
              required
            />
          </div>
        </div>

        <div id="salary">
          <h3 className="text-base font-semibold text-neutral-90 mb-4">Job Salary</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Estimated Salary"
              type="number"
              placeholder="Ex : Rp7.500.000"
              prefix="Rp"
              value={formData.minSalary.toString()}
              onChange={(val) => setFormData({ ...formData, minSalary: parseInt(val) || 0 })}
            />
            <Input
              label="Maximum Estimated Salary"
              type="number"
              placeholder="Ex : 10.000.000"
              prefix="Rp"
              value={formData.maxSalary.toString()}
              onChange={(val) => setFormData({ ...formData, maxSalary: parseInt(val) || 0 })}
            />
          </div>
        </div>

        <div id="form-configuration">
          <JobFormConfig
            configuration={formConfig}
            onChange={setFormConfig}
            jobType={formData.jobType as any}
          />
        </div>
      </div>
    </Modal>
  );
};
