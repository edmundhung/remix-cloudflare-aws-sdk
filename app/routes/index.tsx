import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import stylesUrl from "../styles/index.css";
import type { Api } from "@aws-sdk/client-apigatewayv2";
import { ApiGatewayV2Client, GetApisCommand } from "@aws-sdk/client-apigatewayv2";

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

export let loader: LoaderFunction = async () => {
	const client = new ApiGatewayV2Client({ region: "us-east-1" });
	const command = new GetApisCommand({ MaxResults: "1000" });
	const response = await client.send(command);
	return { apis: response.Items ?? [] };
};

export default function Index() {
	let data = useLoaderData<{ apis: Api[] }>();

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
