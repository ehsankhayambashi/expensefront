"use client";
import React from "react";
import { useReports } from "../hooks/useReports";
import { DatePickerIcon } from "@/components/DatePickerIcon";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import DateObject from "react-date-object";
import { Button, Card, CardHeader } from "@nextui-org/react";
import ReportIcon from "@/app/assets/icons/ReportIcon";
import { getChart } from "../helper/controller";
import EChartsReact from "echarts-for-react";
import WithAuth1 from "@/components/WithAuth/WithAuth1";

const Index = () => {
  let { getValues, setValue, option, setOption, userId } = useReports();

  return (
    <Card className="shadow-one px-4 py-6 mt-6 overflow-visible">
      <CardHeader className="flex p-0 mb-6 text-asiatech-gray-800">
        <ReportIcon className="w-6 h-6 ml-2" />
        <span className="font-extrabold text-base">گزارش</span>
      </CardHeader>

      <div className="flex items-end flex-wrap gap-4">
        <div className="w-full md:max-w-52">
          <span className="text-asiatech-gray-700">از تاریخ</span>
          <DatePickerIcon
            portal={true}
            placeHolder="انتخاب تاریخ"
            value={new DateObject(getValues("startDate"))
              .convert(persian, persian_fa)
              .format()}
            onChange={(e: any) => {
              let date = new DateObject(e)
                .convert(gregorian, gregorian_en)
                .format("YYYY-MM-DD");
              setValue("startDate", date, { shouldValidate: true });
            }}
          />
        </div>
        <div className="w-full md:max-w-52">
          <span className="text-asiatech-gray-700">تا تاریخ</span>
          <DatePickerIcon
            portal={false}
            placeHolder="انتخاب تاریخ"
            value={new DateObject(getValues("endDate"))
              .convert(persian, persian_fa)
              .format()}
            onChange={(e: any) => {
              let date = new DateObject(e)
                .convert(gregorian, gregorian_en)
                .format("YYYY-MM-DD");
              setValue("endDate", date, { shouldValidate: true });
            }}
          />
        </div>
        <Button
          variant="bordered"
          color="primary"
          className="w-full md:w-fit"
          onClick={() => {
            getChart(setOption, getValues(), userId);
          }}
        >
          دریافت گزارش
        </Button>
        <div className="w-full h-full">
          {option && <EChartsReact option={option} lazyUpdate={true} />}
        </div>
      </div>
    </Card>
  );
};

export default WithAuth1(Index);
