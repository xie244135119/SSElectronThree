/*
 * Author  Murphy.xie
 * Date  2023-04-25 13:30:48
 * LastEditors  Murphy.xie
 * LastEditTime  2023-04-25 15:12:11
 * Description
 */
import React, { useEffect } from "react";
import ThreeJS from "../js/threeJs/index1";

export default function Test(params) {
	useEffect(() => {
		const threeJs = new ThreeJS();
		// console.log(" process.resourcesPath ", __static);
		threeJs.setup("threecontainer");
		// threeJs.loadFbx("http://localhost:10000/public/models/Soldier.glb");
		// let testBasePath = ""; // eslint-disable-line no-unused-vars
		// switch (process.env.NODE_ENV) {
		// 	case "development":
		// 		testBasePath = path.join(__static, "/resources"); // eslint-disable-line no-undef
		// 		break;
		// 	case "production":
		// 		testBasePath = process.resourcesPath; // 生产环境
		// 		break;
		// }
		// threeJs.loadFbx("../static/地形2.glb");
	}, []);

	return (
		<div>
			<h3>场景搭建</h3>
			<div id="threecontainer" style={{ width: "100%", height: "100%" }} />
		</div>
	);
}
