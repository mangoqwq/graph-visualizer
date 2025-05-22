import { useState, useContext } from "react";
import {
  TotalContext,
  VertexState,
  MouseMode,
  PaintMode,
  FreezeMode,
  GraphBundle,
} from "./graph-visualizer";
import {
  ArrangeDirection,
  arrangeAsBfsTree,
  arrangeAsDfsTree,
  arrangeAsDag,
  arrangeAsDagDagre,
} from "./algorithm";
import {
  ColorChangeHandler,
  SketchPicker,
  RGBColor,
  BlockPicker,
  ChromePicker,
} from "react-color";

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

function HorizontalLine() {
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        margin: "15px 0",
      }}
    ></div>
  );
}

function InsertSubgraphPanel() {
  type subgraphOptions = "complete" | "complete-bipartite" | "cycle" | "path";
  const [selectedOption, setSelectedOption] = useState<string>("complete");
  const { graphBundle, setGraphBundle, inputBoxText, setInputBoxText } =
    useContext(TotalContext);

  const parseIntoList = (s: string) => {
    if (!s || s === "") return [];
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
      const className = "px-1 focus:outline-none focus:border-transparent";
      switch (selectedOption) {
        case "complete":
          return (
            <input
              type="text"
              name="vertices"
              placeholder="Vertices (e.x. 1 2 3)"
              className={className}
            />
          );
        case "complete-bipartite":
          return (
            <>
              <input
                type="text"
                name="vertices1"
                placeholder="Side 1 (e.x. 1 2 3)"
                className={className}
              />
              <input
                type="text"
                name="vertices2"
                placeholder="Side 2 (e.x. 4 5 6)"
                className={className}
              />
            </>
          );
        case "cycle":
          return (
            <input
              type="text"
              name="vertices"
              placeholder="Vertices (e.x. 1 2 3)"
              className={className}
            />
          );
        case "path":
          return (
            <input
              type="text"
              name="vertices"
              placeholder="Vertices (e.x. 1 2 3)"
              className={className}
            />
          );
      }
    })();

    return (
      <form
        autoComplete="off"
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col"
      >
        {config}
        <button type="submit" value="Submit" className="panel-button">
          Insert
        </button>
      </form>
    );
  };

  const chooseSubgraphPanel = () => {
    return (
      <label className="flex">
        <div className="m-auto text-center flex">
          Insert&nbsp;
          <div className="hover-dropdown m-auto">
            {selectedOption}
            <div className="hover-dropdown-content">
              <div
                className="hover-dropdown-item"
                onClick={() => setSelectedOption("complete")}
              >
                complete
              </div>
              <div
                className="hover-dropdown-item"
                onClick={() => setSelectedOption("complete-bipartite")}
              >
                complete bipartite
              </div>
              <div
                className="hover-dropdown-item"
                onClick={() => setSelectedOption("cycle")}
              >
                cycle
              </div>
              <div
                className="hover-dropdown-item"
                onClick={() => setSelectedOption("path")}
              >
                path
              </div>
            </div>
          </div>
          &nbsp;subgraph
        </div>
      </label>
    );
  };

  return (
    <div>
      {chooseSubgraphPanel()}
      {subgraphConfigPanel()}
    </div>
  );
}

function ModifyCommandPanel() {
  const { graphBundle, setGraphBundle } = useContext(TotalContext);
  const { graph, vertexStates, edgeStates } = graphBundle;
  const setDirected = (directed: boolean) => {
    console.log(directed);
    setGraphBundle({ ...graphBundle, graph: { ...graph, directed: directed } });
  };
  return (
    <CommandPanel>
      <InsertSubgraphPanel />
      <HorizontalLine />
      <div className="flex flex-row w-full">
        <button
          onClick={() => setDirected(!graph.directed)}
          className="panel-button grow basis-0"
        >
          Toggle directed
        </button>
      </div>
    </CommandPanel>
  );
  // return (
  // 	<CommandPanel>
  // 		WIP
  // 	</CommandPanel>
  // )
}

function ArrangeAsPanel() {
  const { graphBundle, setGraphBundle, windowHeight, graphViewDim } =
    useContext(TotalContext);
  const { graph, vertexStates, edgeStates } = graphBundle;
  const [arrangeDirection, setArrangeDirection] =
    useState<ArrangeDirection>("down");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var sourceVertexId = parseInt(e.currentTarget.vertices.value.trim());
    if (isNaN(sourceVertexId)) {
      sourceVertexId = Math.min(...graph.vertices.map((v) => v.id));
    }

    const native = e.nativeEvent as SubmitEvent;
    const button = native.submitter as HTMLButtonElement;
    const type = button.value;
    if (!isNaN(sourceVertexId)) {
      if (type === "bfs") {
        const newGraphBundle = arrangeAsBfsTree(
          graphBundle,
          sourceVertexId,
          graphViewDim,
          arrangeDirection
        );
        setGraphBundle(newGraphBundle);
      } else if (type === "dfs") {
        const newGraphBundle = arrangeAsDfsTree(
          graphBundle,
          sourceVertexId,
          graphViewDim,
          arrangeDirection
        );
        setGraphBundle(newGraphBundle);
      }
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col justify-around space-y-2">
        {[
          "down" as ArrangeDirection,
          "up" as ArrangeDirection,
          "left" as ArrangeDirection,
          "right" as ArrangeDirection,
        ].map((type) => (
            <button
              key={type}
              type="submit"
              name="type"
              value={type}
              className={`grow basis-0 text-lg font-mono aspect-square ${
              arrangeDirection === type
              ? "bg-gray-200"
              : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => setArrangeDirection(type)}
            >
              {type === "down" && "↓"}
              {type === "up" && "↑"}
              {type === "left" && "←"}
              {type === "right" && "→"}
            </button>
        ))}
      </div>
      <div className="border-l border-gray-300 mx-2"></div>
      <form
        autoComplete="off"
        method="post"
        className="flex flex-col"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="vertices"
          placeholder="Source vertex id (e.x. 1)"
          className="px-1 focus:outline-none focus:border-transparent"
        />
        <div className="flex flex-row w-full">
          <button
            type="submit"
            name="type"
            value="bfs"
            className="panel-button grow basis-0"
          >
            Arrange BFS order
          </button>
          <button
            type="submit"
            name="type"
            value="dfs"
            className="panel-button grow basis-0"
          >
            Arrange DFS order
          </button>
        </div>
        <HorizontalLine />
        <div className="flex flex-row w-full">
          <button
            onClick={() =>
              setGraphBundle(
                arrangeAsDagDagre(graphBundle, graphViewDim, arrangeDirection)
              )
            }
            className="panel-button grow basis-0"
          >
            Arrange DAG
          </button>
        </div>
      </form>
    </div>
  );
}

function setFreeze(frozen: boolean, graphBundle: GraphBundle): GraphBundle {
  const { graph, vertexStates } = graphBundle;
  const newVStates = new Map<number, VertexState>(vertexStates);
  for (const v of graph.vertices) {
    newVStates.set(v.id, { ...vertexStates.get(v.id)!, frozen: frozen });
  }
  return { ...graphBundle, vertexStates: newVStates };
}

function ArrangeCommandPanel() {
  const { graphBundle, setGraphBundle, graphViewDim } =
    useContext(TotalContext);
  const { graph, vertexStates, edgeStates } = graphBundle;

  return (
    <CommandPanel>
      <div className="flex flex-row w-full">
        <button
          onClick={() => setGraphBundle(setFreeze(true, graphBundle))}
          className="panel-button grow basis-0"
        >
          Freeze all
        </button>
        <button
          onClick={() => setGraphBundle(setFreeze(false, graphBundle))}
          className="panel-button grow basis-0"
        >
          Unfreeze all
        </button>
      </div>
      <HorizontalLine />
      <ArrangeAsPanel />
    </CommandPanel>
  );
}

function LocateCommandPanel() {
  return (
    <CommandPanel>
      <p>Coming soon!</p>
    </CommandPanel>
  );
}

function PaintCommandPanel() {
  const { mouseMode, setMouseMode } = useContext(TotalContext);
  const [color, setColor] = useState<RGBColor>({ r: 255, g: 0, b: 0, a: 1 });
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<PaintMode>({
    mode: "paint",
    subject: "vertex-border",
    color: "rgba(255, 0, 0, 1)",
  });

  const getColor = () => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  };

  const onChange: ColorChangeHandler = (c) => {
    setColor(c.rgb);
    if (mouseMode.mode === "paint") {
      setMouseMode({
        mode: "paint",
        subject: mouseMode.subject,
        color: getColor(),
      });
    }
  };

  const onClick = () => {
    setShowColorPicker(!showColorPicker);
    if (mouseMode.mode === "paint") {
      setMouseMode({
        mode: "paint",
        subject: mouseMode.subject,
        color: getColor(),
      });
    }
  };
  const onBrushClick = () => {
    setMouseMode({
      mode: "paint",
      subject: selectedMode.subject,
      color: getColor(),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="m-auto text-center flex relative">
        Paint&nbsp;
        <div className="hover-dropdown m-auto">
          {selectedMode.subject}
          <div className="hover-dropdown-content">
            <div
              className="hover-dropdown-item"
              onClick={() => {
                setSelectedMode({
                  mode: "paint",
                  subject: "vertex-border",
                  color: "rgba(255, 0, 0, 1)",
                });
                if (mouseMode.mode === "paint") {
                  setMouseMode({
                    mode: "paint",
                    subject: "vertex-border",
                    color: getColor(),
                  });
                }
              }}
            >
              vertex border
            </div>
            <div
              className="hover-dropdown-item"
              onClick={() => {
                setSelectedMode({
                  mode: "paint",
                  subject: "vertex-fill",
                  color: "rgba(255, 0, 0, 1)",
                });
                if (mouseMode.mode === "paint") {
                  setMouseMode({
                    mode: "paint",
                    subject: "vertex-fill",
                    color: getColor(),
                  });
                }
              }}
            >
              vertex fill
            </div>
            <div
              className="hover-dropdown-item"
              onClick={() => {
                setSelectedMode({
                  mode: "paint",
                  subject: "edge",
                  color: "rgba(255, 0, 0, 1)",
                });
                if (mouseMode.mode === "paint") {
                  setMouseMode({
                    mode: "paint",
                    subject: "edge",
                    color: getColor(),
                  });
                }
              }}
            >
              edge
            </div>
          </div>
        </div>
        &nbsp;with&nbsp;
        <div
          className="w-4 h-4 rounded-full border-none"
          onClick={onClick}
          style={{ background: getColor() }}
        ></div>
        {showColorPicker ? (
          <ChromePicker
            onChange={onChange}
            color={color}
            className="absolute top-5"
          />
        ) : null}
      </div>
      {mouseMode.mode === "paint" ? (
        <button
          onClick={() => setMouseMode({ mode: "freeze" })}
          className="panel-button "
        >
          Cancel
        </button>
      ) : (
        <button onClick={onBrushClick} className="panel-button ">
          Brush mode
        </button>
      )}
    </div>
  );
}

function AnnotateCommandPanel() {
  const { graphBundle, setGraphBundle } = useContext(TotalContext);
  const { graph, vertexStates } = graphBundle;

  const setBoldVertexLabels = (enable: boolean) => {
    const newVStates = new Map<number, VertexState>(vertexStates);
    for (const v of graph.vertices) {
      newVStates.set(v.id, {
        ...vertexStates.get(v.id)!,
        textBold: enable,
      });
    }
    setGraphBundle({ ...graphBundle, vertexStates: newVStates });
  };

  return (
    <CommandPanel>
      <PaintCommandPanel />
      <HorizontalLine />
      <div className="flex flex-row w-full">
        <button
          onClick={() => setBoldVertexLabels(true)}
          className="panel-button grow basis-0"
        >
          Bold vertex labels
        </button>
        <button
          onClick={() => setBoldVertexLabels(false)}
          className="panel-button grow basis-0"
        >
          Unbold vertex labels
        </button>
      </div>
    </CommandPanel>
  );
}

function ExportCommandPanel() {
  const exportToSVG = () => {
    const svg = document.getElementById("graph-view-svg");
    if (svg === null) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "graph.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <CommandPanel>
      <button onClick={exportToSVG} className="panel-button w-full">
        Download SVG
      </button>
    </CommandPanel>
  );
}

function CommandPanel(props: { children: React.ReactNode }) {
  return (
    <div className="border-solid border-2 grow p-2 h-full w-full">
      {props.children}
    </div>
  );
}

function CommandBar(props: { children: React.ReactNode }) {
  const { setMouseMode } = useContext(TotalContext);
  return (
    <div
      className="flex justify-between"
      onClick={() => setMouseMode({ mode: "freeze" })}
    >
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

  const style = (type: string) => {
    var ret = "grow basis-0 ";
    if (menu.type === type) {
      ret += "bg-gray-200";
    } else ret += "hover:bg-gray-100 active:bg-gray-200";
    return ret;
  };

  return (
    <div className="min-w-[400px] max-w-[400px] flex flex-col">
      <CommandBar>
        <button
          onClick={() => setMenu({ type: "modify" })}
          className={style("modify")}
        >
          Modify
        </button>
        <button
          onClick={() => setMenu({ type: "arrange" })}
          className={style("arrange")}
        >
          Arrange
        </button>
        <button
          onClick={() => setMenu({ type: "locate" })}
          className={style("locate")}
        >
          Locate
        </button>
        <button
          onClick={() => setMenu({ type: "annotate" })}
          className={style("annotate")}
        >
          Annotate
        </button>
        <button
          onClick={() => setMenu({ type: "export" })}
          className={style("export")}
        >
          Export
        </button>
      </CommandBar>
      <div>{commandPanel}</div>
    </div>
  );
}
