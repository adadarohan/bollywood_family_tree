import { ReactFlow, Background, Panel } from "reactflow";
import  { useState } from "react";
import "reactflow/dist/style.css";
import data from "./data.json";
import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";

function updateNodes(poi) {
  console.log("updateNodes", poi);

  var numAboveCount = 0;
  var numSameCount = 1;
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


      if (link["relation"] == "parent-child") {
        if (numBelowCount%2 == 0) {
          position.x = 300 + 200 *  (numBelowCount/2);
        } else {
          position.x = 300 - 200 *  ((numBelowCount+1)/2);
        }
        position.y = 500;
        numBelowCount += 1;

      } else if ( link["relation"] == "marriage" || link["relation"] == "sibling") {

        if (numSameCount%2 == 0) {
          position.x = 300 + 200 * (numSameCount/2);
        } else {
          position.x = 300 - 200 * ((numSameCount+1)/2);
        }
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
      if (link["relation"] == "parent-child") {
        if (numAboveCount%2 == 0) {
          position.x = 300 + 200 * (numAboveCount/2);
        } else {
          position.x = 300 - 200 * ((numAboveCount+1)/2);
        }
        position.y = 100;
        numAboveCount += 1;
      } else if (link["relation"] == "marriage" || link["relation"] == "sibling") {
        
        if (numSameCount%2 == 0) {
          position.x = 300 + 200 * (numSameCount/2);
        } else {
          position.x = 300 - 200 * ((numSameCount+1)/2);
        }
        
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
  
  let [poi, setPoi] = useState("Raj Kapoor"); // Default Person
  let { nodes, edges } = updateNodes(poi);

  const handleNodeClick = (event, node) => {
    console.log("click", node);
    setPoi(node.id);
  }

  return (
    <div className="w-screen h-screen flex flex-row">
      <ReactFlow nodes={nodes} edges={edges} draggable={true} fitView onNodeClick={handleNodeClick} >
      <Panel position="top-left">     <Searchbar names={data['nodes']} setPoi={setPoi} /></Panel>

        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <Sidebar poi={poi} />
    </div>
  );
}
