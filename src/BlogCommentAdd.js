import React, { Component } from 'react';
class BlogCommentAdd extends Component {
    constructor(props) {
        super(props);
        this.errClass = 'is-invalid';
    }
    addComment(e) {
        e.preventDefault();
        if (this.validateEl(this.refs.titleEl) && this.validateEl(this.refs.contentEl)) {
            fetch(`${this.props.apiUrl}/comments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: this.props.postId,
                    name: this.refs.titleEl.value,
                    body: this.refs.contentEl.value,
                    email: this.props.user.email
                })
            })
                .then(response => response.json());
            // Cleanup
            this.refs.titleEl.value = '';
            this.refs.contentEl.value = '';
        }
    }
    validateEl(el) {
        el.classList[el.value ? 'remove' : 'add'](this.errClass);
        return el.value;
    }
    render() {
        return (
            <div>
                <form
                    className="card"
                    noValidate
                    autoComplete="off"
                    onSubmit={this.addComment.bind(this)}>
                    <div className="card-body">
                        <h5 className="card-title">Add Comment</h5>
                        <div className="form-group">
                            <label className="control-label">Title</label>
                            <input
                                ref="titleEl"
                                className="form-control col-md-12"
                                placeholder="Please enter a descriptive title" />
                            <div className="invalid-feedback">
                                Required
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Content</label>
                            <textarea
                                ref="contentEl"
                                className="form-control col-md-12"
                                placeholder="Please enter post content here" />
                            <div className="invalid-feedback">
                                Required
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right"> Send </button>
                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
        )
    }
}
export default BlogCommentAdd