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
import { ISubCategory, IUpsertExpense } from "../interface/interface";
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
import UpsertCategory from "./UpsertCategory";
import { useCategory } from "../hooks/useCategory";
import UpsertSubCategory from "./UpsertSubCategory";
import { useSubCategory } from "../hooks/useSubCategory";

const UpsertExpense = ({
  isOpenUpsert,
  onOpenChangeUpsert,
  errors,
  getValues,
  setValue,
  onSubmitForm,
  handleSubmit,
  subCategory,
  setCategories,
  categories,
  setSubCategory,
}: IUpsertExpense) => {
  const {
    getValuesCat,
    isOpenCat,
    onOpenCat,
    onOpenChangeCat,
    errorsCat,
    setValueCat,
    handleSubmitCat,
    onSubmitFormCat,
  } = useCategory(setCategories, setValue);

  const {
    errorsSubCat,
    getValuesSubCat,
    isOpenSubCat,
    onOpenChangeSubCat,
    onOpenSubCat,
    setValueSubCat,
    handleSubmitSubCat,
    onSubmitFormSubCat,
  } = useSubCategory(setValue, setSubCategory);

  return (
    <>
      <Modal
        isOpen={isOpenUpsert}
        placement="top-center"
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
                    <div className="w-full">
                      <div className="text-xs text-gray-500">
                        {Number(getValues("price")) > 0
                          ? convertNumberToWords(Number(getValues("price")))
                          : ""}
                      </div>
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
                          if (
                            /^\d*$/.test(
                              convertPersianToEnglish(e.target.value)
                            )
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
                    </div>
                    <div className="w-full pt-1">
                      <div className="flex items-center gap-2">
                        <Autocomplete
                          label="دسته بندی"
                          variant="bordered"
                          defaultItems={categories}
                          placeholder=""
                          className="max-w-xs "
                          selectedKey={getValues("category")}
                          color={`${errors.category ? "danger" : "default"}`}
                          onSelectionChange={(e: any) => {
                            setValue("category", e, {
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
                        <Button
                          isIconOnly
                          color="default"
                          aria-label="Like"
                          onClick={() => {
                            setValueCat("name", "", {
                              shouldValidate: true,
                            });
                            onOpenCat();
                          }}
                        >
                          <PlusIcon className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="w-full pt-1">
                      <div className="flex items-center gap-2">
                        <Autocomplete
                          label="زیر دسته بندی"
                          variant="bordered"
                          defaultItems={subCategory}
                          placeholder=""
                          isDisabled={getValues("category") ? false : true}
                          className="max-w-xs"
                          selectedKey={getValues("sub_category")}
                          color={`${
                            errors.sub_category ? "danger" : "default"
                          }`}
                          onSelectionChange={(e: any) => {
                            setValue("sub_category", e, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          {(item: ISubCategory) => (
                            <AutocompleteItem key={item.id}>
                              {item.name}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                        <Button
                          isIconOnly
                          color="default"
                          aria-label="Like"
                          isDisabled={getValues("category") ? false : true}
                          onClick={() => {
                            setValueSubCat("name", "", {
                              shouldValidate: true,
                            });
                            setValueSubCat("category", getValues("category"), {
                              shouldValidate: true,
                            });
                            onOpenSubCat();
                          }}
                        >
                          <PlusIcon className="w-5 h-5" />
                        </Button>
                      </div>
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
                    </div>
                    <div className="w-full ">
                      <div className="w-full">
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
      <UpsertCategory
        errors={errorsCat}
        getValues={getValuesCat}
        isOpen={isOpenCat}
        onOpenChange={onOpenChangeCat}
        setValue={setValueCat}
        handleSubmit={handleSubmitCat}
        onSubmitForm={onSubmitFormCat}
      />
      <UpsertSubCategory
        categories={categories}
        errors={errorsSubCat}
        getValues={getValuesSubCat}
        handleSubmit={handleSubmitSubCat}
        isOpen={isOpenSubCat}
        onOpenChange={onOpenChangeSubCat}
        onSubmitForm={onSubmitFormSubCat}
        setValue={setValueSubCat}
      />
    </>
  );
};

export default UpsertExpense;
