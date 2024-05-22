// 三方一般使用interface实现  业务中使用type比较多
const instance = SimpleVue({
    data() {
      return {
        firstname: 'Type',
        lastname: 'Challenges',
        amount: 10,
      }
    },
    computed: {
      fullname() {
        return this.firstname + ' ' + this.lastname
      }
    },
    methods: {
      hi() {
        alert(this.fullname.toLowerCase())
      }
    }
  })

  declare function SimpleVue<
    D extends Record<string, unknown>,
    C extends Record<string, unknown>,
    M extends Record<string, unknown>
  >(options: {
    data: (this: never) => D,
    // 这里需要注意 D C M是被推断出来的值  C不是computed 而是 computed的key 和返回值组成的对象
    computed: {[K in keyof C]: (this: D, ...arg: unknown[]) => C[K]},
    methods: {[K in keyof M]: (this: D & C & {[K in keyof M]: (...arg: unknown[]) => M[K]}) => M[K]}
  }):any

  export {}