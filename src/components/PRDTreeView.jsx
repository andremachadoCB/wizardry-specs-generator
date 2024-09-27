import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const getPriorityType = (types) => {
  const priority = ['Subsystem', 'Component', 'Program'];
  return types.find(type => priority.includes(type.toLowerCase())) || types[0];
};

const groupFeatures = (data) => {
  const grouped = {};

  data.forEach(category => {
    category.features.forEach(feature => {
      const type = getPriorityType(feature.requirement_type).toLowerCase();
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      if (!grouped[capitalizedType]) {
        grouped[capitalizedType] = {};
      }
      if (!grouped[capitalizedType][category.category_name]) {
        grouped[capitalizedType][category.category_name] = [];
      }
      grouped[capitalizedType][category.category_name].push(feature);
    });
  });

  return grouped;
};

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
        {(node.category_name || node.type || node.features) && (
          <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
        <span>{node.type || node.category_name || node.feature_name}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {node.categories && Object.entries(node.categories).map(([category, features]) => (
            <TreeNode
              key={category}
              node={{ category_name: category, features }}
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
  const groupedData = groupFeatures(data);

  return (
    <div className="bg-white rounded-lg p-4 h-[calc(100vh-200px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">System Specification</h2>
      {Object.entries(groupedData).map(([type, categories]) => (
        <TreeNode
          key={type}
          node={{ type, categories }}
          onSelect={onSelect}
          selectedFeature={selectedFeature}
        />
      ))}
    </div>
  );
};

export default PRDTreeView;