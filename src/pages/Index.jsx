import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RepoSelector from '../components/RepoSelector';
import RepoFileList from '../components/RepoFileList';
import ArtifactPanel from '../components/ArtifactPanel';
import Navbar from '../components/Navbar';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [selectedRepo, setSelectedRepo] = useState('https://github.com/aws-samples/aws-mainframe-modernization-carddemo/tree/main');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [artifacts, setArtifacts] = useState({
    prd: '',
    features: [],
    userTypes: [],
    dataModels: [],
    knowledgeGraph: '',
    tests: []
  });

  const mockedFiles = [
    'src/main/cobol/CBLACC00.cbl',
    'src/main/cobol/CBLACT00.cbl',
    'src/main/cobol/CBLCRD00.cbl',
    'src/main/cobol/CBLCUS00.cbl',
    'src/main/cobol/CBLTRS00.cbl',
    'src/main/jcl/ACCTREPT.jcl',
    'src/main/jcl/CARDTRN.jcl',
    'src/main/jcl/CUSTFILE.jcl',
    'README.md',
    'pom.xml'
  ];

  const mockedData = {
    prd: `# Product Requirements Document

## Overview
This PRD outlines the requirements for modernizing the AWS Mainframe Modernization Card Demo application.

## Objectives
1. Migrate the existing COBOL-based card processing system to a modern, cloud-native architecture.
2. Improve scalability, maintainability, and performance of the application.
3. Enhance user experience for both customers and bank tellers.

## Key Features
1. Account Management
2. Transaction Processing
3. Customer Information System
4. Reporting and Analytics

## Success Criteria
1. Successful migration of all existing functionality
2. Improved system performance (response times under 200ms for 99% of transactions)
3. 99.99% uptime
4. Compliance with all relevant financial regulations`,
    features: [
      'Account Creation and Management',
      'Credit and Debit Card Transactions',
      'Balance Inquiries',
      'Statement Generation',
      'Fraud Detection',
      'Customer Support Interface',
      'Reporting and Analytics Dashboard'
    ],
    userTypes: ['Customer', 'Bank Teller'],
    dataModels: [
      'Account (ACCFILE)',
      'Transaction (TRANFILE)',
      'Customer (CUSTFILE)',
      'Card (CARDFILE)'
    ],
    knowledgeGraph: 'Knowledge Graph visualization placeholder',
    tests: [
      'Test account creation process',
      'Verify transaction processing accuracy',
      'Check balance inquiry functionality',
      'Validate statement generation',
      'Test fraud detection algorithms',
      'Verify customer support interface usability',
      'Ensure reporting dashboard accuracy'
    ]
  };

  const handleGenerateSpecs = async () => {
    setIsLoading(true);
    // Simulating API call with setTimeout
    setTimeout(() => {
      setArtifacts(mockedData);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    // Here you would typically trigger an analysis of the selected file
    console.log(`File selected for analysis: ${file}`);
  };

  return (
    <div className="bg-crowdbotics-background text-crowdbotics-text min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <RepoSelector
          selectedRepo={selectedRepo}
          onSelectRepo={setSelectedRepo}
        />

        <RepoFileList
          files={mockedFiles}
          onSelectFile={handleFileSelect}
        />

        <Button 
          className="mt-4 mb-6 bg-crowdbotics-button text-crowdbotics-text hover:bg-crowdbotics-button/90"
          onClick={handleGenerateSpecs}
          disabled={!selectedRepo || isLoading || !selectedFile}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Specs'
          )}
        </Button>

        <Tabs defaultValue="prd" className="bg-white rounded-lg p-4">
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
    </div>
  );
};

export default Index;