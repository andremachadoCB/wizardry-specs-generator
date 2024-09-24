import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Editor } from '@tinymce/tinymce-react';

const PRDFeatureDetail = ({ feature, onUpdate }) => {
  if (!feature) return null;

  const handleEditorChange = (content, editor) => {
    onUpdate({ ...feature, description: content });
  };

  const handleAcceptanceCriteriaChange = (content, editor) => {
    onUpdate({ ...feature, acceptance_criteria: content.split('\n') });
  };

  return (
    <Card className="h-[calc(100vh-200px)] overflow-auto">
      <CardHeader>
        <CardTitle>{feature.feature_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <Editor
          initialValue={feature.description}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
        <h3 className="text-lg font-semibold mb-2 mt-4">Acceptance Criteria</h3>
        <Editor
          initialValue={feature.acceptance_criteria.join('\n')}
          init={{
            height: 200,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleAcceptanceCriteriaChange}
        />
      </CardContent>
    </Card>
  );
};

export default PRDFeatureDetail;
