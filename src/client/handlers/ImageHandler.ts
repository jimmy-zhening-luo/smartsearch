import Handler from "./handler/Handler.js";
import ImageRequestAdapter from "./handler/adapters/requests/ImageRequestAdapter.js";
import ImageResponseAdapter from "./handler/adapters/responses/ImageResponseAdapter.js";
import type { ImageShape, ImageCount } from "./types/ImageTypes.js";

export default class ImageHandler extends Handler<
ImageRequestAdapter,
typeof ImageRequestAdapter,
ImageResponseAdapter,
typeof ImageResponseAdapter,
[
  prompt: string,
  imageShape?: ImageShape,
  style?: Extract<ImageRequestAdapter["payload"]["style"], string>,
  outputType?: Extract<ImageRequestAdapter["payload"]["response_format"], string>,
],
{
  model: Extract<ImageRequestAdapter["payload"]["model"], string>;
  count: Extract<Extract<ImageCount, ImageRequestAdapter["payload"]["n"]>, number>;
  quality: Extract<ImageRequestAdapter["payload"]["quality"], string>;
  style: Extract<ImageRequestAdapter["payload"]["style"], string>;
  shape: ImageShape;
  shapeDimensions: Required<Record<ImageShape, Extract<ImageRequestAdapter["payload"]["size"], string>>>;
  outputType: Extract<ImageRequestAdapter["payload"]["response_format"], string>;
}
> {
  constructor(
    client: typeof ImageHandler.prototype.client,
    defaults: typeof ImageHandler.prototype.requestInterfaceDefaults,
  ) {
    try {
      super(
        ImageRequestAdapter,
        ImageResponseAdapter,
        client,
        defaults,
      );
    }
    catch (e) {
      throw new EvalError(
        `ImageHandler: ctor: Failed to instantiate by calling abstract parent Handler ctor`,
        { cause: e },
      );
    }
  }

  protected requestInterface(
    prompt: string,
    imageShape?: ImageShape,
    style?: Extract<ImageRequestAdapter["payload"]["style"], string>,
    outputType?: Extract<ImageRequestAdapter["payload"]["response_format"], string>,
  ): ConstructorParameters<typeof ImageRequestAdapter> {
    try {
      return [
        this.requestInterfaceDefaults.model,
        prompt,
        this.requestInterfaceDefaults.quality,
        this.requestInterfaceDefaults.shapeDimensions[
          imageShape ?? this.requestInterfaceDefaults.shape
        ],
        style ?? this.requestInterfaceDefaults.style,
        this.requestInterfaceDefaults.count,
        outputType ?? this.requestInterfaceDefaults.outputType,
      ];
    }
    catch (e) {
      throw new EvalError(
        `ImageHandler: requestInterface: Failed to return inputs with defaults for request adapter ctor`,
        { cause: e },
      );
    }
  }

  protected async handle(
    requestPayload: ImageRequestAdapter["payload"],
  ): Promise<ImageResponseAdapter["payload"]> {
    try {
      return await this.client.images.generate(requestPayload);
    }
    catch (e) {
      throw new EvalError(
        `ImageHandler: handle: Failed to make OpenAI request by passing a request payload to a native client function`,
        { cause: e },
      );
    }
  }
}
