import React from 'react'

class IncompleteTodo extends React.Component {
  click(){
    // 上位コンポーネントから props 渡しされてきた action creator を呼び出すことも当然可能
    this.props.complete(this.props.todo.id);
  }

  render(){
    return <li>
      <input type='checkbox' onClick={()=>this.click()}/>
      {this.props.todo.title}
    </li>
  }
}

class CompleteTodo extends React.Component {
  click() {
    console.log(this.props)
    this.props.restore(this.props.todo.id);
  }

  render() {
    return(
      <li key={this.props.todo.id}>
        <input type='checkbox' onClick={()=>this.click()}/>
        {this.props.todo.title}
      </li>
    )
  }
}

export default class App extends React.Component {
  submit(e){
    e.preventDefault();
    // action で定義して container で dispatch したもの(== action creator)は props 経由で呼べる
    this.props.add(this.refs.input.value);
    this.refs.input.value = '';
  }
  componentDidMount(){
    // action で定義して container で dispatch したもの(== action creator)は props 経由で呼べる
    this.props.load();
  }
  render(){ 
    console.log(this.props.todos);
    return <div>
      <h1>Todo List</h1>
      <form onSubmit={(e) => this.submit(e)} >
        <input ref='input' />
        <button>Submit</button>
      </form>
      <h3>Incomplete Todos</h3>
      <ul>
        {this.props.todos.incomplete.map((todo)=> <IncompleteTodo todo={todo} key={todo.id} complete={this.props.complete}/>)}
      </ul>
      <h3>Complete Todos</h3>
      <ul>
        {this.props.todos.complete.map((todo)=> <CompleteTodo todo={todo} restore={this.props.restore}/>)}
      </ul>
    </div>
  }
}
