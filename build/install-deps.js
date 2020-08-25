const fs = require("fs-extra");
const path = require("path");

function copyModules(options) {
    const projectDir = path.resolve(__dirname, "..");

    const glMatrixSrcDir = path.join(projectDir, "node_modules/gl-matrix/esm");
    const glMatrixDestDir = path.join(projectDir, "dist/gl-matrix");

    if (options.forceGlMatrix || !fs.existsSync(glMatrixDestDir)) {
        fs.copySync(glMatrixSrcDir, glMatrixDestDir);
    }

    const webglSrc = path.join(projectDir, "node_modules/@matthewcpp/webgl/dist/webgl.es.js");
    const webglDest = path.join(projectDir, "dist/webgl/webgl.es.js");

    if (options.forceWebgl || !fs.existsSync(webglDest)) {
        const webgl = fs.readFileSync(webglSrc, "utf8");
        fs.writeFileSync(webglDest, webgl.replace("'gl-matrix'", `'${options.glMatrixPath}'`))
    }
}

function installDeps(options) {
    const defaultOpts = { forceWebgl: false, forceGlMatrix: false };

    return {
        name: "copyDeps",
        writeBundle: () => {
            copyModules(Object.assign(defaultOpts, options));
        }
    }
}

module.exports = installDeps;