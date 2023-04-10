import { type NextPage } from "next";
import Head from "next/head";
import MyTabs from "~/components/timer-tabs";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pomodoro Time</title>
        <meta
          name="description"
          content="Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="
          bg-purple-light 
          flex 
          min-h-screen 
          flex-col    
          items-center  
          justify-center 
        "
      >
        <h1 className="text-4xl font-bold tracking-wider text-indigo-200">
          pomodoro
        </h1>

        <MyTabs></MyTabs>
      </main>
    </>
  );
};

export default Home;
