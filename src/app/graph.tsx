export type Vertex = {
	id: number;
	label: string | null;
};

export type Edge = {
	id: number;
	from: number;
	to: number;
};

export type Graph = {
	directed: boolean;
	vertices: Vertex[];
	edges: Edge[];
};

export function addVertexIfNotExist(
	graph: Graph,
	id: number,
	label: string | null = null
) {
	if (graph.vertices.find((v) => v.id === id)) {
		return graph;
	}
	graph.vertices.push({ id: id, label: label });
}

export function renameVertex(
	graph: Graph,
	id: number,
	label: string | null = null
) {
	const v = graph.vertices.find((v) => v.id === id);
	if (v === undefined) return;
	v.label = label;
}

var nextEdgeId = 0;

export function addEdge(
	graph: Graph,
	id: number,
	from: number,
	to: number,
) {
	addVertexIfNotExist(graph, from);
	addVertexIfNotExist(graph, to);
	graph.edges.push({ id: id, from: from, to: to });
}

export function toAdjList(graph: Graph): Map<number, number[]> {
	const adjList: Map<number, number[]> = new Map();
	for (const vertex of graph.vertices) {
		adjList.set(vertex.id, []);
	}
	for (const edge of graph.edges) {
		if (adjList.has(edge.from)) {
			adjList.get(edge.from)?.push(edge.to);
		}
		if (!graph.directed) {
			if (adjList.has(edge.to)) {
				adjList.get(edge.to)?.push(edge.from);
			}
		}
	}
	return adjList;
}

export function toBidirectionalAdjList(graph: Graph): Map<number, number[]> {
	const adjList: Map<number, number[]> = new Map();
	for (const vertex of graph.vertices) {
		adjList.set(vertex.id, []);
	}
	for (const edge of graph.edges) {
		if (adjList.has(edge.from)) {
			adjList.get(edge.from)?.push(edge.to);
		}
		if (adjList.has(edge.to)) {
			adjList.get(edge.to)?.push(edge.from);
		}
	}
	return adjList;
}
