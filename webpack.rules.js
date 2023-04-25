/*
 * Author  Murphy.xie
 * Date  2023-04-25 11:28:03
 * LastEditors  Murphy.xie
 * LastEditTime  2023-04-25 15:54:46
 * Description
 */

module.exports = [
	// Add support for native node modules
	{
		// We're specifying native_modules in the test because the asset relocator loader generates a
		// "fake" .node file which is really a cjs file.
		test: /native_modules[/\\].+\.node$/,
		use: "node-loader",
	},
	{
		test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: "@vercel/webpack-asset-relocator-loader",
			options: {
				outputAssetBase: "native_modules",
			},
		},
	},
	{
		test: /\.jsx?$/,
		use: {
			loader: "babel-loader",
			options: {
				exclude: /(node_modules|public)/,
				presets: ["@babel/preset-react"],
			},
		},
	},
	{
		test: /\.(png|jpg|jpeg|gif|mp4|svg|fbx|FBX|obj)$/,
		type: "asset",
		parser: {
			dataUrlCondition: {
				maxSize: 10 * 1024,
			},
		},
	},
	// Put your webpack loader rules in this array.  This is where you would put
	// your ts-loader configuration for instance:
	/**
	 * Typescript Example:
	 *
	 * {
	 *   test: /\.tsx?$/,
	 *   exclude: /(node_modules|.webpack)/,
	 *   loaders: [{
	 *     loader: 'ts-loader',
	 *     options: {
	 *       transpileOnly: true
	 *     }
	 *   }]
	 * }
	 */
];
