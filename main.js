const { app, BrowserWindow } = require('electron');

function createWindow() 
{
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.setMenuBarVisibility(false);

	// Load the index.html file
	win.loadFile('index.html');
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
