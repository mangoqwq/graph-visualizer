"use client";

import React, { useEffect, useState, useContext } from "react";
import { Graph, addEdge, Vertex, Edge } from "./graph";
import { TotalContext, VertexState, EdgeState } from "./graph-visualizer";
import Vector from "./vector";
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";

// const dim = (typeof window !== undefined ? window.innerHeight * 0.8 : 800);
const dim = 800;
const r = 20;

function placeInBounds(v: Vector) {
  var { x: vx, y: vy } = v;
  if (vx < 2 * r) vx = 2 * r;
  if (vx > dim - 2 * r) vx = dim - 2 * r;
  if (vy < 2 * r) vy = 2 * r;
  if (vy > dim - 2 * r) vy = dim - 2 * r;
  return new Vector(vx, vy);
}

function VertexView({ v }: { v: Vertex }) {
  const { vertexStates, edgeStates, mouseMode, setVertexStates, mouseDown } =
    useContext(TotalContext);

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
            ({ x, y } = placeInBounds(new Vector(x, y)));
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
      console.log(vertexStates.get(v.id)!.heldAt!, Date.now());
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
    if (mouseMode.mode === "paint" && mouseMode.subject === "vertex-border" && mouseDown) {
      setVertexStates(
        new Map<number, VertexState>(vertexStates).set(v.id, {
          ...vertexStates.get(v.id)!,
          borderColor: mouseMode.color,
        })
      );
    }
    if (mouseMode.mode === "paint" && mouseMode.subject === "vertex-fill" && mouseDown) {
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
        >
          {v.label === null ? v.id : v.label}
        </text>
      </g>
    </Draggable>
  );
}

function EdgeView({ e }: { e: Edge }) {
  const { vertexStates, edgeStates, setEdgeStates, mouseMode, mouseDown } =
    useContext(TotalContext);
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
  return (
    <g onMouseEnter={onMouseEnter} onClick={onClick} pointerEvents="all">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        visibility="hidden"
        strokeWidth="13"
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={edgeStates.get(e.id)?.color ?? "black"}
        strokeWidth="2"
      />
      {/* <text x={(x1 + x2) / 2} y={(y1 + y2) / 2}>{e.id}</text> */}
    </g>
  );
}

function stepPhysics(
  graph: Graph,
  vertexStates: Map<number, VertexState>,
  setVertexStates: React.Dispatch<
    React.SetStateAction<Map<number, VertexState>>
  >
) {
  // PARAMETERS
  const [CEN_CHARGE, VTX_CHARGE, EDGE_CHARGE] = [-700, 400, 200];
  const [MIN_ELEC_DIST] = [10];
  const [K_CONST] = [0.5];

  const [SPR_CONST] = [15];
  const [SPR_LEN] = [100];

  const changes = new Map<number, Vector>();
  for (const v1 of graph.vertices) {
    changes.set(v1.id, new Vector(0, 0));
  }
  const cen = new Vector(dim / 2, dim / 2);

  // attraction to center
  // for (const v of graph.vertices) {
  // 	if (positions.get(v.id) === undefined) continue;
  // 	const [vx, vy] = positions.get(v.id)!;
  // 	var [dx, dy] = [cenx - vx, ceny - vy];
  // 	var dist = Math.sqrt(dx * dx + dy * dy);
  // 	dx = dx / dist; dy = dy / dist;

  // 	dist = (dim - dist) / 2;
  // 	const force = -1 * K_CONST * CEN_CHARGE * VTX_CHARGE / (dist ** 2);
  // 	console.log(force);
  // 	dx = dx * force; dy = dy * force;

  // 	newPositions.set(v.id, [newPositions.get(v.id)![0] + dx, newPositions.get(v.id)![1] + dy]);
  // }

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

  // repulsion from edges
  // for (const v1 of graph.vertices) {
  // 	if (positions.get(v1.id) === undefined) continue;
  // 	const [vx1, vy1] = positions.get(v1.id)!;
  // 	const number = graph.edges.length;
  // 	for (const e of graph.edges) {
  // 		if (positions.get(e.from) === undefined) continue;
  // 		if (positions.get(e.to) === undefined) continue;
  // 		const vx2 = positions.get(e.from)![0] + positions.get(e.to)![0];
  // 		const vy2 = positions.get(e.from)![1] + positions.get(e.to)![1];
  // 		var [dx, dy] = [vx2 - vx1, vy2 - vy1];
  // 		const dist = Math.sqrt(dx * dx + dy * dy);
  // 		dx = dx / dist; dy = dy / dist;
  // 		const force = -K_CONST * VTX_CHARGE * VTX_CHARGE / (dist * dist);
  // 		dx = dx * force / number; dy = dy * force / number;

  // 		newPositions.set(v1.id, [newPositions.get(v1.id)![0] + dx, newPositions.get(v1.id)![1] + dy]);
  // 	}
  // }

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
    const force = SPR_CONST * (dist - SPR_LEN);
    const d = diff.scaleToLength(force / dist);

    changes.set(e.from, changes.get(e.from)!.add(d));
    changes.set(e.to, changes.get(e.to)!.sub(d));
  }

  const newVStates = new Map<number, VertexState>();
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
      pos: vertexStates.get(v.id)!.pos.add(changes.get(v.id)!),
    });
  }

  // push into boundaries
  for (const v of graph.vertices) {
    if (newVStates.get(v.id) === undefined) continue;
    const cur: VertexState = newVStates.get(v.id)!;
    newVStates.set(v.id, { ...cur, pos: placeInBounds(cur.pos) });
  }

  setVertexStates(newVStates);
}

export default function GraphViewer() {
  const {
    graph,
    setGraph,
    vertexStates,
    setVertexStates,
    edgeStates,
    setEdgeStates,
  } = useContext(TotalContext);

  useEffect(() => {
    const interval = setInterval(() => {
      stepPhysics(graph, vertexStates, setVertexStates);
    }, 5);
    return () => {
      clearInterval(interval);
    };
  }, [graph, vertexStates]);

  function randInt(l: number, r: number) {
    return Math.floor(Math.random() * (r - l)) + l;
  }

  // const pos = new Map<number, [number, number]>();
  const newVStates = new Map<number, VertexState>();
  var changed = false;
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
        borderColor: "black",
        fillColor: "white",
      });
      changed = true;
    }
  }
  if (changed) setVertexStates(newVStates);

  return (
    <svg
      width={dim}
      height={dim}
      className="border-solid border-2 m-2 p-2 graph-view-svg"
			id="graph-view-svg"
    >
      {graph.edges.map((e) => {
        return <EdgeView key={e.id} e={e} />;
      })}
      {graph.vertices.map((v) => {
        return <VertexView key={v.id} v={v} />;
      })}
    </svg>
  );
}
