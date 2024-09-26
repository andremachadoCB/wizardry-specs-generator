import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const TreeNode = ({ node, onSelect, selectedFeature, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = () => {
    if (node.feature_name) {
      onSelect(node);
    }
  };

  const isSelected = selectedFeature && node.feature_name === selectedFeature.feature_name;

  return (
    <div className={`ml-${level * 4}`}>
      <div 
        className={`flex items-center cursor-pointer ${node.category_name || node.type ? 'font-semibold' : ''} ${isSelected ? 'text-blue-600' : ''}`}
        onClick={node.category_name || node.type ? toggleOpen : handleSelect}
      >
        {(node.category_name || node.type || (node.features && node.features.length > 0)) && (
          <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
        <span>{node.category_name || node.type || node.feature_name}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {node.featureTypes && Object.entries(node.featureTypes).map(([type, features]) => (
            <TreeNode
              key={type}
              node={{ type: type.charAt(0).toUpperCase() + type.slice(1), features }}
              onSelect={onSelect}
              selectedFeature={selectedFeature}
              level={level + 1}
            />
          ))}
          {node.features && node.features.map((feature) => (
            <TreeNode 
              key={feature.feature_name} 
              node={feature} 
              onSelect={onSelect}
              selectedFeature={selectedFeature}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PRDTreeView = ({ data, onSelect, selectedFeature }) => {
  const groupFeaturesByType = (category) => {
    const groupedFeatures = category.features.reduce((acc, feature) => {
      const type = feature.requirement_type[0].split(' ')[0].toLowerCase();
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(feature);
      return acc;
    }, {});

    return {
      ...category,
      featureTypes: groupedFeatures,
      features: undefined // Remove the original features array
    };
  };

  const groupedData = data.map(groupFeaturesByType);

  return (
    <div className="bg-white rounded-lg p-4 h-[calc(100vh-200px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">System Specification</h2>
      {groupedData.map((category) => (
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
