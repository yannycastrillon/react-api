const Dashboard = React.createClass({ // Builds up a component
  getInitialState: function() {
    return {
      isLoggedIn: true,
      messages: [             // These messages can be getting from an AJAX call
        {id:1, body:"Hey Jimmy!"},
        {id:2, body:"What is up?"},
        {id:3, body:"React is Siiiiick."}
      ]
    }
  },
  lockForm: function (){ this.setState({isLoggedIn:false})},
  handleSubmit: function(body){
    this.setState({
      messages:[
        ...this.state.messages,
        {id:this.state.messages.length + 1, body:body}
      ]
    })
  },
  render: function() { // must render a component
    // if(this.state.isLoggedIn) setTimeout(this.lockForm, 5000)
    // returns html and renders the Components
    return (
      <div id="dashboard">
        <MessageList messages = {this.state.messages}></MessageList>
        <MessageForm locked={!this.state.isLoggedIn} onSubmit={this.handleSubmit}></MessageForm>
      </div>
    )
  }
})

const MessageList = React.createClass({
  render: function(){
    const messages = this.props.messages.map((m)=>(
      <li key={m.id}>{m.body}</li>
    ))
    return (
      <div id="message-list">{messages}</div>
    )
  }
})

const MessageForm = React.createClass({
  handleSubmit: function(evt){
    evt.preventDefault()                // prevents default behavior
    this.props.onSubmit(this.refs.newMessage.value)
    this.refs.newMessage.value = ''
  },
  render: function(){
    return (
      <div id="message-form">
        <form onClick={this.handleSubmit}>
          <input disabled={this.props.locked} type="text" ref="newMessage"></input>
          <button disabled={this.props.locked}>Submit</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(<Dashboard/>, document.getElementById("main"))
