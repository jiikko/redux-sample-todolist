// container の役目は殆ど魔術みたいなかんじ。
import React from 'react'
import { connect } from 'react-redux'

import Top from './component'

import action from './action'


// reducer が吐く state を全部 React に渡したいわけじゃない って時はここ使って編集しましょう。
const mapStateToProps = (state)=>{
  return state
}

// 基本的にここに action を dispatch するの書けばいいだけ
const mapDispatchToProps = (dispatch)=>{
  return {
    load: ()=> { return dispatch(action.load()); },
    complete: (id)=> {return dispatch(action.complete(id)); },
    add: (title)=> {return dispatch(action.add(title)); }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top)

