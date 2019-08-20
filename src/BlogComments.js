import React, { Component } from 'react';
import BlogCommentAdd from './BlogCommentAdd';
class BlogComments extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = { comments: [] };
    }
    createCommentElement(comment) {
        return (
            <div className="list-group-item" key={comment.id}>
                <h4>{comment.name}</h4>
                {comment.body}
            </div>
        );
    }
    render() {
        const listItems = this.state.comments.map(this.createCommentElement);
        return (
            <div>
                <b>Comments</b>
                {listItems}
                <BlogCommentAdd
                    postId={this.props.postId}
                    apiUrl={this.props.apiUrl}
                    user={this.props.user} />
            </div>
        );
    }
    onCommentsLoaded(comments) {
        if (this._isMounted) {
            this.setState({ comments });
        }
    }
    componentDidMount() {
        this._isMounted = true;
        fetch(`${this.props.apiUrl}/comments?postId=${this.props.postId}&_sort=title&_order=asc`)
            .then(response => response.json())
            .then(comments => {
                this.onCommentsLoaded(comments);
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
}
export default BlogComments;