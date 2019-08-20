import React, { Component } from 'react';
import BlogComments from './BlogComments';
class BlogPost extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = { post: null, user: null }
    }
    render() {
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="text-center col-xs-12 col-sm-2">
                        <img
                            alt={this.state.user ? this.state.user.name : null}
                            src={this.state.user ? this.state.user.photo : null}
                            className="img-fluid img-thumbnail rounded-circle img-avatar" />
                    </div>
                    <div className="col-xs-12 col-sm-10">
                        <h5>{this.state.post ? this.state.post.title : null} <small className="text-muted">by {this.state.user && this.state.user.name}</small></h5>
                        {this.state.post ? this.state.post.body : null}
                    </div>
                </div>
                <BlogComments
                    postId={this.props.postId}
                    user={this.state.user}
                    apiUrl={this.props.apiUrl} />
            </div>
        )
    }
    onPostLoaded(post, user) {
        if (this._isMounted) {
            this.setState({ post, user });
        }
    }
    componentDidMount() {
        this._isMounted = true;
        fetch(`${this.props.apiUrl}/posts?id=${this.props.postId}`)
            .then(response => response.json())
            .then(posts => {
                fetch(`${this.props.apiUrl}/users?id=${posts[0].userId}`)
                    .then(response => response.json())
                    .then(users => this.onPostLoaded(posts[0], users[0]));
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
}
export default BlogPost