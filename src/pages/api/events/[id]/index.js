import prismaPromise from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { query, method, body: data } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        const result = await prismaPromise.event.findUnique({
          where: { id: id },
        });

        res.status(200).json({ status: "OK", message: "Success fetch data" });
      } catch (e) {
        res.status(500).json({
          status: "FAILED",
          message: "Internal server error",
        });
      }
      break;

    case "POST":
      try {
        const result = await prismaPromise.event.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name: data.name,
            location: data.location,
            date: new Date(data.date),
          },
        });

        res
          .status(200)
          .json({ status: "OK", message: "Success to update", data: result });
      } catch (e) {
        res
          .status(500)
          .json({ status: "FAILED", message: "Failed to update", data: null });
      }
      break;

    case "DELETE":
      try {
        const result = await prismaPromise.event.delete({
          where: {
            id: parseInt(id),
          },
        });

        res.status(200).json({ status: "OK", message: "Success Delete" });
      } catch (e) {
        console.log("ERROR", e);
        res.status(500).json({ status: "FAILED", message: "Failed Delete" });
      }
      break;
  }
}
