"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Custom404 = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3); // Đồng hồ đếm ngược 3 giây

  useEffect(() => {
    // Chuyển hướng về trang chủ sau 3 giây
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000); // 3 giây

    // Đồng hồ đếm ngược
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Dọn dẹp timeout và interval nếu thành phần bị hủy
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md text-center">
        {/* Minh Họa */}
        <img
          src="/images/404-illustration.svg"
          alt="Minh Họa 404"
          className="mx-auto mb-8 h-64 w-64"
        />

        {/* Tiêu Đề */}
        <h1 className="mb-4 text-5xl font-extrabold text-gray-800">404</h1>

        {/* Phụ Đề */}
        <h2 className="mb-6 text-2xl font-semibold text-gray-600">
          Rất Tiếc! Không Tìm Thấy Trang
        </h2>

        {/* Thông Điệp */}
        <p className="mb-6 text-gray-500">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        {/* Đồng Hồ Đếm Ngược */}
        <p className="mb-6 text-gray-400">
          Chuyển hướng về trang chủ trong {countdown} giây...
        </p>

        {/* Nút Chuyển Hướng Thủ Công */}
        <button
          onClick={() => router.push("/")}
          className="rounded-md bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-700"
        >
          Về Trang Chủ
        </button>
      </div>
    </div>
  );
};

export default Custom404;
