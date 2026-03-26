Promise.resolve(1)
    .then(x => { throw x; })
    .then(x => console.log(x))
    .catch(x => console.log('Error:', x))
    .then(x => console.log('Done'));