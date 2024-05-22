type arr = [1,32,3,3,3,3,3,3]

type len = Length<arr>

type Length<T extends unknown[]> = T['length']