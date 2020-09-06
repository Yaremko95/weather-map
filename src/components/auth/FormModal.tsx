import React from "react";
export interface ISubmitResult {
  email: string;
  password: string;
}
interface MyEventTarget extends EventTarget {
  value: string;
}

interface MyFormEvent<T> extends React.FormEvent<T> {
  target: MyEventTarget;
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  onChange?: React.EventHandler<MyFormEvent<HTMLInputElement>>;
}
interface EnrichedChildren {
  onChange: React.EventHandler<MyFormEvent<HTMLInputElement>>;
  value?: ISubmitResult;
  children?: React.ReactNode;
  name: string;
}

const FormModal = (children: JSX.Element[] | JSX.Element) => {
  const [credentials, setCredentials] = React.useState<any>({});
  return React.Children.map(children, (child) => {
    if (!React.isValidElement<EnrichedChildren>(child)) {
      return child;
    }

    let elementChild: React.ReactElement<EnrichedChildren> = child;

    return React.cloneElement(elementChild, {
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setCredentials({
          ...credentials,
          [child.props.name]: e.currentTarget.value,
        }),
      value: credentials[child.props.name],
    });
  });
};
// function FormModal(props: { children: JSX.Element[] | JSX.Element }) {
//   const [credentials, setCredentials] = React.useState<
//     ISubmitResult | {}
//   >(
//       {}
//   );
//
//   return (
//     <>
//       {React.Children.map(props.children, (input:any) => {
//           let elementChild: React.ReactElement<EnrichedChildren> = input
//           React.cloneElement(elementChild, {
//                 onChange: () => {},
//               value: credentials[input.props.name],
//
//         }
//       })
//
//         React.cloneElement(input as React.ReactElement<Input>, {
//           value: credentials ? credentials[input.props.name],
//           onChange: (e) =>
//             setCredentials({
//               ...credentials,
//               [input.props.name]: e.currentTarget.value,
//             }),
//         })
//       )}
//
//       <LoginButton {...props.button} onClick={handleLogin} />
//       <BreakLine />
//       <LoginFbButton
//         value="Sign up with Facebook"
//         from={{ background: "rgba(59, 89, 153, 1)", color: "white" }}
//         to={{ background: "rgba(59, 89, 153, 1)", color: "white" }}
//       />
//     </>
//   );
// }

// export default ModalForm;
export default FormModal;
