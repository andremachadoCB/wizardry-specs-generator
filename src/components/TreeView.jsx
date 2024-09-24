import React from 'react';
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';

const TreeNode = ({ node, onSelect, selectedFeature }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = () => {
    if (node.type === 'feature') {
      onSelect(node);
    }
  };

  const isSelected = selectedFeature && node.type === 'feature' && node.name === selectedFeature.name;

  return (
    <div>
      <div 
        className={`flex items-center cursor-pointer ${node.type === 'category' ? 'font-semibold' : ''} ${isSelected ? 'bg-blue-100 text-blue-600' : ''}`}
        onClick={node.type === 'category' ? toggleOpen : handleSelect}
      >
        {node.type === 'category' ? (
          isOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
        ) : (
          <File className="w-4 h-4 mr-1" />
        )}
        {node.type === 'category' && <Folder className="w-4 h-4 mr-1" />}
        <span>{node.name}</span>
      </div>
      {isOpen && node.type === 'category' && node.features && (
        <div className="ml-4">
          {node.features.map((feature) => (
            <TreeNode 
              key={feature.name} 
              node={{ ...feature, type: 'feature' }} 
              onSelect={onSelect}
              selectedFeature={selectedFeature}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ data, onSelect, selectedFeature }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      {Object.entries(data).map(([category, features]) => (
        <TreeNode
          key={category}
          node={{ name: category, type: 'category', features }}
          onSelect={onSelect}
          selectedFeature={selectedFeature}
        />
      ))}
    </div>
  );
};

export default TreeView;