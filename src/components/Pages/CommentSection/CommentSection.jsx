import React, { useMemo } from "react";
import Singlecomments from "../Singlecomments/Singlecomments";

export default function CommentSection({
  post,
  setShowReplies,
  setAllComments,
  userIDsession,
  allComments,
  replyCommentID,
  setReplyCommentID,
  handleReplyToCommentID,
}) {
  // для изъятия родителя комментария на которрый пишут комменатрий
  const commentMap = useMemo(() => {
    const map = {};
    const buildMap = (comments) => {
      comments.forEach((comment) => {
        map[comment.id] = comment;
        if (comment?.Replies?.length) {
          buildMap(comment?.Replies);
        }
      });
    };
    buildMap(allComments);
    return map;
  }, [allComments]);

  return (
    <>
      {allComments?.map((comment) => (
        <Singlecomments
          key={comment.id}
          comment={comment}
          commentMap={commentMap}
          post={post}
          setShowReplies={setShowReplies}
          setAllComments={setAllComments}
          userIDsession={userIDsession}
          replyCommentID={replyCommentID}
          setReplyCommentID={setReplyCommentID}
          handleReplyToCommentID={handleReplyToCommentID}
        />
      ))}
    </>
  );
}

// function areEqualCommentsection(prevProps, nextProps) {
//   console.log("🔍 Comparing Commentform props...");
//   const keys = Object.keys(prevProps);
//   for (let key of keys) {
//     if (prevProps[key] !== nextProps[key]) {
//       console.log(`What the key boolean ${key}`);
//     }
//   }

//   if (prevProps.handleReplyToCommentID !== nextProps.handleReplyToCommentID) {
//     console.log("⛔ handleReplyToCommentID changed");
//     console.log("Prev:", prevProps.handleReplyToCommentID);
//     console.log("Next:", nextProps.handleReplyToCommentID);
//   }
//   const result =
//     prevProps.post === nextProps.post &&
//     prevProps.setShowReplies === nextProps.setShowReplies &&
//     prevProps.setAllComments === nextProps.setAllComments &&
//     prevProps.userIDsession === nextProps.userIDsession &&
//     prevProps.allComments === nextProps.allComments &&
//     prevProps.replyCommentID === nextProps.replyCommentID &&
//     prevProps.setReplyCommentID === nextProps.setReplyCommentID &&
//     prevProps.handleReplyToCommentID === nextProps.handleReplyToCommentID;
//   console.log("Are equal:", result);
//   return result;
// }

// 🛠 Ещё лучше — замерь внутри areEqualCommentsection:
// js
// Копировать
// Редактировать
// if (prevProps.handleReplyToCommentID !== nextProps.handleReplyToCommentID) {
//   console.log("⛔ handleReplyToCommentID changed");
//   console.log("Prev:", prevProps.handleReplyToCommentID);
//   console.log("Next:", nextProps.handleReplyToCommentID);
// }
// Если ссылки разные — видно напрямую.
