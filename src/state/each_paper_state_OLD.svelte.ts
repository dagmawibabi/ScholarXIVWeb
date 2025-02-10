/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
// import { bookmarkPaperURL, likePaperURL } from '$lib/constants';
// import Bookmarks from './bookmarks.svelte';

class EachPaper {
	paper: any = $state();
	likes: number = $state(0);
	commentCount: number = $state(0);
	isLiked: boolean = $state(false);
	isBookmarked: boolean = $state(false);

	constructor(paper: any) {
		this.paper = paper;
		this.likes = this.paper['likes'];
		this.commentCount = this.paper['commentCount'];
		this.isLiked = this.paper['isLiked'];
		this.isBookmarked = this.paper['isBookmarked'];
	}

	async bookmarkPaper() {
		this.isBookmarked = !this.isBookmarked;
		// const bookmarksState = new Bookmarks();
		// bookmarksState.myBookmarks();
		// await axios.post(
		// 	bookmarkPaperURL,
		// 	{
		// 		paperID: this.paper['id']
		// 	},
		// 	{
		// 		withCredentials: true
		// 	}
		// );
		// console.log(this.paper['isBookmarked']);
	}

	async likePaper() {
		this.isLiked = !this.isLiked;
		// if (this.isLiked == true) {
		// 	this.likes += 1;
		// } else {
		// 	this.likes -= 1;
		// }
		// const response = await axios.post(
		// 	likePaperURL,
		// 	{
		// 		paperID: this.paper['id']
		// 	},
		// 	{
		// 		withCredentials: true
		// 	}
		// );
		// this.paper = response.data;
	}
}

export default EachPaper;
