import { getToken } from "next-auth/jwt";

import prismaPromise from "../../../lib/prisma";

export default async function handler(req, res) {
  const { method } = req;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: false,
  });

  if (token == null) {
    res.status(401).json({
      status: "FAILED",
      message: "Access Denied",
      data: [],
    });
    return;
  }

  switch (method) {
    case "GET":
      try {
        const result = await prismaPromise.transaction.findMany({
          where: {
            user_id: token.id,
          },
          include: {
            event: true,
            participant: true,
          },
        });

        if (!result) {
          throw Error("Error to fetch data");
        }

        res.status(200).json({
          status: "OK",
          message: "Success to fetch transaction data",
          data: result,
        });
      } catch (e) {
        console.log("ERROR", e);
        res
          .status(500)
          .json({ status: "FAILED", message: "Internal server error" });
      }

      break;
    case "POST":
      const { body: data } = req;
      try {
        const transactionResult = await prismaPromise.transaction.create({
          data: {
            user_id: token.id,
            event_id: data.event_id,
            status: "booked",
          },
        });

        if (transactionResult) {
          const participantData = data.participants.map((participant) => {
            return {
              name: participant.name,
              email: participant.email,
              phone: participant.phone,
              transaction_id: transactionResult.id,
            };
          });
          const participantResult = await prismaPromise.participant.createMany({
            data: participantData,
          });

          res.status(200).json({
            status: "OK",
            message: "Success to create transaction data",
            data: transactionResult,
          });
        } else {
          res
            .status(500)
            .json({ status: "FAILED", message: "Internal server error" });
        }
      } catch (e) {
        console.log("ERROR", e);
        res
          .status(500)
          .json({ status: "FAILED", message: "Internal server error" });
      }
      break;
    default:
      res.status(404).json({ status: "FAILED", message: "Not Found" });
  }
}
