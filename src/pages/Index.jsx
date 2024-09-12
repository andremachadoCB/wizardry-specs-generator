import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RepoSelector from '../components/RepoSelector';
import ArtifactPanel from '../components/ArtifactPanel';

const Index = () => {
  const [selectedRepo, setSelectedRepo] = useState('');
  const [artifacts, setArtifacts] = useState({
    prd: '',
    features: [],
    userTypes: [],
    dataModels: [],
    knowledgeGraph: '',
    tests: []
  });

  const handleGenerateSpecs = async () => {
    // TODO: Implement the logic to generate artifacts
    // This would typically involve making API calls to your backend
    // For now, we'll use placeholder data
    setArtifacts({
      prd: '# Product Requirements Document\n\nThis is a placeholder PRD.',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      userTypes: ['Customer', 'Bank Teller'],
      dataModels: ['Account', 'Transaction', 'Customer'],
      knowledgeGraph: 'Placeholder for knowledge graph visualization',
      tests: ['Test 1', 'Test 2', 'Test 3']
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mainframe Modernization Wizard</h1>
      
      <RepoSelector
        selectedRepo={selectedRepo}
        onSelectRepo={setSelectedRepo}
      />

      <Button 
        className="mt-4 mb-6"
        onClick={handleGenerateSpecs}
        disabled={!selectedRepo}
      >
        Generate Specs
      </Button>

      <Tabs defaultValue="prd">
        <TabsList>
          <TabsTrigger value="prd">PRD</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="userTypes">User Types</TabsTrigger>
          <TabsTrigger value="dataModels">Data Models</TabsTrigger>
          <TabsTrigger value="knowledgeGraph">Knowledge Graph</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
        </TabsList>
        <TabsContent value="prd">
          <ArtifactPanel title="Product Requirements Document" content={artifacts.prd} />
        </TabsContent>
        <TabsContent value="features">
          <ArtifactPanel title="List of Features" content={artifacts.features} />
        </TabsContent>
        <TabsContent value="userTypes">
          <ArtifactPanel title="User Types" content={artifacts.userTypes} />
        </TabsContent>
        <TabsContent value="dataModels">
          <ArtifactPanel title="Data Models" content={artifacts.dataModels} />
        </TabsContent>
        <TabsContent value="knowledgeGraph">
          <ArtifactPanel title="Knowledge Graph" content={artifacts.knowledgeGraph} />
        </TabsContent>
        <TabsContent value="tests">
          <ArtifactPanel title="Tests" content={artifacts.tests} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;