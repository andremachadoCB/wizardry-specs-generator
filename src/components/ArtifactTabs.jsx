import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtifactPanel from './ArtifactPanel';
import KnowledgeGraphComponent from './KnowledgeGraphComponent';
import ERDComponent from './ERDComponent';
import PRDTreeView from './PRDTreeView';
import PRDFeatureDetail from './PRDFeatureDetail';

const ArtifactTabs = ({ artifacts }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <Tabs defaultValue="technicalSummary" className="bg-white rounded-lg p-4">
      <TabsList>
        <TabsTrigger value="technicalSummary">Technical Summary</TabsTrigger>
        <TabsTrigger value="prd">PRD</TabsTrigger>
        <TabsTrigger value="userTypes">User Types</TabsTrigger>
        <TabsTrigger value="knowledgeGraph">Knowledge Graph</TabsTrigger>
        <TabsTrigger value="dataModels">Data Models</TabsTrigger>
      </TabsList>
      <TabsContent value="technicalSummary">
        <ArtifactPanel title="Technical Summary" content={artifacts.technicalSummary} />
      </TabsContent>
      <TabsContent value="prd">
        <div className="flex">
          <div className="w-1/2 pr-2">
            <PRDTreeView 
              data={artifacts.prd} 
              onSelect={handleFeatureSelect}
              selectedFeature={selectedFeature}
            />
          </div>
          <div className="w-1/2 pl-2">
            <PRDFeatureDetail feature={selectedFeature} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="userTypes">
        <ArtifactPanel title="User Types" content={artifacts.userTypes} />
      </TabsContent>
      <TabsContent value="knowledgeGraph">
        <KnowledgeGraphComponent data={artifacts.knowledgeGraph} />
      </TabsContent>
      <TabsContent value="dataModels">
        <ERDComponent data={artifacts.dataModels} />
      </TabsContent>
    </Tabs>
  );
};

export default ArtifactTabs;
