/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, test } from "vitest";
import { z } from "zod";
import { Flatten, ZodAlias } from "./flatten.ts";
import { invalid } from "moment";

// todo:
// Objekt
// TypeScript
// Username definieren und refinen
// Fehlermeldung mit max
// safeParse mit Fehlern

type TUser = {
  version: string;
  name: string;
  mail: string;
  username: string;
  nickname?: string | null;
};

type SuccessResponse = {
  success: true;
  data: string;
};

type FailureResponse = {
  success: false;
  error: any;
};

type A = {
  a: string;
};

type B = A & {
  a: number;
};

const b: B = {};

type TUser_v1 = {
  version: "v1";
  name: string;
  mail: string;
};

type TUser_v2 = {
  version: "v2";
  name: string;
  email: string;
};

type TUser_v3 = {
  version: "v3";
  name: string;
  city: string;
};

type TUserResponse = TUser_v1 | TUser_v2 | TUser_v3;

// Tagged Union Type

function ccc(a: string | number) {
  if (typeof a === "number") {
    fail();
  }
}

function fail(): never {
  throw new Error("number ist nicht mehr erlaubt.");
}

function bbb(user: TUserResponse) {
  switch (user.version) {
    case "v1":
      return user.mail.toUpperCase();
    case "v2":
      return user.email.toUpperCase();
  }

  handleInvalidUserResponse(user);
}

function handleInvalidUserResponse(invalidUser: never): never {
  throw new Error("....");
}

type Yes = "yes";
type No = "no";

type IsAddressValid = "true" | "false" | "unknown";

function sayYes(y: IsAddressValid) {}

sayYes("no");

type TFehler = {
  name: string;
  error: string;
};

type GetUserResponse = TUser | TFehler | string;
function a(response: GetUserResponse) {
  if (typeof response === "string") {
    // Type Guard
    response.toUpperCase();
  } else if ("username" in response) {
    // Type Guard
    response.mail;
  } else {
    response.error;
  }
}

// type TUser = {
//   version: string;
//   name: string;
//   mail: string;
//   username: string;
//   nickname?: string | null;
// };

const FehlerSchema = z.object({
  error: z.string()
});

const AddressSchema = z.object({
  city: z.string()
});

const UsernameSchema = z
  .string()
  .max(5, {
    message: "Username darf max. fünf Zeichen lang"
  })
  .refine(u => u.startsWith("u"), { message: "Username muss mit u anfangen" });

const UserSchema = z.object({
  address: AddressSchema,
  name: z.string(),
  mail: z.string().email(),
  username: UsernameSchema,
  nickname: z.string().nullish()
});

const UserResponseSchema = z.union([FehlerSchema, UserSchema]);

type TUserResponseSchema = z.infer<typeof UserResponseSchema>;

type User = z.infer<typeof UserSchema>;

const u: User = {
  name: "Klaus",
  mail: "hello@example.com",
  username: "u1"
};

showUser(u);

function showUser(u: User) {
  console.log(u);
}

async function loadUser() {
  const response = await fetch("http://userapi.de");
  const data = await response.json();
  return data;
}

test("...", async () => {
  const A = z.object({
    plz: z.number().max(5)
  });

  A.parse({
    plz: 12345
  });

  // const u = {
  //   name: "Klaus",
  //   mail: "hello@example.com",
  //   username: "u12345678"
  // };
  // UserSchema.parse(u);
});
