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
    const webglDir = path.join(projectDir, "dist/webgl");
    const webglDest = path.join(webglDir, "webgl.es.js");

    if (options.forceWebgl || !fs.existsSync(webglDest)) {
        if (!fs.existsSync(webglDir))
            fs.mkdirSync(webglDir);

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