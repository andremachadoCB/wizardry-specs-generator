import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GITHUB_URL_PATTERN = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/;

const RepoSelector = ({ selectedRepo, onSelectRepo }) => {
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && selectedRepo.length > 0 && !GITHUB_URL_PATTERN.test(selectedRepo);

  return (
    <div className="mb-4">
      <Label htmlFor="repo-url">GitHub Repository URL</Label>
      <Input
        id="repo-url"
        type="text"
        placeholder="https://github.com/username/repo"
        value={selectedRepo}
        onChange={(e) => onSelectRepo(e.target.value)}
        onBlur={() => setTouched(true)}
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
