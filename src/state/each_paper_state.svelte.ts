// import { mongoDB } from '$db/db';
import { paperListState } from './papers_list.svelte';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class EachPaper {
	paper: any = $state();
	likeCount: number = $state(0);
	commentCount: number = $state(0);
	isLiked: boolean = $state(false);
	isBookmarked: boolean = $state(false);
	isReadingSummary: boolean = $state(false);
	isFirstInList: boolean = $state(false);

	constructor(paper: any) {
		this.paper = paper;
		this.likeCount = this.paper.likeCount || 0;
		this.commentCount = this.paper['commentCount'] || 0;
		this.isLiked = this.paper.isLiked;
		this.isBookmarked = this.paper.isBookmarked;
		// this.isReadingSummary = paperListState.paperList[0]['extractedID'] == this.paper['extractedID'];
		this.isFirstInList = paperListState.paperList[0]['extractedID'] == this.paper['extractedID'];
	}

	async toggleLike(userID: any, paperID: any) {
		if (this.isLiked == true) {
			// this.likes -= 1;
			this.likeCount = 0;
		} else {
			this.likeCount += 1;
		}

		this.isLiked = !this.isLiked;

		// Sync Bookmark State of Main Feed
		for (const eachPaper of paperListState.paperList as any[]) {
			if (eachPaper['extractedID'] == paperID) {
				eachPaper['isLiked'] = this.isLiked;
				eachPaper['likeCount'] = this.likeCount;
			}
		}

		await fetch('/api/like_papers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ paperID })
		});
	}

	async toggleBookmark(userID: any, paperID: any) {
		this.isBookmarked = !this.isBookmarked;

		// Sync Bookmark State of Main Feed
		for (const eachPaper of paperListState.paperList as any[]) {
			if (eachPaper['extractedID'] == paperID) {
				eachPaper['isBookmarked'] = this.isBookmarked;
			}
		}

		// Bookmark Paper
		await fetch('/api/bookmark_papers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ paperID })
		});

		paperListState.isGettingBookmarkedPapers = false;

		// Send back all bookmarks
		// const bookmarkedPapers = await getBookmarkedPapers(c, userID);
		// paperListState.bookmarkList = newBookmarkList.body.json();

		// Response
		// return c.json(bookmarkedPapers);
	}

	toggleSummary() {
		if (this.isFirstInList) {
			this.isFirstInList = false;
		} else {
			this.isReadingSummary = !this.isReadingSummary;
		}
	}
}
