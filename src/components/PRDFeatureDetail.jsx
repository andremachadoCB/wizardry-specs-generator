import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const PRDFeatureDetail = ({ feature, onUpdate }) => {
  if (!feature) return null;

  const handleChange = (e) => {
    onUpdate({ ...feature, description: e.target.value });
  };

  return (
    <Card className="h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>{feature.feature_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={feature.description}
          onChange={handleChange}
          className="w-full h-[calc(100vh-300px)]"
          placeholder="Enter feature description..."
        />
      </CardContent>
    </Card>
  );
};

export default PRDFeatureDetail;
