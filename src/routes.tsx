import App from "./App";

export const ROUTES = [
    {
        path: '',
        component: () => <App></App>
    },
    {
        path: "/hello-world",
        component: () => <h1>Hello, World!</ h1 >
    }
]