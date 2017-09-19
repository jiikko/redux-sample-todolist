// redux でいうところの state は react の state と全く関係ない概念なので注意。
//
// react-redux が redux の state を react の props に変換してくれているわけです。

const initialState = {
  todos: {complete: [], incomplete: []}
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SUCCESS':
      return {
        todos: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
