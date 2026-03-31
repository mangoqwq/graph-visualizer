"use client";

import React, { useEffect, useState, useContext, useRef } from "react";
import { Graph, addEdge, Vertex, Edge } from "./graph";
import {
  TotalContext,
  VertexState,
  EdgeState,
  GraphBundle,
} from "./graph-visualizer";
import Vector from "./vector";
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
import { parseJsonSourceFileConfigFileContent } from "typescript";

// const dim = (typeof window !== undefined ? window.innerHeight * 0.8 : 800);
export const graphViewDimRatio = 5 / 6;
const r = 20;
const SELF_LOOP_ANCHOR_FACTOR = Math.SQRT1_2;
const SELF_LOOP_WIDTH_BASE = r + 18;
const SELF_LOOP_WIDTH_STEP = 24;
const SELF_LOOP_HEIGHT_BASE = r + 32;
const SELF_LOOP_HEIGHT_STEP = 30;

type MultilineSvgTextProps = Omit<React.SVGProps<SVGTextElement>, "children"> & {
  x: number;
  y: number;
  text: string;
  lineHeightEm?: number;
};

function getFontSizePx(fontSize: React.SVGProps<SVGTextElement>["fontSize"]) {
  if (typeof fontSize === "number") return fontSize;
  if (typeof fontSize === "string") {
    const parsed = Number.parseFloat(fontSize);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 16;
}

function MultilineSvgText({
  x,
  y,
  text,
  lineHeightEm = 1.2,
  ...textProps
}: MultilineSvgTextProps) {
  const lines = text.split("\n");
  const lineHeightPx = getFontSizePx(textProps.fontSize) * lineHeightEm;
  const centerOffset = (lines.length - 1) / 2;

  return (
    <text x={x} y={y} {...textProps}>
      {lines.map((line, index) => (
        <tspan
          key={index}
          x={x}
          y={y + (index - centerOffset) * lineHeightPx}
          dominantBaseline="middle"
        >
          {line === "" ? "\u00A0" : line}
        </tspan>
      ))}
    </text>
  );
}

function placeInBounds(v: Vector, dim: number) {
  var { x: vx, y: vy } = v;
  if (vx < 2 * r) vx = 2 * r;
  if (vx > dim - 2 * r) vx = dim - 2 * r;
  if (vy < 2 * r) vy = 2 * r;
  if (vy > dim - 2 * r) vy = dim - 2 * r;
  return new Vector(vx, vy);
}

function VertexView({ v }: { v: Vertex }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nodeRef = React.useRef(null);
  const { graphBundle, setGraphBundle, mouseMode, mouseDown, windowHeight } =
    useContext(TotalContext);
  const { graph, vertexStates, edgeStates } = graphBundle;
  const dim = windowHeight * graphViewDimRatio;
  const setVertexStates = (newVStates: Map<number, VertexState>) =>
    setGraphBundle({ ...graphBundle, vertexStates: newVStates });

  if (vertexStates.get(v.id) === undefined) return <></>;
  const { x: cx, y: cy } = vertexStates.get(v.id)!.pos;
  const onDrag: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    setVertexStates(
      new Map<number, VertexState>(
        Array.from(vertexStates.entries()).map(([id, state]) => {
          if (id === v.id) {
            var { x, y } = data;
            ({ x, y } = placeInBounds(new Vector(x, y), dim));
            return [id, { ...vertexStates.get(v.id)!, pos: new Vector(x, y) }];
          } else {
            return [id, state];
          }
        })
      )
    );
  };
  const onStart: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    const newVStates = new Map<number, VertexState>(vertexStates);
    newVStates.set(v.id, { ...vertexStates.get(v.id)!, heldAt: Date.now() });
    setVertexStates(newVStates);
  };

  const CLICK_TIME_THRESHOLD = 100;
  const onStop: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    var newFrozen = vertexStates.get(v.id)!.frozen;
    if (
      mouseMode.mode === "freeze" &&
      Date.now() - vertexStates.get(v.id)!.heldAt! < CLICK_TIME_THRESHOLD &&
      new Vector(data.deltaX, data.deltaY).norm() <= 10
    ) {
      newFrozen = !newFrozen;
    }
    const newVStates = new Map<number, VertexState>(vertexStates);
    newVStates.set(v.id, {
      ...vertexStates.get(v.id)!,
      heldAt: null,
      frozen: newFrozen,
    });
    setVertexStates(newVStates);
  };

  const onClick = () => {
    if (mouseMode.mode === "paint") {
      if (mouseMode.subject === "vertex-border") {
        setVertexStates(
          new Map<number, VertexState>(vertexStates).set(v.id, {
            ...vertexStates.get(v.id)!,
            borderColor: mouseMode.color,
          })
        );
      }
      if (mouseMode.subject === "vertex-fill") {
        setVertexStates(
          new Map<number, VertexState>(vertexStates).set(v.id, {
            ...vertexStates.get(v.id)!,
            fillColor: mouseMode.color,
          })
        );
      }
    }
  };
  const onMouseEnter = () => {
    if (
      mouseMode.mode === "paint" &&
      mouseMode.subject === "vertex-border" &&
      mouseDown
    ) {
      setVertexStates(
        new Map<number, VertexState>(vertexStates).set(v.id, {
          ...vertexStates.get(v.id)!,
          borderColor: mouseMode.color,
        })
      );
    }
    if (
      mouseMode.mode === "paint" &&
      mouseMode.subject === "vertex-fill" &&
      mouseDown
    ) {
      setVertexStates(
        new Map<number, VertexState>(vertexStates).set(v.id, {
          ...vertexStates.get(v.id)!,
          fillColor: mouseMode.color,
        })
      );
    }
  };

  return (
    <Draggable
      onDrag={onDrag}
      onStart={onStart}
      onStop={onStop}
      position={{ x: cx, y: cy }}
      key={v.id}
      nodeRef={nodeRef}
    >
      <g ref={nodeRef} onClick={onClick} onMouseEnter={onMouseEnter}>
        <circle
          // cx={cx}
          // cy={cy}
          r={r}
          strokeWidth={vertexStates.get(v.id)!.frozen ? "4" : "2"}
          stroke={vertexStates.get(v.id)!.borderColor}
          // fill={vertexStates.get(v.id)!.heldAt !== null ? "grey" : "white"}
          fill={vertexStates.get(v.id)!.fillColor}
        />
        <MultilineSvgText
          x={0}
          y={0}
          textAnchor="middle"
          className="select-none"
          fontWeight={vertexStates.get(v.id)!.textBold ? "bold" : "normal"}
          text={v.label === null ? v.id.toString() : v.label}
        />
      </g>
    </Draggable>
  );
}

type EdgeViewProps = {
  e: Edge;
  parallelIndex: number;
  parallelCount: number;
};

function EdgeView({ e, parallelIndex, parallelCount }: EdgeViewProps) {
  const {
    graphBundle,
    setGraphBundle,
    mouseMode,
    mouseDown,
    edgeLabelStyle,
  } = useContext(TotalContext);
  const { graph, vertexStates, edgeStates } = graphBundle;
  const setEdgeStates = (newEStates: Map<number, EdgeState>) =>
    setGraphBundle({ ...graphBundle, edgeStates: newEStates });
  if (vertexStates.get(e.from) === undefined) return <></>;
  if (vertexStates.get(e.to) === undefined) return <></>;

  const onClick = () => {
    if (mouseMode.mode === "paint" && mouseMode.subject === "edge") {
      setEdgeStates(
        new Map<number, EdgeState>(edgeStates).set(e.id, {
          ...edgeStates.get(e.id)!,
          color: mouseMode.color,
        })
      );
    }
  };
  const onMouseEnter = () => {
    if (
      mouseMode.mode === "paint" &&
      mouseMode.subject === "edge" &&
      mouseDown
    ) {
      setEdgeStates(
        new Map<number, EdgeState>(edgeStates).set(e.id, {
          ...edgeStates.get(e.id)!,
          color: mouseMode.color,
        })
      );
    }
  };

  const { x: x1, y: y1 } = vertexStates.get(e.from)!.pos;
  const { x: x2, y: y2 } = vertexStates.get(e.to)!.pos;
  const radius = 20; // radius of the nodes

  if (e.from === e.to) {
    const anchorOffset = radius * SELF_LOOP_ANCHOR_FACTOR;
    const loopWidth = SELF_LOOP_WIDTH_BASE + parallelIndex * SELF_LOOP_WIDTH_STEP;
    const loopHeight =
      SELF_LOOP_HEIGHT_BASE + parallelIndex * SELF_LOOP_HEIGHT_STEP;
    const start = {
      x: x1 - anchorOffset,
      y: y1 - anchorOffset,
    };
    const end = {
      x: x1 + anchorOffset,
      y: y1 - anchorOffset,
    };
    const control1 = {
      x: x1 - loopWidth,
      y: y1 - loopHeight,
    };
    const control2 = {
      x: x1 + loopWidth,
      y: y1 - loopHeight,
    };
    const loopPath = `M ${start.x} ${start.y} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${end.x} ${end.y}`;
    const loopMidpoint = {
      x: (start.x + 3 * control1.x + 3 * control2.x + end.x) / 8,
      y: (start.y + 3 * control1.y + 3 * control2.y + end.y) / 8,
    };
    const labelPos = {
      x: loopMidpoint.x,
      y: loopMidpoint.y,
    };

    return (
      <svg>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="5"
            markerHeight="6"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 5 3, 0 6" />
          </marker>
        </defs>
        <g onMouseEnter={onMouseEnter} onClick={onClick} pointerEvents="all">
          <path
            d={loopPath}
            stroke="black"
            visibility="hidden"
            strokeWidth="13"
            fill="none"
          />
          <path
            d={loopPath}
            stroke={edgeStates.get(e.id)?.color ?? "black"}
            strokeWidth="2"
            fill="none"
            markerEnd={graph.directed ? "url(#arrowhead)" : ""}
          />
          {e.label && (
            <MultilineSvgText
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              fontSize="16"
              stroke="white"
              strokeWidth="3"
              paintOrder="stroke fill"
              pointerEvents="none"
              text={e.label}
            />
          )}
        </g>
      </svg>
    );
  }

  const dx = x2 - x1;
  const dy = y2 - y1;

  const len = Math.max(1, Math.sqrt(dx * dx + dy * dy));

  const unitX = dx / len;
  const unitY = dy / len;
  // Use a canonical pair direction so A->B and B->A fan to opposite sides.
  const familyDirection = e.from < e.to ? 1 : -1;
  const familyUnitX = unitX * familyDirection;
  const familyUnitY = unitY * familyDirection;

  const x1_adjusted = x1 + unitX * radius;
  const y1_adjusted = y1 + unitY * radius;

  const x2_adjusted = x2 - unitX * radius;
  const y2_adjusted = y2 - unitY * radius;

  const midX = (x1_adjusted + x2_adjusted) / 2;
  const midY = (y1_adjusted + y2_adjusted) / 2;

  const perpX = -familyUnitY;
  const perpY = familyUnitX;

  const offsetStep = 80;
  const offset =
    parallelCount === 1
      ? 0
      : (parallelIndex - (parallelCount - 1) / 2) * offsetStep;

  const controlX = midX + perpX * offset;
  const controlY = midY + perpY * offset;

  const quadPoint = (t: number) => {
    const oneMinusT = 1 - t;
    const x =
      oneMinusT * oneMinusT * x1_adjusted +
      2 * oneMinusT * t * controlX +
      t * t * x2_adjusted;
    const y =
      oneMinusT * oneMinusT * y1_adjusted +
      2 * oneMinusT * t * controlY +
      t * t * y2_adjusted;
    return { x, y };
  };

  const quadTangent = (t: number) => {
    const tx =
      2 * (1 - t) * (controlX - x1_adjusted) + 2 * t * (x2_adjusted - controlX);
    const ty =
      2 * (1 - t) * (controlY - y1_adjusted) + 2 * t * (y2_adjusted - controlY);
    return { x: tx, y: ty };
  };

  const labelBase = quadPoint(0.5);
  const tangentMid = quadTangent(0.5);
  const tangentLen = Math.max(
    1,
    Math.sqrt(tangentMid.x * tangentMid.x + tangentMid.y * tangentMid.y)
  );
  const normalMid = {
    x: -tangentMid.y / tangentLen,
    y: tangentMid.x / tangentLen,
  };

  const labelOffset = edgeLabelStyle === "offset" ? 12 : 0;
  const labelPos = {
    x: labelBase.x + normalMid.x * labelOffset,
    y: labelBase.y + normalMid.y * labelOffset,
  };

  // Split quadratic at t1 < 0.5 < t2 to create a gap around the label for "gap" style
  const gapHalf = 12;
  const tDelta = Math.min(0.1, gapHalf / len);
  const t1 = Math.max(0, 0.5 - tDelta);
  const t2 = Math.min(1, 0.5 + tDelta);

  const splitQuad = (
    p0: { x: number; y: number },
    c: { x: number; y: number },
    p1: { x: number; y: number },
    t: number
  ) => {
    const p0c = { x: p0.x + (c.x - p0.x) * t, y: p0.y + (c.y - p0.y) * t };
    const cp1 = { x: c.x + (p1.x - c.x) * t, y: c.y + (p1.y - c.y) * t };
    const mid = { x: p0c.x + (cp1.x - p0c.x) * t, y: p0c.y + (cp1.y - p0c.y) * t };
    return {
      left: { p0, c: p0c, p1: mid },
      right: { p0: mid, c: cp1, p1 },
    };
  };

  const firstSplit = splitQuad(
    { x: x1_adjusted, y: y1_adjusted },
    { x: controlX, y: controlY },
    { x: x2_adjusted, y: y2_adjusted },
    t1
  );
  const secondSplit = splitQuad(
    firstSplit.right.p0,
    firstSplit.right.c,
    firstSplit.right.p1,
    (t2 - t1) / (1 - t1)
  );

  const seg1 = firstSplit.left;
  const segGap = secondSplit.left;
  const seg2 = secondSplit.right;

  return (
    <svg>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="5"
          markerHeight="6"
          refX="5"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 5 3, 0 6" />
        </marker>
      </defs>
      <g onMouseEnter={onMouseEnter} onClick={onClick} pointerEvents="all">
        {/* invisible wide path to keep hover/click targets comfortable */}
        <path
          d={`M ${x1_adjusted} ${y1_adjusted} Q ${controlX} ${controlY} ${x2_adjusted} ${y2_adjusted}`}
          stroke="black"
          visibility="hidden"
          strokeWidth="13"
          fill="none"
        />

        {edgeLabelStyle === "gap" && e.label ? (
          <>
            <path
              d={`M ${seg1.p0.x} ${seg1.p0.y} Q ${seg1.c.x} ${seg1.c.y} ${seg1.p1.x} ${seg1.p1.y}`}
              stroke={edgeStates.get(e.id)?.color ?? "black"}
              strokeWidth="2"
              fill="none"
            />
            <path
              d={`M ${seg2.p0.x} ${seg2.p0.y} Q ${seg2.c.x} ${seg2.c.y} ${seg2.p1.x} ${seg2.p1.y}`}
              stroke={edgeStates.get(e.id)?.color ?? "black"}
              strokeWidth="2"
              fill="none"
              markerEnd={graph.directed ? "url(#arrowhead)" : ""}
            />
          </>
        ) : (
          <path
            d={`M ${x1_adjusted} ${y1_adjusted} Q ${controlX} ${controlY} ${x2_adjusted} ${y2_adjusted}`}
            stroke={edgeStates.get(e.id)?.color ?? "black"}
            strokeWidth="2"
            fill="none"
            markerEnd={graph.directed ? "url(#arrowhead)" : ""}
          />
        )}

        {e.label && (
          <MultilineSvgText
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            fontSize="16"
            stroke="white"
            strokeWidth="3"
            paintOrder="stroke fill"
            pointerEvents="none"
            text={e.label}
          />
        )}
        {/* <text x={(x1 + x2) / 2} y={(y1 + y2) / 2}>{e.id}</text> */}
      </g>
    </svg>
  );
}

// Constants for physics calculations
const PHYSICS_CONSTANTS = {
  CEN_CHARGE: -700,
  VTX_CHARGE: 400,
  EDGE_CHARGE: 200,
  MIN_ELEC_DIST: 10,
  K_CONST: 0.5,
  SPR_CONST: 15,
  SPR_LEN: 100,
};

function stepPhysics(graphBundle: GraphBundle, dim: number, elapsed: number) {
  const { graph, vertexStates, edgeStates } = graphBundle;
  const {
    CEN_CHARGE,
    VTX_CHARGE,
    EDGE_CHARGE,
    MIN_ELEC_DIST,
    K_CONST,
    SPR_CONST,
    SPR_LEN,
  } = PHYSICS_CONSTANTS;
  const TRUE_SPR_LEN = SPR_LEN + graph.edges.length;

  const changes = new Map<number, Vector>();
  for (const v1 of graph.vertices) {
    changes.set(v1.id, new Vector(0, 0));
  }
  const cen = new Vector(dim / 2, dim / 2);

  // repulsion between vertices
  for (const v1 of graph.vertices) {
    if (vertexStates.get(v1.id) === undefined) continue;
    const p1 = vertexStates.get(v1.id)!.pos;
    const number = vertexStates.size;
    for (const v2 of graph.vertices) {
      if (v1.id === v2.id) continue;
      if (vertexStates.get(v2.id) === undefined) continue;
      const p2 = vertexStates.get(v2.id)!.pos;
      const diff = p2.sub(p1);

      const dist = Math.max(MIN_ELEC_DIST, diff.norm());
      const force = (-K_CONST * VTX_CHARGE * VTX_CHARGE) / (dist * dist);
      const d = diff.scaleToLength(force / number);

      changes.set(v1.id, changes.get(v1.id)!.add(d));
    }
  }

  // edge springs (ignore duplicate/parallel edges so they don't amplify force)
  const appliedSprings = new Set<string>();
  for (const e of graph.edges) {
    if (vertexStates.get(e.from) === undefined) continue;
    if (vertexStates.get(e.to) === undefined) continue;
    if (vertexStates.get(e.to)! === vertexStates.get(e.from)!) continue;
    const a = Math.min(e.from, e.to);
    const b = Math.max(e.from, e.to);
    const key = `${a}-${b}`;
    if (appliedSprings.has(key)) continue;
    appliedSprings.add(key);

    const p1 = vertexStates.get(e.from)!.pos;
    const p2 = vertexStates.get(e.to)!.pos;
    const diff = p2.sub(p1);
    const dist = diff.norm();
    const force = SPR_CONST * (dist - TRUE_SPR_LEN);
    const d = diff.scaleToLength(force / dist);

    changes.set(e.from, changes.get(e.from)!.add(d));
    changes.set(e.to, changes.get(e.to)!.sub(d));
  }

  const newVStates = new Map<number, VertexState>();
  const factor = Math.min(elapsed / 15, 3);
  for (const v of graph.vertices) {
    if (vertexStates.get(v.id) === undefined) continue;
    if (
      vertexStates.get(v.id)!.heldAt !== null ||
      vertexStates.get(v.id)!.frozen
    ) {
      newVStates.set(v.id, vertexStates.get(v.id)!);
      continue;
    }
    newVStates.set(v.id, {
      ...vertexStates.get(v.id)!,
      pos: vertexStates.get(v.id)!.pos.add(changes.get(v.id)!.scale(factor)),
    });
  }

  // push into boundaries
  for (const v of graph.vertices) {
    if (newVStates.get(v.id) === undefined) continue;
    const cur: VertexState = newVStates.get(v.id)!;
    newVStates.set(v.id, { ...cur, pos: placeInBounds(cur.pos, dim) });
  }

  return { ...graphBundle, vertexStates: newVStates };
  // setVertexStates(newVStates);
}


export default function GraphViewer() {
  const { graphBundle, setGraphBundle, windowHeight } =
    useContext(TotalContext);
  const { graph, vertexStates, edgeStates } = graphBundle;
  const lastTime = useRef<number | undefined>(undefined);
  const frame = useRef(0);
  const dim = windowHeight * graphViewDimRatio;

  // Precompute parallel edge info (unordered vertex pairs)
  const edgeParallelInfo = new Map<
    number,
    { index: number; count: number }
  >();
  const families = new Map<string, Edge[]>();
  graph.edges.forEach((edge) => {
    const a = Math.min(edge.from, edge.to);
    const b = Math.max(edge.from, edge.to);
    const key = `${a}-${b}`;
    if (!families.has(key)) families.set(key, []);
    families.get(key)!.push(edge);
  });
  families.forEach((edges) => {
    edges.forEach((edge, idx) => {
      edgeParallelInfo.set(edge.id, { index: idx, count: edges.length });
    });
  });

  useEffect(() => {
    const step = (timeStamp: number) => {
      if (lastTime.current !== undefined) {
        const sav = lastTime.current!;
        setGraphBundle((prevState: GraphBundle) =>
          stepPhysics(prevState, dim, timeStamp - sav)
        );
      }
      lastTime.current = timeStamp;
      frame.current = window.requestAnimationFrame(step);
    };
    frame.current = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(frame.current);
    };
  }, [dim]);

  function randInt(l: number, r: number) {
    return Math.floor(Math.random() * (r - l)) + l;
  }

  useEffect(() => {
    const newVStates = new Map<number, VertexState>();
    let changed = false;
  
    for (const v of graph.vertices) {
      if (vertexStates.has(v.id) && !Number.isNaN(vertexStates.get(v.id)!.pos.x)) {
        newVStates.set(v.id, vertexStates.get(v.id)!);
      } else {
        const cx = randInt(r, dim - r);
        const cy = randInt(r, dim - r);
        newVStates.set(v.id, {
          pos: new Vector(cx, cy),
          frozen: false,
          heldAt: null,
          textBold: false,
          borderColor: "black",
          fillColor: "white",
        });
        changed = true;
      }
    }
  
    if (changed) {
      setGraphBundle({ ...graphBundle, vertexStates: newVStates });
    }
  }, [graph.vertices, vertexStates, dim]);
  

  return (
    <div className="min-w-[${dim}] min-h-[${dim}]">
      <svg
        width={dim}
        height={dim}
        className="border-solid border-2 graph-view-svg"
        id="graph-view-svg"
      >
        {graph.edges.map((e) => {
          const info = edgeParallelInfo.get(e.id)!;
          return (
            <EdgeView
              key={e.id}
              e={e}
              parallelIndex={info.index}
              parallelCount={info.count}
            />
          );
        })}
        {graph.vertices.map((v) => {
          return <VertexView key={v.id} v={v} />;
        })}
      </svg>
    </div>
  );
}
