import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class BlogPreview extends Component {
    render() {
        return (
            <div className="card">
                <img
                    alt={this.props.post.author}
                    src={this.props.post.avatarURL}
                    className="card-img-top" />
                <div className="card-body">
                    <h6 className="card-title">{this.props.post.title}</h6>
                    <p className="card-text"><small className="text-muted">{this.props.post.author || 'Anonymous'}</small></p>
                    <Link 
                        to={`/posts/${this.props.post.id}`}>
                        <button type="button"
                            className="btn btn-sm btn-secondary btn-block">
                            View Post
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}
export default BlogPreview