import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
console.log("Received username:", username);
console.log("Received code:", code);


    // const decodedUsername = decodeURIComponent(username);
    console.log("decoded user")

    const user = await UserModel.findOne({
      username: username,
    });
    console.log("Finding in Database")
    if (!user) {
      console.log("user not found")
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }
    console.log("checking code")
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      console.log("User verified")
      return Response.json(
        {
          success: true,
          message: "Account Verifed",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      console.log("Code expired")
      return Response.json(
        {
          success: false,
          message: "Verification code expired sign in again to get a new code",
        },
        {
          status: 400,
        }
      );

    } else {
      console.log("Incorrect code")
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
