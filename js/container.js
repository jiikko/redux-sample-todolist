import React from 'react'
import { connect } from 'react-redux'

import Top from './component'

import action from './action'

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return {
    load: ()=> { return dispatch(action.load()); },
    complete: (id)=> {return dispatch(action.complete(id)); },
    add: (title)=> {return dispatch(action.add(title)); }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top)

