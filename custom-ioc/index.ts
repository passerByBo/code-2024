import { parse } from "@babel/parser";
import { type IIndexService, IndexService } from "./indexService";
import CreateIoc from "./ioc";
import { TYPES } from "./constants";
import "reflect-metadata";

const container = new CreateIoc();
//把所需注入的服务注入到容器中container
// 单例 bind new 一次 单例模式 一个类只有一个实例
// 每一次都来进行new一次
container.bind(TYPES.indexService, () => new IndexService());

//1.根据indexService名字定义一个symbol
//2,根据这个名字把类注入到container.bind(symbol)
//3.遍历名字 container.get(symbol)

function getParams(fn: Function) {
  const ast = parse(fn.toString(), {
    sourceType: "module",
    plugins: ["typescript", "decorators-legacy"],
  });
  // 用于存储构造函数参数的 AST 节点
  let fnParams: any[] = [];
  // 用于存储有效参数名称的数组
  const validParams: string[] = [];
  // 遍历 AST 的顶级节点，查找类声明
  ast.program.body.forEach((node: any) => {
    if (node.type === "ClassDeclaration") {
      // 遍历类的主体，查找构造函数
      node.body.body.forEach((classElement: any) => {
        if (
          classElement.type === "ClassMethod" &&
          classElement.kind === "constructor"
        ) {
          // 获取构造函数的参数
          fnParams = classElement.params;
        }
      });
    }
  });
  // 遍历构造函数参数，提取参数名称
  fnParams.forEach((param) => {
    if (param.type === "Identifier") {
      validParams.push(param.name);
    }
  });
  console.log("validParams: ", validParams);
  return validParams;
}

//强行进行了类型的约束
function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
  return obj.hasOwnProperty(key);
}

function controller<T extends { new (...arg: any[]): {} }>(constructor: T) {
  console.log(1);
  return class extends constructor {
    public indexService: IIndexService;

    constructor(...arg: any[]) {
      super(...arg);
      const _params = getParams(constructor);
      for (let identity of _params) {
        if (hasKey(this, identity)) {
          this[identity] = Reflect.getMetadata(TYPES[identity], constructor);
        }
      }
    }
  };
}

function inject(serviceIdentifier: symbol) {
  console.log(2);
  return function (target: any, targetKey: string | undefined, index: number) {
    console.log("===", target, targetKey);
    if (!targetKey) {
      Reflect.defineMetadata(
        serviceIdentifier,
        container.get(serviceIdentifier),
        target
      );
    }
  };
}

@controller
class IndexController {
  public indexService: IIndexService;

  constructor(@inject(TYPES.indexService) indexService?: IIndexService) {
    console.log(3);
    if (indexService) {
      this.indexService = indexService;
    }
  }

  info(str: string) {
    this.indexService.log(str);
  }
}
const is = new IndexService();

const indexController = new IndexController();
indexController.info("to-indexController");
