export type Vertex = {
	id: number;
	label: string | null;
};

export type Edge = {
	from: number;
	to: number;
	directed: boolean;
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

export function addEdge(
	graph: Graph,
	from: number,
	to: number,
	directed: boolean
) {
	addVertexIfNotExist(graph, from);
	addVertexIfNotExist(graph, to);
	graph.edges.push({ from: from, to: to, directed: directed });
}
