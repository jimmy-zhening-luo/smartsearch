import NullRequestAdapter from "./null/NullRequestAdapter.js";

class ModelsRequestAdapter extends NullRequestAdapter {
  constructor() {
    try {
      super();
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
