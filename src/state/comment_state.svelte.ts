/* eslint-disable @typescript-eslint/no-explicit-any */
export const commentState: {
	isGettingComments: boolean;
	comments: any[];
	paper: any;
	isCommenting: boolean;
	comment: '';
} = $state({
	isGettingComments: true,
	comments: [],
	paper: {},
	isCommenting: false,
	comment: ''
});
