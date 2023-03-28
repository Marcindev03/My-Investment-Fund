import { generatePassword } from "helpers";
import { FC, useMemo, useState } from "react";
import { Button, FormControl, Input } from "ui";
import { EMAIL_REGEX } from "ui/constants";
import { useCopyToClipboard } from "usehooks-ts";

type ClientFormProps = {
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  onReject: () => void;
};

export const ClientForm: FC<ClientFormProps> = ({ onSubmit, onReject }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(generatePassword());

  const [value, copy] = useCopyToClipboard();

  const handleFormSubmit = () => {
    if (isFirstNameValid && isLastNameValid && isEmailValid) {
      onSubmit(firstName, lastName, email, password);
    }
  };

  const isFirstNameValid = useMemo(
    () => !!firstName.length && firstName.length >= 3,
    [firstName]
  );
  const isLastNameValid = useMemo(
    () => !!lastName.length && lastName.length >= 3,
    [lastName]
  );
  const isEmailValid = useMemo(
    () => !!email.length && EMAIL_REGEX.test(email),
    [email]
  );

  return (
    <form className="flex-col" onSubmit={(e) => e.preventDefault()}>
      <FormControl
        isInvalid={!isFirstNameValid}
        errorMessage="First Name must be at least 3 charachters length"
        labelTitle={"First Name"}
      >
        <Input
          value={firstName}
          onChange={setFirstName}
          placeholder="Enter first name"
        />
      </FormControl>
      <FormControl
        isInvalid={!isLastNameValid}
        errorMessage="Last Name must be at least 3 charachters length"
        labelTitle={"First Name"}
      >
        <Input
          value={lastName}
          onChange={setLastName}
          placeholder="Enter last name"
        />
      </FormControl>
      <FormControl
        isInvalid={!isEmailValid}
        errorMessage="Email is invalid"
        labelTitle={"Email"}
      >
        <Input value={email} onChange={setEmail} placeholder="Enter email" />
      </FormControl>
      <FormControl labelTitle={"Password"}>
        <div className="flex items-center justify-center">
          <Input
            value={password}
            onChange={() => {}}
            placeholder="Enter email"
          />
          <div className="ml-6">
            <Button primary onClick={() => copy(password)}>
              Copy
            </Button>
          </div>
        </div>
      </FormControl>
      <section className="flex items-center justify-end pt-6 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={onReject}
        >
          Close
        </button>
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handleFormSubmit}
        >
          Save
        </button>
      </section>
    </form>
  );
};
