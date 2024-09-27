import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtifactPanel from './ArtifactPanel';
import KnowledgeGraphComponent from './KnowledgeGraphComponent';
import ERDComponent from './ERDComponent';
import PRDTreeView from './PRDTreeView';
import PRDFeatureDetail from './PRDFeatureDetail';
import DependencyGraph from './DependencyGraph';

const ArtifactTabs = ({ artifacts, onFeatureUpdate }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  const handleFeatureUpdate = (updatedFeature) => {
    onFeatureUpdate(updatedFeature);
    setSelectedFeature(updatedFeature);
  };

  return (
    <Tabs defaultValue="systemSpec" className="bg-white rounded-lg p-4">
      <TabsList>
        <TabsTrigger value="systemSpec">System Specification</TabsTrigger>
        <TabsTrigger value="userTypes">User Types</TabsTrigger>
        <TabsTrigger value="knowledgeGraph">Knowledge Graph</TabsTrigger>
        <TabsTrigger value="dependencyGraph">Dependency Graph</TabsTrigger>
      </TabsList>
      <TabsContent value="systemSpec">
        <div className="flex">
          <div className="w-2/5 pr-2">
            <PRDTreeView 
              data={artifacts.prd} 
              onSelect={handleFeatureSelect}
              selectedFeature={selectedFeature}
            />
          </div>
          <div className="w-3/5 pl-2">
            <PRDFeatureDetail 
              feature={selectedFeature} 
              onUpdate={handleFeatureUpdate}
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="userTypes">
        <ArtifactPanel title="User Types" content={artifacts.userTypes} />
      </TabsContent>
      <TabsContent value="knowledgeGraph">
        <KnowledgeGraphComponent data={artifacts.knowledgeGraph} />
      </TabsContent>
      <TabsContent value="dependencyGraph">
        <DependencyGraph data={artifacts} />
      </TabsContent>
    </Tabs>
  );
};

export default ArtifactTabs;