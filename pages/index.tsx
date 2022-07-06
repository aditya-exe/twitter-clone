import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/sidebar/sidebar.component";
import Feed from "../components/feed/feed.component";
import Widgets from "../components/widgets/widgets.component";

interface HomeProps {
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
}

const Home: NextPage<HomeProps> = ({ newsResults, randomUsers }) => {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name={"discription"} content={"Generated by create-next-app"} />
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>

      <main className={"flex min-h-screen mx-auto"}>
        <Sidebar />
        <Feed />
        <Widgets newsResults={newsResults.articles} randomUsers={randomUsers.results} />
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const newsAPI: string = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
  const usersAPI: string = "https://randomuser.me/api/?results=300&inc=name,login,picture";

  const newsResults: object = await fetch(newsAPI)
    .then(res => res.json())

  const randomUsers: object = await fetch(usersAPI)
    .then(res => res.json())

  return {
    props: {
      newsResults,
      randomUsers,
    }
  }
}