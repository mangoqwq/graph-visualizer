"use client";

import React, { useState, useContext, useEffect } from "react";
import { Graph, addEdge, addVertexIfNotExist, renameVertex } from "./graph";
import { TotalContext } from "./graph-visualizer";

export default function TextEditor() {
	const { graph, setGraph, vertexStates, setVertexStates, inputBoxText, setInputBoxText } = useContext(TotalContext);

	const updateGraph = (newText: string) => {
		const ret: Graph = { directed: graph.directed, vertices: [], edges: [] };
		const lines = newText.split("\n");
		for (const line of lines) {
			const matchVertex = () => {
				const re = /^\s*(-?\d+)\s*(?::(.*))?\s*$/;
				const res = line.match(re);
				if (res !== null) {
					console.log(res);
					const [, id, label] = res;
					if (ret.vertices.some((v) => (v.id === parseInt(id)))) {
						renameVertex(ret, parseInt(id), label);
					}
					else addVertexIfNotExist(ret, parseInt(id), label);
				}
			}
			const matchEdge = () => {
				const re = /^\s*(-?\d+)\s+(-?\d+)\s*$/;
				const res = line.match(re);
				if (res !== null) {
					const [, from, to] = res;
					addEdge(ret, parseInt(from), parseInt(to), false);
					console.log(from, to);
				}
			}

			matchVertex();
			matchEdge();
		}
		if (ret !== graph) setGraph(ret);
	};

	useEffect(() => {
		updateGraph(inputBoxText);
	}, [inputBoxText]);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (inputBoxText !== e.target.value) {
			setInputBoxText(e.target.value);
			updateGraph(e.target.value);
		}
	};

	return (
		<div className="h-[80vh]">
			<textarea
				className="border-solid border-2 resize-none h-full m-2 p-2"
				value={inputBoxText}
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
}
