import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtifactPanel from '../components/ArtifactPanel';
import Navbar from '../components/Navbar';
import RepoFileList from '../components/RepoFileList';
import FilePreview from '../components/FilePreview';
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { fetchWithApiUrl } from '../utils/api';
import KnowledgeGraphComponent from '../components/KnowledgeGraphComponent';
import ERDComponent from '../components/ERDComponent';
import { languageOptions } from '../utils/languageOptions';

const Index = () => {
  const [selectedRepo, setSelectedRepo] = useState('https://github.com/aws-samples/aws-mainframe-modernization-carddemo/tree/main');
  const [selectedFile, setSelectedFile] = useState(null);
  const [shouldLoadFiles, setShouldLoadFiles] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [artifacts, setArtifacts] = useState({
    technicalSummary: '',
    prd: '',
    userTypes: [],
    knowledgeGraph: { nodes: [], links: [] },
    dataModels: { entities: [], relationships: [] },
  });

  const parseKnowledgeGraph = (graphData) => {
    if (!graphData || !graphData.nodes || !graphData.links) {
      return { nodes: [], links: [] };
    }
    const nodes = graphData.nodes.map(node => ({
      id: node.id,
      name: node.label,
      type: node.type,
      color: getNodeColor(node.type),
    }));
    const links = graphData.links.map(link => ({
      source: link.source,
      target: link.target,
      label: link.label,
    }));
    return { nodes, links };
  };

  const getNodeColor = (type) => {
    const colorMap = {
      Program: '#FF6B6B',
      File: '#CCCCCC',
      Procedure: '#45B7D1',
      Variable: '#FFA07A',
    };
    return colorMap[type] || '#CCCCCC';
  };

  const fileAnalysisMutation = useMutation({
    mutationFn: ({ url, file_path, language }) => fetchWithApiUrl('/api/repos/file/reason', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, file_path, language }),
    }),
    onSuccess: (data) => {
      setArtifacts({
        technicalSummary: data.file_summary,
        prd: JSON.stringify(data.analysis, null, 2),
        userTypes: data.user_types,
        knowledgeGraph: parseKnowledgeGraph(data.graph),
        dataModels: data.data_models || { entities: [], relationships: [] },
      });
    },
  });

  const handleGenerateSpecs = async () => {
    if (selectedFile) {
      try {
        await fileAnalysisMutation.mutateAsync({ 
          url: selectedRepo, 
          file_path: selectedFile,
          language: selectedLanguage
        });
      } catch (error) {
        console.error('Error generating specs:', error);
      }
    }
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    try {
      const response = await fetchWithApiUrl('/api/repos/file/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: selectedRepo, file_path: file }),
      });
      setFileContent(response.content);
    } catch (error) {
      console.error('Error fetching file content:', error);
      setFileContent('Error loading file content');
    }
  };

  const handleLoadFiles = () => {
    setShouldLoadFiles(true);
  };

  const isGenerateDisabled = !selectedRepo || !selectedFile || fileAnalysisMutation.isPending;

  return (
    <div className="bg-crowdbotics-background text-crowdbotics-text min-h-screen flex flex-col">
      <Navbar />
      <div className="p-4 bg-white w-full">
        <Label htmlFor="repo-url">GitHub Repository URL</Label>
        <Input
          id="repo-url"
          type="text"
          placeholder="https://github.com/username/repo"
          value={selectedRepo}
          onChange={(e) => setSelectedRepo(e.target.value)}
          className="w-full"
        />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 bg-gray-100 p-4">
          <Button 
            className="bg-crowdbotics-button text-crowdbotics-text hover:bg-crowdbotics-button/90 rounded-none uppercase w-full mb-4"
            onClick={handleLoadFiles}
            disabled={!selectedRepo}
          >
            Load Files
          </Button>
          {shouldLoadFiles && (
            <RepoFileList 
              repoUrl={selectedRepo} 
              onSelectFile={handleFileSelect} 
              shouldLoadFiles={shouldLoadFiles}
              selectedFile={selectedFile}
            />
          )}
        </div>
        <Separator orientation="vertical" className="mx-4" />
        <div className="w-4/5 p-4 overflow-auto">
          <FilePreview content={fileContent} />
          <div className="mb-4 sticky top-0 bg-white z-10 p-4 shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                className="bg-crowdbotics-button text-crowdbotics-text hover:bg-crowdbotics-button/90 rounded-none uppercase flex-grow"
                onClick={handleGenerateSpecs}
                disabled={isGenerateDisabled}
              >
                {fileAnalysisMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'GENERATE SPECS'
                )}
              </Button>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Index;
