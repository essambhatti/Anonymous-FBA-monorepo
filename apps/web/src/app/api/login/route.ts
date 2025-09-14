import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/dbConnect"
import User from "@/model/User"

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { identifier, password } = await req.json()

    // 🔍 Find user by email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 🔑 Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // 🎟️ Generate JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
