/*
 * Author  Murphy.xie
 * Date  2023-04-25 11:28:03
 * LastEditors  Murphy.xie
 * LastEditTime  2023-05-25 21:55:25
 * Description
 */
const rules = require("./webpack.rules");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

rules.push(
	{
		test: /\.css$/,
		use: [{ loader: "style-loader" }, { loader: "css-loader" }],
	},
	{
		test: /\.less$/,
		use: [
			{ loader: "style-loader" },
			{
				loader: "css-loader",
				options: {
					import: true,
					sourceMap: true,
					modules: {
						mode: "local",
						localIdentName: "[path][name]__[local]",
						localIdentContext: path.resolve(__dirname, "../src/"),
						localIdentHashSalt: "hash",
						namedExport: false,
					},
				},
			},
			{
				loader: "less-loader",
				options: {
					sourceMap: true,
				},
			},
		],
	}
);

module.exports = {
	// Put your normal webpack config below here
	module: {
		rules,
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "public", to: "public" },
				{
					from: "node_modules/three/examples/js/libs/draco/",
					to: "static/three/draco",
				},
				{
					from: "node_modules/three/examples/js/libs/basis/",
					to: "static/three/basis",
				},
			],
		}),
	],
};
