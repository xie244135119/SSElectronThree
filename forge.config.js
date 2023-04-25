/*
 * Author  Murphy.xie
 * Date  2023-04-25 11:28:03
 * LastEditors  Murphy.xie
 * LastEditTime  2023-04-25 16:53:56
 * Description
 */
module.exports = {
	packagerConfig: {
		icon: "icons/logo_macos",
	},
	rebuildConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin"],
		},
		{
			name: "@electron-forge/maker-deb",
			config: {},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {},
		},
	],
	plugins: [
		{
			name: "@electron-forge/plugin-webpack",
			config: {
				mainConfig: "./webpack.main.config.js",
				// devContentSecurityPolicy: "`default-src 'self' 'unsafe-inline' data:;`", //设置
				renderer: {
					config: "./webpack.renderer.config.js",
					entryPoints: [
						{
							html: "./src/index.html",
							js: "./src/renderer.js",
							name: "main_window",
							preload: {
								js: "./src/preload.js",
							},
						},
					],
				},
			},
		},
	],
};
