import Input from "@/packages/@ui-kit/Input";
import { useRegisterProductContext } from "./RegisterProductProvider";

const Step4 = () => {
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
    <div className="mx-auto max-w-xl rounded-lg p-6">
      <h1 className="mb-4 text-center text-lg font-bold text-blue-600">
        Quy Định Hợp Tác KOL - Unilever (Example)
      </h1>
      <ul className="list-disc space-y-3 pl-5">
        {rules.map((rule, index) => (
          <li key={index} className="text-base text-gray-700">
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Step4;
