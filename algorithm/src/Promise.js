const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function isFunction(fn) {
  return typeof fn === "function";
}

function isObject(obj) {
  return obj !== null && (typeof obj === "object" || isFunction(obj));
}

class BPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        if (value === this) {
          return reject(new TypeError("Chaining cycle detected for promise"));
        }

        if (isObject(value) || isFunction(value)) {
          let then;
          try {
            then = value.then;
          } catch (error) {
            return reject(error);
          }

          if (isFunction(then)) {
            return handleThenable(then.bind(value), resolve, reject);
          }
        }

        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.reason = reason;
        this.onRejectedCallbacks.fortEach((callback) => callback(reason));
      }
    };

    const handleThenable = (then, resolve, reject) => {
      let called = false;
      try {
        then(
          (value) => {
            if (called) return;
            called = true;
            resolve(value);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } catch (error) {
        if (called) return;
        reject(error);
      }

      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : (value) => value;
    onRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    return new BPromise((resolve, reject) => {
      const handleCallback = (callback, resolve, reject, state, value) => {
        try {
          const result = callback(value);
          if (result instanceof BPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === FULFILLED) {
        setTimeout(() =>
          handleCallback(onFulfilled, resolve, reject, this.state, this.value)
        );
      } else if (this.state === REJECTED) {
        setTimeout(() =>
          handleCallback(onRejected, resolve, reject, this.state, this.reason)
        );
      } else {
        this.onFulfilledCallbacks.push(() =>
          handleCallback(onFulfilled, resolve, reject, this.state, this.value)
        );
        this.onRejectedCallbacks.push(() =>
          handleCallback(onFulfilled, resolve, reject, this.state, this.reason)
        );
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new BPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completedCount = 0;

      const handleResolve = (index, value) => {
        results[index] = value;
        completedCount++;

        if (completedCount === promises.length) {
          resolve(results);
        }
      };

      for (let i = 0; i < promises.length; i++) {
        BPromise.resolve(promises[i]).then(
          (value) => handleResolve(i, value),
          reject
        );
      }
    });
  }

  static race(promises) {
    return new BPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        BPromise.resolve(promises[i]).then(resolve, reject);
      }
    });
  }
}

new BPromise((resolve, reject) => {
  //do something
  // 状态装换
  // resolve()
  // reject()
})
  .then((res) => {
    // 如果有return  继续
  })
  .catch((err) => {
    // 错误回掉  是否能继续return
  });

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(() => 123);
  }, 1000);
}).then((res) => {
  console.log(res);
});

// export default Promise
