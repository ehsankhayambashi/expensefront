"use client";
import EditIcon from "@/app/assets/icons/EditIcon";
import MoreOptionIcon from "@/app/assets/icons/MoreOptionIcon";
import TrashIcon from "@/app/assets/icons/TrashIcon";
import {
  Button,
  Card,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { useExpense } from "../hooks/useExpense";
import { IExpense } from "../interface/interface";
import NumberSeparator from "@/utils/NumberSeprator";
import PlusIcon from "@/app/assets/icons/PlusIcon";
import UpsertExpense from "./UpsertExpense";
import { getCurrentDate } from "../helper/controller";
import DeleteExpense from "./DeleteExpense";
import { FaRegClone } from "react-icons/fa6";
import { LiaClone, LiaEdit } from "react-icons/lia";
import { RiEditBoxLine } from "react-icons/ri";
import { GiExpense } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaSearchDollar } from "react-icons/fa";
import WithAuth1 from "@/components/WithAuth/WithAuth1";

const TableExpense = () => {
  const {
    expenseList,
    isOpenUpsert,
    onOpenChangeUpsert,
    onOpenUpsert,
    errors,
    getValues,
    setValue,
    handleSubmit,
    onSubmitForm,
    categories,
    setCategories,
    subCategory,
    setSubCategory,
    isOpenDelete,
    onOpenChangeDelete,
    onOpenDelete,
    selectedExpense,
    setSelectedExpense,
    setExpenseList,
  } = useExpense();

  return (
    <Card className="shadow-one px-4 py-6 mt-6 overflow-visible min-w-60">
      <CardHeader className="flex gap-2 p-0 mb-6 text-asiatech-gray-800">
        <FaSearchDollar />
        <span className="font-extrabold text-base">مدیریت هزینه</span>
      </CardHeader>
      <div className="relative flex flex-col">
        <div className="overflow-auto px-1 h-full">
          <Table
            aria-label="domain table"
            shadow="none"
            isHeaderSticky
            className="!p-0 "
            removeWrapper
            classNames={{
              tr: "!rounded-14",
              th: "text-center bg-asiatech-gray-300 text-asiatech-gray-800 shadow-none",
              td: "text-center",
              thead: "shadow-none",
              table: "text-asiatech-gray-800",
            }}
          >
            <TableHeader>
              <TableColumn
                key="price"
                className="!rounded-l-none !rounded-r-14 !text-right border-none pr-7"
              >
                مبلغ
              </TableColumn>
              <TableColumn key="category">دسته بندی</TableColumn>
              <TableColumn
                className="!rounded-r-none rounded-l-14 flex justify-end items-center"
                key="actions"
              >
                <></>
              </TableColumn>
            </TableHeader>
            <TableBody
              loadingContent={<Spinner label="Loading..." />}
              emptyContent={"اطلاعاتی جهت نمایش وجود ندارد."}
            >
              {expenseList &&
                expenseList.map((item: IExpense, index) => {
                  return (
                    <TableRow className="text-right bordertabel" key={item?.id}>
                      <TableCell className="text-right">
                        {NumberSeparator(item?.price)}
                      </TableCell>
                      <TableCell>{`${item?.category?.name}`}</TableCell>
                      <TableCell>
                        <Dropdown
                          placement="bottom-start"
                          aria-labelledby="option button"
                        >
                          <DropdownTrigger
                            onClick={() => {
                              // reset();
                              // setPopUpEditForCategory(setValue, item);
                              // setValue("id", item.id, { shouldValidate: true });
                              // setIsAddMode(false);
                            }}
                          >
                            <div className="w-full flex justify-end">
                              <MoreOptionIcon className="w-5 h-5 cursor-pointer" />
                            </div>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            className=" text-asiatech-gray-800"
                          >
                            <DropdownItem
                              textValue="Clone"
                              key="clone"
                              onClick={() => {
                                setValue("id", "", {
                                  shouldValidate: true,
                                });
                                setValue(
                                  "category",
                                  String(item?.category?.id),
                                  {
                                    shouldValidate: true,
                                  }
                                );
                                setValue("price", String(item.price), {
                                  shouldValidate: true,
                                });
                                setValue(
                                  "sub_category",
                                  String(item?.sub_category?.id),
                                  { shouldValidate: true }
                                );
                                setValue("name", item?.name, {
                                  shouldValidate: true,
                                });
                                setValue("comment", item?.comment, {
                                  shouldValidate: true,
                                });
                                setValue("date", getCurrentDate(), {
                                  shouldValidate: true,
                                });
                                onOpenUpsert();
                              }}
                            >
                              <div className="flex items-center">
                                <LiaClone className="w-6 h-6 ml-2" />
                                <span>کپی</span>
                              </div>
                            </DropdownItem>
                            <DropdownItem
                              textValue="Edit"
                              key="edit"
                              onClick={() => {
                                setValue("id", String(item?.id), {
                                  shouldValidate: true,
                                });
                                setValue(
                                  "category",
                                  String(item?.category?.id),
                                  {
                                    shouldValidate: true,
                                  }
                                );
                                setValue("price", String(item.price), {
                                  shouldValidate: true,
                                });
                                setValue(
                                  "sub_category",
                                  String(item?.sub_category?.id),
                                  { shouldValidate: true }
                                );
                                setValue("name", item?.name, {
                                  shouldValidate: true,
                                });
                                setValue("date", item?.date, {
                                  shouldValidate: true,
                                });
                                onOpenUpsert();
                              }}
                            >
                              <div className="flex items-center">
                                <LiaEdit className="w-6 h-6 ml-2" />
                                <span>ویرایش</span>
                              </div>
                            </DropdownItem>
                            <DropdownItem
                              textValue="Delete"
                              key="delete"
                              onClick={() => {
                                setSelectedExpense(item);
                                onOpenDelete();
                              }}
                            >
                              <div className="flex items-center">
                                <TrashIcon className="w-6 h-6 ml-2" />
                                <span> حذف</span>
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div className="fixed bottom-48 right-2 w-full flex justify-start xl:justify-start">
          {getValues("pageCount") > 1 ? (
            <Pagination
              isCompact
              showControls
              classNames={{ next: "rotate-180", prev: "rotate-180" }}
              total={getValues("pageCount")}
              page={getValues("page")}
              onChange={(e) => {
                setValue("page", e, { shouldValidate: true });
              }}
            />
          ) : (
            ""
          )}
        </div>
        <div className="fixed right-2 bottom-8">
          <Button
            onClick={() => {
              setValue("id", "", { shouldValidate: true });
              setValue("price", "", { shouldValidate: true });
              setValue("category", "", { shouldValidate: true });
              setValue("sub_category", "", { shouldValidate: true });
              setValue("name", "", { shouldValidate: true });
              setValue("comment", "", { shouldValidate: true });
              setValue("date", getCurrentDate(), { shouldValidate: true });
              onOpenUpsert();
            }}
            color="primary"
            endContent={<PlusIcon className="w-3 h-3" />}
          >
            افزودن
          </Button>
        </div>
        <UpsertExpense
          getValues={getValues}
          setValue={setValue}
          errors={errors}
          isOpenUpsert={isOpenUpsert}
          onOpenChangeUpsert={onOpenChangeUpsert}
          handleSubmit={handleSubmit}
          onSubmitForm={onSubmitForm}
          categories={categories}
          setCategories={setCategories}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
        />
        <DeleteExpense
          isOpen={isOpenDelete}
          onOpenChange={onOpenChangeDelete}
          setValue={setValue}
          page={getValues("page")}
          pageSize={getValues("pageSize")}
          selectedExpense={selectedExpense}
          setExpense={setExpenseList}
        />
      </div>
    </Card>
  );
};

export default WithAuth1(TableExpense);
