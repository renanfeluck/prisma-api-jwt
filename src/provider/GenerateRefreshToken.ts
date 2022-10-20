import { client } from "../prisma/client";

import dayjs from "dayjs";

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "second").unix();
    const geneateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return { geneateRefreshToken };
  }
}

export { GenerateRefreshToken };
