// 练习 1
// ==========
// 给定一个 user，使用 safeProp 和 map/join 或 chain 安全地获取 sreet 的 name

var safeProp = _.curry(function (x, o) {
  return Maybe.of(o[x]);
});
var user = {
  id: 2,
  name: 'albert',
  address: {
    street: {
      number: 22,
      name: 'Walnut St',
    },
  },
};

var ex1 = compose(join, map(safeProp('name')), join, map(safeProp('street')), safeProp('address'));
var ex1 = compose(chain(safeProp('name')), chain(safeProp('street')), safeProp('address'));
ex1(user)

sageProp('address')(user)

Maybe(user['address'])


map(safeProp('street'))(Maybe(user['address']));

Maybe(user['address']).map(safeProp('street'));

Maybe(safeProp('street')(user['address']));

Maybe(Maybe(user['address']['street']));

join(Maybe(Maybe(user['address']['street'])))

Maybe(user['address']['street']);

map(safeProp('name'))(Maybe(user['address']['street']))

Maybe(user['address']['street']).map(safeProp('name'));


Maybe(safeProp('name')(user['address']['street']));


Maybe(Maybe(user['address']['street']['name']));

join(Maybe(Maybe(user['address']['street']['name'])));

Maybe(user['address']['street']['name']);



// 练习 2
// ==========
// 使用 getFile 获取文件名并删除目录，所以返回值仅仅是文件，然后以纯的方式打印文件

var getFile = function() {
  return new IO(function(){ return __filename; });
}

var pureLog = function(x) {
  return new IO(function(){
    console.log(x);
    return 'logged ' + x;
  });
}

var ex2 = compose(join, map(pureLog), getFile);
var ex2 = compose(chain(pureLog), getFile);
var ex2 = _.compose(chain(_.compose(pureLog, _.last, split('/'))), getFile);
ex2()

IO(function () {
  return __filename;
});

IO(function () {
  return __filename;
}).map(pureLog);


compose(pureLog,function () {
  return __filename;
}))


// join

pureLog(__filename)

IO(function(){
    console.log(__filename);
    return 'logged ' + __filename;
  })


// ex2().xxxxx()调用后才会正式执行


// 练习 3
// ==========
// 使用 getPost() 然后以 post 的 id 调用 getComments()
var getPost = function(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res({ id: i, title: 'Love them tasks' });
    }, 300);
  });
}

var getComments = function(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res([
        {post_id: i, body: "This book should be illegal"},
        {post_id: i, body: "Monads are like smelly shallots"}
      ]);
    }, 300);
  });
}

var ex3 = _.compose( join,map(getComments),join ,map(safeProp('id')) ,getPost)
var ex3 = _.compose(chain(getComments), chain(_.prop('id')), getPost)
var ex3 = _.compose(chain(_.compose(getComments, _.prop('id'))), getPost)
ex3(1)


// 练习 4
// ==========
// 用 validateEmail、addToMailingList 和 emailBlast 实现 ex4 的类型签名

//  addToMailingList :: Email -> IO([Email])
var addToMailingList = (function(list){
  return function(email) {
    return new IO(function(){
      list.push(email);
      return list;
    });
  }
})([]);

function emailBlast(list) {
  return new IO(function(){
    return 'emailed: ' + list.join(',');
  });
}

var validateEmail = function(x){
  return x.match(/\S+@\S+\.\S+/) ? (new Right(x)) : (new Left('invalid email'));
}

//  ex4 :: Email -> Either String (IO String)
var ex4 = _.compose(join, map(emailBlast), join, map(addToMailingList), validateEmail)
var ex4 = _.compose(chain(emailBlast), chain(addToMailingList), validateEmail)



// 结合出错
// var ex4 = _.compose(chain(_.compose(emailBlast, addToMailingList)), validateEmail)
//

ex4(x)


Maybe(x)

map(addToMailingList)(Maybe(x))

Maybe(x).map(addToMailingList)

Maybe(IO(function(){
      list.push(email);
      return list;
    }))

IO(function(){
      list.push(email);
      return list;
}
)

IO(function(){
      list.push(email);
      return list;
}
).map(emailBlast)


IO(_.compose(emailBlast,function(){
      list.push(email);
      return list;
}))

IO(function(){
    return 'emailed: ' + list.join(',');
  }


var ex4 = _.compose(join, map(emailBlast), join, map(addToMailingList), validateEmail)
var ex4 = _.compose(_.map(_.compose(chain(emailBlast), addToMailingList)), validateEmail);



ex4(x)

Maybe(x)

map(_.compose(chain(emailBlast), addToMailingList))(Maybe(x))


Maybe(x).map(_.compose(chain(emailBlast), addToMailingList))

_.compose(chain(emailBlast), addToMailingList)(x)


chain(emailBlast) <- addToMailingList(x)
1
chain(emailBlast)(IO(function(){
      list.push(email);
      return list;
}))
    

IO(function(){
      list.push(email);
      return list;
}).map(emailBlast)



IO(_.compose(emailBlast,function(){
      list.push(email);
      return list;
}))

// join

emailBlast(list)

IO(function(){
    return 'emailed: ' + list.join(','); // for testing w/o mocks
  })

