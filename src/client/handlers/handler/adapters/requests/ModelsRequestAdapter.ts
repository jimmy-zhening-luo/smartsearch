import NullRequestAdapter from "./null/NullRequestAdapter.js";

class ModelsRequestAdapter extends NullRequestAdapter<{
  filter: string;
}> {
  public readonly clientOptions: {
    filter: string;
  };

  constructor(
    filter: string = "",
  ) {
    try {
      super();
      this.clientOptions = {
        filter,
      };
    }
    catch (e) {
      throw new SyntaxError(
        `ModelsRequestAdapter: ctor: Failed to instantiate this using parent null request adapter ctor`,
        { cause: e },
      );
    }
  }
}

export default ModelsRequestAdapter;
