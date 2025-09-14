import React, { useState } from "react"
import { View, Pressable } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  Input } from "@/components/ui/input" 
import {  Card } from "@/components/ui/card" 
import { Text } from "@/components/ui/text"

// Schema
const signInSchema = z.object({
  identifier: z.string().min(1, "Email/Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { identifier: "", password: "" },
  })

  const onSubmit = async (data: SignInForm) => {
    setIsSubmitting(true)
    console.log("Form Data:", data)

    // 🔹 Replace with your API call to Next.js backend
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
  }

  return (
    <View className="flex-1 bg-black items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 bg-gray-900/70 border border-cyan-500/30 rounded-2xl">
        <Text className="text-3xl font-bold text-white text-center ">Welcome Back</Text>

        {/* Identifier Field */}
        <Controller
          control={control}
          name="identifier"
          render={({ field: { onChange, value, onBlur } }) => (
            <View className="flex-col gap-2">
               <Text className="text-white text-md font-medium">Email/Username</Text>

              <Input
                label="Email/Username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your email or username"
                error={errors.identifier?.message}
                className="bg-gray-800 text-white border-cyan-500 text-sm"
              />
              {errors.identifier && <Text className="text-red-400 mt-1">{errors.identifier.message}</Text>}
            </View>
          )}
        />

        {/* Password Field */}
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
          <Text className="text-white text-center text-md">Sign In</Text>
        </Pressable>
      </Card>
    </View>
  )
}
