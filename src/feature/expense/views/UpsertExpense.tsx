import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { IUpsertExpense } from "../interface/interface";
import { DatePickerIcon } from "@/components/DatePickerIcon";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import NumberSeparator from "@/utils/NumberSeprator";
import { convertNumberToWords } from "../helper/controller";
import NumericInput from "@/components/NumericInput/NumericInput";
import PlusIcon from "@/app/assets/icons/PlusIcon";
import convertPersianToEnglish from "@/utils/ConvertPersianToEnglish";

const UpsertExpense = ({
  isOpenUpsert,
  onOpenChangeUpsert,
  errors,
  getValues,
  setValue,
  onSubmitForm,
  handleSubmit,
  category,
  subCategory,
}: IUpsertExpense) => {
  console.log(getValues());
  console.log("errors:", errors);
  return (
    <Modal
      isOpen={isOpenUpsert}
      placement="bottom"
      onOpenChange={onOpenChangeUpsert}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((handleSubmitData) => {
                  onSubmitForm(e);
                })();
              }}
            >
              <ModalHeader className="flex flex-col gap-1">
                {getValues("id") != "" ? "ویرایش هزینه" : "افزودن هزینه"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap mb-4 gap-y-3">
                  <div className="w-full xl:w-4/12 xl:pl-4">
                    <div className="text-xs text-gray-500">
                      {Number(getValues("price")) > 0
                        ? convertNumberToWords(Number(getValues("price")))
                        : ""}
                    </div>
                    {/* <NumericInput
                      onChange={(e: any) => {
                        console.log(e.target.value);
                        setValue("price", e.target.value, {
                          shouldValidate: true,
                        });
                      }
                    /> */}
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder=""
                      label="قیمت"
                      className="w-full mt-2"
                      value={getValues("price")}
                      color={`${errors.price ? "danger" : "default"}`}
                      classNames={{
                        input: "placeholder:text-asiatech-gray-500 ",
                        inputWrapper: [
                          "backdrop-saturate-200",
                          "focus-within:!border-asiatech-gray-500 ",
                        ],
                      }}
                      onChange={(e: any) => {
                        // Validate and set the value if it's a number
                        if (
                          /^\d*$/.test(convertPersianToEnglish(e.target.value))
                        ) {
                          setValue(
                            "price",
                            convertPersianToEnglish(e.target.value),
                            {
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                    />
                    {/* {errors.price && (
                      <p className="text-red-500 pt-2 text-sm">{`${errors.price.message}`}</p>
                    )} */}
                  </div>
                  <div className="w-full pt-1">
                    <div className="flex items-center gap-2">
                      <Autocomplete
                        label="دسته بندی"
                        variant="bordered"
                        defaultItems={category}
                        placeholder=""
                        className="max-w-xs "
                        selectedKey={getValues("category")}
                        color={`${errors.category ? "danger" : "default"}`}
                        onSelectionChange={(e: any) => {
                          console.log(e);

                          setValue("category", e, {
                            shouldValidate: true,
                          });
                        }}
                        // onSelectionChange={setValue}
                      >
                        {(item) => (
                          <AutocompleteItem key={item.id}>
                            {item.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      <Button isIconOnly color="default" aria-label="Like">
                        <PlusIcon className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* {errors.category && (
                      <p className="text-red-500 pt-2 text-sm">{`${errors.category.message}`}</p>
                    )} */}
                  </div>
                  <div className="w-full pt-1">
                    <div className="flex items-center gap-2">
                      <Autocomplete
                        label="زیر دسته بندی"
                        variant="bordered"
                        defaultItems={subCategory}
                        placeholder=""
                        className="max-w-xs"
                        selectedKey={getValues("sub_category")}
                        color={`${errors.sub_category ? "danger" : "default"}`}
                        onSelectionChange={(e: any) => {
                          setValue("sub_category", e, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        {(item) => (
                          <AutocompleteItem key={item.id}>
                            {item.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      <Button isIconOnly color="default" aria-label="Like">
                        <PlusIcon className="w-5 h-5" />
                      </Button>
                    </div>
                    {/* {errors.sub_category && (
                      <p className="text-red-500 pt-2 text-sm">{`${errors.sub_category.message}`}</p>
                    )} */}
                  </div>
                  <div className="w-full ">
                    <Input
                      variant="bordered"
                      type="text"
                      label="نام"
                      placeholder=""
                      className="w-full mt-2"
                      value={getValues("name")}
                      classNames={{
                        input: "placeholder:text-asiatech-gray-500",
                        inputWrapper: [
                          "backdrop-saturate-200",
                          "focus-within:!border-asiatech-gray-500 ",
                        ],
                      }}
                      onChange={(e: any) => {
                        setValue("name", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {/* {errors.name && (
                      <p className="text-red-500 pt-2 text-sm">{`${errors.name.message}`}</p>
                    )} */}
                  </div>
                  <div className="w-full ">
                    <Textarea
                      variant="bordered"
                      label="توضیحات"
                      labelPlacement="inside"
                      placeholder=""
                      value={getValues("comment")}
                      onChange={(e: any) => {
                        setValue("comment", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {/* {errors.name && (
                      <p className="text-red-500 pt-2 text-sm">{`${errors.name.message}`}</p>
                    )} */}
                  </div>
                  <div className="w-full ">
                    <div className="w-full">
                      {/* <label className="text-asiatech-gray-700 ">تاریخ</label> */}
                      <DatePickerIcon
                        portal={false}
                        value={new DateObject(getValues("date"))
                          .convert(persian, persian_fa)
                          .format()}
                        onChange={(e: any) => {
                          let date = new DateObject(e)
                            .convert(gregorian, gregorian_en)
                            .format("YYYY-MM-DD");
                          setValue("date", date, { shouldValidate: true });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button type="submit" color="primary">
                  {getValues("id") === "" ? "افزودن" : "ویرایش"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpsertExpense;
