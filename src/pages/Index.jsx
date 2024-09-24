import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchWithApiUrl } from '../utils/api';
import RepoSelector from '../components/RepoSelector';
import FileExplorer from '../components/FileExplorer';
import ArtifactTabs from '../components/ArtifactTabs';
import Navbar from '../components/Navbar';
import SettingsPanel from '../components/SettingsPanel';
import FilePreview from '../components/FilePreview';

const Index = () => {
  const [selectedRepo, setSelectedRepo] = useState('https://github.com/aws-samples/aws-mainframe-modernization-carddemo/tree/main');
  const [selectedFile, setSelectedFile] = useState(null);
  const [shouldLoadFiles, setShouldLoadFiles] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [fileContent, setFileContent] = useState('');
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

  const fileAnalysisMutation = useMutation({
    mutationFn: ({ url, file_path }) => fetchWithApiUrl('/api/repos/file/reason', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, file_path, language: selectedLanguage }),
    }),
    onSuccess: (data) => {
      setArtifacts({
        technicalSummary: data.file_summary,
        prd: JSON.stringify(data.categories, null, 2),
        userTypes: data.user_types,
        knowledgeGraph: parseKnowledgeGraph(data.graph),
        dataModels: data.data_models || { entities: [], relationships: [] },
      });
      setFileContent(fileContent || '');
    },
  });

  const handleGenerateSpecs = async () => {
    if (selectedFile) {
      try {
        await fileAnalysisMutation.mutateAsync({ 
          url: selectedRepo, 
          file_path: selectedFile,
          language: selectedLanguage,
        });
      } catch (error) {
        console.error('Error generating specs:', error);
      }
    }
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

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const isGenerateDisabled = !selectedRepo || !selectedFile || fileAnalysisMutation.isPending;

  return (
    <div className="bg-crowdbotics-background text-crowdbotics-text min-h-screen flex flex-col">
      <Navbar />
      <div className="p-4 bg-white w-full">
        <div className="flex flex-col gap-4">
          <RepoSelector selectedRepo={selectedRepo} onSelectRepo={setSelectedRepo} />
          <div className="font-bold">Settings:</div>
          <SettingsPanel
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-1 overflow-hidden">
        <FileExplorer
          selectedRepo={selectedRepo}
          onSelectFile={handleFileSelect}
          shouldLoadFiles={shouldLoadFiles}
          handleLoadFiles={handleLoadFiles}
          selectedFile={selectedFile}
        />
        <Separator orientation="vertical" className="mx-4" />
        <div className="w-4/5 p-4 overflow-auto">
          <FilePreview content={fileContent} />
          <div className="mb-4 sticky top-0 bg-white z-10 p-4 shadow-md">
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
          <div className="flex-1 overflow-hidden flex flex-col">
            <ArtifactTabs artifacts={artifacts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
