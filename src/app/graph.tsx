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
