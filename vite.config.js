import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
    plugins: [
        /* react(), // if you're using React */
        symfonyPlugin(),
    ],
    build: {
        rollupOptions: {
            input: {
                javascript: "./assets/app.js",
                style: "./assets/app.scss"
            },
        }
    },
    server: {
        // respond to all network requests:
        host: '0.0.0.0',
        port: port,
        strictPort: true,
        // Defines the origin of the generated asset URLs during development
        origin: origin
    },
});
