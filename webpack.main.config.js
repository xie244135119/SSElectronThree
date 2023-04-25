/*
 * Author  Murphy.xie
 * Date  2023-04-25 11:28:03
 * LastEditors  Murphy.xie
 * LastEditTime  2023-04-25 13:35:47
 * Description
 */
const path = require("path");
module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: "./src/main.js",
	// Put your normal webpack config below here
	module: {
		rules: require("./webpack.rules"),
	},
	resolve: {
		// 未生效
		// alias: {
		// 	"@": path.resolve(__dirname, "./src/"),
		// },
	},
};
