import React, { useEffect, useRef } from 'react';

const ERDComponent = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !data.entities || !data.relationships) return;

    const svg = svgRef.current;
    const width = 800;
    const height = 600;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const entityWidth = 200;
    const entityHeight = 30;
    const entityPadding = 10;

    // Draw entities
    data.entities.forEach((entity, index) => {
      const x = 50 + (index % 3) * (entityWidth + 50);
      const y = 50 + Math.floor(index / 3) * (entityHeight * 5);

      // Entity rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', entityWidth);
      rect.setAttribute('height', entityHeight * (entity.attributes.length + 1));
      rect.setAttribute('fill', '#f0f0f0');
      rect.setAttribute('stroke', '#000');
      svg.appendChild(rect);

      // Entity name
      const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameText.setAttribute('x', x + entityWidth / 2);
      nameText.setAttribute('y', y + entityHeight / 2);
      nameText.setAttribute('text-anchor', 'middle');
      nameText.setAttribute('dominant-baseline', 'middle');
      nameText.setAttribute('font-weight', 'bold');
      nameText.textContent = entity.name;
      svg.appendChild(nameText);

      // Entity attributes
      entity.attributes.forEach((attr, attrIndex) => {
        const attrText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        attrText.setAttribute('x', x + entityPadding);
        attrText.setAttribute('y', y + entityHeight * (attrIndex + 1.5));
        attrText.setAttribute('dominant-baseline', 'middle');
        attrText.textContent = attr;
        svg.appendChild(attrText);
      });
    });

    // Draw relationships
    data.relationships.forEach(rel => {
      const fromEntity = data.entities.find(e => e.name === rel.from);
      const toEntity = data.entities.find(e => e.name === rel.to);

      if (!fromEntity || !toEntity) return;

      const fromIndex = data.entities.indexOf(fromEntity);
      const toIndex = data.entities.indexOf(toEntity);

      const fromX = 50 + (fromIndex % 3) * (entityWidth + 50) + entityWidth;
      const fromY = 50 + Math.floor(fromIndex / 3) * (entityHeight * 5) + entityHeight / 2;

      const toX = 50 + (toIndex % 3) * (entityWidth + 50);
      const toY = 50 + Math.floor(toIndex / 3) * (entityHeight * 5) + entityHeight / 2;

      // Draw line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', fromX);
      line.setAttribute('y1', fromY);
      line.setAttribute('x2', toX);
      line.setAttribute('y2', toY);
      line.setAttribute('stroke', '#000');
      svg.appendChild(line);

      // Draw relationship type and cardinality
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      const relText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      relText.setAttribute('x', midX);
      relText.setAttribute('y', midY);
      relText.setAttribute('text-anchor', 'middle');
      relText.setAttribute('dominant-baseline', 'middle');
      relText.textContent = `${rel.type} (${rel.cardinality})`;
      svg.appendChild(relText);
    });
  }, [data]);

  return (
    <div className="w-full h-[600px] overflow-auto">
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
};

export default ERDComponent;
