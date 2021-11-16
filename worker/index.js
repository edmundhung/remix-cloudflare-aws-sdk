import { ApiGatewayV2Client, GetApisCommand } from "@aws-sdk/client-apigatewayv2";
import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "../build";

addEventListener('fetch', createEventHandler({
  build,
  getLoadContext() {
    const client = new ApiGatewayV2Client({ region: "us-east-1" });
    const command = new GetApisCommand({ MaxResults: "1000" });

    return {
      async request() {
        const response = await client.send(command);
        const apis = response.Items ?? [];

        return apis;
      },
    };
  },
}));
