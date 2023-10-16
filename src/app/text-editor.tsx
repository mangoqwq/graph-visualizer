"use client";

import React, { useState, useContext, useEffect } from "react";
import { Graph, addEdge, addVertexIfNotExist, renameVertex } from "./graph";
import { TotalContext } from "./graph-visualizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const generateGraph = (newText: string, directed: boolean) => {
	const ret: Graph = { directed: directed, vertices: [], edges: [] };
	const lines = newText.split("\n");
	var edgeId = 0;
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
				addEdge(ret, edgeId++, parseInt(from), parseInt(to));
			}
		}

		matchVertex();
		matchEdge();
	}
	return ret
};

export default function TextEditor() {
	const { graph, setGraph, vertexStates, setVertexStates, inputBoxText, setInputBoxText } = useContext(TotalContext);
	const [ infoBoxVisible, setInfoBoxVisible ] = useState<boolean>(false);

	useEffect(() => {
		setGraph(generateGraph(inputBoxText, graph.directed));
	}, [inputBoxText]);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (inputBoxText !== e.target.value) {
			setInputBoxText(e.target.value);
			setGraph(generateGraph(e.target.value, graph.directed));
		}
	};

	const onMouseEnter = () => {
		setInfoBoxVisible(true);
	}
	const onMouseLeave = () => {
		setInfoBoxVisible(false);
	}

	return (
		<div className="h-[80vh] m-2 flex flex-col">
			<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				Input: <FontAwesomeIcon icon="question-circle" className="max-h-6 max-w-6" />
				{infoBoxVisible ? <p className="fixed bg-black color rounded-lg text-white px-2">
					lone vertex - id <br/>
					labeled vertex - id: label <br/>
					edge - id1 id2 <br/>
				</p>: null}
			</div>
			<div className="grow ">
				<textarea
					className="border-2 border-solid resize-none h-full"
					value={inputBoxText}
					onChange={(e) => onChange(e)}
				/>
			</div>
		</div>
	);
}
