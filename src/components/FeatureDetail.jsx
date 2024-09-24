import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FeatureDetail = ({ feature, onUpdate }) => {
  if (!feature) return null;

  const handleChange = (field) => (e) => {
    onUpdate({ ...feature, [field]: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{feature.name}</h3>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={feature.description}
          onChange={handleChange('description')}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="acceptance_criteria">Acceptance Criteria</Label>
        <Textarea
          id="acceptance_criteria"
          value={feature.acceptance_criteria}
          onChange={handleChange('acceptance_criteria')}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default FeatureDetail;
