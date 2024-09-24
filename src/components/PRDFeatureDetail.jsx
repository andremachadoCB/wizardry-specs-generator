import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PRDFeatureDetail = ({ feature }) => {
  if (!feature) return null;

  return (
    <Card className="h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>{feature.feature_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="mb-4">{feature.description}</p>
        <h3 className="text-lg font-semibold mb-2">Acceptance Criteria</h3>
        <ul className="list-disc pl-5">
          {feature.acceptance_criteria.map((criteria, index) => (
            <li key={index} className="mb-2">{criteria}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PRDFeatureDetail;