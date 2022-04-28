import del from "rollup-plugin-delete";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
    {
        input: "src/index.jsx",
        output: [
            {
                file: pkg.main,
                format: "cjs",
                exports: "default"
            },
            {
                file: pkg.module,
                format: "esm",
                exports: "default"
            }
        ],
        plugins: [
            resolve(),
            commonjs({
                include: /node-modules/
            }),
            babel({
                exclude: "node_modules/**",
                presets: [
                    ["@babel/preset-env", {targets: {esmodules: true}}],
                    "@babel/preset-react"
                ],
                plugins: [
                    ["@babel/plugin-transform-runtime", {regenerator: true, corejs: 3}],
                    "@babel/plugin-transform-async-to-generator"
                ]
            }),
            del({targets: ["dist/*"]})
        ],
        external: Object.keys(pkg.peerDependencies || {})
    }
]
