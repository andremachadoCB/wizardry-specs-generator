import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRDFeatureDetail = ({ feature, onUpdate }) => {
  const [description, setDescription] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');

  useEffect(() => {
    setDescription(feature?.description || '');
    setAcceptanceCriteria(feature?.acceptance_criteria.join('\n') || []);
  }, [feature]);

  const handleChangeAcceptanceCriteria = (e) => {
    setAcceptanceCriteria(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
    

  if (!feature) {
    return (
      <Card className="h-[calc(100vh-200px)] overflow-auto">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-gray-500">Select a feature to view details</p>
        </CardContent>
      </Card>
    );
  }

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
            value={description}
            onChange={handleChangeDescription}
            className="mt-1 h-40"
            placeholder="Enter feature description..."
          />
        </div>
        <div>
          <Label htmlFor="acceptance_criteria">Acceptance Criteria</Label>
          <Textarea
              key="acceptance_criteria"
              value={acceptanceCriteria}
              onChange={handleChangeAcceptanceCriteria}
              className="mt-1 h-60"
              placeholder={"Enter acceptance criteria..."}
            />
        </div>
      </CardContent>
    </Card>
  );
};

export default PRDFeatureDetail;
