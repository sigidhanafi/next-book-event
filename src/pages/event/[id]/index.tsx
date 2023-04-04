import { GetServerSideProps } from "next";
import Head from "next/head";

// lib
import prismaPromise from "../../../lib/prisma";
import { formatToHumanDate } from "../../../lib/formatter";

// models
import Event from "../../../models/event";

// components
import EventDetail from "../../../components/events/EventDetail";

const EventDetailPage = (props: { event: Event }) => {
  return (
    <>
      <Head>
        <title>Fun Football</title>
        <meta name="description" content="meet fun team at Fun Footbal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <EventDetail data={props.event} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  event: Event;
}> = async (context) => {
  let event = null;
  if (context.query && context.query.id) {
    const eventId = parseInt(context.query.id as string);
    let result = null;
    try {
      const result = await prismaPromise.event.findUnique({
        where: {
          id: eventId,
        },
      });

      event = {
        id: result.id,
        name: result.name,
        location: result.location,
        date: formatToHumanDate(result.date),
        ownerId: result.owner_id,
      };
    } catch (e) {
      console.log("ERROR Detail Event Page", e);
    }
  }

  return {
    props: {
      event: event,
    },
  };
};

export default EventDetailPage;
