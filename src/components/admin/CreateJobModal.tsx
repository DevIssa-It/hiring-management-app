import React, { useState, useEffect} from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { JobFormConfig } from './JobFormConfig';
import type { FieldRequirement, Job, JobFormConfiguration } from '@/types';

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
    JobDescription: '',
    candidateCount: 0,
    minSalary: 0,
    maxSalary: 0,
  });

  const [formConfig, setFormConfig] = useState<JobFormConfiguration>({
    fullName: 'mandatory' as FieldRequirement,
    email: 'mandatory' as FieldRequirement,
    phone: 'madatory' as FieldRequirement,
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

  useEffect(() => {
    if (job) {
      setFormData({
        jobName: job.title || '',
        jobType: job.Type || '',
        JobDescription: job.description ||'',
        candidateCount: job.candidatesNeeded || 0,
        minSalary: job.salaryRange?.min || 0,
        maxSalary: job.salaryRange?.max || 0,
      });
      if (job.formConfiguration) {
        setFormConfig(job.formConfiguration);
      }
    }
  }, [job]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave({
        title: formData.jobName,
        type: formData.jobType,
        description: formData.JobDescription,
        candidatesNeeded: formData.candidateCount,
        salaryRange: {
          min: formData.minSalary,
          max: formData.maxSalary,
        },
        formConfiguration: formConfig,
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
      <Button variant="primary"  onClick={onClose}>
        Publish
      </Button>
    </>
  )
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Job Opening"
      footer={footer}
      size="xl">

      <div id="create-job-modal" className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Job Name"
            placeholder="Ex: Front End Engineer"
            value={formData.jobName}
            onChange={(e) => setFormData({ ...formData, jobName: e.target.value })}
            required 
          />

          <Select
            label="Job Type"
            placeholder="Select Job Type"
            value={formData.jobType}
            onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
            options={[
              {value: 'full-time', label: 'Full Time'},
              {value: 'part-time', label: 'Part Time'},
              {value: 'contract', label: 'Contract'},
              {value: 'internship', label: 'Internship'},
            ]}
            required 
          />

          <div>
            <label className="block text-sm font-medium text-neutral-90 mb-2">
              Job Desciption
            </label>
            <textarea
              className="w-full px-3 py-2 border border-neutral-40 rounded-lg text-neutral-100 focus:ring-2 focus:ring-primary-focus focus:border-primary-focus outline-none transition-all"
              rows={4}
              placeholder="Enter job description"
              value={formData.JobDescription}
              onChange={(e) => setFormData({ ...formData, JobDescription: e.target.value})}
            />
          </div>

          <Input
            label="Number of Candidate Nedeed"
            type="number"
            placeholder="Ex: 5"
            value={formData.candidateCount}
            onChange={(e) => setFormData({ ...formData, candidateCount: parseInt(e.target.value)|| 0})}
            required 
          />
        </div>

        <div id="salary">
          <h3 className="text-base font-semibold text-neutral-90 mb-4">Job Salary</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Estimated Salary"
              type="number"
              placeholder="Ex : Rp7.500.000"
              value={formData.minSalary}
              onChange={(e) => setFormData({...formData, minSalary: parseInt(e.target.value) || 0})}
              />
              <Input
                label="Maximum Estimated Salary"
                type="number"
                placeholder="Ex : 10.000.000"
                value={formData.maxSalary}
                onChange={(e) => setFormData({...formData, maxSalary: parseInt(e.target.value) || 0})}
              />
          </div>
        </div>

        <div id="form-configuration">
            <h3 className="text-base font-semibold text-neutral-90 mb-4">
              Minimum Profile Information
            </h3>
            <JobFormConfig
              configuration={formConfig}
              onChange={setFormConfig}
            />
        </div>
      </div>
    </Modal>
  );
};
