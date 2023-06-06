/*
 * Author  Murphy.xie
 * Date  2023-04-25 11:28:03
 * LastEditors  Murphy.xie
 * LastEditTime  2023-05-24 17:20:54
 * Description
 */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge } = require("electron");
// import * as afs from "fs";
console.log(" contextBridge ", contextBridge);
contextBridge.exposeInMainWorld("versions", {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	// 能暴露的不仅仅是函数，我们还可以暴露变量
});
// contextBridge.exposeInMainWorld("fs", afs);
