import React, { Component } from "react";
import API from "./../../utils/API";
import Article from "./../../Components/Article";

class Home extends Component {
  state = {
    articles: [],
    savedArticles: [],
    q: "",
    start_year: "",
    end_year: ""
  };

  // lifecycles
  componentDidMount() {
    this.getArticles();
    this.getSavedArticles();
  }

  // my methods
  getArticles = () => {
    let searchTopic = document.getElementById("search-topic").value;
    let dateStart = document
      .getElementById("date-start")
      .value.split("-")
      .join("");
    let dateEnd = document
      .getElementById("date-end")
      .value.split("-")
      .join("");

    API.getArticles({
      q: searchTopic,
      start_year: dateStart,
      end_year: dateEnd
    })
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };

  handleArticleSave = id => {
    const article = this.state.articles.find(article => article._id === id);
    API.saveArticle(article)
      .then(res => this.getArticles())
      .then(this.getSavedArticles());
  };

  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res => this.setState({ savedArticles: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    API.deleteArticle(id).then(res => this.getSavedArticles());
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <h1 className="text-center">New York Times Article Search</h1>
          <p className="text-center">
            Search for articles using the New York Times API!
          </p>
        </div>

        <div className="row">
          <div className="col-md-12 search-box">
            <label>Search a topic of interest</label>
            <input id="search-topic" />
            <br />
            <label>Start Date</label>
            <input type="date" id="date-start" />
            <br />
            <label>End Date</label>
            <input type="date" id="date-end" />
            <br />
            <button className="search" onClick={() => this.getArticles()}>
              Search
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 search-results">
            <h2>Search Results:</h2>
            {this.state.articles.map(article => (
              <Article
                key={article._id}
                _id={article._id}
                title={article.headline.main}
                url={article.web_url}
                date={article.pub_date}
                handleClick={this.handleArticleSave}
                buttonText="Save Article"
              />
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 saved-articles">
            <h2>Saved articles:</h2>
            {this.state.savedArticles.map(article => (
              <Article
                key={article._id}
                _id={article._id}
                title={article.title}
                url={article.url}
                date={article.date}
                handleClick={this.handleDelete}
                buttonText="Delete Article"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
