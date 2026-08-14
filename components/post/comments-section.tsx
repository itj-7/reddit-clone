import { CommentComposer } from "@/components/post/comment-composer";
import { CommentThread } from "@/components/post/comment-thread";
import { getCommentTree } from "@/lib/db/queries";
import { User } from "@/lib/types";
import Link from "next/link";

// Isolated so the post body/vote UI can render immediately while this
// (comment tree query + author/score/vote batching) streams in behind it.
export async function CommentsSection({
  postId,
  postAuthorId,
  sessionUser,
}: {
  postId: string;
  postAuthorId: string;
  sessionUser: User | null;
}) {
  const commentTree = await getCommentTree(postId, sessionUser?.id);

  return (
    <>
      {sessionUser ? (
        <div className="mb-8">
          <CommentComposer postId={postId} user={sessionUser} />
        </div>
      ) : (
        <p className="mb-8 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <Link
            href="/auth/sign-in"
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>{" "}
          to join the discussion.
        </p>
      )}

      <CommentThread
        tree={commentTree}
        postAuthorId={postAuthorId}
        sessionUser={sessionUser}
      />
    </>
  );
}
