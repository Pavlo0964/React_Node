import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPost from "./components/AddPost";
import Post from "./components/Post";
import PostsList from "./components/PostsList";
import Tag from "./components/Tag";
import TagsList from "./components/TagsList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Stories
              </Link>
            </li>
            <li className="nav-item" style={{ float: 'right' }}>
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/posts"]} component={PostsList} />
            <Route exact path="/add" component={AddPost} />
            <Route path="/posts/:id" component={Post} />

            <Route exact path={["/", "/tags"]} component={TagsList} />
            <Route path="/tags/:id" component={Tag} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
