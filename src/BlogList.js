import React, { Component } from 'react'
import BlogPreview from './BlogPreview';
class BlogList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = { posts: [] }
    }
    createPostElement(post) {
        return <BlogPreview post={post} key={post.id} />
    }
    render() {
        const listItems = this.state.posts.map(this.createPostElement);
        return <div className="card-columns">{listItems}</div>
    }
    onPostsLoaded(posts, users) {
        if (this._isMounted) {
            posts.forEach(post => {
                let user = users.find(user => user.id === post.userId);
                post.author = user.name;
                post.avatarURL = user.photo;
            });
            this.setState({ posts });
        }
    }
    componentDidMount() {
        this._isMounted = true;
        fetch(`${this.props.apiUrl}/posts?_sort=title&_order=asc`)
            .then(response => response.json())
            .then(posts => {
                let userIDs = [...new Set(posts.map(post => `&id=${post.userId}`))].join('').substr(1);
                fetch(`${this.props.apiUrl}/users?${userIDs}`)
                    .then(response => response.json())
                    .then(users => this.onPostsLoaded(posts, users));
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
}
export default BlogList