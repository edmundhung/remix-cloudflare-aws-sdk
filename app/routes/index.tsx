import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
	return {
		title: "Remix Starter",
		description: "Welcome to remix!",
	};
};

export let links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: stylesUrl },
		{
			href: "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
			rel: "stylesheet",
		},
	];
};

export let loader: LoaderFunction = async ({ context }) => {
	return {
		apis: await context.request(),
	};
};

export default function Index() {
	let data = useLoaderData();

	return (
		<div style={{ textAlign: "center", padding: 20 }}>
			<h2 className="text-xl font-bold">API Environments</h2>
			<div>
				{data.apis.map((api) => {
					return (
						<div className="mb-1" key={api.Name}>
							{api.Name}
						</div>
					);
				})}
			</div>
		</div>
	);
}
