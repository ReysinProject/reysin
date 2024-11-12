import { defineRoute } from "@reysin/project";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

function Render() {
	const navigate = useNavigate();

	const handleNav = () => {
		navigate("/a");
	};

	return (
		<div
			style={{
				padding: 20,
				border: "1px solid black",
			}}
		>
			<h2>Composant Page</h2>
			<button type={"button"} onClick={handleNav}>
				Go to /a
			</button>
			<p>Bienvenue sur notre site web</p>
		</div>
	);
}

function RenderTwo() {
	const navigate = useNavigate();

	const handleNav = () => {
		navigate("/");
	};

	return (
		<div
			style={{
				padding: 20,
				border: "1px solid black",
			}}
		>
			<h2>Composant Page</h2>
			<button type={"button"} onClick={handleNav}>
				Go to /
			</button>
			<p>Bienvenue sur notre site web</p>
		</div>
	);
}

function Layout({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				padding: 20,
				border: "1px solid black",
			}}
		>
			<h1>Layout</h1>
			{children}
		</div>
	);
}

@defineRoute({
	path: "/",
	meta: {
		title: "Accueil",
		description: "Page d'accueil de notre application",
	},
	render: Render,
	layout: Layout,
})
export class HomeRoute {}

@defineRoute({
	path: "/a",
	meta: {
		title: "test",
		description: "Page d'accueil de notre application",
	},
	render: RenderTwo,
	layout: Layout,
})
export class TTRoute {}
