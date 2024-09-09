import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  weight: string;
  height: string;
  phoneNumber: string;
  city: string;
  companyOrCollege: string;
  designation?: string;
  referrerEmail?: string;
};

// Path to the usersData.json file
const filePath = path.join(process.cwd(), "app", "usersData.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      weight,
      height,
      phoneNumber,
      city,
      companyOrCollege,
      designation,
      referrerEmail,
    } = req.body;

    // Read usersData.json file
    const fileData = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(fileData);

    // Check if the user already exists
    const existingUser = users.find((user: User) => user.email === email);

    if (existingUser) {
      // Email already exists
      res.status(400).json({ error: "Email already exists" });
    } else {
      // Add the new user to usersData
      const newUser = {
        email,
        password,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        weight,
        height,
        phoneNumber,
        city,
        companyOrCollege,
        designation,
        referrerEmail,
      };
      users.push(newUser);

      // Save the updated usersData.json
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

      // Send success response
      res.status(200).json({ message: "Account created successfully" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
