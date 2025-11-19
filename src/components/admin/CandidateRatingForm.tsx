import { useState } from 'react';
import { CandidateRating } from '../../types/rating';

interface CandidateRatingFormProps {
  applicationId: string;
  onSubmit: (rating: Partial<CandidateRating>) => void;
}

export const CandidateRatingForm = ({ applicationId, onSubmit }: CandidateRatingFormProps) => {
  const [ratings, setRatings] = useState({
    technicalSkills: 0,
    communication: 0,
    cultureFit: 0,
    experience: 0,
    feedback: '',
  });

  const criteria = [
    { key: 'technicalSkills', label: 'Technical Skills' },
    { key: 'communication', label: 'Communication' },
    { key: 'cultureFit', label: 'Culture Fit' },
    { key: 'experience', label: 'Experience' },
  ];

  const handleRatingChange = (key: string, value: number) => {
    setRatings({ ...ratings, [key]: value });
  };

  const calculateOverall = () => {
    const sum = ratings.technicalSkills + ratings.communication + 
                ratings.cultureFit + ratings.experience;
    return sum / 4;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      applicationId,
      ...ratings,
      overall: calculateOverall(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 className="text-lg font-semibold">Rate Candidate</h3>

      {criteria.map(({ key, label }) => (
        <div key={key}>
          <label className="block text-sm font-medium mb-2">{label}</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(key, star)}
                className={`text-2xl ${
                  star <= ratings[key as keyof typeof ratings]
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {ratings[key as keyof typeof ratings]}/5
            </span>
          </div>
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium mb-2">Overall Rating</label>
        <div className="text-3xl font-bold text-blue-600">
          {calculateOverall().toFixed(1)}/5
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Feedback</label>
        <textarea
          value={ratings.feedback}
          onChange={(e) => setRatings({ ...ratings, feedback: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
          placeholder="Provide detailed feedback..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Submit Rating
      </button>
    </form>
  );
};
