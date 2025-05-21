"use client";

import TextEditor from "./text-editor";
import GraphViewer, { graphViewDimRatio } from "./graph-view";
import CommandMenu from "./command-menu";
import { Graph, addEdge } from "./graph";
import { useState, createContext, useEffect, useLayoutEffect } from "react";
import Vector from "./vector";
import { generateGraph } from "./text-editor";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faQuestionCircle);

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
  textBold: boolean;
  fillColor: string;
};

export type EdgeState = {
  color: string;
};

export type GraphBundle = {
  graph: Graph;
  vertexStates: Map<number, VertexState>;
  edgeStates: Map<number, EdgeState>;
};

type TotalContextType = {
  graphBundle: GraphBundle;
  setGraphBundle: React.Dispatch<React.SetStateAction<GraphBundle>>;
  inputBoxText: string;
  setInputBoxText: React.Dispatch<React.SetStateAction<string>>;
  mouseMode: MouseMode;
  setMouseMode: React.Dispatch<React.SetStateAction<MouseMode>>;
  mouseDown: boolean;
  setMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  windowHeight: number;
  graphViewDim: number;
};

export const TotalContext = createContext<TotalContextType>({
  graphBundle: {
    graph: { directed: false, vertices: [], edges: [] },
    vertexStates: new Map(),
    edgeStates: new Map(),
  },
  setGraphBundle: () => {},
  inputBoxText: "",
  setInputBoxText: () => {},
  mouseMode: { mode: "freeze" },
  setMouseMode: () => {},
  mouseDown: false,
  setMouseDown: () => {},
  windowHeight: 0,
  graphViewDim: 0,
});

function getDefaultInputBoxText(): string {
  return "0 1\n0 2\n0 3\n1 3\n";
}

export default function GraphVisualizer() {
  const [inputBoxText, setInputBoxText] = useState<string>(
    getDefaultInputBoxText()
  );
  const [graphBundle, setGraphBundle] = useState<GraphBundle>({
    graph: generateGraph(inputBoxText, false),
    vertexStates: new Map(),
    edgeStates: new Map(),
  });
  const [mouseMode, setMouseMode] = useState<MouseMode>({ mode: "freeze" });
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(800);
  const [graphViewDim, setGraphViewDim] = useState<number>(0);

  useLayoutEffect(() => {
    setWindowHeight(window.innerHeight);
    setGraphViewDim(window.innerHeight * graphViewDimRatio)
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setGraphViewDim(window.innerHeight * graphViewDimRatio)
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value: TotalContextType = {
    graphBundle,
    setGraphBundle,
    inputBoxText,
    setInputBoxText,
    mouseMode,
    setMouseMode,
    mouseDown,
    setMouseDown,
    windowHeight,
    graphViewDim
  };

  return (
    <main>
      <TotalContext.Provider value={value}>
        <div
          className="h-screen m-screen flex"
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => setMouseDown(false)}
        >
          <div className="flex h-5/6 m-auto">
            <TextEditor />
            <GraphViewer />
            <CommandMenu />
          </div>
        </div>
      </TotalContext.Provider>
    </main>
  );
}
