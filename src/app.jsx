/*
 * Author  Murphy.xie
 * Date  2023-04-25 11:33:51
 * LastEditors  Murphy.xie
 * LastEditTime  2023-04-25 15:58:20
 * Description
 */

import React from "react";
import { createRoot } from "react-dom/client";
import Scene from "./pages/scene/index.jsx";

function render() {
	const ele = document.createElement("div");
	ele.style.width = "100vw";
	ele.style.height = "100vh";
	document.body.appendChild(ele);

	const root = createRoot(ele, {
		identifierPrefix: "user",
	});
	root.render(<Scene />);
}
render();
