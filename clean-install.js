import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { rimraf } from "rimraf";

// Function to delete a directory with rimraf
const deleteDirectory = (directoryPath) => {
    if (fs.existsSync(directoryPath)) {
        console.log(`[INFO] Deleting: ${directoryPath}`);
        rimraf.sync(directoryPath); // Rimraf forces deletion recursively
        if (!fs.existsSync(directoryPath)) {
            console.log(`[SUCCESS] Deleted: ${directoryPath}`);
        } else {
            console.error(`[ERROR] Couldn't delete directory: ${directoryPath}`);
        }
    } else {
        console.log(`[INFO] Directory does not exist: ${directoryPath}`);
    }
};

// Function to recursively find and delete node_modules in subdirectories
const deleteNodeModulesRecursively = (dir) => {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        // Find and delete node_modules
        if (item.isDirectory() && item.name === "node_modules") {
            deleteDirectory(fullPath);
            continue; // Skip further checks if it's node_modules
        }

        // Recurse into subdirectories
        if (item.isDirectory()) {
            deleteNodeModulesRecursively(fullPath);
        }
    }
};

// Clean main logic
try {
    // 1. Delete all `node_modules` folders
    console.log("[INFO] Cleaning node_modules...");
    deleteNodeModulesRecursively(process.cwd());

    // 2. Delete package lock files
    console.log("[INFO] Deleting lock files...");
    const lockFiles = ["pnpm-lock.yaml", "package-lock.json", "yarn.lock"];
    lockFiles.forEach((lockFile) => {
        const fullPath = path.join(process.cwd(), lockFile);
        if (fs.existsSync(fullPath)) {
            try {
                fs.unlinkSync(fullPath);
                console.log(`[SUCCESS] Deleted lock file: ${lockFile}`);
            } catch (err) {
                console.error(`[ERROR] Failed to delete lock file ${lockFile}:`, err.message);
            }
        } else {
            console.log(`[INFO] Lock file does not exist: ${lockFile}`);
        }
    });

    console.log("[SUCCESS] Clean completed successfully!");
} catch (err) {
    console.error("[ERROR] An unexpected error occurred:", err.message);
}