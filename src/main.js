/*
 * Author  Murphy.xie
 * Date  2023-04-25 11:28:03
 * LastEditors  Murphy.xie
 * LastEditTime  2023-06-06 17:24:45
 * Description
 */
const {
	app,
	BrowserWindow,
	contextBridge,
	ipcRenderer,
	session,
	autoUpdater,
	dialog,
} = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

console.log(" contextBridge ", contextBridge, ipcRenderer, app.getVersion());

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
			// 使用node环境
			// nodeIntegration: true,
			// contextIsolation: true,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	//
	session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
		return callback({
			responseHeaders: {
				...details.responseHeaders,
				"Content-Security-Policy": [
					"default-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data: ;",
				],
			},
		});
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// check update
const checkUpdate = () => {
	const server = "https://your-deployment-url.com";
	const url = `${server}/update/${process.platform}/${app.getVersion()}`;
	autoUpdater.setFeedURL({ url });
	autoUpdater.checkForUpdates();
	autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
		const dialogOpts = {
			type: "info",
			buttons: ["Restart", "Later"],
			title: "Application Update",
			message: process.platform === "win32" ? releaseNotes : releaseName,
			detail:
				"A new version has been downloaded. Restart the application to apply the updates.",
		};

		dialog.showMessageBox(dialogOpts).then((returnValue) => {
			if (returnValue.response === 0) autoUpdater.quitAndInstall();
		});
	});

	autoUpdater.on("error", (message) => {
		console.error("There was a problem updating the application");
		console.error(message);
	});
};
checkUpdate();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
