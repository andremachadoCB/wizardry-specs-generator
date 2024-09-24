import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRDFeatureDetail = ({ feature, onUpdate }) => {
  const [editedFeature, setEditedFeature] = useState(feature);

  if (!feature) return null;

  const handleChange = (field) => (e) => {
    setEditedFeature({ ...editedFeature, [field]: e.target.value });
  };

  const handleAcceptanceCriteriaChange = (index, value) => {
    const updatedCriteria = [...editedFeature.acceptance_criteria];
    updatedCriteria[index] = value;
    setEditedFeature({ ...editedFeature, acceptance_criteria: updatedCriteria });
  };

  const handleSave = () => {
    onUpdate(editedFeature);
  };

  return (
    <Card className="h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>{editedFeature.feature_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={editedFeature.description}
            onChange={handleChange('description')}
            className="mt-1 h-40"
            placeholder="Enter feature description..."
          />
        </div>
        <div>
          <Label htmlFor="acceptance_criteria">Acceptance Criteria</Label>
          {editedFeature.acceptance_criteria.map((criteria, index) => (
            <Textarea
              key={index}
              value={criteria}
              onChange={(e) => handleAcceptanceCriteriaChange(index, e.target.value)}
              className="mt-1 mb-2"
              placeholder={`Acceptance criteria ${index + 1}`}
            />
          ))}
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
};

export default PRDFeatureDetail;
