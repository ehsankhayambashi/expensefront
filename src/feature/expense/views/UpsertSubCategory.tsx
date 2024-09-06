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
} from "@nextui-org/react";
import React from "react";
import { IUpsertSubCategory } from "../interface/interface";

const UpsertSubCategory = ({
  errors,
  getValues,
  handleSubmit,
  onSubmitForm,
  setValue,
  isOpen,
  onOpenChange,
  categories,
}: IUpsertSubCategory) => {
  return (
    <div>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
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
                  افزودن زیر دسته بندی
                </ModalHeader>
                <ModalBody>
                  <div className="w-full pt-1">
                    <div className="flex items-center gap-2">
                      <Autocomplete
                        label="دسته بندی"
                        variant="bordered"
                        defaultItems={categories}
                        placeholder=""
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
                    </div>
                  </div>
                  <div className="w-full ">
                    <Input
                      variant="bordered"
                      type="text"
                      label="نام"
                      placeholder=""
                      color={`${errors.name ? "danger" : "default"}`}
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
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    variant="light"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    بستن
                  </Button>
                  <Button color="primary" type="submit">
                    افزودن
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpsertSubCategory;
