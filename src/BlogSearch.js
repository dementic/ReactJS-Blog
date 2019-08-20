import React, { Component } from 'react';
import BlogPreview from './BlogPreview';
class BlogSearch extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = { results: [], queryType: 'posts' }
        this.errClass = 'is-invalid';
    }
    render() {
        return (
            <div>
                <form className="card"
                    noValidate
                    autoComplete="off"
                    onSubmit={this.onSubmit.bind(this)}>
                    <div className="card-body">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <input type="text"
                                    ref="query"
                                    className="form-control"
                                    placeholder="Search posts & Comments" />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="submit">
                                        <i className="fa fa-search"></i>&nbsp;
                                        Search
                                </button>
                                </div>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="customRadio"
                                    className="custom-control-input"
                                    onChange={event => this.setQueryType(event)}
                                    value="posts"
                                    checked={this.state.queryType === 'posts'} />
                                <label className="custom-control-label" htmlFor="customRadio1">Posts</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadio2" name="customRadio"
                                    className="custom-control-input"
                                    value="comments"
                                    onChange={event => this.setQueryType(event)}
                                    checked={this.state.queryType === 'comments'} />
                                <label className="custom-control-label" htmlFor="customRadio2">Comments</label>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='card-columns'>
                {this.state.listItems}
                </div>
            </div>
        );
    }
    setQueryType(e) {
        this.setState({ queryType: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.validateEl(this.refs.query)) {
            fetch(`${this.props.apiUrl}/${this.state.queryType}?q=${this.refs.query.value}`)
                .then(response => response.json())
                .then(results => this.onResultsLoaded(results));
        }
    }
    onResultsLoaded(results) {
        if (this._isMounted) {
            this.setState({ results });
            this.showResults();
        }
    }
    showResults() {
        let listItems;
        switch (this.state.queryType) {
            case 'posts':
                let userIDs = [...new Set(this.state.results.map(post => `&id=${post.userId}`))].join('').substr(1);
                fetch(`${this.props.apiUrl}/users?${userIDs}`)
                    .then(response => response.json())
                    .then(users => {
                        this.state.results.forEach(post => {
                            let user = users.find(user => user.id === post.userId);
                            post.author = user.name;
                            post.avatarURL = user.photo;
                        });
                        listItems = this.state.results.map(this.createPostElement);
                        this.setState({ listItems });
                    });
                break;
            case 'comments':
                listItems = this.state.results.map(this.createCommentElement);
                this.setState({ listItems });
                break;
            default:
                listItems = '';
                this.setState({ listItems });
                break;
        }
    }
    createPostElement(post) {
        return <BlogPreview post={post} key={post.id} />
    }
    createCommentElement(comment) {
        return (
            <div className="list-group-item" key={comment.id}>
                <h4>{comment.name}</h4>
                {comment.body}
            </div>
        );
    }
    validateEl(el) {
        el.classList[el.value ? 'remove' : 'add'](this.errClass);
        return el.value;
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
}
export default BlogSearch;