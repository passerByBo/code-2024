type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }
  
  type Todo = DeepReadonly<X> // should be same as `Expected`


  type DeepReadonly<T> = {
    +readonly [Key in keyof T]: T[Key] extends Object ? T[Key] extends null ? T[Key] : DeepReadonly<T[Key]> : T[Key]
  }


  // keyof T[K] extends never ? T[K] : DeepReadonly<T[Key]>

  export {}