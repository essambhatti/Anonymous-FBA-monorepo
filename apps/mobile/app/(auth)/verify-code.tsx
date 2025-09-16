import React, { useState } from "react"
import { View, Pressable } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  Input } from "@/components/ui/input" 
import {  Card } from "@/components/ui/card" 
import { Text } from "@/components/ui/text"
import { useRouter } from "expo-router"
import {verifySchema} from "../../../web/src/schemas/verifySchema"
import { verify } from "@/lib/verify"

type SignUpForm = z.infer<typeof verifySchema>

export default function VerifyScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(verifySchema),
    defaultValues: {  code: "" },
  })

 const onSubmit = async (values : any) => {
  try {
    const result = await verify(values.code)
    console.log("Verified :", result)
    router.replace("/signin")
  } catch (err: any ) {
    console.error("Verification failed:", err.message)
  }
}


  return (
    <View className="flex-1 bg-black items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 bg-gray-900/70 border border-cyan-500/30 rounded-2xl">
        <Text className="text-3xl font-bold text-white text-center ">Email Verification</Text>

        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, value, onBlur } }) => (
            <View className="flex-col gap-2">
               <Text className="text-white text-md font-medium">Code</Text>

              <Input
                label="Code"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="123456"
                error={errors.code?.message}
                className="bg-gray-800 text-white border-cyan-500 text-sm"
                keyboardType="email-address"
              />
              {errors.code&& <Text className="text-red-400 mt-1">{errors.code.message}</Text>}
            </View>
          )}
        />



        {/* Submit Button */}
        <Pressable
        className=" bg-blue-500 w-full rounded-md p-2"
           onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text className="text-white text-center text-md">Verify</Text>
        </Pressable>
      </Card>
    </View>
  )
}
