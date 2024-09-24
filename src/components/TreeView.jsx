import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

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
    <div className="ml-4">
      <div 
        className={`flex items-center cursor-pointer ${node.type === 'category' ? 'font-semibold' : ''} ${isSelected ? 'text-blue-600' : ''}`}
        onClick={node.type === 'category' ? toggleOpen : handleSelect}
      >
        {node.type === 'category' && (
          <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
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
