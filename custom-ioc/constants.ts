// 常量
interface ITypes {
  [key: PropertyKey]: symbol;
}

const TYPES: ITypes = {
  indexService: Symbol.for("indexService"),
};

export { TYPES };
