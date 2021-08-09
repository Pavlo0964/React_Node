import React, { useState, useEffect } from "react";
import PostDataService from "../services/PostService";
import Postx from "./PostBase";
import Pagination from "@material-ui/lab/Pagination";

const PostsList = props => {

	const [tagName, setTagName] = useState([]);
	const [posts, setPosts] = useState([]);

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);

	const pageSize = 10;

	const getRequestParams = (page, pageSize) => {
		let params = {};

		if (page) {
			params["page"] = page - 1;
		}

		if (pageSize) {
			params["size"] = pageSize;
		}

		return params;
	};

	const retrievePosts = () => {
		const params = getRequestParams(page, pageSize);
		const id = props.match.params.id;
		PostDataService.getTag(id,params).then(response => {
				const { posts, totalPages, tagName  } = response.data;

				setTagName(tagName);
				setPosts(posts);
				setCount(totalPages);
			})
	};

	useEffect(retrievePosts
	, [props.match.params.id, page, pageSize]);// Only re-subscribe if id, page, pageSize changes

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	return (
		<div className="list row">
			<div className="1col-md-6">
				<div className="1mt-3">
					<div style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 5 }}>Tag: {tagName}</div>
					<ul className="list-group">
						{posts &&
							posts.slice(0).reverse().map((post, index) => (
								<li className={"list-group-item"} key={index}>
									<Postx name={post} />
								</li>
							))}
					</ul>

					<Pagination
						className="my-3"
						count={count}
						page={page}
						siblingCount={1}
						boundaryCount={1}
						variant="outlined"
						shape="rounded"
						onChange={handlePageChange}
					/>
				</div>


			</div>
		</div >
	);
};

export default PostsList;
