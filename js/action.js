import { CALL_API } from 'redux-api-middleware'

// redux-api-middleware についてはこれと reducer.js を読めば雰囲気分かるはず。
//
// 今回は REQUEST と FAILURE 捨ててるけど、 
// - REQUEST でローディングインジゲーダー表示
// - FAILURE 出たらエラー表示
//
// とかできる。
//
// 今回どの API でも同じ内容返すようにしてるので SUCCESS というアクション使いまわしいるけど、普通は API ごとに別のアクション名つけるようにする。

export default {
  load: ()=> {
    return {
      [CALL_API]: {
        endpoint: '/api/todos',
        method: 'GET',
        types: ['REQUEST', 'SUCCESS', 'FAILURE'],
        credentials: 'same-origin',
      }
    }
  },
  complete: (id)=> {  
    return {
      [CALL_API]: {
        endpoint: `/api/todos/${id}`,
        method: 'PUT',
        types: ['REQUEST', 'SUCCESS', 'FAILURE'],
        credentials: 'same-origin',
      }
    }
  },
  add: (title)=> {
    return {
      [CALL_API]: {
        endpoint: `/api/todos`,
        method: 'POST',
        types: ['REQUEST', 'SUCCESS', 'FAILURE'],
        credentials: 'same-origin',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify({title: title})
      }
    }
  }

}
