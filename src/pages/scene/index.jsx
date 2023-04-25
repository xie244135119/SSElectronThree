/*
 * Author  Murphy.xie
 * Date  2023-04-25 15:08:12
 * LastEditors  Murphy.xie
 * LastEditTime  2023-04-25 16:28:27
 * Description
 */

import React, { useEffect } from "react";
import ThreeJs, { THREE } from "../../js/threeJs/index";
import styles from "./index.less";

export default function Scene(params) {
	useEffect(() => {
		const threeJs = new ThreeJs();
		threeJs.setup("threecontainer");
		threeJs.threeScene.background = new THREE.Color(0, 0, 0);

		// 网格
		var grid = new THREE.GridHelper(24, 24, 0xff0000, 0x444444);
		grid.material.opacity = 0.4;
		// grid.material.transparent = true;
		// grid.rotation.x = Math.PI / 2.0;
		threeJs.threeScene.add(grid);

		// 几何体
		const box = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshStandardMaterial({
			color: "#FF0000",
		});
		const mesh = new THREE.Mesh(box, material);
		mesh.position.set(0, 0, 0);
		threeJs.threeScene.add(mesh);

		// gui
		threeJs.addGui();

		return () => {
			threeJs.destroy();
		};
	}, []);

	return (
		<div className={styles.background}>
			{/* 项目目录 */}
			<div className={styles.leftview}></div>
			<div className={styles.contentview}>
				<div id="threecontainer" style={{ width: "100%", height: "100%" }} />
			</div>
			<div className={styles.rightview}></div>
		</div>
	);
}
