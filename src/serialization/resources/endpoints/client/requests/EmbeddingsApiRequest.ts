/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as VoyageApi from "../../../../../api/index";
import * as core from "../../../../../core";
import { EmbeddingsApiRequestInput } from "../../types/EmbeddingsApiRequestInput";
import { EmbeddingsApiRequestInputType } from "../../types/EmbeddingsApiRequestInputType";

export const EmbeddingsApiRequest: core.serialization.Schema<
    serializers.EmbeddingsApiRequest.Raw,
    VoyageApi.EmbeddingsApiRequest
> = core.serialization.object({
    input: EmbeddingsApiRequestInput,
    model: core.serialization.string(),
    inputType: core.serialization.property("input_type", EmbeddingsApiRequestInputType.optional()),
    truncation: core.serialization.boolean().optional(),
    encodingFormat: core.serialization.property(
        "encoding_format",
        core.serialization.stringLiteral("base64").optional()
    ),
});

export declare namespace EmbeddingsApiRequest {
    interface Raw {
        input: EmbeddingsApiRequestInput.Raw;
        model: string;
        input_type?: EmbeddingsApiRequestInputType.Raw | null;
        truncation?: boolean | null;
        encoding_format?: "base64" | null;
    }
}
