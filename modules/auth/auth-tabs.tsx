"use client";

import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import {
  SigninResponse,
  SignupResponse,
} from "@/utils/validators/auth.validator";
import { Spinner } from "@/components/ui/spinner";
import { FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { signup } from "@/actions/auth/signup";
import { signin } from "@/actions/auth/signin";

export default function AuthTabs() {
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signinFormData, setSigninFormData] = useState({
    email: "",
    password: "",
  });
  const [isSigningup, setIsSigningup] = useState<boolean>(false);
  const [isLoggingin, setIsLoggingin] = useState<boolean>(false);
  const [signupErrors, setSignupErrors] = useState<SignupResponse["errors"]>(
    {}
  );
  const [signinErrors, setSigninErrors] = useState<SigninResponse["errors"]>(
    {}
  );
  const [signupErrorMessage, setSignupErrorMessage] = useState<string>("");
  const [signinErrorMessage, setSigninErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleSignup = async () => {
    setIsSigningup(true);

    try {
      const result = await signup(signupFormData);
      if (!result.success) {
        setSignupErrorMessage(result.message);
        if (result.errors) {
          setSignupErrors(result.errors);
        }
        setIsSigningup(false);
        return;
      }
      toast.success(result.message);
      setSignupErrorMessage("");
      setSignupErrors({});
      setSignupFormData({ name: "", email: "", password: "" });
      router.replace("/admin");
    } finally {
      setIsSigningup(false);
    }
  };

  const handleSignin = async () => {
    setIsLoggingin(true);

    try {
      const result = await signin(signinFormData);
      if (!result.success) {
        setSigninErrorMessage(result.message);
        if (result.errors) {
          setSigninErrors(result.errors);
        }
        setIsLoggingin(false);
        return;
      }
      toast.success(result.message);
      setSigninErrorMessage("");
      setSigninErrors({});
      setSigninFormData({ email: "", password: "" });
      router.replace("/admin/blogs");
    } finally {
      setIsLoggingin(false);
    }
  };
  return (
    <div
      inert={isSigningup || isLoggingin}
      className="flex items-center justify-center min-h-screen bg-white p-4"
    >
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signinFormData.email}
                  onChange={(e) =>
                    setSigninFormData({
                      ...signinFormData,
                      email: e.target.value,
                    })
                  }
                />
                {signinErrors?.properties?.email && (
                  <FieldError>{signinErrors.properties.email[0]}</FieldError>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={signinFormData.password}
                  onChange={(e) =>
                    setSigninFormData({
                      ...signinFormData,
                      password: e.target.value,
                    })
                  }
                />
                {signinErrors?.properties?.password && (
                  <FieldError>{signinErrors.properties.password[0]}</FieldError>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 items-start">
              {signinErrorMessage && (
                <FieldError>{signinErrorMessage}</FieldError>
              )}
              <Button
                className="w-full"
                onClick={handleSignin}
                disabled={isLoggingin}
              >
                {isLoggingin ? <Spinner /> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupFormData.name}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      name: e.target.value,
                    })
                  }
                />
                {signupErrors?.properties?.name && (
                  <FieldError>{signupErrors.properties.name[0]}</FieldError>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signupFormData.email}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      email: e.target.value,
                    })
                  }
                />
                {signupErrors?.properties?.email && (
                  <FieldError>{signupErrors.properties.email[0]}</FieldError>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupFormData.password}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
                      password: e.target.value,
                    })
                  }
                />
                {signupErrors?.properties?.password && (
                  <FieldError>{signupErrors.properties.password[0]}</FieldError>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 items-start">
              {signupErrorMessage && (
                <FieldError>{signupErrorMessage}</FieldError>
              )}
              <Button
                onClick={handleSignup}
                className="w-full"
                disabled={isSigningup}
              >
                {isSigningup ? <Spinner /> : "Sign up"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
