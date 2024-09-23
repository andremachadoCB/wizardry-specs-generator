import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchWithApiUrl } from '../utils/api';
import RepoSelector from '../components/RepoSelector';
import SettingsPanel from '../components/SettingsPanel';
import FileExplorer from '../components/FileExplorer';
import ArtifactTabs from '../components/ArtifactTabs';
import Navbar from '../components/Navbar';

const Index = () => {
  const [selectedRepo, setSelectedRepo] = useState('https://github.com/aws-samples/aws-mainframe-modernization-carddemo/tree/main');
  const [selectedFile, setSelectedFile] = useState(null);
  const [shouldLoadFiles, setShouldLoadFiles] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [artifacts, setArtifacts] = useState({
    technicalSummary: '',
    prd: '',
    userTypes: [],
    knowledgeGraph: { nodes: [], links: [] },
    dataModels: { entities: [], relationships: [] },
  });

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
        technicalSummary: data.file_summary,
        prd: JSON.stringify(data.analysis, null, 2),
        userTypes: data.user_types,
        knowledgeGraph: data.graph,
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
        });
      } catch (error) {
        console.error('Error generating specs:', error);
      }
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
        <RepoSelector selectedRepo={selectedRepo} onSelectRepo={setSelectedRepo} />
        <Separator className="my-4" />
        <SettingsPanel selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-1 overflow-hidden">
        <FileExplorer
          selectedRepo={selectedRepo}
          onSelectFile={setSelectedFile}
          shouldLoadFiles={shouldLoadFiles}
          handleLoadFiles={handleLoadFiles}
          selectedFile={selectedFile}
        />
        <Separator orientation="vertical" className="mx-4" />
        <div className="w-4/5 p-4 overflow-auto">
          <div className="mb-4 sticky top-0 bg-white z-10 p-4 shadow-md">
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
          <ArtifactTabs artifacts={artifacts} />
        </div>
      </div>
    </div>
  );
};

export default Index;
