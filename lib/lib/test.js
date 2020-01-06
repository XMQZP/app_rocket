let user_class = require('./user');
const hp = require('./http/http_control');
console.log('时间', new Date(Date.now()+8*3600*1000));
console.log()
return;


let user = new user_class();

setTimeout(()=>{
    user.register('user006', 'user006', 'user006@6.com', 'user006').then(({err, ret})=>{
       console.log(err, ret);
   })
},1e3);

setTimeout(()=>{
    user.login('user006', 'user006').then(({err, ret})=>{
        console.log(err, ret);
        if(!err){
            user.getUserInfo().then((ret)=>{
                console.log('user data', ret);
            });
            hp.doHttpRequest('api.user.home').then((res)=>{
                console.log('结果', res.data);
            });
        }
    })
},4e3);


