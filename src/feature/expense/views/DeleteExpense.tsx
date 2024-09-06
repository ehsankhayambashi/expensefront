import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { IDeleteExpense } from "../interface/interface";
import { deleteExpense } from "../helper/controller";

const DeleteExpense = ({
  isOpen,
  onOpenChange,
  page,
  pageSize,
  selectedExpense,
  setValue,
  setExpense,
}: IDeleteExpense) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                حذف هزینه
              </ModalHeader>
              <ModalBody>
                <p>از حذف هزینه مطمئن هستید ؟</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    deleteExpense(
                      setExpense,
                      page,
                      pageSize,
                      setValue,
                      selectedExpense?.id ? String(selectedExpense?.id) : "99"
                    );
                    onClose();
                  }}
                >
                  حذف
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteExpense;
