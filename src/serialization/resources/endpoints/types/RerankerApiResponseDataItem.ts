/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as VoyageApi from "../../../../api/index";
import * as core from "../../../../core";

export const RerankerApiResponseDataItem: core.serialization.ObjectSchema<
    serializers.RerankerApiResponseDataItem.Raw,
    VoyageApi.RerankerApiResponseDataItem
> = core.serialization.object({
    index: core.serialization.number().optional(),
    relevanceScore: core.serialization.property("relevance_score", core.serialization.number().optional()),
    document: core.serialization.string().optional(),
});

export declare namespace RerankerApiResponseDataItem {
    interface Raw {
        index?: number | null;
        relevance_score?: number | null;
        document?: string | null;
    }
}
