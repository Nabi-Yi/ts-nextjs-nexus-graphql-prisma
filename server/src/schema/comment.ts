import { objectType } from "nexus";
import { Comment } from "../../generated/nexus-prisma";

const comment = objectType({
  name: Comment.$name,
  definition(t){
      t.field(Comment.commentId)
      t.field(Comment.createdAt)
      t.field(Comment.updatedAt)
      t.field(Comment.slug)
      t.field(Comment.identifier)
      t.field(Comment.body)

      t.field(Comment.user)
      t.field(Comment.userId)
      t.field(Comment.post)
      t.field(Comment.postId)
      t.field(Comment.voteComments)
  }
});
export default comment;