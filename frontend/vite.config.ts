import {reactRouter} from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {defineConfig} from 'vite';
import * as path from "node:path";

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    build: {
        outDir: 'build'
    },
    ssr: {
        noExternal: [/@syncfusion/],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'app'),
        },
    },
});
