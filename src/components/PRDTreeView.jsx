import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const getPriorityType = (types) => {
  const priority = ['Subsystem', 'Component', 'Program'];
  const normalizedTypes = types.map(type => type.toLowerCase());
  return priority.find(type => normalizedTypes.includes(type.toLowerCase())) || types[0];
};

const groupFeatures = (data) => {
  const grouped = {
    Subsystem: {},
    Component: {},
    Program: {}
  };

  data.forEach(category => {
    category.features.forEach(feature => {
      const type = getPriorityType(feature.requirement_type);
      if (!grouped[type]) {
        grouped[type] = {};
      }
      
      let subType = '';
      if (type === 'Component' && feature.requirement_type.length > 1) {
        subType = feature.requirement_type.find(t => t.toLowerCase() !== 'component') || '';
      }
      
      if (!grouped[type][subType]) {
        grouped[type][subType] = {};
      }
      
      if (!grouped[type][subType][category.category_name]) {
        grouped[type][subType][category.category_name] = [];
      }
      
      grouped[type][subType][category.category_name].push(feature);
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
        className={`flex items-center cursor-pointer ${node.type || node.category_name ? 'font-semibold' : ''} ${isSelected ? 'text-blue-600' : ''}`}
        onClick={node.type || node.category_name ? toggleOpen : handleSelect}
      >
        {(node.type || node.category_name || node.features) && (
          <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
        <span>{node.type || node.category_name || node.feature_name}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {node.subTypes && Object.entries(node.subTypes).map(([subType, categories]) => (
            <TreeNode
              key={subType}
              node={{ type: subType, categories }}
              onSelect={onSelect}
              selectedFeature={selectedFeature}
              level={level + 1}
            />
          ))}
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
      {Object.entries(groupedData).map(([type, subTypes]) => (
        <TreeNode
          key={type}
          node={{ type, subTypes }}
          onSelect={onSelect}
          selectedFeature={selectedFeature}
        />
      ))}
    </div>
  );
};

export default PRDTreeView;