import React, { useState, useEffect } from "react";
import PostDataService from "../services/PostService";
import Postx from "./PostBase";
import Pagination from "@material-ui/lab/Pagination";

const PostsList = () => {
	const [posts, setPosts] = useState([]);

	const [searchTitle, setSearchTitle] = useState("");

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);

	const pageSize = 10;

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	const getRequestParams = (searchTitle, page, pageSize) => {
		let params = {};

		if (searchTitle) {
			params["title"] = searchTitle;
		}

		if (page) {
			params["page"] = page - 1;
		}

		if (pageSize) {
			params["size"] = pageSize;
		}

		return params;
	};

	const retrievePosts = () => {
		const params = getRequestParams(searchTitle, page, pageSize);

		PostDataService.getAll(params).then(response => {
				const { posts, totalPages } = response.data;

				setPosts(posts);
				setCount(totalPages);
			})
	};

	useEffect(retrievePosts, [page, pageSize]);// Only re-subscribe if page, pageSize changes

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	return (
		<div className="list row">
			<div className="col-md-8" style={{ display: 'none' }}>
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by title"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={retrievePosts}
						>
							Search
            </button>
					</div>
				</div>
			</div>
			<div className="1col-md-6">
				<div className="1mt-3">

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
