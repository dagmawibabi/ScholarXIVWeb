import { ObjectId } from 'mongodb';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';
import { mongoDB } from '$db/db';

const comments = mongoDB.collection('comments');
const users = mongoDB.collection('user');

export async function DELETE({ request }) {
    try {
        // Get User ID from session
        const session = await getSession(request);
        if (!session?.user?.id) {
            return json({ error: 'Unauthorized' }, { status: 401 });
        }
        const userID = session.user.id;

        // Get comment ID from request body
        const { commentId, extractedID } = await request.json();
        if (!commentId || !extractedID) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify the comment exists and belongs to the user
        const comment = await comments.findOne({ 
            _id: new ObjectId(commentId),
            userID: userID
        });

        if (!comment) {
            return json({ error: 'Comment not found or access denied' }, { status: 404 });
        }

        // Delete the comment
        await comments.deleteOne({ _id: new ObjectId(commentId) });

        // Get updated comments for the paper
        const rawComments = await comments.find({ 
            extractedID: extractedID, 
            parentID: null 
        }).toArray();

        // Get user details for each comment
        const commentsWithUserInfo = await Promise.all(
            rawComments.map(async (comment) => {
                const user = await users.findOne({ _id: new ObjectId(comment.userID) });
                return {
                    ...comment,
                    commenter: {
                        id: user?._id.toString(),
                        name: user?.name || 'Anonymous',
                        email: user?.email
                    }
                };
            })
        );

        return json(commentsWithUserInfo);

    } catch (error) {
        console.error('Error deleting comment:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
