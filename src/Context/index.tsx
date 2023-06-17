import React, { useState, createContext, useEffect } from "react";

type DataContextType = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

export const DataContext = createContext<any>(null);

//function to fetch API

export async function getCashflows() {
  const res = await fetch("http://192.168.0.115:8080/api/purchases");
  const result = await res.json();
  console.log(result, "result dlm fc");
  if (result.isError) {
    throw new Error(result.errorMessage);
  }
  if (result) {
    return result;
  } else {
    return [];
  }
}

const fileInput = document.querySelector("#fileInput") as HTMLInputElement;
const formdata = new FormData();
if (fileInput && fileInput.files) {
    formdata.append("ikea1", fileInput.files[0], "src/assets/ikea1.png");
  }

const requestOptions: {
  method: string;
  body: FormData;
  redirect: RequestRedirect;
} = {
  method: "POST",
  body: formdata,
  redirect: "follow",
};

export async function postOCR() {
  const res = await fetch(
    "http://192.168.0.100/ocr-impacthack/scan_receipt.php",
    requestOptions
  );
  console.log(res, "ocr")
  const result = await res.json();
  console.log(result, "resut")
  if (result.isError) {
    throw new Error(result.errorMessage);
  }
  if (result) {
    return result;
  } else {
    return [];
  }
}

export const DataProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
    //   const res = await getCashflows();
      const resOCR = await postOCR();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ isLoading, data, setData }}>
      {props.children}
    </DataContext.Provider>
  );
};
