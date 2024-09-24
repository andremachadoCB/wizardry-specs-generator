import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const PRDFeatureDetail = ({ feature, onUpdate }) => {
  if (!feature) return null;

  const handleChange = (field) => (e) => {
    onUpdate({ ...feature, [field]: e.target.value });
  };

  return (
    <Card className="h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>{feature.feature_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={feature.description}
            onChange={handleChange('description')}
            className="mt-1 h-40"
            placeholder="Enter feature description..."
          />
        </div>
        <div>
          <Label htmlFor="acceptance_criteria">Acceptance Criteria</Label>
          <Textarea
            id="acceptance_criteria"
            value={feature.acceptance_criteria}
            onChange={handleChange('acceptance_criteria')}
            className="mt-1 h-40"
            placeholder="Enter acceptance criteria..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PRDFeatureDetail;
