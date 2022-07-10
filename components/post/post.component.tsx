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
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import {db, storage} from "../../firebase";
import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {deleteObject, ref} from "firebase/storage";
import {useRecoilState} from "recoil";
import {modalState, postIdState} from "../../atom/modal.atom";
import {useRouter} from "next/router";

interface PostProps {
  post: QueryDocumentSnapshot<DocumentData>
  id: string
}

const Post: React.FC<PostProps> = ({post, id}) => {
  const {data: session} = useSession();
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasLiked, setHasLikes] = useState(false);
  const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [id])

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
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
      await signIn();
    }
  }

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        await deleteObject(ref(storage, `posts/${id}/image`));
      }
      await router.push("/");
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      <img src={post?.data()?.userImage} alt={"user-img"} className="h-11 w-11 rounded-full mr-4"/>
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
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2"/>
        </div>
        <p onClick={() => router.push(`/posts/${id}`)}
           className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post?.data().text}</p>
        {post.data().image && (
          <img onClick={() => router.push(`posts/${id}`)} className="rounded-2xl mr-2" src={post?.data().image}
               alt={"post image"}/>
        )}
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
                      className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
            {comments.length > 0 && (
              <span className="text-sm">
                {comments.length}
              </span>
            )}
          </div>
          {session?.user.uid === post?.data().userId && (
            <TrashIcon onClick={deletePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"/>
            ) : (
              <HeartIcon onClick={likePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
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

export default Post;