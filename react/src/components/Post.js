import React, { useState, useEffect } from "react";
import PostDataService from "../services/PostService";
import Postx from "./PostBase";

const Post = props => {

	const [post, setPost] = useState([]);

	const getPost = () => {
		const id= props.match.params.id;
		PostDataService.get(id).then(response => {
			const post = response.data;
			document.title = response.data.title;
			setPost(post);
		});
	}

	useEffect(	getPost, [props.match.params.id]);

	return (
		<Postx name={post} />
	);
};

export default Post;
