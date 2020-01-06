/**
 * Created by guangqiang on 2017/11/15.
 */
import {storage} from './index'
import user from '../methods/user';
import { Alert } from "react-native";
//内部
async function aPromise(executor){
  return new Promise(executor);
}
/**
 * sync方法的名字必须和所存数据的key完全相同
 * 方法接受的参数为一整个object，所有参数从object中解构取出
 * 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject
 * @type {{user: ((params))}}
 */
const sync = {



  async bankinfo(params) {
    let res = await user.getBankCards();
    if (res.err == 0) {
      storage.save('bankinfo',res.ret)
    }
  },
  userInfo(params) {
    let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params
    user.getUserInfo().then(res=>{
      if (!res.err) {
        storage.save('userInfo',res.ret)
        // 成功则调用resolve
        resolve && resolve(res.ret)
      } else {
        // 失败则调用reject
        reject && reject(new Error('data parse error'))
      }
    });
  }
}

export {sync}
