import { useState, useContext } from "react";
import {
  TotalContext,
  VertexState,
  MouseMode,
  PaintMode,
	FreezeMode,
} from "./graph-visualizer";

type ModifyMenu = {
  type: "modify";
};

type ArrangeMenu = {
  type: "arrange";
};

type LocateMenu = {
  type: "locate";
};

type AnnotateMenu = {
  type: "annotate";
};

type ExportMenu = {
  type: "export";
};

type MenuState =
  | ModifyMenu
  | ArrangeMenu
  | LocateMenu
  | AnnotateMenu
  | ExportMenu;

function InsertSubgraphPanel() {
  type subgraphOptions = "complete" | "complete-bipartite" | "cycle" | "path";
  const [selectedOption, setSelectedOption] = useState<string>("complete");
  const {
    graph,
    setGraph,
    vertexStates,
    setVertexStates,
    inputBoxText,
    setInputBoxText,
  } = useContext(TotalContext);

  const parseIntoList = (s: string) => {
    const ret = s.match(/[^\d-+]*([-+]?\d+)[^\d-+]*/g)!.map((x) => parseInt(x));
    // console.log(ret);
    return ret;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var newInputBoxText = inputBoxText;
    if (newInputBoxText !== "" && !newInputBoxText.endsWith("\n"))
      newInputBoxText += "\n";
    switch (selectedOption) {
      case "complete":
        {
          const vertices = parseIntoList(e.currentTarget.vertices.value);
          for (const [i, v] of vertices.entries()) {
            for (const [j, u] of vertices.entries()) {
              if (i < j) newInputBoxText += v + " " + u + "\n";
            }
          }
        }
        break;
      case "complete-bipartite":
        {
          const vertices = parseIntoList(e.currentTarget.vertices1.value);
          const vertices2 = parseIntoList(e.currentTarget.vertices2.value);
          for (const v of vertices) {
            for (const u of vertices2) {
              newInputBoxText += v + " " + u + "\n";
            }
          }
        }
        break;
      case "cycle":
        {
          const vertices = parseIntoList(e.currentTarget.vertices.value);
          for (const [i, v] of vertices.entries()) {
            newInputBoxText +=
              v + " " + vertices[(i + 1) % vertices.length] + "\n";
          }
        }
        break;
      case "path":
        {
          const vertices = parseIntoList(e.currentTarget.vertices.value);
          for (const [i, v] of vertices.entries()) {
            if (i !== 0) newInputBoxText += vertices[i - 1] + " " + v + "\n";
          }
        }
        break;
    }
    setInputBoxText(newInputBoxText);
  };

  const subgraphConfigPanel = () => {
    const config = (() => {
      switch (selectedOption) {
        case "complete":
          return (
            <label>
              Vertices
              <input type="text" name="vertices" />
            </label>
          );
        case "complete-bipartite":
          return (
            <>
              <label>
                Side 1
                <input type="text" name="vertices1" />
              </label>
              <label>
                Side 2
                <input type="text" name="vertices2" />
              </label>
            </>
          );
        case "cycle":
          return (
            <label>
              Vertices
              <input type="text" name="vertices" />
            </label>
          );
        case "path":
          return (
            <label>
              Vertices
              <input type="text" name="vertices" />
            </label>
          );
      }
    })();

    return (
      <form method="post" onSubmit={handleSubmit}>
        {config}
        <button type="submit" value="Submit">
          Insert
        </button>
      </form>
    );
  };

  const chooseSubgraphPanel = () => {
    return (
      <label>
        Insert subgraph
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="complete">Complete</option>
          <option value="complete-bipartite">Complete bipartite</option>
          <option value="cycle">Cycle</option>
          <option value="path">Path</option>
        </select>
      </label>
    );
  };

  return (
    <div>
      {subgraphConfigPanel()}
      {chooseSubgraphPanel()}
    </div>
  );
}

function ModifyCommandPanel() {
  const { graph, setGraph, vertexStates, setVertexStates } =
    useContext(TotalContext);
  const setDirected = (directed: boolean) => {
    setGraph({ ...graph, directed: directed });
  };
  return (
    <CommandPanel>
      <h2>Modify</h2>
      <InsertSubgraphPanel />
      <button onClick={() => setDirected(!graph.directed)}>
        Toggle directed
      </button>
    </CommandPanel>
  );
}

function ArrangeCommandPanel() {
  const { graph, setGraph, vertexStates, setVertexStates } =
    useContext(TotalContext);
  const setFreeze = (frozen: boolean) => {
    const newVStates = new Map<number, VertexState>(vertexStates);
    for (const v of graph.vertices) {
      newVStates.set(v.id, { ...vertexStates.get(v.id)!, frozen: frozen });
    }
    setVertexStates(newVStates);
  };

  return (
    <CommandPanel>
      <h2>Arrange</h2>
      <button onClick={() => setFreeze(true)}>Freeze all</button>
      <button onClick={() => setFreeze(false)}>Unfreeze all</button>
    </CommandPanel>
  );
}

function LocateCommandPanel() {
  return (
    <CommandPanel>
      <h2>Locate</h2>
      <button>Vertex</button>
      <button>Edge</button>
    </CommandPanel>
  );
}

function AnnotateCommandPanel() {
  const { setMouseMode } = useContext(TotalContext);
  return (
    <CommandPanel>
      <h2>Annotate</h2>
      <button onClick={() => setMouseMode({ mode: "paint", subject: "vertex-border", color: "red" })}>
        Paint vertex border
      </button>
      <button onClick={() => setMouseMode({ mode: "paint", subject: "vertex-fill", color: "blue" })}>
        Paint vertex fill
      </button>
      <button onClick={() => setMouseMode({ mode: "paint", subject: "edge", color: "red" })}>
        Paint edge
      </button>
    </CommandPanel>
  );
}

function ExportCommandPanel() {
  return (
    <CommandPanel>
      <h2>Export</h2>
      <button>Vertex</button>
      <button>Edge</button>
    </CommandPanel>
  );
}

function CommandPanel(props: { children: React.ReactNode }) {
  return <div className="border-solid border-2 h-full">{props.children}</div>;
}

function CommandBar(props: { children: React.ReactNode }) {
	const { setMouseMode } = useContext(TotalContext);
  return (
    <div className="flex border-solid border-2 justify-between" onClick={() => setMouseMode({mode: "freeze"})}>
      {props.children}
    </div>
  );
}

export default function CommandMenu() {
  const [menu, setMenu] = useState<MenuState>({ type: "modify" });

  const commandPanel = (() => {
    switch (menu.type) {
      case "modify":
        return <ModifyCommandPanel />;
      case "arrange":
        return <ArrangeCommandPanel />;
      case "locate":
        return <LocateCommandPanel />;
      case "annotate":
        return <AnnotateCommandPanel />;
      case "export":
        return <ExportCommandPanel />;
    }
  })();

  return (
    <div className="w-2/6 h-full m-2 p-2">
      <CommandBar>
        <button onClick={() => setMenu({ type: "modify" })}>Modify</button>
        <button onClick={() => setMenu({ type: "arrange" })}>Arrange</button>
        <button onClick={() => setMenu({ type: "locate" })}>Locate</button>
        <button onClick={() => setMenu({ type: "annotate" })}>Markup</button>
        <button onClick={() => setMenu({ type: "export" })}>Export</button>
      </CommandBar>
      {commandPanel}
    </div>
  );
}
