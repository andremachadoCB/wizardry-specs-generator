import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtifactPanel from '../components/ArtifactPanel';
import Navbar from '../components/Navbar';
import RepoFileList from '../components/RepoFileList';
import FilePreview from '../components/FilePreview';
import { Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchWithApiUrl } from '../utils/api';

const Index = () => {
  const [selectedRepo, setSelectedRepo] = useState('https://github.com/aws-samples/aws-mainframe-modernization-carddemo/tree/main');
  const [selectedFile, setSelectedFile] = useState(null);
  const [shouldLoadFiles, setShouldLoadFiles] = useState(false);
  const [fileContent, setFileContent] = useState('');

  const fileAnalysisMutation = useMutation({
    mutationFn: ({ url, file_path }) => fetchWithApiUrl('/api/repos/file/reason', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, file_path }),
    }),
    onSuccess: (data) => {
      setArtifacts({
        prd: data.file_summary,
        features: JSON.stringify(data.analysis, null, 2),
        userTypes: data.user_types,
        dataModels: Object.keys(data.analysis),
        knowledgeGraph: data.user_stories.split('\n'),
        tests: ['Test 1', 'Test 2']
      });
    },
  });

  const [artifacts, setArtifacts] = useState({
    prd: '',
    features: '',
    userTypes: [],
    dataModels: [],
    knowledgeGraph: [],
    tests: []
  });

  const handleGenerateSpecs = async () => {
    if (selectedFile) {
      try {
        await fileAnalysisMutation.mutateAsync({ url: selectedRepo, file_path: selectedFile });
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
          <Tabs defaultValue="prd" className="bg-white rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="prd">PRD</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="userTypes">User Types</TabsTrigger>
              <TabsTrigger value="dataModels">Data Models</TabsTrigger>
              <TabsTrigger value="knowledgeGraph">Knowledge Graph</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
            </TabsList>
            <TabsContent value="prd" className="flex flex-col h-full">
              <div className="mb-4">
                <Button 
                  className="bg-crowdbotics-button text-crowdbotics-text hover:bg-crowdbotics-button/90 rounded-none uppercase w-full"
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
              <ArtifactPanel title="Product Requirements Document" content={artifacts.prd} />
            </TabsContent>
            <TabsContent value="features">
              <ArtifactPanel title="Features" content={artifacts.features} />
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
      </div>
    </div>
  );
};

export default Index;
