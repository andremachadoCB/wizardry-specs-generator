import React from 'react';
import { ForceGraph2D } from 'react-force-graph';

const KnowledgeGraphComponent = ({ data }) => (
  <div style={{ width: '100%', height: '600px' }}>
    <ForceGraph2D
      graphData={data}
      nodeLabel={(node) => `${node.name} (${node.type})`}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = `${node.name} (${node.type})`;
        const fontSize = 12/globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = node.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, node.x, node.y);
      }}
      nodeCanvasObjectMode={() => 'replace'}
      linkLabel="label"
      linkCanvasObjectMode={() => 'after'}
      linkCanvasObject={(link, ctx) => {
        const start = link.source;
        const end = link.target;
        const textPos = Object.assign({}, start);
        textPos.x = start.x + (end.x - start.x) / 2;
        textPos.y = start.y + (end.y - start.y) / 2;
        ctx.font = '6px Sans-Serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(link.label, textPos.x, textPos.y);
      }}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
    />
  </div>
);

export default KnowledgeGraphComponent;