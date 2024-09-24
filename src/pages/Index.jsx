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
    prd: [
      {
        "category_name": "File Operations",
        "features": [
          {
            "feature_name": "Open account file",
            "description": "The 'Open account file' feature is responsible for opening the account data file in the CardDemo application. This feature ensures that the file is accessible for subsequent read operations. The file is opened in an indexed sequential access mode, and the program checks the file status to confirm successful opening. If the file cannot be opened, appropriate error handling routines are triggered to manage the situation.",
            "acceptance_criteria": [
              "The account file should be defined as an indexed file with sequential access mode.",
              "The program should attempt to open the account file at the beginning of the execution.",
              "The file status should be checked immediately after attempting to open the file.",
              "If the file is successfully opened, a confirmation message should be displayed.",
              "If the file cannot be opened, an appropriate error message should be displayed, and the program should trigger the error handling routine.",
              "The program should not proceed with reading records if the file is not successfully opened.",
              "The file should be closed properly at the end of the program or in case of an error."
            ]
          },
          {
            "feature_name": "Read account file",
            "description": "The feature 'Read account file' involves developing a batch COBOL program that reads and prints account data from an indexed file. The program should handle file operations such as opening, reading, and closing the file, and include error handling routines to manage file status and abend the program if necessary. The program should also display appropriate messages at the start and end of the process, and whenever an error occurs.",
            "acceptance_criteria": [
              "The program must display a start message when it begins execution.",
              "The program must open the account file successfully and check the file status.",
              "The program must read records sequentially from the account file and display each record's details.",
              "The program must handle the end-of-file condition gracefully and display an appropriate message.",
              "The program must close the account file after reading all records and check the file status.",
              "The program must display an end message when it completes execution.",
              "The program must include error handling routines to manage file status errors and abend the program if necessary.",
              "The program must display the I/O status in case of an error.",
              "The program must use the 'CVACT01Y' copybook for additional data definitions.",
              "The program must call the 'CEE3ABD' program for abending in case of critical errors."
            ]
          },
          {
            "feature_name": "Close account file",
            "description": "The 'Close account file' feature ensures that the account file is properly closed after all necessary operations have been performed. This feature is crucial for maintaining data integrity and preventing file corruption. The feature includes error handling to check the file status and abend the program if the file cannot be closed successfully.",
            "acceptance_criteria": [
              "The account file should be closed after all records have been read and processed.",
              "The program should check the file status after attempting to close the account file.",
              "If the file is closed successfully, a confirmation message should be displayed.",
              "If the file cannot be closed, the program should display an appropriate error message.",
              "The program should abend if the file cannot be closed successfully, using the '9999-ABEND-PROGRAM' routine.",
              "The '9000-ACCTFILE-CLOSE' routine should be invoked to close the account file and handle the file status."
            ]
          }
        ]
      },
      {
        "category_name": "Error Handling",
        "features": [
          {
            "feature_name": "File status checking",
            "description": "The 'File status checking' feature ensures that the program properly handles and reports the status of file operations. This includes checking the status after opening, reading, and closing the account file. If any file operation fails, the program should display an appropriate error message and take necessary actions, such as abending the program.",
            "acceptance_criteria": [
              "The program must check the file status immediately after attempting to open the account file.",
              "If the account file fails to open, the program should display an error message and abend the program.",
              "The program must check the file status after each read operation from the account file.",
              "If a read operation fails, the program should display an error message and abend the program.",
              "The program must check the file status immediately after attempting to close the account file.",
              "If the account file fails to close, the program should display an error message and abend the program.",
              "The program should use the '9910-DISPLAY-IO-STATUS' routine to display the I/O status in case of an error.",
              "The program should use the '9999-ABEND-PROGRAM' routine to abend the program in case of a critical error."
            ]
          },
          {
            "feature_name": "Program abend on error",
            "description": "Implement a feature in the CBACT01C COBOL program to abend (abnormally end) the program in case of an error during file operations. This feature ensures that the program terminates safely and provides appropriate error messages when it encounters issues such as file not found, file read errors, or any other I/O errors.",
            "acceptance_criteria": [
              "The program should call the `9999-ABEND-PROGRAM` routine when an error is detected during file operations.",
              "The `9999-ABEND-PROGRAM` routine should use the `CEE3ABD` program to abend the program.",
              "The program should display an appropriate error message before abending.",
              "The program should handle different types of file status codes and provide specific messages for each type of error.",
              "The program should ensure that all open files are closed properly before abending.",
              "The program should log the error details, including the file status code and the operation that caused the error, before abending."
            ]
          },
          {
            "feature_name": "Display I/O status",
            "description": "The 'Display I/O status' feature is designed to provide detailed information about the status of file operations within the CBACT01C program. This feature ensures that any issues encountered during file operations are clearly communicated to the user, aiding in troubleshooting and debugging. The status information will be displayed whenever an I/O operation (such as opening, reading, or closing a file) fails or encounters an error.",
            "acceptance_criteria": [
              "The program must display a clear and concise message indicating the status of the file operation whenever an error occurs.",
              "The displayed I/O status message must include the file status code and a brief description of the error.",
              "The I/O status message should be displayed immediately after the error is detected, without proceeding to the next operation.",
              "The I/O status message must be displayed using the '9910-DISPLAY-IO-STATUS' routine.",
              "The program must handle different types of file errors (e.g., file not found, access denied, end of file) and display appropriate messages for each.",
              "The I/O status message should be logged in the program's output for future reference and debugging purposes.",
              "The program must terminate gracefully after displaying the I/O status message if the error is critical (e.g., unable to open the file)."
            ]
          }
        ]
      },
      {
        "category_name": "Data Display",
        "features": [
          {
            "feature_name": "Display start message",
            "description": "The feature 'Display start message' is responsible for displaying a message to indicate the beginning of the program execution. This message serves as a confirmation that the program has started running and is ready to perform its operations.",
            "acceptance_criteria": [
              "The start message should be displayed immediately after the program begins execution.",
              "The message should be clear and indicate that the program has started.",
              "The message should be displayed on the standard output (console).",
              "The message should be displayed before any file operations are performed.",
              "The message should be consistent with the program's overall messaging and format."
            ]
          },
          {
            "feature_name": "Display account records",
            "description": "The feature 'Display account records' involves reading and displaying account data from an indexed file. The program should sequentially access the account file, retrieve each record, and display the relevant account details to the user. The process should handle file operations such as opening, reading, and closing the file, and include error handling to manage file status and abend the program if necessary.",
            "acceptance_criteria": [
              "The program should display a start message indicating the beginning of the account records display process.",
              "The program should successfully open the account file and handle any errors that occur during the file opening process.",
              "The program should read each account record sequentially from the indexed file and display the account details.",
              "The program should handle the end-of-file condition gracefully and stop reading further records.",
              "The program should display an end message indicating the completion of the account records display process.",
              "The program should close the account file after all records have been read and displayed, handling any errors that occur during the file closing process.",
              "The program should include error handling routines to display the I/O status and abend the program if a critical error occurs during file operations."
            ]
          },
          {
            "feature_name": "Display end message",
            "description": "The feature 'Display end message' is designed to notify the user that the program has successfully completed reading and processing all account records from the account file. This message will be displayed at the end of the program execution, indicating that the program has reached its termination point without any errors.",
            "acceptance_criteria": [
              "The end message should be displayed after all account records have been read and processed.",
              "The end message should be clear and indicate that the program has completed successfully.",
              "The end message should be displayed only if the account file was successfully opened and read without any errors.",
              "The end message should be displayed before the program terminates.",
              "The end message should be consistent with the format and style of other messages displayed by the program."
            ]
          }
        ]
      },
      {
        "category_name": "Procedures",
        "features": [
          {
            "feature_name": "1000-ACCTFILE-GET-NEXT",
            "description": "The 1000-ACCTFILE-GET-NEXT routine is responsible for reading the next record from the account file (ACCTFILE-FILE). This routine handles the sequential reading of records and manages the file status to ensure proper error handling. If the end of the file is reached or an error occurs, appropriate actions are taken to handle these scenarios.",
            "acceptance_criteria": [
              "AC1: The routine must read the next record from the ACCTFILE-FILE when invoked.",
              "AC2: The routine must update the file status field (ACCTFILE-STATUS) after each read operation.",
              "AC3: If the read operation is successful, the routine must store the record data in the appropriate working-storage fields.",
              "AC4: If the end of the file is reached (status code 10), the routine must set an end-of-file indicator (EOF-SW) to TRUE.",
              "AC5: If an error occurs during the read operation (status code other than 00 or 10), the routine must call the 9910-DISPLAY-IO-STATUS routine to display the I/O status and then call the 9999-ABEND-PROGRAM routine to terminate the program.",
              "AC6: The routine must ensure that it handles all possible file status codes appropriately and takes necessary actions based on the status code."
            ]
          },
          {
            "feature_name": "1100-DISPLAY-ACCT-RECORD",
            "description": "The 1100-DISPLAY-ACCT-RECORD feature is responsible for displaying the details of an account record retrieved from the account file. This feature ensures that the account data is presented in a readable format for the user. It is part of the main procedure division of the CBACT01C program, which reads and prints account data from an indexed file.",
            "acceptance_criteria": [
              "AC1: The feature must correctly display all relevant fields of the account record, including account ID and account data, as defined in the copybook CVACT01Y.",
              "AC2: The feature must handle and display records sequentially as they are read from the account file.",
              "AC3: The feature must ensure that the displayed data is formatted in a readable and user-friendly manner.",
              "AC4: The feature must be invoked after successfully reading a record from the account file.",
              "AC5: The feature must handle any potential errors in displaying the account record and provide appropriate error messages if necessary.",
              "AC6: The feature must be tested with various account records to ensure it handles different data scenarios correctly."
            ]
          },
          {
            "feature_name": "0000-ACCTFILE-OPEN",
            "description": "The 0000-ACCTFILE-OPEN feature is responsible for opening the account file (ACCTFILE-FILE) in the CBACT01C program. This feature ensures that the file is opened in the correct mode and verifies the file status to ensure it is ready for subsequent read operations. If the file cannot be opened, the feature will handle the error appropriately by displaying an error message and abending the program if necessary.",
            "acceptance_criteria": [
              "AC1: The account file (ACCTFILE-FILE) must be opened in INPUT mode.",
              "AC2: The file status must be checked immediately after attempting to open the file.",
              "AC3: If the file is successfully opened, the program should proceed to the next operation without interruption.",
              "AC4: If the file cannot be opened, an appropriate error message must be displayed to the user.",
              "AC5: If the file cannot be opened, the program must call the 9999-ABEND-PROGRAM routine to terminate the program gracefully.",
              "AC6: The feature must utilize the file status field (WS-FILE-STATUS) to determine the success or failure of the file open operation.",
              "AC7: The feature must be implemented as a separate procedure (0000-ACCTFILE-OPEN) within the Procedure Division of the CBACT01C program."
            ]
          },
          {
            "feature_name": "9000-ACCTFILE-CLOSE",
            "description": "The 9000-ACCTFILE-CLOSE feature is responsible for closing the account file (ACCTFILE-FILE) in the CBACT01C program. This routine ensures that the file is properly closed after all read operations are completed. It also checks the file status to confirm that the file has been closed successfully and handles any errors that may occur during the closing process.",
            "acceptance_criteria": [
              "AC1: The routine must close the ACCTFILE-FILE after all read operations are completed.",
              "AC2: The routine must check the file status after attempting to close the file.",
              "AC3: If the file is closed successfully, the routine should proceed without any errors.",
              "AC4: If there is an error while closing the file, the routine must handle the error appropriately and display the I/O status.",
              "AC5: The routine should ensure that no further operations are performed on the file once it is closed."
            ]
          },
          {
            "feature_name": "9999-ABEND-PROGRAM",
            "description": "The 9999-ABEND-PROGRAM feature is responsible for terminating the program execution in the event of a critical error. This routine ensures that the program halts gracefully and provides an appropriate error message to aid in debugging and resolution. It utilizes the CEE3ABD program to perform the abend operation.",
            "acceptance_criteria": [
              "AC1: The 9999-ABEND-PROGRAM routine must be invoked whenever a critical error is encountered during the program execution.",
              "AC2: The routine must call the CEE3ABD program to perform the abend operation.",
              "AC3: An appropriate error message must be displayed to the user before the program terminates.",
              "AC4: The routine must ensure that any open files are properly closed before abending the program.",
              "AC5: The program must terminate gracefully without leaving any resources in an inconsistent state."
            ]
          },
          {
            "feature_name": "9910-DISPLAY-IO-STATUS",
            "description": "The 9910-DISPLAY-IO-STATUS feature is responsible for displaying the I/O status of file operations within the CBACT01C program. This routine is invoked whenever an I/O operation encounters an error, providing detailed information about the file status to facilitate debugging and error handling.",
            "acceptance_criteria": [
              "AC1: The routine must be invoked whenever an I/O operation returns a non-zero file status.",
              "AC2: The routine must display the file status code and a corresponding error message to the console.",
              "AC3: The routine must handle different file status codes and provide specific messages for common errors such as 'file not found', 'end of file', and 'file locked'.",
              "AC4: The routine must ensure that the displayed messages are clear and informative to aid in troubleshooting.",
              "AC5: The routine must log the I/O status information to a designated log file for further analysis if required.",
              "AC6: The routine must terminate gracefully after displaying the I/O status, ensuring that no further operations are attempted on the problematic file."
            ]
          }
        ]
      },
      {
        "category_name": "Referenced Components",
        "features": [
          {
            "feature_name": "Copybook CVACT01Y",
            "description": "The Copybook CVACT01Y is a COBOL copybook used in the CardDemo application. It contains additional data definitions that are utilized by the CBACT01C program for handling account data. This copybook provides the structure and layout for account records, ensuring consistency and standardization across the application.",
            "acceptance_criteria": [
              "The copybook CVACT01Y should define the structure for account records, including all necessary fields such as account ID, account data, and any other relevant information.",
              "The copybook should be included in the CBACT01C program and any other programs that require the account data structure.",
              "The fields defined in the copybook should be correctly mapped to the corresponding fields in the account file.",
              "The copybook should be thoroughly documented, including descriptions for each field and any relevant comments to aid in understanding and maintenance.",
              "The copybook should be tested to ensure that it correctly defines the account record structure and that programs using it can read and process account data without errors."
            ]
          },
          {
            "feature_name": "Program CEE3ABD",
            "description": "The CEE3ABD program is a utility used within the CBACT01C batch COBOL program to abend (abnormally terminate) the program in case of critical errors. This utility ensures that the program halts execution and provides a mechanism to handle unexpected situations gracefully, allowing for proper error logging and system recovery.",
            "acceptance_criteria": [
              "The CEE3ABD program should be callable from within the CBACT01C program.",
              "When invoked, CEE3ABD should abend the CBACT01C program immediately.",
              "CEE3ABD should provide a mechanism to log the reason for the abend, including relevant error codes and messages.",
              "The program should ensure that all open files are properly closed before abending.",
              "CEE3ABD should be compatible with the mainframe environment and adhere to the system's error handling protocols.",
              "The abend process should be tested to confirm that it halts the program execution and logs the error details correctly.",
              "Documentation should be provided on how to invoke CEE3ABD and interpret its error logs."
            ]
          }
        ]
      }
    ],
    ],
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
        prd: data.categories || artifacts.prd,
        userTypes: data.user_types || [],
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

  const handleFeatureUpdate = (updatedFeature) => {
    setArtifacts(prevArtifacts => ({
      ...prevArtifacts,
      prd: prevArtifacts.prd.map(category => ({
        ...category,
        features: category.features.map(feature => 
          feature.feature_name === updatedFeature.feature_name ? updatedFeature : feature
        )
      }))
    }));
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
            <ArtifactTabs artifacts={artifacts} onFeatureUpdate={handleFeatureUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
