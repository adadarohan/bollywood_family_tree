# Bollywood Family Tree
This is Vite + React site with the styling using Tailwind CSS. Here is the way the website works and how to modify it to your needs - 

## Pre-processing data
The first step is to take the CSV input data and convert it to relevant JSON files. This is done in the `data_transformation.ipynb` file, where we import the data into a pandas data frame, delete the unnecessary rows, and then convert it to JSON.
When converting the nodes to JSON, note that we sort them by ID so that lookup is more efficient. 

## Fetching Nodes
Moving to the front, the first order of business is to be able to find neighbouring nodes given a base node ID (called POI). To do this, we start with a default POI and go through every edge seeing if the POI is either a source or target. This is done in the `updateNodes` function in `App.jsx`. 

To find the information on the nodes, we use the `getNodeName` function, which runs a binary search algorithm to speed up node searching.

## Rendering Nodes
The "graph" front end is achieved using React Flow, where we pass an object of nodes and edges for every selected POI. Within the `updateNodes` function, nodes are given x and y coordinates to place them visually. 

This is done through an algorithm that chooses the x value to alternate between putting nodes on the right and left of the POI (to keep visual balance) and chooses the y value based on the relationship with the POI. Edges are formatted with the relationship label, and their colour is chosen using the `color_of_relation` const. 

## Search
Searching is done using the downshift library. The `SearchBox` component takes in a list of all the nodes and largely follows the example in the [downshift documentation](https://www.downshift-js.com/use-combobox) except custom styling. The search box is placed on the screen using React Flow's `panel` prop which allows for it to overlay the graph.

## Testing, Building & Deploying
Run the code locally using `npm run dev` in the `./frontend/` directory. Build by running `npm run build`. 

Important note about building - the directory you will host the site on is important. It is currently configured for `'/bollywood_family_tree/'`, and this can be changed at `vite.config.js` on line 7.
