import { getToken } from "next-auth/jwt";
import prismaPromise from "../../../lib/prisma";
import { formatToHumanDate } from "../../../lib/formatter";

export default async function handler(req, res) {
  const {
    method,
    query: { page: currentPage },
  } = req;

  switch (method) {
    case "GET":
      try {
        // number of item
        const take = 1;

        // set default page
        const page = currentPage ? currentPage : 1;

        // get count of all item
        const count = await prismaPromise.event.count();
        const hasNext = count > page * take;

        const result = await prismaPromise.event.findMany({
          skip: (page - 1) * take,
          take: take,
        });

        const data = result.map((event) => {
          return {
            id: event.id,
            name: event.name,
            location: event.location,
            date: formatToHumanDate(event.date),
            ownerId: event.owner_id,
          };
        });

        res.status(200).json({
          status: "OK",
          message: "Success to fetch data",
          data: data,
          hasNext: hasNext,
        });
      } catch (e) {
        console.log("ERROR", e);
        res.status(500).json({
          status: "FAILED",
          message: "Internal error",
          data: [],
        });
      }
      break;

    case "POST":
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

      const data = req.body;
      try {
        const result = await prismaPromise.event.create({
          data: {
            ...data,
            owner_id: token.id,
            date: new Date(data.date),
            description: "",
          },
        });

        if (!result) {
          throw new Error("Error save data");
        }

        res.status(200).json({ status: "OK", message: "Success added" });
      } catch (e) {
        console.log("ERROR Add Event", e);
        res.status(500).json({
          status: "FAILED",
          message: "Internal server error",
        });
      }
      break;
    default:
      res.status(404);
      break;
  }
}
