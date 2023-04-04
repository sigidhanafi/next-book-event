import React from "react";

import { getServerSession, User } from "next-auth";
import Head from "next/head";
import { GetServerSideProps } from "next";

// lib
import { authOptions } from "../api/auth/[...nextauth]";
import prismaPromise from "../../lib/prisma";
import { formatToHumanDate } from "../../lib/formatter";

// models
import Transaction from "../../models/transaction";

// component
import MyAccount from "../../components/users/MyAccount";
import PageBanner from "../../components/banners/PageBanner";
import TransactionList from "../../components/transactions/TransactionList";

interface AccountPageProps {
  user: User;
  transactions: Transaction[];
}

const AccountPage = (props: AccountPageProps) => {
  return (
    <>
      <Head>
        <title>Fun Football</title>
        <meta name="description" content="meet fun team at Fun Footbal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageBanner />
        <MyAccount data={props.user} />
        <TransactionList data={props.transactions} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  user: User;
  transactions: Transaction[];
}> = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  let transactions = [];

  if (session && session.user) {
    const result = await prismaPromise.transaction.findMany({
      where: { user_id: session.user.id },
      include: {
        event: true,
        participant: true,
      },
    });

    if (result) {
      transactions = result.map((transaction) => {
        return {
          id: transaction.id,
          status: transaction.status,
          event: {
            name: transaction.event.name,
            location: transaction.event.location,
            ownerId: transaction.event.owner_id,
            date: formatToHumanDate(transaction.event.date),
          },
          participant: transaction.participant.map((participant) => {
            return { id: participant.id, name: participant.name };
          }),
        };
      });
    }
  }

  return {
    props: {
      user: session.user,
      transactions: transactions,
    },
  };
};

export default AccountPage;
