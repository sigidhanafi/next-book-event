import Head from "next/head";
import EventList from "../components/events/EventList";

// lib
import prismaPromise from "../lib/prisma";
import { formatToHumanDate } from "../lib/formatter";

// models
import Event from "../models/event";

// components
import HomeBanner from "../components/banners/HomeBanner";
import { GetServerSideProps } from "next";

const Home = (props: { events: Event[] }) => {
  return (
    <>
      <Head>
        <title>Fun Football</title>
        <meta name="description" content="meet fun team at Fun Footbal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeBanner />
        <EventList data={props.events} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  events: Event[];
}> = async (context) => {
  let events = [];
  try {
    const result = await prismaPromise.event.findMany({
      skip: 0,
      take: 1,
    });

    if (!result || !Array.isArray(result)) {
      throw new Error("Result is error");
    }

    events = result.map((event) => {
      return {
        id: event.id,
        name: event.name,
        location: event.location,
        date: formatToHumanDate(event.date),
        ownerId: event.owner_id,
      };
    });
  } catch (e) {
    // will handled in FE
    // no data available
    events = [];
  }

  return {
    props: {
      events: events,
    },
  };
};

export default Home;
