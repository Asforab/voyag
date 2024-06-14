/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as VoyageApi from "../../api/index";
import * as core from "../../core";

export const EmbedRequestInput: core.serialization.Schema<
    serializers.EmbedRequestInput.Raw,
    VoyageApi.EmbedRequestInput
> = core.serialization.undiscriminatedUnion([
    core.serialization.string(),
    core.serialization.list(core.serialization.string()),
]);

export declare namespace EmbedRequestInput {
    type Raw = string | string[];
}
