import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RepoSelector = ({ selectedRepo, onSelectRepo }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="repo-url">GitHub Repository URL</Label>
      <Input
        id="repo-url"
        type="text"
        placeholder="https://github.com/aws-samples/aws-mainframe-modernization-carddemo"
        value={selectedRepo}
        onChange={(e) => onSelectRepo(e.target.value)}
      />
    </div>
  );
};

export default RepoSelector;