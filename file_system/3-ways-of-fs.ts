// USING FS PROMISES
// DOES NOT BLOCK THE MAIN THREAD (GOOD THING)
import { copyFile } from "node:fs/promises";

(async() => {
	try {
		await copyFile("text.txt", "promise_copy_file.txt");
	} catch (error) {
		// WE CAN HANDLE THE ERROR AND APPLICATION WILL NOT SHUTDOWN
		console.log(error);
	}
})()

// ---------------------------------------------------------------//

// USING CALLBACK
// DOES NOT BLOCK THE MAIN THREAD (GOOD THING)
import { copyFile } from "node:fs";

copyFile("text.txt", "callback_copy_file.txt", (error) => {
	if(error) {
		// WE CAN HANDLE THIS ERROR AND APP WILL NOT SHUTDOWN
		console.log(error)
	}
})

//--------------------------------------------------------------//

// USING SYNC OPERATIONS
// BLOCKS THE MAIN THREAD!! :(
// APPLICATION WILL SHUTDOWN IF ERROR OCCURS | CANNOT HANDLE ERRORS
// ONLY USE WHEN YOU HAVE AN OPERATION WHERE FILE MUST BE OPERATED
// ALL SYNC OPERATIONS ENDS WITH 'Sync'
import { copyFileSync } from "node:fs";

copyFileSync("text.txt", "sync_copy_file.txt");