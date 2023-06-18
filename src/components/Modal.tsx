import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Card, Grid, Select, SelectItem } from "@tremor/react";
import { postIndirect, postDirect } from "../Context";

type Props = {
  isOpen: any;
  closeModal: any;
};

interface ICategory {
  category: string;
}

interface IRawItems {
  id: string;
  name: string;
  category: string;
}

const rawItems: IRawItems[] = [
  {
    id: "r1",
    name: "Peanuts",
    category: "direct",
  },
  {
    id: "r2",
    name: "Honey",
    category: "direct",
  },
  {
    id: "r3",
    name: "Chocolate",
    category: "direct",
  },
  {
    id: "r4",
    name: "Rental",
    category: "indirect",
  },
  {
    id: "r5",
    name: "Bills",
    category: "indirect",
  },
  {
    id: "r6",
    name: "Shopping",
    category: "indirect",
  },
];

const Modal = ({ isOpen, closeModal }: Props) => {
  const [itemCat, setItemCat] = useState<string>("");
  const [inputValues, setInputValues] = useState({
    category: itemCat,
    unit: "",
    quantity: 1,
    unitPrice: 1.0,
    cashFlowId: 2,
  });
  const [inputValues2, setInputValues2] = useState({
    category: "indirect",
    price: 0.0,
    cashFlowId: 3,
    receiptId: 4,
  });

  console.log(inputValues, "iv1");
  console.log(inputValues2, "iv2")

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-screen-md max-h-max transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Outflow
                  </Dialog.Title>
                  <div className="flex mt-2 mb-16 ">
                    <p className="text-sm text-gray-500">Choose an item</p>
                    <div className="max-w-sm mx-auto space-y-6">
                      <Select>
                        {rawItems.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.name}
                            onClick={() => (
                              setItemCat(item.category),
                              console.log(item.category)
                            )}
                            onChange={(e) =>
                                //@ts-ignore
                                setInputValues((prevValues) => ({
                                  ...prevValues,
                                  //@ts-ignore
                                  category: e.target.value, 
                                }))
                              }
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-center bg-slate-50 p-8">
                    <Grid numItemsMd={1} numItemsLg={1}>
                      {itemCat === "direct" ? (
                        <>
                          <div className="flex flex-row p-4">
                            <div className="">unit</div>
                            <input
                              type="text"
                              id="unit"
                              value={inputValues.unit}
                              onChange={(e) =>
                                //@ts-ignore
                                setInputValues((prevValues) => ({
                                  ...prevValues,
                                  unit: e.target.value,
                                }))
                              }
                              placeholder={`Enter a value`}
                              className="w-40 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div className="flex flex-row p-4">
                            <div>unit price (RM)</div>
                            <input
                              type="number"
                              id="unitPrice"
                              value={inputValues.unitPrice}
                              onChange={(e) =>
                                //@ts-ignore
                                setInputValues((prevValues) => ({
                                  ...prevValues,
                                  unitPrice: e.target.value,
                                }))
                              }
                              placeholder={`Enter a value`}
                              className="w-40 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div className="flex flex-row p-4">
                            <div>quantity</div>
                            <input
                              type="number"
                              id="quantity"
                              value={inputValues.quantity}
                              onChange={(e) =>
                                //@ts-ignore
                                setInputValues((prevValues) => ({
                                  ...prevValues,
                                  quantity: e.target.value,
                                }))
                              }
                              placeholder={`Enter a value`}
                              className="w-40 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-row p-4">
                            <div>price</div>
                            <input
                              type="number"
                              id="price"
                              value={inputValues2.price}
                              onChange={(e) =>
                                //@ts-ignore
                                setInputValues2((prevValues) => ({
                                  ...prevValues,
                                  price: e.target.value,
                                }))
                              }
                              placeholder={`Enter a value`}
                              className="w-40 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </>
                      )}
                    </Grid>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={
                        itemCat === "direct"
                          ? () =>
                              postDirect(
                                inputValues.category,
                                inputValues.unit,
                                inputValues.quantity,
                                inputValues.unitPrice,
                                inputValues.cashFlowId
                              )
                          : () =>
                              postIndirect(
                                inputValues2.category,
                                inputValues2.price,
                                inputValues2.cashFlowId,
                                inputValues2.receiptId
                              )
                      }
                    >
                      Submit
                    </button>
                  </div>

                  

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
