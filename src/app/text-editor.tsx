"use client";

import React, { useState, useContext, useEffect } from "react";
import { Graph, addEdge, addVertexIfNotExist, renameVertex } from "./graph";
import { TotalContext } from "./graph-visualizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function decodeEscapedNewlines(label: string) {
	let decoded = "";

	for (let i = 0; i < label.length; i++) {
		if (label[i] !== "\\") {
			decoded += label[i];
			continue;
		}

		let slashCount = 0;
		while (i + slashCount < label.length && label[i + slashCount] === "\\") {
			slashCount++;
		}

		const nextChar = label[i + slashCount];
		if (nextChar === "n") {
			decoded += "\\".repeat(Math.floor(slashCount / 2));
			decoded += slashCount % 2 === 1 ? "\n" : "n";
			i += slashCount;
			continue;
		}

		decoded += "\\".repeat(slashCount);
		i += slashCount - 1;
	}

	return decoded;
}

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
				const decodedLabel =
					label === undefined ? undefined : decodeEscapedNewlines(label);
				if (ret.vertices.some((v) => (v.id === parseInt(id)))) {
					renameVertex(ret, parseInt(id), decodedLabel);
				}
				else addVertexIfNotExist(ret, parseInt(id), decodedLabel);
			}
		}
		const matchEdge = () => {
			// Capture from, to, and optional label (everything after the second token)
			const re = /^\s*(-?\d+)\s+(-?\d+)\s*(.*)$/;
			const res = line.match(re);
			if (res !== null) {
				const [, from, to, labelRaw] = res;
				const label =
					labelRaw !== undefined && labelRaw.trim() !== ""
						? decodeEscapedNewlines(labelRaw.trim())
						: null;
				addEdge(ret, edgeId++, parseInt(from), parseInt(to), label);
			}
		}

		matchVertex();
		matchEdge();
	}
	return ret
};

export default function TextEditor() {
	const { graphBundle, setGraphBundle, inputBoxText, setInputBoxText } = useContext(TotalContext);
	const { graph, vertexStates, edgeStates } = graphBundle;
	const [ infoBoxVisible, setInfoBoxVisible ] = useState<boolean>(false);
	const setGraph = (g: Graph) => { setGraphBundle({ graph: g, vertexStates: vertexStates, edgeStates: edgeStates }) };

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
		<div className=" flex flex-col">
			<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				Input: <FontAwesomeIcon icon="question-circle" className="max-h-6 max-w-6" />
				{infoBoxVisible ? <p className="fixed bg-black color rounded-lg text-white px-2">
					lone vertex - id <br/>
					labeled vertex - id: label <br/>
					edge - id1 id2 <br/>
					self-loop - id id <br/>
					use \n in labels for line breaks <br/>
					use \\n for a literal \n <br/>
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
