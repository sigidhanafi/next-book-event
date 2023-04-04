import prismaPromise from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { method, query, body: data } = req;

  switch (method) {
    case "POST":
      try {
        const { email, password } = data;
        if (email === "" || password === "") {
          throw Error("validation error");
        }

        const result = await prismaPromise.user.create({ data: data });

        res.status(200).json({ status: "OK", message: "Success register" });
      } catch (e) {
        if (e == "Error: validation error") {
          res.status(200).json({
            status: "FAILED",
            message: "Email & password should not empty",
          });
        } else {
          res
            .status(500)
            .json({ status: "FAILED", message: "Internal server error" });
        }
      }

      break;
    default:
      res.status(404).json({ status: "FAILED", message: "not found" });
  }
}
