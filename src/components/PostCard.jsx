import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useDbUpdate } from "../utilities/firebase";

const PostCard = ({ post, user }) => {
	//   const [vote, setVote] = useState(post.vote);
	//   const [updateVote] = useDbUpdate(`/posts/${post.id}`);

	const vote = post.vote;
	const location = post.location;
	const tags = post.tags;
	const title = post.title;
	const content = post.description;

	//   const onUpArrow = () => {
	//     const newVote = vote + 1;
	//     setVote(newVote);
	//     updateVote({ vote: newVote });
	//   };

	//   const onDownArrow = () => {
	//     const newVote = vote - 1;
	//     setVote(newVote);
	//     updateVote({ vote: newVote });
	//   };

	// const time = new Date().toLocaleTimeString();

	let time = new Date(post.id).toLocaleString();
	if (post.id < 4) {
		time = new Date(1697799640639).toLocaleString();
	}
	//   const filteredTags = tags.slice(0, 2);
	return (
		<div className='border-b-4 flex px-4 py-1 border-gray-600'>
			<div className='grow flex flex-col'>
				<div className='text-gray-400 '>
					<span>{time}</span>
					<span>
						{/* work on this later */}
						<a href='#'> {location} </a>
					</span>
				</div>
				<div className='text-2xl font-bold overflow-ellipsis'>
					<span className='overflow-ellipsis'>{title}</span>
				</div>

				<p className='max-w-[300px] truncate pb-2.5'>{content}</p>
				{/* image would go here */}
				<div className='flex justify-between pb-2'>
					<span className='flex gap-2'>
						{tags.map((tag, index) => (
							<Tag key={index} value={tag} />
						))}
					</span>
					<Link
						to={user ? `${post.id}` : null}
						className='text-gray-400 flex gap-1 items-center'>
						<MessagesSquare />
						Replies
					</Link>
				</div>
			</div>
			<div className='flex flex-col justify-center items-center w-20'>
				{/* make these buttons */}
				<ChevronUp />
				<p>{vote}</p>
				<ChevronDown />
			</div>
		</div>
	);
};

const Tag = ({ value }) => {
	return (
		<button className='bg-orange-200 rounded-lg py-1 px-2 text-orange-600 font-bold uppercase text-xs'>
			{value}
		</button>
	);
};

export default PostCard;
