"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const classes = `container-class ${
    pathName.includes("register") ? "sign-up" : "sign-in"
  }`;
  return (
    <div className={classes}>
      <div className="row">
        {pathName.includes("register") && <div className="col"></div>}
        <div
          className={`col flex flex-col items-center justify-center ${
            pathName.includes("register") ? "sign-up" : "sign-in"
          }`}
        >
          <div className="font-bold text-xl my-10 border-b border-b-yellow">
            Start Your Trek Registration Process
          </div>
          {children}
        </div>
        {pathName.includes("signin") && <div className="col"></div>}
      </div>
      <div className="content-row row">
        <div className="col items-center content-center justify-center flex text-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up mt-0">
            {pathName.includes("register") && (
              <h2 className="">
                New to indiahikes? <span>Register here</span>
              </h2>
            )}
          </div>
        </div>
        <div className="col items-center content-center justify-center text-center flex flex-col">
          <div className="text sign-in">
            {pathName.includes("signin") && (
              <>
                <h2 className="md:pl-24">Registered Trekker</h2>
                <div className="text-sm text-zinc-300 text-wrap px-10 mt-8 text-center">
                  <span className="text-red-900">Important:</span> We have
                  shifted to a new dashboard. If you are a registered trekker,
                  please use your existing email id and click &quot;forgot
                  password.&quot; We will re-authenticate your account. If you
                  are a new user, please create a new account
                </div>
              </>
            )}
          </div>
          <div className="img sign-in"></div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
