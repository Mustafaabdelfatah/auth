import { MarkerType } from '@vue-flow/core'


export function buildGraph(data, nodes = [], edges = [], parentId = null, x = 0, y = 0, depth = 0) {
    const baseVerticalSpacing = 200;
    const horizontalSpacing = 450;
    const nodeWidth = 100; // Adjust this based on the size of your nodes
    const nodeHeight = 100;

    // Calculate vertical spacing based on depth
    const verticalSpacing = baseVerticalSpacing;

    // Calculate the total width available for siblings
    const totalWidth = horizontalSpacing * data.length;

    // Calculate the starting x position to center nodes horizontally
    const startX = x - totalWidth / 2 + nodeWidth / 2;

    data.forEach((item, index) => {
        // Check if the node has a predefined position
        const hasCustomPosition = item.position && item.position.x !== undefined && item.position.y !== undefined;

        const nodeX = hasCustomPosition ? item.position.x : startX + (index * horizontalSpacing);
        const nodeY = hasCustomPosition ? item.position.y : y + verticalSpacing;

        // Determine if the node has children
        const noChildren = !item.children || item.children.length === 0;
        const { children, ...nodeData } = item;

        // Add the node
        nodes.push({
            id: item.id.toString(),
            type: 'custom',
            position: { x: nodeX, y: nodeY },
            data: { ...nodeData, noChildren }
        });

        // Add edges if there's a parent node
        if (parentId !== null) {
            edges.push({
                id: `e${parentId}->${item.id}`,
                source: parentId.toString(),
                target: item.id.toString(),
                animated: true,
                type: 'custom',
                updatable: true,
                markerEnd: MarkerType.ArrowClosed,
                style: { stroke: '#29ABE2' }
            });
        }

        // Recursively build children
        if (item.children && item.children.length > 0) {
            buildGraph(item.children, nodes, edges, item.id, nodeX, nodeY, depth + 1);
        }
    });

    return { nodes, edges };
}
export function addEdges(data, dataContainer) {
    const source = data.source;
    const target = data.target;

    // Generate a unique ID for the edge
    const id = `${source}->${target}`;

    // Create the new edge object
    const newEdge = {
        id: id,
        source: source,
        target: target,
        animated: true,
        type: 'custom',
        updatable: true,
        markerEnd: MarkerType.ArrowClosed,
        style: {
            stroke: '#29ABE2'
        }
    };
    if (!dataContainer.find(edge => edge.id === id)) {
        dataContainer.push(newEdge);
    }
}

export function removeEdges(data, dataContainer) {
    const index = dataContainer.findIndex(edge => edge.id === data);
    if (index !== -1) {
        dataContainer.splice(index, 1);
    }
}

export function parseIdString(idString) {
    const match = idString.match(/(\d+)\s*->\s*(\d+)/);
    if (match) {
        const parentId = Number(match[1]);
        const childId = Number(match[2]);
        return {
            parent_id: parentId,
            child_id: childId
        };
    } else {
        throw new Error('Invalid input format');
    }
}

export const getPositions = (nodes) => {
    return nodes.map(node => ({
        id: node.id,
        position: node.position
    }));
};
