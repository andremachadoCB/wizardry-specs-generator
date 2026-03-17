import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidGithubUrl } from '../utils/validation';

const RepoSelector = ({ selectedRepo, onSelectRepo }) => {
  const [touched, setTouched] = useState(false);

  const trimmed = selectedRepo.trim();
  const isInvalid = touched && trimmed.length > 0 && !isValidGithubUrl(trimmed);

  const handleChange = (e) => {
    onSelectRepo(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
    if (selectedRepo !== trimmed) {
      onSelectRepo(trimmed);
    }
  };

  return (
    <div className="mb-4">
      <Label htmlFor="repo-url">GitHub Repository URL</Label>
      <Input
        id="repo-url"
        type="text"
        placeholder="https://github.com/username/repo"
        value={selectedRepo}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full ${isInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
      />
      {isInvalid && (
        <p className="mt-1 text-sm text-red-500">
          Please enter a valid GitHub URL (e.g. https://github.com/owner/repo)
        </p>
      )}
    </div>
  );
};

export default RepoSelector;
