import React, { useState } from "react"
import { View, Pressable } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  Input } from "@/components/ui/input" 
import {  Card } from "@/components/ui/card" 
import { Text } from "@/components/ui/text"
import { Link, useRouter } from "expo-router"
import {signUpSchema} from "../../../../apps/web/src/schemas/signupSchema"
import { Signup } from "@/lib/signup"

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUpScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "",email : "", password: "" },
  })

 const onSubmit = async (values : any) => {
  try {
    const result = await Signup(values.username, values.email, values.password)
    console.log("Signed Up :", result)
    router.replace("/verify-code")
  } catch (err: any ) {
    console.error("Sign Up failed:", err.message)
  }
}


  return (
    <View className="flex-1 bg-black items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 bg-gray-900/70 border border-cyan-500/30 rounded-2xl">
        <Text className="text-3xl font-bold text-white text-center ">Join Anonymous Feedback</Text>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value, onBlur } }) => (
            <View className="flex-col gap-2">
               <Text className="text-white text-md font-medium">Username</Text>

              <Input
                label="Username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your username"
                error={errors.username?.message}
                className="bg-gray-800 text-white border-cyan-500 text-sm"
                keyboardType="email-address"
              />
              {errors.username && <Text className="text-red-400 mt-1">{errors.username.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <View className="flex-col gap-2">
               <Text className="text-white text-md font-medium">Email</Text>

              <Input
                label="Username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your email"
                error={errors.email?.message}
                className="bg-gray-800 text-white border-cyan-500 text-sm"
                keyboardType="email-address"
              />
              {errors.email && <Text className="text-red-400 mt-1">{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <View className="flex-col gap-2">
                <Text className="text-white text-md font-medium">Password</Text>

              <Input
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your password"
                secureTextEntry
                error={errors.password?.message}
                className="bg-gray-800 text-white border-cyan-500 text-sm"
                keyboardType="default"
              />
              {errors.password && <Text className="text-red-400 mt-1">{errors.password.message}</Text>}
            </View>
          )}
        />

        {/* Submit Button */}
        <Pressable
        className=" bg-blue-500 w-full rounded-md p-2"
           onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text className="text-white text-center text-md">Sign Up</Text>
        </Pressable>
         <View className="flex flex-row items-center justify-center gap-2">
                  <Text className="text-muted-foreground text-sm text-center">
                    Dont have an Account?
                  </Text>
                  <Link href="/signin">
                    <Text className="text-sm text-center underline text-blue-500">Sign In</Text>
                  </Link>
                </View>
      </Card>
    </View>
  )
}
