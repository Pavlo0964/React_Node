import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

function Postx (props) {
	const post = props.name;
	return (
		<div>
			<Link to={"/posts/" + post.id} className={"post-title"}	>
				{post.title}
			</Link>
			<div className={"tag-div"}>
				{post.tags &&
					post.tags.map((tag, index) => (
					<Link  to={"/tags/" + tag.id} key={index}											>
						{tag.name}
					</Link>
				))}
				| {post.date}
			</div>
			<div className="form-group">
				<div dangerouslySetInnerHTML={{ __html: post.description }} />
			</div>
			
			<div>
			</div>

			<div id="meta_container_left" style={{ display: 'none' }}>
					<div id="meta_vote">
						<div className="post-ratings">
							<div className="ratings_image">
								<img src="/rating_1_over.gif"
									alt="" title="1 Thumbs" />
							</div>
							<div className="ratings_meta">
								<div className="ratings_count">
									<NumberFormat value={post.votes} displayType={'text'} thousandSeparator={true}  />
								</div>
							</div>
						</div>
					</div>
			</div>

		</div>
	);
}

export default Postx;
