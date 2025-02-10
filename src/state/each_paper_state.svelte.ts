import { paperListState } from './papers_list.svelte';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class EachPaper {
	paper: any = $state();
	likes: number = $state(0);
	commentCount: number = $state(0);
	isLiked: boolean = $state(false);
	isBookmarked: boolean = $state(false);
	isReadingSummary: boolean = $state(false);

	constructor(paper: any) {
		this.paper = paper;
		this.likes = this.paper['likes'] || 0;
		this.commentCount = this.paper['commentCount'] || 0;
		this.isLiked = this.paper['isLiked'];
		this.isBookmarked = this.paper['isBookmarked'];
		this.isReadingSummary = paperListState.paperList[0]['extractedID'] == this.paper['extractedID'];
	}

	toggleLike() {
		if (this.isLiked == true) {
			// this.likes -= 1;
			this.likes = 0;
		} else {
			this.likes += 1;
		}
		this.isLiked = !this.isLiked;
	}

	toggleBookmark() {
		this.isBookmarked = !this.isBookmarked;
	}

	toggleSummary() {
		this.isReadingSummary = !this.isReadingSummary;
	}
}
