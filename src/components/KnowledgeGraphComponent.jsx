import React, { useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const KnowledgeGraphComponent = ({ data }) => {
  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 2 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(label, node.x, node.y);

    ctx.beginPath();
    ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    ctx.fill();
  }, []);

  const colorMap = {
    Program: '#FF6B6B',
    File: '#CCCCCC',
    Procedure: '#45B7D1',
    Variable: '#FFA07A',
  };

  const Legend = () => (
    <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
      <h4 className="text-sm font-bold mb-1">Legend:</h4>
      {Object.entries(colorMap).map(([type, color]) => (
        <div key={type} className="flex items-center mb-1">
          <div style={{ backgroundColor: color }} className="w-3 h-3 rounded-full mr-2"></div>
          <span className="text-xs">{type}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative" style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        graphData={data}
        nodeLabel="name"
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        linkLabel="label"
        linkCanvasObjectMode={() => 'after'}
        linkCanvasObject={(link, ctx) => {
          const start = link.source;
          const end = link.target;
          const textPos = Object.assign({}, start);
          textPos.x = start.x + (end.x - start.x) / 2;
          textPos.y = start.y + (end.y - start.y) / 2;
          ctx.font = '2px Sans-Serif';
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(link.label, textPos.x, textPos.y);
        }}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
      />
      <Legend />
    </div>
  );
};

export default KnowledgeGraphComponent;
