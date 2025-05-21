"use client";

import React, { useState, useContext, useEffect } from "react";
import { Graph, addEdge, toAdjList, toBidirectionalAdjList } from "./graph";
import { GraphBundle, TotalContext, VertexState } from "./graph-visualizer";
import Vector from "./vector";

export type ArrangeDirection = "down" | "up" | "left" | "right";

export function arrangeLayers(
	graphBundle: GraphBundle,
	layers: number[][],
	graphViewDim: number,
	arrangeDirection: ArrangeDirection
): GraphBundle {
	const { graph, vertexStates } = graphBundle;

	if (graph.vertices.length === 0) return graphBundle;

	const newVStates = new Map<number, VertexState>(vertexStates);

	const layerDistance = graphViewDim / (layers.length + 1);
	for (let i = 0; i < layers.length; i++) {
		const layer = layers[i];
		const layerWidth = graphViewDim / (layer.length + 1);
		for (let j = 0; j < layer.length; j++) {
			const vertexId = layer[j];
			const pos = (() => {
				switch (arrangeDirection) {
					case "down":
						return new Vector((j + 1) * layerWidth, (i + 1) * layerDistance);
					case "up":
						return new Vector((j + 1) * layerWidth, graphViewDim - (i + 1) * layerDistance);
					case "left":
						return new Vector(graphViewDim - (i + 1) * layerDistance, (j + 1) * layerWidth);
					case "right":
						return new Vector((i + 1) * layerDistance, (j + 1) * layerWidth);
				}
			})();
			newVStates.set(vertexId, {
				...vertexStates.get(vertexId)!,
				pos,
			});
		}
	}
	for (const vertexId of graph.vertices.map((v) => v.id)) {
		const vState = newVStates.get(vertexId)!;
		vState.frozen = true;
	}

	return { ...graphBundle, vertexStates: newVStates };
}

export function arrangeAsDfsTree(
  graphBundle: GraphBundle,
  src: number,
  graphViewDim: number,
  arrangeDirection: ArrangeDirection
): GraphBundle {
  const { graph, vertexStates } = graphBundle;
  if (graph.vertices.find((v) => v.id === src) === undefined)
    return graphBundle;

  // do dfs traversal starting from src
  const adj = toBidirectionalAdjList(graph);
  var layers: number[][] = [];
  const visited = new Set<number>();
  const dfs = (vertex: number, layer: number) => {
    if (visited.has(vertex)) return;
    visited.add(vertex);

    if (layers[layer] === undefined) layers[layer] = [];
    layers[layer].push(vertex);

    for (const neighbor of adj.get(vertex)!) {
      dfs(neighbor, layer + 1);
    }
  };
  dfs(src, 0);
  return arrangeLayers(graphBundle, layers, graphViewDim, arrangeDirection);
}

export function arrangeAsBfsTree(
  graphBundle: GraphBundle,
  src: number,
  graphViewDim: number,
  arrangeDirection: ArrangeDirection
): GraphBundle {
  const { graph, vertexStates } = graphBundle;
  if (graph.vertices.find((v) => v.id === src) === undefined)
    return graphBundle;

  // do bfs traversal starting from src
  const adj = toBidirectionalAdjList(graph);
  var layers: number[][] = [];
  const dist = new Map<number, number>();
  const queue: number[] = [src];
  dist.set(src, 0);
  while (queue.length > 0) {
    const vertex = queue.shift()!;
    const layer = dist.get(vertex)!;
    if (layers[layer] === undefined) layers[layer] = [];
    layers[layer].push(vertex);
    for (const neighbor of adj.get(vertex)!) {
      if (!dist.has(neighbor)) {
        dist.set(neighbor, layer + 1);
        queue.push(neighbor);
      }
    }
  }
  console.log(layers);
  return arrangeLayers(graphBundle, layers, graphViewDim, arrangeDirection);
}

export function arrangeAsDag(
  graphBundle: GraphBundle,
  graphViewDim: number,
  arrangeDirection: ArrangeDirection
): GraphBundle {
  const { graph, vertexStates } = graphBundle;
  if (graph.vertices.length === 0) return graphBundle;
  if (graph.directed == false) {
    alert("Graph is not directed");
    return graphBundle;
  }

  // do topological sort
  const adj = toAdjList(graph);
  const indegree = new Map<number, number>();
  for (const vertex of graph.vertices) {
    indegree.set(vertex.id, 0);
  }
  for (const edge of graph.edges) {
    indegree.set(edge.to, indegree.get(edge.to)! + 1);
  }

  const queue: number[] = [];
  for (const vertex of graph.vertices) {
    if (indegree.get(vertex.id) === 0) {
      queue.push(vertex.id);
    }
  }

  var order: number[] = [];
  while (queue.length > 0) {
    const vertex = queue.shift()!;
    order.push(vertex);

    for (const neighbor of adj.get(vertex)!) {
      indegree.set(neighbor, indegree.get(neighbor)! - 1);
      if (indegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  console.log(adj, order);
  var layer: Map<number, number> = new Map();
  for (let i = 0; i < order.length; i++) {
    const v = order[i];
    if (layer.get(v) === undefined) {
      layer.set(v, 0);
    }
    const curLayer = layer.get(v)!;
    for (const to of adj.get(v)!) {
      console.log(v, to);
      if (layer.get(to) === undefined) {
        layer.set(to, curLayer + 1);
      } else {
        layer.set(to, Math.max(layer.get(to)!, i + 1));
      }
    }
  }
  var layers: number[][] = [];
  // Resize layers to ensure all vertices fit within the graph view dimensions
  const maxLayerWidth = Math.max(...Array.from(layer.values())) + 1;
  for (let i = 0; i < maxLayerWidth; i++) {
    layers.push([]);
  }

  for (const vertex of graph.vertices) {
    const curLayer = layer.get(vertex.id);
    if (curLayer === undefined) {
      continue;
    }
    layers[curLayer].push(vertex.id);
  }
  console.log(layer, layers);
  return arrangeLayers(graphBundle, layers, graphViewDim, arrangeDirection);
}
