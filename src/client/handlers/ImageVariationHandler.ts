import Handler from "./handler/Handler.js";
import ImageVariationRequestAdapter from "./handler/adapters/requests/ImageVariationRequestAdapter.js";
import ImageVariationResponseAdapter from "./handler/adapters/responses/ImageVariationResponseAdapter.js";
import type { ImageVariationCount } from "./types/ImageVariationTypes.js";

export default class ImageVariationHandler extends Handler<
ImageVariationRequestAdapter,
typeof ImageVariationRequestAdapter,
ImageVariationResponseAdapter,
typeof ImageVariationResponseAdapter,
[
  image: Extract<File, ImageVariationRequestAdapter["payload"]["image"]>,
  count?: Extract<Extract<ImageVariationCount, ImageVariationRequestAdapter["payload"]["n"]>, number>,
  dimensions?: Extract<ImageVariationRequestAdapter["payload"]["size"], string>,
  outputType?: Extract<ImageVariationRequestAdapter["payload"]["response_format"], string>,
],
{
  model: Extract<ImageVariationRequestAdapter["payload"]["model"], string>;
  count: Extract<Extract<ImageVariationCount, ImageVariationRequestAdapter["payload"]["n"]>, number>;
  dimensions: Extract<ImageVariationRequestAdapter["payload"]["size"], string>;
  outputType: Extract<ImageVariationRequestAdapter["payload"]["response_format"], string>;
}
> {
  constructor(
    client: typeof ImageVariationHandler.prototype.client,
    defaults: typeof ImageVariationHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ImageVariationRequestAdapter,
        ImageVariationResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ImageVariationHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    image: Extract<File, ImageVariationRequestAdapter["payload"]["image"]>,
    count?: Extract<Extract<ImageVariationCount, ImageVariationRequestAdapter["payload"]["n"]>, number>,
    dimensions?: Extract<ImageVariationRequestAdapter["payload"]["size"], string>,
    outputType?: Extract<ImageVariationRequestAdapter["payload"]["response_format"], string>,
  ): ConstructorParameters<typeof ImageVariationRequestAdapter> {
    try {
      return [
        this.requestInterfaceDefaults.model,
        image,
        dimensions ?? this.requestInterfaceDefaults.dimensions,
        count ?? this.requestInterfaceDefaults.count,
        outputType ?? this.requestInterfaceDefaults.outputType,
      ];
    }
    catch (e) {
      throw new EvalError(
        `ImageVariationHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ImageVariationRequestAdapter["payload"],
  ): Promise<ImageVariationResponseAdapter["payload"]> {
    try {
      return await this.client.images.createVariation(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ImageVariationHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}
