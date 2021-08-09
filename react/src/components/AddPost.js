import React, { useState } from "react";
import PostDataService from "../services/PostService";

const AddPost = () => {
	const initialPostState = {
		id: null,
		title: "",
		description: "",
		published: false
	};
	const [post, setPost] = useState(initialPostState);
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setPost({ ...post, [name]: value });
	};

	const savePost = () => {
		var data = {
			title: post.title,
			description: post.description,
			tags: post.tags
		};

		PostDataService.create(data)
			.then(response => {
				setPost({
					id: response.data.id,
					title: response.data.title,
					tags: response.data.tags,
					description: response.data.description,
					published: response.data.published
				});
				setSubmitted(true);
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const newPost = () => {
		setPost(initialPostState);
		setSubmitted(false);
	};

	return (
		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className="btn btn-success" onClick={newPost}>
						Add
          </button>
				</div>
			) : (
					<div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								id="title"
								placeholder="title"
								required
								value={post.title}
								onChange={handleInputChange}
								name="title"
							/>
						</div>

						<div className="form-group">
							<input
								type="text"
								className="form-control"
								id="tags"
								placeholder="tags"
								required
								value={post.tags}
								onChange={handleInputChange}
								name="tags"
							/>
						</div>

						<div className="form-group">
							<textarea
								type="text"
								className="form-control"
								id="description"
								placeholder="Please tell us your story here!"
								required
								value={post.description}
								onChange={handleInputChange}
								name="description"
							/>
						</div>

						<button onClick={savePost} className="btn btn-success">
							Submit
          </button>
					</div>
				)}
		</div>
	);
};

export default AddPost;
