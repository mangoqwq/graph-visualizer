import TextEditor from "./text-editor";
import GraphViewer from "./graph-view";
import CommandMenu from "./command-menu";
import { Graph, addEdge } from "./graph";
import { useState, createContext } from "react";
import Vector from "./vector";

export type VertexState = {
	pos: Vector;
	frozen: boolean;
	heldAt: number | null;
};

type TotalContextType = {
	graph: Graph;
	setGraph: React.Dispatch<React.SetStateAction<Graph>>;
	vertexStates: Map<number, VertexState>;
	setVertexStates: React.Dispatch<
		React.SetStateAction<Map<number, VertexState>>
	>;
	inputBoxText: string;
	setInputBoxText: React.Dispatch<React.SetStateAction<string>>;
};

export const TotalContext = createContext<TotalContextType>({
	graph: { directed: false, vertices: [], edges: [] },
	setGraph: () => {},
	vertexStates: new Map<number, VertexState>(),
	setVertexStates: () => {},
	inputBoxText: "",
	setInputBoxText: () => {},
});

function getDefaultGraph(): Graph {
	const graph: Graph = { directed: false, vertices: [], edges: [] };
	addEdge(graph, 0, 1, false);
	addEdge(graph, 0, 2, false);
	addEdge(graph, 0, 3, false);
	addEdge(graph, 1, 3, false);
	return graph;
}

export default function GraphVisualizer() {
	const [graph, setGraph] = useState<Graph>(getDefaultGraph());
	const [vertexStates, setVertexStates] = useState<Map<number, VertexState>>(new Map())
	const [inputBoxText, setInputBoxText] = useState<string>(graph.edges.map((e) => e.from + " " + e.to).join("\n"));
	const value: TotalContextType = { graph, setGraph, vertexStates, setVertexStates, inputBoxText, setInputBoxText };

	return (
		<main>
			<TotalContext.Provider value={value}>
				<div className="flex h-5/6">
					<TextEditor />
					<GraphViewer />
					<CommandMenu />
				</div>
			</TotalContext.Provider>
		</main>
	);
}
