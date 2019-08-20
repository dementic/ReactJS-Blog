import './BlogApp.css';

import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Navbar from './BlogNavbar';
import BlogAddPost from './BlogAddPost';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import BlogSearch from './BlogSearch';

class BlogApp extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null }
    this.apiUrl = 'http://localhost:3000';
    this.Notfound = () => <h1>404 Not found</h1>;
  }
  // remove(id) {
  //   const posts = this.state.posts.filter(post => post.id !== id);
  //   this.setState({ posts });
  // }
  addPost(post) {
    post.userId = this.state.user.id;
    post.author = this.state.user.name;
    post.avatarURL = this.state.user.photo;
    this.state.posts.push(post);
    this.setState({ posts: this.state.posts });
  }
  onPostsLoaded(posts) {
    this.setState({ posts });
  }
  onUserLoaded(user) {
    this.setState({ user });
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar
          user={this.state.user} />
        <Switch>
          <Route
            exact path={"/"}
            component={() =>
              <BlogList
                apiUrl={this.apiUrl}
                user={this.user}
              />}
          />
          <Route
            exact path={"/posts/:postId"}
            render={({ match }) =>
              <BlogPost
                apiUrl={this.apiUrl}
                user={this.user}
                postId={match.params.postId}
              />}
          />
          <Route
            exact path={"/add"}
            component={() =>
              <BlogAddPost
                apiUrl={this.apiUrl}
                user={this.state.user}
              />}
          />
          <Route
            exact path={"/search"}
            component={() =>
              <BlogSearch
                apiUrl={this.apiUrl}
              />}
          />
          <Route component={this.Notfound} />
        </Switch>
      </BrowserRouter>
    );
  }
  componentDidMount() {
    fetch(`${this.apiUrl}/users?id=1`)
      .then(response => response.json())
      .then(users => this.onUserLoaded(users[0]));
  }
}

export default BlogApp;