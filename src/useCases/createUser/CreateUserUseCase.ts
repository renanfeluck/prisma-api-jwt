import { client } from "../../prisma/client";

import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  password: string;
  username: string;
  email: string;
}

class CreateUserUseCase {
  async execute({ name, username, password, email }: IUserRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const emailAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Email already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
        email,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
