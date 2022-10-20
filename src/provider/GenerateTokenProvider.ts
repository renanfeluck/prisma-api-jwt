import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign(
      { name: userId },
      "38b9405d-70c7-4ba0-8c9d-9b42cc1a067d",
      {
        subject: userId,
        expiresIn: "20s",
      }
    );

    return token;
  }
}

export { GenerateTokenProvider };
