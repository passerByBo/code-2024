interface IIndexService {
  log(str: string): void;
}

class IndexService implements IIndexService {
  log(str: string) {
    console.log("IndexService log:", str);
  }
}

export { IndexService };
export type { IIndexService };
