import NullRequestAdapter from "./null/NullRequestAdapter.js";

class ModelsRequestAdapter extends NullRequestAdapter {
  readonly filterString: string;

  constructor(filter: string = "") {
    try {
      super();
      this.filterString = filter;
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
