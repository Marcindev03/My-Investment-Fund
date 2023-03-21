import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../Button";
import { FormControl } from "../FormControl";
import { Input } from "../Input";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants";

type LoginFormProps = {
  isLoading?: boolean;
  focusFirstField?: boolean;
  onSubmit: (email: string, password: string) => void;
};

export const LoginForm: FC<LoginFormProps> = ({
  focusFirstField,
  isLoading,
  onSubmit,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (focusFirstField) {
      emailRef.current?.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (isEmailValid && isPasswordValid) {
      onSubmit(email, password);
    }
  };

  const isEmailValid = useMemo(
    () => !!email.length && EMAIL_REGEX.test(email),
    [email]
  );
  const isPasswordValid = useMemo(
    () => !!password.length && PASSWORD_REGEX.test(password),
    [password]
  );

  return (
    <div className="w-full lg:w-4/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
        <div className="rounded-t mb-0 px-6 py-6">
          <div className="text-center mb-3">
            <h6 className="text-blueGray-500 text-sm font-bold">
              Sign in with
            </h6>
          </div>
          <div className="btn-wrapper text-center">
            <button
              className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
              Github
            </button>
            <button
              className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
              Google
            </button>
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="text-blueGray-400 text-center mb-3 font-bold">
            <small>Or sign in with credentials</small>
          </div>
          <div>
            <FormControl
              labelTitle="Email"
              isInvalid={!isEmailValid}
              errorMessage="Email is not correct"
            >
              <Input value={email} onChange={setEmail} placeholder="Email" />
            </FormControl>
            <FormControl
              labelTitle="Password"
              isInvalid={!isPasswordValid}
              errorMessage="Password is not correct"
            >
              <Input
                value={password}
                onChange={setPassword}
                placeholder="Password"
              />
            </FormControl>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                <span className="ml-2 text-sm font-semibold text-blueGray-600">
                  Remember me
                </span>
              </label>
            </div>

            <div className="text-center mt-6">
              <Button primary onClick={handleSubmit} isLoading={isLoading}>
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* TODO register and forgot password */}
      {/* <div className="flex flex-wrap mt-6 relative">
        <div className="w-1/2">
          <a
            href=""
            onClick={(e) => e.preventDefault()}
            className="text-blueGray-200"
          >
            <small>Forgot password?</small>
          </a>
        </div>
        <div className="w-1/2 text-right">
          <Link href="/auth/register" className="text-blueGray-200">
            <small>Create new account</small>
          </Link>
        </div>
      </div> */}
    </div>
  );
};
