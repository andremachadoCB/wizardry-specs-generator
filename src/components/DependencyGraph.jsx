import React, { useCallback, memo } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  useNodesState, 
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const CustomNode = memo(({ data }) => {
  return (
    <div className="px-2 py-1 shadow-md rounded-md bg-white border border-gray-300">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center">
        <span className="text-xs font-medium">{data.label}</span>
        {data.count && (
          <span className="ml-1 px-1 bg-gray-200 rounded-full text-xs">{data.count}</span>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

const defaultData = {
  "file_path": "app/cbl/CBACT01C.cbl",
  "file_summary": "# Program Summary: `CBACT01C.CBL`\n\n## General Information\n- **Program Name**: CBACT01C\n- **Description**: Read and print account data file.\n- **Application**: CardDemo\n- **Author**: AWS\n- **Program Type**: Batch COBOL Program\n- **Last Modified**: 2022-07-19\n\n---\n\n## File I/O Operations\n\n### Input Files\n- **File Name**: `SELECT ACCTFILE-FILE`\n  - **Access Mode**: SEQUENTIAL\n  - **Record Key**: `FD-ACCT-ID`\n  - **File Status**: `ACCTFILE-STATUS`\n\n---\n\n## Copybook References\n- **Copybook**: `COPY CVACT01Y`\n\n---\n\n## Key Sections\n\n### Identification Division\n- **Program ID**: CBACT01C\n- **Author**: AWS\n\n### Environment Division\n- **Input-Output Section**\n  - **File Assignments**: Lists and describes the files associated with the program.\n\n### Data Division\n- **File Section**\n  - **Input Record Structures**: Describes the structure of the account file record.\n\n### Procedure Division\n- **Main Procedures**:\n  - `0000-ACCTFILE-OPEN`: Opens the account file.\n  - `1000-ACCTFILE-GET-NEXT`: Reads the next record from the account file.\n  - `1100-DISPLAY-ACCT-RECORD`: Displays the account record.\n  - `9000-ACCTFILE-CLOSE`: Closes the account file.\n  - `9910-DISPLAY-IO-STATUS`: Displays the I/O status.\n  - `9999-ABEND-PROGRAM`: Abends the program in case of an error.\n\n---\n\n## Data Structures\n\n### Record Definitions\n- **Record Name**: `FD-ACCTFILE-REC`\n  - **Field 1**: `FD-ACCT-ID` - `PIC 9(11)`\n  - **Field 2**: `FD-ACCT-DATA` - `PIC X(289)`\n\n---\n\n## Program Logic\n\n### Primary Functions\n- **Function**: Reads records from the account file and displays them.\n- **Function**: Handles file opening, reading, and closing operations.\n\n---\n\n## External Dependencies\n\n### JCL Job\n- **JCL Name**: `ACCTFILE.jcl`\n  \n### Components:\n- **Program Name**: `CBACT02C.cbl`\n- **Program Name**: `CBACT03C.cbl`\n- **Program Name**: `CBACT04C.cbl`\n\n---\n\n## Execution Flow\n\n1. **Open Input Files**\n   - Opens `ACCTFILE-FILE`.\n   \n2. **Process Records**\n   - Reads records from the account file and displays them.\n   \n3. **Close Files**\n   - Closes the account file upon completion.\n\n---\n\n## Error Handling\n\n### File Status Checking\n- **Status Variable**: `ACCTFILE-STATUS` - Describes how file status is handled and which variables are checked.\n\n### Error Messages\n- **Error Description**: `DISPLAY 'ERROR OPENING ACCTFILE'`\n- **Error Description**: `DISPLAY 'ERROR READING ACCOUNT FILE'`\n- **Error Description**: `DISPLAY 'ERROR CLOSING ACCOUNT FILE'`\n\n---\n\n## Program Metadata\n- **Version**: CardDemo_v1.0-15-g27d6c6f-68\n- **Last Reviewed**: 2022-07-19",
  "analysis": {
    "File Operations": [
      "Open account file",
      "Read next record from account file",
      "Display account record",
      "Close account file",
      "Display I/O status",
      "Abend program on error"
    ],
    "Data Structures": [
      "Account file record structure",
      "File status variables",
      "I/O status variables",
      "Binary and alphanumeric fields",
      "Application result codes",
      "End-of-file indicator"
    ],
    "Error Handling": [
      "Check file status",
      "Display error messages",
      "Move status to I/O status",
      "Perform abend routine"
    ],
    "Program Metadata": [
      "Program ID",
      "Author",
      "Last Modified",
      "Description",
      "Application",
      "Program Type"
    ],
    "Related Programs": {
      "Account Data Operations": [
        "CBACT01C.cbl - Read and print account data file",
        "CBACT02C.cbl - Read and print card data file",
        "CBACT03C.cbl - Read and print account cross-reference data file",
        "CBACT04C.cbl - Interest calculator program"
      ],
      "File Operations": [
        "Open account file",
        "Read next record",
        "Display record",
        "Close file",
        "Display I/O status",
        "Abend program on error"
      ],
      "Data Structures": [
        "Account file record structure",
        "Card file record structure",
        "Cross-reference file record structure",
        "Interest calculation data structures",
        "File status variables",
        "I/O status variables",
        "Binary and alphanumeric fields",
        "Application result codes",
        "End-of-file indicator"
      ],
      "Error Handling": [
        "Check file status",
        "Display error messages",
        "Move status to I/O status",
        "Perform abend routine"
      ],
      "Program Metadata": [
        "Program ID",
        "Author",
        "Last Modified",
        "Description",
        "Application",
        "Program Type"
      ]
    },
    "External Dependencies": [
      "JCL Job - ACCTFILE.jcl",
      "Components - CBACT02C.cbl, CBACT03C.cbl, CBACT04C.cbl"
    ],
    "Execution Flow": [
      "Open Input Files",
      "Process Records",
      "Close Files"
    ]
  }
};

const DependencyGraph = ({ data = defaultData }) => {
  const createNodes = useCallback((analysisData) => {
    if (!analysisData || typeof analysisData !== 'object' || !analysisData.analysis) {
      console.error('Invalid analysis data:', analysisData);
      return { nodes: [], edges: [] };
    }

    const nodes = [];
    const edges = [];
    let yPosition = 0;
    const xSpacing = 250;
    const ySpacing = 50;

    const addNode = (id, label, x, y, count = null) => {
      nodes.push({
        id,
        type: 'custom',
        position: { x, y },
        data: { label, count },
      });
    };

    const addEdge = (source, target) => {
      edges.push({
        id: `${source}-${target}`,
        source,
        target,
        type: 'smoothstep',
      });
    };

    // Add file path node
    const filePath = analysisData.file_path || 'Unknown File';
    addNode('file_path', filePath, 0, 0);

    // Process main categories
    Object.entries(analysisData.analysis).forEach(([category, items], index) => {
      if (items && typeof items === 'object') {
        const categoryId = `category_${index}`;
        addNode(categoryId, category, xSpacing, yPosition, Array.isArray(items) ? items.length : Object.keys(items).length);
        addEdge('file_path', categoryId);

        // Process items within each category
        if (Array.isArray(items)) {
          items.forEach((item, itemIndex) => {
            const itemId = `${categoryId}_item_${itemIndex}`;
            addNode(itemId, item, xSpacing * 2, yPosition);
            addEdge(categoryId, itemId);
            yPosition += ySpacing;
          });
        } else if (typeof items === 'object') {
          Object.entries(items).forEach(([subCategory, subItems], subIndex) => {
            const subCategoryId = `${categoryId}_sub_${subIndex}`;
            addNode(subCategoryId, subCategory, xSpacing * 2, yPosition, Array.isArray(subItems) ? subItems.length : Object.keys(subItems).length);
            addEdge(categoryId, subCategoryId);

            if (Array.isArray(subItems)) {
              subItems.forEach((subItem, subItemIndex) => {
                const subItemId = `${subCategoryId}_item_${subItemIndex}`;
                addNode(subItemId, subItem, xSpacing * 3, yPosition);
                addEdge(subCategoryId, subItemId);
                yPosition += ySpacing;
              });
            }

            yPosition += ySpacing * 2;
          });
        }

        yPosition += ySpacing * 2;
      }
    });

    return { nodes, edges };
  }, []);

  const { nodes, edges } = createNodes(data);

  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const nodeTypes = {
    custom: CustomNode,
  };

  if (!data || typeof data !== 'object' || !data.analysis) {
    return <div>No valid data available for the dependency graph.</div>;
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background color="#f0f0f0" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default DependencyGraph;
