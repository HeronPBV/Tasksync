import "./bootstrap";
import "../css/app.css";

import { createApp, h, type DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name: string) => {
        const pages = import.meta.glob("./Pages/**/*.vue");
        const page = pages[`./Pages/${name}.vue`];
        if (!page) {
            throw new Error(`Page not found: ./Pages/${name}.vue`);
        }
        const module = (await page()) as { default: DefineComponent };
        return module.default;
    },
    setup({ el, App, props, plugin }) {
        const pinia = createPinia();
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(ZiggyVue);
        app.mount(el);
        return app;
    },
    progress: {
        color: "#4B5563",
    },
});
