/*
 * Author  Murphy.xie
 * Date  2023-04-25 15:08:12
 * LastEditors  Murphy.xie
 * LastEditTime  2023-06-06 16:50:47
 * Description
 */

import React, { useEffect, useRef, useState } from "react";
// import fs from "fs";
// import filere from "filer";
import ThreeJs, { THREE } from "../../js/threeJs/index";
import FileReader from "../../js/file";
import styles from "./index.less";

export default function Scene(params) {
	// 项目目录
	const [projectTreeList, setProjectTreeList] = useState([]);
	// canvas view
	const canvasViewRef = useRef(document.body);
	// 文件读取器
	const fileReder = useRef(new FileReader());
	// threeJs
	const threeJsRef = useRef(new ThreeJs());

	useEffect(() => {
		canvasViewRef.current.addEventListener("drop", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const files = e.dataTransfer?.files || [];
			console.log(" event  drop ", e, files);
			// 文件数据
			if (files.length > 0) {
				fileReder.current.readAsArrayBuffer(files[0]).then((res) => {
					console.log(" 拖入的数据信息 ", res);
					threeJsRef.current.loadGltfDracoBuffer(res, true);
				});
			}
		});
		canvasViewRef.current.addEventListener("dragover", (e) => {
			e.preventDefault();
			e.stopPropagation();
		});
	}, []);

	useEffect(() => {
		threeJsRef.current.setup("threecontainer");
		threeJsRef.current.threeScene.background = new THREE.Color(0, 0, 0);

		// 网格
		var grid = new THREE.GridHelper(24, 24, 0xff0000, 0x444444);
		grid.material.opacity = 0.4;
		// grid.material.transparent = true;
		// grid.rotation.x = Math.PI / 2.0;
		threeJsRef.current.threeScene.add(grid);

		// 几何体
		const box = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshStandardMaterial({
			color: "#FF0000",
		});
		const mesh = new THREE.Mesh(box, material);
		mesh.position.set(0, 0, 0);
		threeJsRef.current.threeScene.add(mesh);

		// gui
		threeJsRef.current.addGui();
		// threeJsRef.current.loadGltfDraco("public/地形2.glb").catch((e) => {
		// 	console.log(" 加载出错 ", e);
		// });

		return () => {
			threeJsRef.current.destroy();
		};
	}, []);

	return (
		<div
			className={styles.background}
			ref={canvasViewRef}
			// draggable
		>
			{/* 项目目录 */}
			<div className={styles.leftview}>{/* 文件名称 */}</div>
			<div className={styles.contentview}>
				<div id="threecontainer" style={{ width: "100%", height: "100%" }} />
			</div>
			<div className={styles.rightview}></div>
		</div>
	);
}
