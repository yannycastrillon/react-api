const Dashboard = React.createClass({
  getInitialState:function () {
    return {galaxies:[]}
  },

  searchGalaxies: function(searchTerm){
    const apiUrl = "https://wdi-astro-api.herokuapp.com/api/public/images/search?term="
    const sendSearch = fetch(apiUrl + searchTerm)

    var self = this

    function logJson(data){
      data.json().then((jsonData)=>{self.setState({
        galaxies:jsonData.objects
      })})
    }
    /////////////////////////
    sendSearch.then(logJson)
    /////////////////////////
  },


  render: function(){

    return (
      <div>
        <SearchForm onSubmit={this.searchGalaxies}/>
        <Results galaxies={this.state.galaxies}/> // passing galaxies down
      </div>
    )
  }
})


const Results = React.createClass({
  render: function(){
    const galaxies = this.props.galaxies.map(g => {
      return(
        <Result key={g.id} galaxy={g}></Result>
      )
    })
    return(
      <ul>{galaxies}</ul>
    )
  }

})


const Result = React.createClass({
  render:function(){
    const g = this.props.galaxy
    return(
      <li id={g.id} key={g.id}>
        <img src={g.url_thumb} />
        <p>{g.title}</p>
      </li>
    )
  }
})


const SearchForm = React.createClass({
  handleSubmit: function(evt) {
    evt.preventDefault()
    this.props.onSubmit(this.refs.search.value)
  },

  render:function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="search"/>
        <button>Search</button>
      </form>
    )
  }
})

ReactDOM.render(<Dashboard/>, document.getElementById('main'))

$('body').on('click', 'img', (evt) => {
  var imgUrl = $(evt.target).attr('src').replace(/\/thumb\//i, '/regular/');
  console.log(imgUrl)
  $('.modal-body').html(`<img src="${imgUrl}" />`)
  $('.modal').modal()
})
