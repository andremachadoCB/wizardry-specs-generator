import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtifactPanel from './ArtifactPanel';
import KnowledgeGraphComponent from './KnowledgeGraphComponent';
import ERDComponent from './ERDComponent';

const ArtifactTabs = ({ artifacts }) => {
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
        <ArtifactPanel title="Product Requirements Document" content={artifacts.prd} />
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