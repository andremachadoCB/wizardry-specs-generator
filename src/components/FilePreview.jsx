import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const FilePreview = ({ content }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">File Preview</h3>
      <ScrollArea className="h-[200px] w-full border rounded-md p-4">
        <pre className="text-sm">{content}</pre>
      </ScrollArea>
    </div>
  );
};

export default FilePreview;