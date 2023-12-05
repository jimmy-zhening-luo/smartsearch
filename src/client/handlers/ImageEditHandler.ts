import Handler from "./handler/Handler.js";
import ImageEditRequestAdapter from "./handler/adapters/requests/ImageEditRequestAdapter.js";
import ImageEditResponseAdapter from "./handler/adapters/responses/ImageEditResponseAdapter.js";
import type { ImageEditCount } from "./types/ImageEditTypes.js";

export default class ImageEditHandler extends Handler<
ImageEditRequestAdapter,
typeof ImageEditRequestAdapter,
ImageEditResponseAdapter,
typeof ImageEditResponseAdapter,
[
  image: File,
  prompt: string,
  count?: Extract<Extract<ImageEditCount, ImageEditRequestAdapter["payload"]["n"]>, number>,
  dimensions?: Extract<ImageEditRequestAdapter["payload"]["size"], string>,
  outputType?: Extract<ImageEditRequestAdapter["payload"]["response_format"], string>,
],
{
  model: Extract<ImageEditRequestAdapter["payload"]["model"], string>;
  count: Extract<Extract<ImageEditCount, ImageEditRequestAdapter["payload"]["n"]>, number>;
  dimensions: Extract<ImageEditRequestAdapter["payload"]["size"], string>;
  outputType: Extract<ImageEditRequestAdapter["payload"]["response_format"], string>;
}
> {
  constructor(
    client: typeof ImageEditHandler.prototype.client,
    defaults: typeof ImageEditHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ImageEditRequestAdapter,
        ImageEditResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ImageEditHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    image: File,
    prompt: string,
    count?: Extract<Extract<ImageEditCount, ImageEditRequestAdapter["payload"]["n"]>, number>,
    dimensions?: Extract<ImageEditRequestAdapter["payload"]["size"], string>,
    outputType?: Extract<ImageEditRequestAdapter["payload"]["response_format"], string>,
  ): ConstructorParameters<typeof ImageEditRequestAdapter> {
    try {
      return [
        this.requestInterfaceDefaults.model,
        image,
        prompt,
        dimensions ?? this.requestInterfaceDefaults.dimensions,
        count ?? this.requestInterfaceDefaults.count,
        outputType ?? this.requestInterfaceDefaults.outputType,
      ];
    }
    catch (e) {
      throw new EvalError(
        `ImageEditHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ImageEditRequestAdapter["payload"],
  ): Promise<ImageEditResponseAdapter["payload"]> {
    try {
      return await this.client.images.edit(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ImageEditHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}
