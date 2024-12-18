"use client";
import Button from "@/packages/@ui-kit/Button2";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const Step2 = () => {
//   const sigPad = useRef(null);

//   const clearSignature = () => {
//     sigPad.current.clear();
//   };

//   const saveSignature = () => {
//     if (sigPad.current.isEmpty()) {
//       alert("Please provide a signature first!");
//     } else {
//       const dataURL = sigPad.current.toDataURL();
//       console.log("Saved signature:", dataURL);
//       // Save the dataURL to a server or use it in your application
//     }
//   };

  const rules = [
    "1. Chấp nhận và cam kết về hàng mẫu: KOL cam kết nhận hàng mẫu từ Unilever chỉ với mục đích quảng bá sản phẩm theo yêu cầu.",
    "2. Trách nhiệm quảng bá: KOL cam kết thực hiện quảng bá sản phẩm theo kế hoạch thỏa thuận với Unilever.",
    "3. Nội dung bài đăng: Bài đăng phải chính xác, sử dụng đúng hashtag, hình ảnh rõ nét.",
    "4. Tôn trọng thương hiệu: Không được sử dụng nội dung xúc phạm hoặc làm tổn hại đến thương hiệu Unilever.",
    "5. Quyền riêng tư và bảo mật: KOL cam kết giữ bí mật thông tin liên quan đến sản phẩm và chiến dịch.",
    "6. Đánh giá và phản hồi: Cung cấp phản hồi trung thực và báo cáo các vấn đề trước khi công khai.",
    "7. Quy định về hoàn trả hoặc bồi thường: KOL phải hoàn trả hàng mẫu khi có yêu cầu hoặc chịu trách nhiệm nếu vi phạm.",
    "8. Quy định về pháp luật: KOL phải tuân thủ các quy định pháp luật về quảng cáo và bản quyền.",
    "9. Phạt vi phạm: KOL vi phạm có thể bị phạt hoặc ngừng hợp tác ngay lập tức.",
  ];

  return (
    <div className="rounded-lg p-6">
      <h1 className="mb-4 text-start text-lg font-bold">
        Quy Định Hợp Tác KOL - Unilever (Example)
      </h1>
      <ul className="list-disc space-y-3 pl-5">
        {rules.map((rule, index) => (
          <li key={index} className="text-sm text-gray-700">
            {rule}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {/* <SignatureCanvas
          ref={sigPad}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "signatureCanvas",
          }}
        /> */}
        <Button title="Ký đồng ý yêu cầu" onClick={() => {}}></Button>
      </div>
    </div>
  );
};

export default Step2;
