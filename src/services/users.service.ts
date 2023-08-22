import { Prism, authenticateUserPayload, createUserPayload, iUsersService } from "../../types";

export default class UserService implements iUsersService {
  _prisma: Prism;
  constructor(prisma: Prism) {
    this._prisma = prisma;
  }

  async createUser({
    email,
    username,
    password,
    role = "USER",
  }: createUserPayload) {
    const res = await this._prisma.users.create({
      data: {
        email,
        password,
        username,
        role,
      },
    });

    return res;
  }

  async authenticateUser({
    email,
    password,
  }: authenticateUserPayload) {
    const user = await this._prisma.users.findFirst({
      where: {
        email,
        password,
      },
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
        username: true
      },
    });
    if (!user) {
      throw new ErrorNotFound("User not found");
    }

    return user;
  }
}

class ErrorNotFound extends Error {
  code: number = 404;
  constructor(message: string) {
    super(message);
    this.name = "notfound";
  }
}
