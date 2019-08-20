/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Link } from "react-router-dom";

class BlogNavbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <img src="https://paperinsurance.com/wp-content/themes/eightwire/assets/images/site-logo.svg" height="30" alt="Paper Insurance" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/add" className="nav-link">Add Post</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/search" className="nav-link">Search</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item avatar">
                            <a className="nav-link p-0" href="#">
                                <img
                                    src={this.props.user ? this.props.user.photo : null}
                                    className="img-avatar rounded-circle z-depth-0"
                                    alt="user avatar" height="35" />
                                {this.props.user ? this.props.user.name : null}
                            </a>
                        </li>
                    </ul>
                </div >
            </nav >
        )
    }
}
export default BlogNavbar