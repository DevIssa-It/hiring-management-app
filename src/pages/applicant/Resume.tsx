import React, { useState } from "react";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { Button } from "../shared/Button";
import { Modal } from "../shared/Modal";
import WebcamCapture from "./WebcamCapture";

const pronouns = [
  { label: "She/her (Female)", value: "female" },
  { label: "He/him (Male)", value: "male" },
];

const domiciles = [
  { label: "Jakarta", value: "jakarta" },
  { label: "Bandung", value: "bandung" },
  { label: "Surabaya", value: "surabaya" },
  { label: "Medan", value: "medan" },
  { label: "Semarang", value: "semarang" },
  { label: "Yogyakarta", value: "yogyakarta" },
];

export default function Resume() {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    pronoun: "",
    domicile: "",
    phone: "",
    email: "",
    linkedin: "",
    photo: "",
  });
  const [showWebcam, setShowWebcam] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoCapture = (photo: string) => {
    setForm({ ...form, photo });
    setShowWebcam(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Format email tidak valid";
    }
    
    if (!form.phone.match(/^8[1-9][0-9]{8,11}$/)) {
      newErrors.phone = "Format nomor telepon tidak valid (contoh: 81234567890)";
    }
    
    if (!form.linkedin.match(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/)) {
      newErrors.linkedin = "Format URL LinkedIn tidak valid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log('Form submitted:', form);
    alert('Aplikasi berhasil dikirim!');
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Apply Front End at Rakamin</h2>
      <div className="mb-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden">
          {form.photo ? (
            <img src={form.photo} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-400">No Photo</span>
          )}
        </div>
        <Button type="button" onClick={() => setShowWebcam(true)}>
          Take a Picture
        </Button>
      </div>
      <Input
        label="Full name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        required
      />
      <Input
        label="Date of birth"
        name="dob"
        type="date"
        value={form.dob}
        onChange={handleChange}
        required
      />
      <div className="mb-4">
        <label className="block font-medium mb-1">Pronoun (gender)</label>
        <div className="flex gap-4">
          {pronouns.map((p) => (
            <label key={p.value} className="flex items-center gap-1">
              <input
                type="radio"
                name="pronoun"
                value={p.value}
                checked={form.pronoun === p.value}
                onChange={handleChange}
                required
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>
      <Select
        label="Domicile"
        name="domicile"
        options={domiciles}
        value={form.domicile}
        onChange={handleChange}
        required
      />
      <Input
        label="Phone number"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        required
        prefix="+62"
        placeholder="81XXXXXXXXXX"
      />
      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      <Input
        label="Link LinkedIn"
        name="linkedin"
        type="url"
        value={form.linkedin}
        onChange={handleChange}
        required
        placeholder="https://linkedin.com/in/username"
      />
      {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
      <Button type="submit" className="w-full mt-6">
        Submit
      </Button>
      {showWebcam && (
        <Modal onClose={() => setShowWebcam(false)}>
          <WebcamCapture onCapture={handlePhotoCapture} />
        </Modal>
      )}
    </form>
  );
}