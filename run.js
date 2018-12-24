let add = (a, b, cb) => {
  setTimeout(() => {
    if (typeof a != 'number' || typeof b != 'number') {
      return cb(new Error('There is an error...'));
    }
    return cb(undefined, a + b);
  }, 100);
}

add(4,5, (err, result) => {
  if (err) return console.log(err);
  console.log(result);
})

ePromise = new Promise((resolve, reject) => {
  setTimeout( ()=> {
      resolve({name: 'Long Nguyen', age: 23});
  }, 200)
});

ePromise.then((data) => {
  console.log(data);
})


add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        reject(new Error('You input must be a number'));
      }
      resolve(a + b);
    }, 200)
  });
}

add(3, '3')
.then( res => add(res, 7))
.then( res => console.log('zzzzz' + res))
.catch( err => console.log('eeee' + err));
