import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ArtifactPanel = ({ title, content }) => {
  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else if (typeof content === 'string') {
      return <div className="whitespace-pre-wrap">{content}</div>;
    } else {
      return <p>No content available</p>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default ArtifactPanel;