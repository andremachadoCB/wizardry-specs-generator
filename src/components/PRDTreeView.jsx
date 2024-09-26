import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const TreeNode = ({ node, onSelect, selectedFeature, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = () => {
    if (node.type === 'feature') {
      onSelect(node);
    }
  };

  const isSelected = selectedFeature && node.type === 'feature' && node.feature_name === selectedFeature.feature_name;

  return (
    <div className={`ml-${level * 4}`}>
      <div 
        className={`flex items-center cursor-pointer ${node.type !== 'feature' ? 'font-semibold' : ''} ${isSelected ? 'text-blue-600' : ''}`}
        onClick={node.type !== 'feature' ? toggleOpen : handleSelect}
      >
        {(node.children && node.children.length > 0) && (
          <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
        <span>{node.name}</span>
        {node.count !== undefined && <span className="ml-2 text-sm text-gray-500">({node.count})</span>}
      </div>
      {isOpen && node.children && node.children.length > 0 && (
        <div className="ml-4">
          {node.children.map((child, index) => (
            <TreeNode 
              key={`${child.type}-${child.name}-${index}`}
              node={child} 
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
    return categories.map(category => {
      const groupedFeatures = category.features.reduce((acc, feature) => {
        const types = ['Subsystem', 'Component', 'Program'];
        let currentLevel = acc;

        types.forEach(type => {
          const typeLower = type.toLowerCase();
          const matchingType = feature.requirement_type.find(rt => rt.toLowerCase().includes(typeLower));
          const name = matchingType ? matchingType.split(' ').slice(1).join(' ') : `Ungrouped ${type}`;

          if (!currentLevel.find(item => item.name === name && item.type === typeLower)) {
            currentLevel.push({
              name,
              type: typeLower,
              children: [],
            });
          }

          currentLevel = currentLevel.find(item => item.name === name && item.type === typeLower).children;
        });

        currentLevel.push({
          ...feature,
          type: 'feature',
        });

        return acc;
      }, []);

      return {
        ...category,
        children: groupedFeatures,
      };
    });
  };

  const groupedData = groupRequirements(data);

  return (
    <div className="bg-white rounded-lg p-4 h-[calc(100vh-200px)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">System Specification</h2>
      {groupedData.map((category) => (
        <TreeNode
          key={category.category_name}
          node={{
            name: category.category_name,
            type: 'category',
            children: category.children,
            count: category.features.length,
          }}
          onSelect={onSelect}
          selectedFeature={selectedFeature}
        />
      ))}
    </div>
  );
};

export default PRDTreeView;