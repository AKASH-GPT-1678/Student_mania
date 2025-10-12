import React, { createContext, useState,  } from "react";


interface BrandContextType {
  brandCode: string;
  brandPassword: string;
  setBrandCode: (code: string) => void;
  setBrandPassword: (password: string) => void;
  is_Brand : boolean,
  setIs_Brand : (is_Brand : boolean) => void
}


export const BrandContext = createContext<BrandContextType>({
  brandCode: "",
  brandPassword: "",
  setBrandCode: () => {},
  setBrandPassword: () => {},
  is_Brand : false,
  setIs_Brand : () => {}
});


export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandCode, setBrandCode] = useState("");
  const [brandPassword, setBrandPassword] = useState("");
  const [is_Brand, setIs_Brand] = useState(false);

  return (
    <BrandContext.Provider value={{ brandCode, brandPassword, setBrandCode, setBrandPassword , is_Brand , setIs_Brand }}>
      {children}
    </BrandContext.Provider>
  );
};
