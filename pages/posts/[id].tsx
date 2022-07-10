import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../../components/sidebar/sidebar.component";
import Widgets from "../../components/widgets/widgets.component";
import CommentModal from "../../components/comment-modal/comment-modal.component";
import Post from "../../components/post/post.component";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import Comment from "../../components/comment/comment.component";
import { AnimatePresence, motion } from "framer-motion";

interface PostProps {
  randomUsers: {
    results: [{
      name: {
        first: string;
        last: string;
      },
      login: {
        username: string;
      },
      picture: {
        thumbnail: string;
      }
    }]
  },
  newsResults: {
    articles: [{
      title: string
    }]
  }
};

const PostPage: NextPage<PostProps> = ({ newsResults, randomUsers }) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<any>();
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    if (id !== undefined) {
      onSnapshot(doc(db, "posts", id.toString()), (snapshot) => setPost(snapshot))
    }
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      onSnapshot(
        query(
          collection(db, "posts", id.toString(), "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      );
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Post Page</title>
        <meta name={"discription"} content={"Generated by create-next-app"} />
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>

      <main className={"flex min-h-screen mx-auto"}>
        <Sidebar />

        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-xl sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 items-center sticky space-x-2 top-0 z-50 bg-white border-b border-gray-200">
            <div className="hoverEffect flex items-center" onClick={() => router.push("/")} >
              <ArrowLeftIcon className="h-5 space-x-2" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold select-none">Tweet</h2>
          </div>
          <Post id={id} post={post} />
          {comments.length > 0 && (
            <div className="">
              <AnimatePresence>
                {comments.map((comment: { id: string; data: () => { userImage: string; name: string; timestamp: Timestamp; userId: string; username: string; comment: string; }; }) => (
                  <motion.div key={comment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <Comment key={comment.id} commentId={comment.id} orignalPostId={id} comment={comment.data()} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <Widgets newsResults={newsResults.articles} randomUsers={randomUsers.results} />
        <CommentModal />
      </main>
    </>
  );
};

export default PostPage;

export async function getServerSideProps() {
  const newsAPI: string = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
  const usersAPI: string = "https://randomuser.me/api/?results=300&inc=name,login,picture";

  const newsResults: object = await fetch(newsAPI)
    .then(res => res.json());

  const randomUsers: object = await fetch(usersAPI)
    .then(res => res.json());

  return {
    props: {
      newsResults,
      randomUsers,
    }
  };
};