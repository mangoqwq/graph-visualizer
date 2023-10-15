import TextEditor from "./text-editor";
import GraphViewer from "./graph-view";
import CommandMenu from "./command-menu";
import { Graph, addEdge } from "./graph";
import { useState, createContext } from "react";
import Vector from "./vector";
import { generateGraph } from "./text-editor";

export type FreezeMode = {
  mode: "freeze";
};
export type PaintMode = {
  mode: "paint";
  subject: "vertex-border" | "vertex-fill" | "edge";
  color: string;
};
export type DrawMode = {
  mode: "draw";
};
export type ScreenshotMode = {
  mode: "screenshot";
};

export type MouseMode = FreezeMode | PaintMode | DrawMode | ScreenshotMode;

export type VertexState = {
  pos: Vector;
  frozen: boolean;
  heldAt: number | null;
  borderColor: string;
  fillColor: string;
};

export type EdgeState = {
  color: string;
};

type TotalContextType = {
  graph: Graph;
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
  vertexStates: Map<number, VertexState>;
  setVertexStates: React.Dispatch<
    React.SetStateAction<Map<number, VertexState>>
  >;
  edgeStates: Map<number, EdgeState>;
  setEdgeStates: React.Dispatch<React.SetStateAction<Map<number, EdgeState>>>;
  inputBoxText: string;
  setInputBoxText: React.Dispatch<React.SetStateAction<string>>;
  mouseMode: MouseMode;
  setMouseMode: React.Dispatch<React.SetStateAction<MouseMode>>;
  mouseDown: boolean;
  setMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TotalContext = createContext<TotalContextType>({
  graph: { directed: false, vertices: [], edges: [] },
  setGraph: () => {},
  vertexStates: new Map<number, VertexState>(),
  setVertexStates: () => {},
  edgeStates: new Map<number, EdgeState>(),
  setEdgeStates: () => {},
  inputBoxText: "",
  setInputBoxText: () => {},
  mouseMode: { mode: "freeze" },
  setMouseMode: () => {},
  mouseDown: false,
  setMouseDown: () => {},
});

function getDefaultInputBoxText(): string {
  return "0 1\n0 2\n0 3\n1 3\n"
}

export default function GraphVisualizer() {
	const [inputBoxText, setInputBoxText] = useState<string>(
		getDefaultInputBoxText()
	);
  const [graph, setGraph] = useState<Graph>(generateGraph(inputBoxText, false));
  const [vertexStates, setVertexStates] = useState<Map<number, VertexState>>(
    new Map()
  );
  const [edgeStates, setEdgeStates] = useState<Map<number, EdgeState>>(
    new Map()
  );
  const [mouseMode, setMouseMode] = useState<MouseMode>({ mode: "freeze" });
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const value: TotalContextType = {
    graph,
    setGraph,
    vertexStates,
    setVertexStates,
    inputBoxText,
    setInputBoxText,
    mouseMode,
    setMouseMode,
    mouseDown,
    setMouseDown,
    edgeStates,
    setEdgeStates,
  };

  return (
    <main>
      <TotalContext.Provider value={value}>
        <div
          className="flex h-5/6"
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => setMouseDown(false)}
        >
          <TextEditor />
          <GraphViewer />
          <CommandMenu />
          <h1>{mouseDown ? "yes" : "no"}</h1>
        </div>
      </TotalContext.Provider>
    </main>
  );
}