import { ReactFlow, Background } from "reactflow";

import "reactflow/dist/style.css";
import data from "./data.json";

const poi = "Balwantrao Abhisheki";

function updateNodes() {
  var numAboveCount = 0;
  var numSameCount = 0;
  var numBelowCount = 0;

  var nodes = [{ id: poi, position: { x: 300, y: 300 }, data: { label: poi } }];
  var edges = [];

  // Add nodes and edges for all links that have the poi as source or target
  for (var i = 0; i < data["links"].length; i++) {
    var link = data["links"][i];
    var position = { x: 0, y: 0 };
    var sourcePosition = 'bottom'; // default
    var targetPosition = 'top'; // default

    if (link["source"] == poi) {

      console.log(link["target"])

      if (link["relation"] == "parent-child") {
        let mult = numSameCount%2 == 0 ? 1 : -1;
        position.x = 300 + 200 * mult * (numBelowCount);
        position.y = 500;
        numBelowCount += 1;

      } else if ( link["relation"] == "marriage" || link["relation"] == "sibling") {
        let mult = numSameCount%2 == 0 ? 1 : -1;
        position.x = 300 + 300 * mult * (numSameCount + 1); // We add 1 bc we want to leave space for the poi
        position.y = 300;
        sourcePosition = numSameCount%2 == 0 ? 'left' : 'right';
        targetPosition = numSameCount%2 == 0 ? 'left' : 'right';
        numSameCount += 1;

      }


      nodes.push({
        id: link["target"],
        position: position,
        data: { label: link["target"] },
        sourcePosition: sourcePosition,
        targetPosition: targetPosition,
      });
      edges.push({
        id: "e" + link["source"] + link["target"],
        source: link["source"],
        target: link["target"],
        label: link["relation"],
      });
    }

    if (link["target"] == poi) {
      console.log(link["source"])
      if (link["relation"] == "parent-child") {
        let mult = numAboveCount%2 == 0 ? 1 : -1;
        position.x = 300 + (200 * mult * (numAboveCount));
        position.y = 100;
        console.log(position.x, position.y, numAboveCount)
        numAboveCount += 1;
      } else if (
        link["relation"] == "marriage" || link["relation"] == "sibling") {
        let mult = numSameCount%2 == 0 ? 1 : -1;
        position.x = 300 + 300 * mult * (numSameCount + 1);
        position.y = 300;
        sourcePosition = numSameCount%2 == 0 ? 'left' : 'right';
        targetPosition = numSameCount%2 == 0 ? 'left' : 'right';
        numSameCount += 1;
      }

      nodes.push({
        id: link["source"],
        position: position,
        data: { label: link["source"] },
        sourcePosition: sourcePosition,
        targetPosition: targetPosition,

      });

      edges.push({
        id: "e" + link["source"] + link["target"],
        source: link["source"],
        target: link["target"],
        label: link["relation"],
      });
    }
  }

  console.log(nodes);
  return { nodes, edges };
}

export default function App() {
  

  let { nodes, edges } = updateNodes();
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} draggable={true} fitView>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
