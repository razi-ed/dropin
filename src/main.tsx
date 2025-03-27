import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { useOnboardingStore } from "./store/onboardingStore.ts";
import { sampleEdges, sampleNodes, sampleSteps } from "./data/sampleData.ts";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const storeEmpty = useOnboardingStore(state => state.steps.length === 0 && state.flow.nodes.length === 0);
	
	useEffect(() => {
		// Load sample data if store is empty
		if (storeEmpty) {
			const addStep = useOnboardingStore.getState().addStep;
			const addNode = useOnboardingStore.getState().addNode;
			const addEdge = useOnboardingStore.getState().addEdge;
			
			// Add sample steps
			sampleSteps.forEach(step => {
				addStep(step);
			});
			
			// Add sample nodes
			sampleNodes.forEach(node => {
				addNode(node);
			});
			
			// Add sample edges
			sampleEdges.forEach(edge => {
				addEdge(edge);
			});
		}
	}, [storeEmpty]);
	
	return (
		<RouterProvider router={router} />
	);
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
