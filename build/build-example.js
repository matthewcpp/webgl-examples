const rollup = require("rollup");
const resolve = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const typescript = require('rollup-plugin-typescript2');

const toml = require("toml");

const installDeps = require("./install-deps")

const path = require("path");
const fs = require("fs-extra");

async function buildExample(name, config) {
    const projectDir = path.resolve(__dirname, "..");
    const distDir = path.join(projectDir, "dist");

    const sampleSrcDir = path.join(projectDir, name);
    const sampleEntryPoint = path.join(sampleSrcDir, `${name}.ts`);
    const sampleDestDir = path.join(distDir, name);
    const sampleOutputPath = path.join(sampleDestDir, `${name}.js`);

    const webglPath = config.rollup.webglModulePath;
    const glMatrixPath = config.rollup.glMatrixModulePath;

    if (!fs.existsSync(sampleSrcDir))
        throw new Error(`Unable to locate sample: ${name}. Expected: ${sampleSrcDir}`);

    if (!fs.existsSync(distDir))
        fs.mkdirSync(distDir);


    fs.copySync(sampleSrcDir, sampleDestDir, (src) => {
        return !src.endsWith(".ts")
    });

    console.log(`Building: ${sampleSrcDir}`);

    const inputOptions = {
        input: sampleEntryPoint,
        external: [ "gl-matrix", "webgl" ],
        plugins: [
            replace({
                _WGL_MODEL_URL_BASE: config.sampleAssets.modelBaseUrl
            }),
            resolve.nodeResolve(),
            typescript({
                tsconfig: path.resolve(__dirname, "../tsconfig.json"),
                tsconfigOverride: {include: [`${sampleSrcDir}/**/*.ts`]},
                typescript: require('typescript'),
            }),
            installDeps({
                forceWebgl: true,
                glMatrixPath: glMatrixPath
            })
        ]
    };

    const outputOptions = {
        file: sampleOutputPath,
        format: "es",
        paths: {
            "gl-matrix": glMatrixPath,
            "webgl": webglPath
        }
    }

    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

module.exports = buildExample;

async function main() {
    if (process.argv.length < 3)
        throw new Error("You must specify a the name of an example to build");

    const configPath = path.resolve(__dirname, "config.toml");

    if (!fs.existsSync(configPath)) {
        throw new Error("Please create a user config file");
    }

    const config = toml.parse(fs.readFileSync(configPath, "UTF-8"));

    await buildExample(process.argv[2], config);
}

if (require.main === module) {
    main()
}