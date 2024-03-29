
// 写一个 natural transformation 将Either b a转换到Maybe a
// eitherToMaybe :: Either b a -> Maybe a
const eitherToMaybe = (e) => e instanceof Left ? Maybe.of(null) : Maybe.of(e.$value);


const eitherToTask = either(Task.rejected, Task.of);