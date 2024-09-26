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
        className={`flex items-center cursor-pointer ${node.subsystem || node.component || node.program ? 'font-semibold' : ''} ${isSelected ? 'text-blue-600' : ''}`}
        onClick={node.subsystem || node.component || node.program ? toggleOpen : handleSelect}
      >
        {(node.subsystem || node.component || node.program || (node.features && node.features.length > 0)) && (
          <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
        <span>{node.subsystem || node.component || node.program || node.feature_name}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {node.components && Object.entries(node.components).map(([componentName, componentData]) => (
            <TreeNode
              key={componentName}
              node={{ component: componentName, ...componentData }}
              onSelect={onSelect}
              selectedFeature={selectedFeature}
              level={level + 1}
            />
          ))}
          {node.programs && Object.entries(node.programs).map(([programName, programData]) => (
            <TreeNode
              key={programName}
              node={{ program: programName, ...programData }}
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
  const groupRequirements = (categories) => {
    const groupedData = {};

    categories.forEach(category => {
      category.features.forEach(feature => {
        const subsystem = feature.requirement_type.find(type => type.toLowerCase().includes('subsystem')) || 'Other';
        const component = feature.requirement_type.find(type => type.toLowerCase().includes('component')) || 'General';
        const program = feature.requirement_type.find(type => type.toLowerCase().includes('program')) || 'Uncategorized';

        if (!groupedData[subsystem]) {
          groupedData[subsystem] = { components: {} };
        }
        if (!groupedData[subsystem].components[component]) {
          groupedData[subsystem].components[component] = { programs: {} };
        }
        if (!groupedData[subsystem].components[component].programs[program]) {
          groupedData[subsystem].components[component].programs[program] = { features: [] };
        }
        groupedData[subsystem].components[component].programs[program].features.push(feature);
      });
    });

    return groupedData;
  };

  const groupedData = groupRequirements(data);

  return (
    <div className="bg-white rounded-lg p-4 h-[calc(100vh-200px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">System Specification</h2>
      {Object.entries(groupedData).map(([subsystemName, subsystemData]) => (
        <TreeNode
          key={subsystemName}
          node={{ subsystem: subsystemName, ...subsystemData }}
          onSelect={onSelect}
          selectedFeature={selectedFeature}
        />
      ))}
    </div>
  );
};

export default PRDTreeView;