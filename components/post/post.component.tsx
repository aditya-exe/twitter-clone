/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import Moment from "react-moment";
import { db, storage } from "../../firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atom/modal.atom";
import { useRouter } from "next/router";


// interface PostProps {
//   post: {
//     id: string;
//     name: string;
//     username: string;
//     userImg: string;
//     img: string;
//     text: string;
//     timestamp: string;
//   }
// };

const Post: React.FC<any> = ({ post, id }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<any>([]);
  const [hasLiked, setHasLikes] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    )
  }, [id])

  useEffect(() => {
    const unsubsribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    )
  }, [id])

  useEffect(() => {
    setHasLikes(likes.findIndex((like: { id: string | undefined; }) => like.id === session?.user.uid) !== -1)
  }, [likes, session?.user.uid])

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid))
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session?.user.username,
        })
      }
    } else {
      signIn();
    }
  }

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      <img src={post?.data()?.userImg} alt={"user-img"} className="h-11 w-11 rounded-full mr-4" />
      <div className="flex-1">
        <div className="flex items-center justify-between ">
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data().name}</h4>
            <span className="text-sm sm:text-[15px]">@{post?.data().username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>
                {post?.data().timestamp?.toDate()}
              </Moment>
            </span>
          </div>
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post?.data().text}</p>
        <img className="rounded-2xl mr-2" src={post?.data().image} />
        <div className="flex justify-between text-gray-500">
          <div className="flex items-center select-none">
            <ChatIcon onClick={() => {
              if (!session) {
                signIn();
              } else {
                setPostId(id);
                setOpen(!open);
              }
            }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            {comments.length > 0 && (
              <span className="text-sm">
                {comments.length}
              </span>
            )}
          </div>
          {session?.user.uid === post?.data().id && (
            <TrashIcon onClick={deletePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" />
            ) : (
              <HeartIcon onClick={likePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>{likes.length}</span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;