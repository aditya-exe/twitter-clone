/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon} from "@heroicons/react/outline";
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import Moment from "react-moment";
import {db} from "../../firebase";
import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {modalState, postIdState} from "../../atom/modal.atom";
import {useRouter} from "next/router";

interface CommentProps {
  commentId: string;
  originalPostId: any;
  comment: {
    userImage: string;
    name: string;
    timestamp: Timestamp;
    userId: string;
    username: string;
    comment: string;
    image: string;
  }
}

const Comment: React.FC<CommentProps> = ({commentId, originalPostId, comment}) => {
  const {data: session} = useSession();
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasLiked, setHasLikes] = useState<boolean>(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [, setPostId] = useRecoilState(postIdState);

  const router = useRouter();
  console.log(commentId);

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [originalPostId, commentId])


  useEffect(() => {
    setHasLikes(likes.findIndex((like: { id: string | undefined; }) => like.id === session?.user.uid) !== -1)
  }, [likes, session?.user.uid])

  const likeComment = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid))
      } else {
        await setDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid), {
          username: session?.user.username,
        })
      }
    } else {
      await signIn();
    }
  }

  const deleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
      <img src={comment?.userImage} alt={"user-img"} className="h-11 w-11 rounded-full mr-4"/>
      <div className="flex-1">
        <div className="flex items-center justify-between ">
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{comment?.name}</h4>
            <span className="text-sm sm:text-[15px]">@{comment?.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>
                {comment?.timestamp?.toDate()}
              </Moment>
            </span>
          </div>
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2"/>
        </div>
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{comment?.comment}</p>
        {comment.image && (
          <img className={"rounded-2xl mr-2"} src={comment.image} alt={"comment image"}/>
        )}
        <div className="flex justify-between text-gray-500">
          <div className="flex items-center select-none">
            <ChatIcon onClick={() => {
              if (!session) {
                signIn();
              } else {
                setPostId(originalPostId);
                setOpen(!open);
              }
            }}
                      className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
          </div>
          {session?.user.uid === comment.userId && (
            <TrashIcon onClick={deleteComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled onClick={likeComment} className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"/>
            ) : (
              <HeartIcon onClick={likeComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>{likes.length}</span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
        </div>
      </div>
    </div>
  );
};

export default Comment;