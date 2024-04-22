import { ReactFlow, Background, Panel, MarkerType} from "reactflow";
import  { useState } from "react";
import "reactflow/dist/style.css";
import nodes_json from "./nodes.json";
import edges_json from "./edges.json";
import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";


const color_of_relation = {
  "parent-child": "#FF5733",
  "marriage": "#33FF57",
  "sibling": "#3357FF",
};

function getNodeName(poi){
  // Binary search to find the node with the given id
  var left = 0;
  var right = nodes_json.length - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    if (nodes_json[mid]["id"] == poi) {
      return nodes_json[mid]["first_name"] + " " + nodes_json[mid]["last_name"];
    } else if (nodes_json[mid]["id"] < poi) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null;

}

function updateNodes(poi) {
  console.log("updateNodes", poi);

  var numAboveCount = 0;
  var numSameCount = 1;
  var numBelowCount = 0;

  var nodes = [{ id: poi, position: { x: 300, y: 300 }, data: { label: getNodeName(poi)} }];
  var edges = [];

  // Add nodes and edges for all links that have the poi as source or target
  for (var i = 0; i < edges_json.length; i++) {
    var link = edges_json[i]; // Link is an object with source_id, target_id, relation
    var position = { x: 0, y: 0 };
    var sourcePosition = 'bottom'; // default
    var targetPosition = 'top'; // default

    // If the link has the poi as source, add the target as a node
    if (link["source_id"] == poi) {

      // If the relation is parent-child, add the target below the poi  
      if (link["relation"] == "parent-child") {
        if (numBelowCount%2 == 0) {
          position.x = 300 + 200 *  (numBelowCount/2);
        } else {
          position.x = 300 - 200 *  ((numBelowCount+1)/2);
        }
        position.y = 500;
        numBelowCount += 1;

      } else if ( link["relation"] == "marriage" || link["relation"] == "sibling") {
        // If the relation is marriage or sibling, add the target at the same level as the poi

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
        id: link["target_id"],
        position: position,
        data: { label: getNodeName(link["target_id"])},
        sourcePosition: sourcePosition,
        targetPosition: targetPosition,
      });
      edges.push({
        id: "e" + link["source_id"] + link["target_id"],
        source: link["source_id"],
        target: link["target_id"],
        label: link["relation"],
        style: {
          strokeWidth: 2,
          stroke: color_of_relation[link["relation"]],
        },
      });
    }

    if (link["target_id"] == poi) {
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
        id: link["source_id"],
        position: position,
        data: { label: getNodeName(link["source_id"])},
        sourcePosition: sourcePosition,
        targetPosition: targetPosition,

      });

      edges.push({
        id: "e" + link["source_id"] + link["target_id"],
        source: link["source_id"],
        target: link["target_id"],
        label: link["relation"],
        style: {
          strokeWidth: 2,
          stroke: color_of_relation[link["relation"]],
        },
      });
    }
  }

  console.log(nodes);
  return { nodes, edges };
}

export default function App() {
  
  // POI = Person of Interest's ID
  let [poi, setPoi] = useState("nm0004292"); // Default Person - Raj Kapoor for now
  let { nodes, edges } = updateNodes(poi); // Initial nodes and edges

  // Update nodes and edges when POI changes
  const handleNodeClick = (event, node) => {
    console.log("click", node);
    setPoi(node.id);
  }

  return (
    <div className="w-screen h-screen flex flex-row">
      <ReactFlow nodes={nodes} edges={edges} draggable={true} fitView onNodeClick={handleNodeClick} >
        <Panel position="top-left">     
          <Searchbar names={nodes_json} setPoi={setPoi} />
        </Panel>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <Sidebar name={getNodeName(poi)} id={poi} />
    </div>
  );
}
