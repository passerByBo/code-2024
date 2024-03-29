var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function (x) {
  return new Maybe(x);
}
Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}


Container.prototype.ap = function (other_container) {
  return other_container.map(this.__value);
}

var Maybe = function(x) {
  this.__value = x;
}




var tOfM = compose(Task.of, Maybe.of);
// Task(Maybe(x))

liftA2(_.concat, tOfM('Rainy Days and Mondays'), tOfM(' always get me down'));
// Task(Maybe(Rainy Days and Mondays always get me down))

var liftA2 = curry(function (f, functor1, functor2) {
  return functor1.map(f).ap(functor2);
});



liftA2(_.concat, Task(Maybe('Rainy Days and Mondays')), Task(Maybe(' always get me down')));




Task(Maybe('Rainy Days and Mondays')).map(_.concat).ap(Task(Maybe(' always get me down'))))


Task(_.concat(Maybe('Rainy Days and Mondays'))).ap(Task(Maybe(' always get me down'))))


Task(Maybe(' always get me down')).map(_.concat(Maybe('Rainy Days and Mondays')))

Task(_.concat(Maybe('Rainy Days and Mondays'))(Maybe(' always get me down')))


var liftA2 = curry(function(f, functor1, functor2) {
  return functor1.map(f).ap(functor2);
});

require('./support');
var Task = require('data.task');
var _ = require('ramda');

// 模拟浏览器的 localStorage 对象
var localStorage = {};

// 练习 1
// ==========
// 写一个函数，使用 Maybe 和 ap() 实现让两个可能是 null 的数值相加。

//  ex1 :: Number -> Number -> Maybe Number
var ex1 = function(x, y) {

    return Maybe.of(_.add).ap(Maybe.of(x)).ap(Maybe.of(y))
};


// 练习 2
// ==========
// 写一个函数，接收两个 Maybe 为参数，让它们相加。使用 liftA2 代替 ap()。

//  ex2 :: Maybe Number -> Maybe Number -> Maybe Number
// var ex2 = function (x, y) {
//     return liftA2(_.add, Maybe(x), Maybe(y))
//  }

var ex2 = liftA2(_.add)



// 练习 3
// ==========
// 运行 getPost(n) 和 getComments(n)，两者都运行完毕后执行渲染页面的操作。（参数 n 可以是任意值）。

var makeComments = _.reduce(function(acc, c){ return acc+"<li>"+c+"</li>" }, "");
var render = _.curry(function(p, cs) { return "<div>"+p.title+"</div>"+makeComments(cs); });

//  ex3 :: Task Error HTML
var ex3 = Task.of(render).ap(getPost(2)).ap(getComments(2));


// 练习 4
// ==========
// 写一个 IO，从缓存中读取 player1 和 player2，然后开始游戏。

localStorage.player1 = "toby";
localStorage.player2 = "sally";

var getCache = function(x) {
  return new IO(function() { return localStorage[x]; });
}
var game = _.curry(function(p1, p2) { return p1 + ' vs ' + p2; });

//  ex4 :: IO String
// var ex4 = IO.of(game).ap(getCache('toby')).ap(getCache('sally'))

// IO(game).ap(IO('toby')).ap(IO('sally'))

// IO('toby').map(game)
    
// IO(compose(function () { localStorage.player1 }, game)).ap(IO(function () { localStorage.player2 }))


// IO(function () { localStorage.player2 }).map()

// IO(compose(function () { localStorage.player2 }, compose(function () { localStorage.player1 }, game)))

// // 结合律
// IO(compose(function () { localStorage.player2 }, function () { localStorage.player1 }, game))




var ex4 = liftA2(game, getCache('player1'), getCache('player2'));

var ex4 = IO.of(game).ap(getCache('player1')).ap(getCache('player2'))

var ex4 = getCache('player1').map(game).ap(getCache('player2'))



const player1 = function () { return localStorage.palyer1; }
const player2 = function () { return localStorage.palyer2; }

IO(player1).map(game).ap(IO(player2))

IO(compose(f, player1)).ap(IO(player2))

IO(player2).map(compose(f, player1))

IO(compose(compose(f, player1), player2))













