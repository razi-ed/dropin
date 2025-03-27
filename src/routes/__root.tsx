
import {  Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/Header";

export const Route = createRootRoute({
	component: Layout,
});

function Layout() {
	return (
		<>
			<div className="min-h-full">
				<Header />

				<div className="py-2">
					<main>
						<div className="mx-auto max-w-7xl py-8">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
			<TanStackRouterDevtools />
		</>
	);
}
