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

function placeInBounds(v: Vector, dim: number) {
  var { x: vx, y: vy } = v;
  if (vx < 2 * r) vx = 2 * r;
  if (vx > dim - 2 * r) vx = dim - 2 * r;
  if (vy < 2 * r) vy = 2 * r;
  if (vy > dim - 2 * r) vy = dim - 2 * r;
  return new Vector(vx, vy);
}

function VertexView({ v }: { v: Vertex }) {
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
    >
      <g onClick={onClick} onMouseEnter={onMouseEnter}>
        <circle
          // cx={cx}
          // cy={cy}
          r={r}
          strokeWidth={vertexStates.get(v.id)!.frozen ? "4" : "2"}
          stroke={vertexStates.get(v.id)!.borderColor}
          // fill={vertexStates.get(v.id)!.heldAt !== null ? "grey" : "white"}
          fill={vertexStates.get(v.id)!.fillColor}
        />
        <text
          // x={cx}
          // y={cy}
          textAnchor="middle"
          alignmentBaseline="middle"
          className="select-none"
          fontWeight={vertexStates.get(v.id)!.textBold ? "bold" : "normal"}
        >
          {v.label === null ? v.id : v.label}
        </text>
      </g>
    </Draggable>
  );
}

function EdgeView({ e }: { e: Edge }) {
  const { graphBundle, setGraphBundle, mouseMode, mouseDown } =
    useContext(TotalContext);
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

  const dx = x2 - x1;
  const dy = y2 - y1;
  
  const len = Math.sqrt(dx * dx + dy * dy);
  
  const unitX = dx / len;
  const unitY = dy / len;
  
  const x1_adjusted = x1 + unitX * radius;
  const y1_adjusted = y1 + unitY * radius;
  
  const x2_adjusted = x2 - unitX * radius;
  const y2_adjusted = y2 - unitY * radius;
  
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
        <line
          x1={x1_adjusted}
          y1={y1_adjusted}
          x2={x2_adjusted}
          y2={y2_adjusted}
          stroke="black"
          visibility="hidden"
          strokeWidth="13"
        />
        <line
          x1={x1_adjusted}
          y1={y1_adjusted}
          x2={x2_adjusted}
          y2={y2_adjusted}
          stroke={edgeStates.get(e.id)?.color ?? "black"}
          strokeWidth="2"
          marker-end={graph.directed ? "url(#arrowhead)" : ""}
        />
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

  // edge springs
  // TODO: duplicate edges
  for (const e of graph.edges) {
    if (vertexStates.get(e.from) === undefined) continue;
    if (vertexStates.get(e.to) === undefined) continue;
    if (vertexStates.get(e.to)! === vertexStates.get(e.from)!) continue;
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

  // const pos = new Map<number, [number, number]>();
  const newVStates = new Map<number, VertexState>();
  var changed = false;
  for (const v of graph.vertices) {
    if (
      vertexStates.has(v.id) &&
      !Number.isNaN(vertexStates.get(v.id)!.pos.x)
    ) {
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
  if (changed) setGraphBundle({ ...graphBundle, vertexStates: newVStates });

  return (
    <div className="min-w-[${dim}] min-h-[${dim}]">
      <svg
        width={dim}
        height={dim}
        className="border-solid border-2 graph-view-svg"
        id="graph-view-svg"
      >
        {graph.edges.map((e) => {
          return <EdgeView key={e.id} e={e} />;
        })}
        {graph.vertices.map((v) => {
          return <VertexView key={v.id} v={v} />;
        })}
      </svg>
    </div>
  );
}
