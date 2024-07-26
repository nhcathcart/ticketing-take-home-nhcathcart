"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "@/actions";

//constants
const schema = z.object({
  email: z.string().email({ message: "A valid email address is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginData = z.infer<typeof schema>;

const inputStyles = "border rounded px-2 py-1";
const inputParentStyles = "flex flex-col gap-1";
const inputLabelStyles = "text-xs font-[400] ml-1";
const inputErrorStyles = " text-xs text-red-500 ml-1";

export function LoginForm() {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginData) => {
    const res = await signIn(data);
    if (res === "bad credentials") {
      setWrongCredentials(true);
    }
  };

  return (
    <>
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:px-12 md:py-10 border shadow rounded-md w-full px-2 py-6 md:max-w-[500px] gap-6 "
      >
        <h3 className="w-full text-center font-[500] text-xl mb-4">Login</h3>
        <div className={inputParentStyles}>
          <label className={inputLabelStyles} htmlFor="login-email">
            Email:
          </label>
          <input
            id={"login-email"}
            autoComplete="email"
            {...register("email")}
            className={inputStyles}
            placeholder="johndoe@domain.com"
          />
          {errors.email && (
            <span className={inputErrorStyles}>{errors.email.message}</span>
          )}
        </div>
        <div className={inputParentStyles}>
          <label className={inputLabelStyles} htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            {...register("password")}
            className={inputStyles}
            type="password"
            autoComplete="current-password"
            placeholder="password"
          />
          {errors.email && (
            <span className={inputErrorStyles}>{errors.email.message}</span>
          )}
        </div>
        {wrongCredentials && (
          <span
            id="bad-credentials-message"
            className={inputErrorStyles}
            style={{ width: "100%", textAlign: "center" }}
          >
            Wrong email or password. Try again.
          </span>
        )}

        <div className="w-full flex justify-center mt-6">
          <button
            id="login-submit"
            type="submit"
            disabled={isSubmitting}
            className="bg-primary w-fit px-6 py-3 rounded-md hover:bg-secondary hover:text-white transform transition-all shadow"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
