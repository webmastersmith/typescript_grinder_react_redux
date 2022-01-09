import React from 'react'
import { connect } from 'react-redux'
import { Todo, fetchTodos, deleteTodo } from 'actions'
import { StoreState } from 'reducers'

interface AppProps {
  todos: Todo[]
  fetchTodos: typeof fetchTodos
  deleteTodo: typeof deleteTodo
}

interface AppState {
  isLoading: boolean
}
class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ isLoading: false })
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos()
    this.setState({ isLoading: true })
  }
  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id)
  }

  showLoading(): JSX.Element {
    return <div>Loading...</div>
  }
  renderList(): JSX.Element[] {
    return this.props.todos.map(({ title, id }: Todo): JSX.Element => {
      return (
        <div key={id} onClick={() => this.onTodoClick(id)}>
          {title}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch Todos</button>
        {this.state.isLoading ? this.showLoading() : this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
  return { todos: state.todos }
}

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App)
