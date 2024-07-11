import { Schema } from "../../../../src/core/schemas";
import { itSchemaIdentity } from "../itSchema";
import { list } from "../../../../src/core/schemas";
import { object } from "../../../../src/core/schemas";
import { string } from "../../../../src/core/schemas";
import { lazy } from "../../../../src/core/schemas";

describe("lazy", () => {
    it("doesn't run immediately", () => {
        let wasRun = false;
        lazy(() => {
            wasRun = true;
            return string();
        });
        expect(wasRun).toBe(false);
    });

    it("only runs first time", async () => {
        let count = 0;
        const schema = lazy(() => {
            count++;
            return string();
        });
        await schema.parse("hello");
        await schema.json("world");
        expect(count).toBe(1);
    });

    itSchemaIdentity(
        lazy(() => object({})),
        { foo: "hello" },
        {
            title: "passes opts through",
            opts: { unrecognizedObjectKeys: "passthrough" },
        }
    );

    itSchemaIdentity(
        lazy(() => object({ foo: string() })),
        { foo: "hello" }
    );

    // eslint-disable-next-line jest/expect-expect
    it("self-referencial schema doesn't compile", () => {
        () => {
            // @ts-expect-error
            const a = lazy(() => object({ foo: a }));
        };
    });

    // eslint-disable-next-line jest/expect-expect
    it("self-referencial compiles with explicit type", () => {
        () => {
            interface TreeNode {
                children: TreeNode[];
            }
            const TreeNode: Schema<TreeNode, TreeNode> = lazy(() => object({ children: list(TreeNode) }));
        };
    });
});
