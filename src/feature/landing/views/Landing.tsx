"use client";
import React from "react";
import { ILandingPage } from "../interface";
import { Button } from "@nextui-org/react";
import { useLanding } from "../hooks/useLanding";
import Link from "next/link";

const Landing = ({ props, features }: ILandingPage) => {
  const { introduce } = props?.data?.attributes;
  const { keyfeatureitem } = features.data.attributes;
  const { router } = useLanding();
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white text-center py-20">
          <h1 className="text-5xl font-bold">جیب‌سنج</h1>
          <p className="text-xl mt-4">
            مدیریت هزینه‌ها با نمودارهای دقیق و کاربردی
          </p>
          <div className="flex w-full justify-center px-4 pt-4 gap-4 flex-col md:flex-row">
            <Button
              variant="bordered"
              className="text-white"
              onClick={() => router.push("/login")}
            >
              ورود
            </Button>
            <Button
              variant="bordered"
              className="text-white"
              onClick={() => router.push("/register")}
            >
              ثبت نام
            </Button>
          </div>
        </section>

        {/* Introduction */}
        <section className="text-center py-16 px-4 md:px-8">
          <h2 className="text-4xl font-semibold text-gray-800">
            معرفی جیب‌سنج
          </h2>

          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            {introduce}
          </p>
        </section>

        <section className="bg-white py-16 px-4 md:px-8">
          <h2 className="text-4xl font-semibold text-gray-800 text-center">
            ویژگی‌های کلیدی
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {keyfeatureitem.map((item: any, index: number) => {
              return (
                <div key={index + item} className="text-center">
                  <div className="text-6xl text-blue-600 mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-blue-600 text-white text-center py-16">
          <h2 className="text-4xl font-semibold">همین حالا شروع کنید!</h2>
          <p className="text-xl mt-4 max-w-3xl mx-auto">
            جیب‌سنج را استفاده کنید و هزینه‌های خود را به بهترین شکل مدیریت
            کنید.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full mt-8 shadow-lg hover:bg-gray-200 transition duration-300"
          >
            ورود
          </Link>
        </section>

        <section className="bg-gray-50 py-16 px-4 md:px-8">
          <h2 className="text-4xl font-semibold text-gray-800 text-center">
            نظرات کاربران
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-700">
                &apos;اپلیکیشنی فوق‌العاده! مدیریت هزینه‌هایم با جیب‌سنج بسیار
                آسان شده است.&apos;
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                علی ر.
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-700">
                &apos;نمودارهای دقیق و کاربردی جیب‌سنج به من کمک کرد تا
                هزینه‌های غیرضروری‌ام را کاهش دهم.&apos;
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                سارا م.
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-700">
                &apos;استفاده از جیب‌سنج خیلی راحت است و من از امنیت بالای آن
                مطمئنم.&apos;
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                محمد ن.
              </h3>
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-white text-center py-8">
          <p>© 2024 جیب‌سنج. تمامی حقوق محفوظ است.</p>
          {/* <p className="mt-4">ارتباط با ما: info@jibsanaj.com</p> */}
        </footer>
      </div>
    </>
  );
};

export default Landing;
