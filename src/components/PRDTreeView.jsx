import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const TreeNode = ({ node, onSelect, selectedFeature }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = () => {
    if (node.feature_name) {
      onSelect(node);
    }
  };

  const isSelected = selectedFeature && node.feature_name === selectedFeature.feature_name;

  return (
    <div className="ml-4">
      <div 
        className={`flex items-center cursor-pointer ${node.category_name ? 'font-semibold' : ''} ${isSelected ? 'text-blue-600' : ''}`}
        onClick={node.category_name ? toggleOpen : handleSelect}
      >
        {node.category_name && (
          <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
        <span>{node.category_name || node.feature_name}</span>
      </div>
      {isOpen && node.category_name && Array.isArray(node.features) && (
        <div className="ml-4">
          {node.features.map((feature) => (
            <TreeNode 
              key={feature.feature_name} 
              node={feature} 
              onSelect={onSelect}
              selectedFeature={selectedFeature}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PRDTreeView = ({ data, onSelect, selectedFeature }) => {
  return (
    <div className="bg-white rounded-lg p-4 h-[calc(100vh-200px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">System Specification</h2>
      {data.map((category) => (
        <TreeNode
          key={category.category_name}
          node={category}
          onSelect={onSelect}
          selectedFeature={selectedFeature}
        />
      ))}
    </div>
  );
};

export default PRDTreeView;
