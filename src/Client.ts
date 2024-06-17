/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import * as VoyageAI from "./api/index";
import * as serializers from "./serialization/index";
import urlJoin from "url-join";
import * as errors from "./errors/index";

export declare namespace VoyageAIClient {
    interface Options {
        environment?: core.Supplier<environments.VoyageAIEnvironment | string>;
        apiKey: core.Supplier<string>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
        abortSignal?: AbortSignal;
    }
}

export class VoyageAIClient {
    constructor(protected readonly _options: VoyageAIClient.Options) {}

    /**
     * Voyage embedding endpoint receives as input a string (or a list of strings) and other arguments such as the preferred model name, and returns a response containing a list of embeddings.
     *
     * @param {VoyageAI.EmbedRequest} request
     * @param {VoyageAIClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await voyageAi.embed({
     *         input: "input",
     *         model: "model"
     *     })
     */
    public async embed(
        request: VoyageAI.EmbedRequest,
        requestOptions?: VoyageAIClient.RequestOptions
    ): Promise<VoyageAI.EmbedResponse> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.VoyageAIEnvironment.Default,
                "embeddings"
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "",
                "X-Fern-SDK-Version": "0.0.6",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            body: await serializers.EmbedRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return await serializers.EmbedResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.VoyageAIError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.VoyageAIError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.VoyageAITimeoutError();
            case "unknown":
                throw new errors.VoyageAIError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Voyage reranker endpoint receives as input a query, a list of documents, and other arguments such as the model name, and returns a response containing the reranking results.
     *
     * @param {VoyageAI.RerankRequest} request
     * @param {VoyageAIClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await voyageAi.rerank({
     *         query: "query",
     *         documents: ["documents"],
     *         model: "model"
     *     })
     */
    public async rerank(
        request: VoyageAI.RerankRequest,
        requestOptions?: VoyageAIClient.RequestOptions
    ): Promise<VoyageAI.RerankResponse> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.VoyageAIEnvironment.Default,
                "rerank"
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "",
                "X-Fern-SDK-Version": "0.0.6",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            body: await serializers.RerankRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return await serializers.RerankResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.VoyageAIError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.VoyageAIError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.VoyageAITimeoutError();
            case "unknown":
                throw new errors.VoyageAIError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getCustomAuthorizationHeaders() {
        const apiKeyValue = await core.Supplier.get(this._options.apiKey);
        return { Bearer: apiKeyValue };
    }
}
