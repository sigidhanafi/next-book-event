import prismaPromise from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { method, body: data } = req;

  switch (method) {
    case "POST":
      try {
        const result = await prismaPromise.user.findFirst({
          where: { email: data.email, password: data.password },
        });

        if (result == null) {
          res
            .status(200)
            .json({ status: "OK", message: "Failed login", data: result });
        } else {
          res
            .status(200)
            .json({ status: "OK", message: "Success login", data: result });
        }
      } catch (e) {
        console.log("ERROR Login API", e);
        res
          .status(500)
          .json({ status: "FAILED", message: "Internal server error" });
      }
      break;
    default:
      res.status(404).json({ status: "FAILED", message: "Not found" });
      break;
  }
}
