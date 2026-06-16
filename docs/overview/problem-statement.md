# Tuyên bố bài toán (Problem Statement) - ServiceFlow

## 1. Tình cảnh thực tế (Current Situation)
Trong bối cảnh hiện nay, các cửa hàng dịch vụ quy mô nhỏ như tiệm sửa laptop, sửa điện thoại, sửa xe, vệ sinh máy lạnh, hay các studio chụp ảnh đang vận hành công việc hàng ngày bằng cách sử dụng kết hợp nhiều công cụ rời rạc:
* **Ứng dụng chat**: Zalo, Facebook Messenger để tư vấn nhanh.
* **Giao tiếp trực tiếp & Điện thoại**: Gọi điện thoại trao đổi trực tiếp hoặc nhận máy tại quầy.
* **Công cụ ghi chép thủ công**: Ghi chú giấy (giấy biên nhận), sổ tay.
* **Công cụ văn phòng**: Excel, Google Sheets để ghi nhận doanh thu và lưu danh sách khách hàng.

Cách tiếp cận này ban đầu rất tiện lợi và không tốn chi phí. Tuy nhiên, khi lượng khách hàng và số lượng yêu cầu sửa chữa tăng lên, việc quản lý bằng các công cụ phi cấu trúc bắt đầu bộc lộ những hạn chế nghiêm trọng, gây ảnh hưởng trực tiếp tới hiệu suất vận hành của cửa hàng và trải nghiệm của khách hàng.

---

## 2. Các vấn đề cốt lõi (Core Problems)

### 2.1. Đối với Cửa hàng (Chủ cửa hàng & Nhân viên)
* **Thông tin bị phân mảnh và trôi tin nhắn**: Thông tin trao đổi với khách hàng nằm rải rác ở nhiều tài khoản Zalo/Facebook cá nhân của nhân viên tư vấn. Khi nhân viên này nghỉ phép hoặc đổi ca, nhân viên tiếp theo không nắm được lịch sử trao đổi, dẫn đến tư vấn mâu thuẫn hoặc phải hỏi đi hỏi lại khách hàng.
* **Bỏ sót yêu cầu của khách hàng**: Không có một danh sách quản lý tập trung các yêu cầu đang chờ tiếp nhận, đang kiểm tra, hay chờ báo giá. Nhân viên dễ quên phản hồi khách hàng khi có quá nhiều đoạn chat cùng lúc.
* **Mất kiểm soát tiến độ và phân công**: Chủ cửa hàng hoặc quản lý khó biết được kỹ thuật viên nào đang xử lý thiết bị nào, ai đang bị quá tải, và tiến độ sửa chữa của các phiếu đang diễn ra đến đâu.
* **Dễ xảy ra tranh chấp về chi phí phát sinh**: Khi phát hiện thêm lỗi mới trong quá trình sửa chữa, nhân viên thường báo giá miệng hoặc nhắn tin qua chat. Nếu không có xác nhận chính thức được lưu vết hệ thống, khách hàng dễ phủ nhận hoặc khiếu nại về việc tự ý tăng giá.
* **Thiếu minh chứng tình trạng thiết bị**: Không có ảnh chụp tình trạng ban đầu của thiết bị (trầy xước, nứt vỡ) và ảnh kết quả sau khi xử lý để làm đối chứng. Cửa hàng dễ bị khách hàng đổ lỗi làm hỏng hóc hoặc tráo đổi linh kiện.
* **Quản lý bảo hành phức tạp**: Việc viết giấy bảo hành vật lý dễ bị thất lạc, rách nát. Nhân viên tốn thời gian tìm kiếm lại hóa đơn cũ để xác minh thời hạn và điều kiện bảo hành.
* **Khó khăn trong báo cáo kinh doanh**: Chủ cửa hàng phải tổng hợp thủ công từ Excel hoặc sổ sách để biết doanh thu tháng, dịch vụ nào phổ biến nhất, hiệu suất làm việc của nhân viên ra sao, hay tỷ lệ khách hàng từ chối báo giá là bao nhiêu.

### 2.2. Đối với Khách hàng
* **Thiếu thông tin tiến độ**: Khách hàng hoàn toàn "mù thông tin" sau khi gửi lại thiết bị cho cửa hàng. Họ không biết máy của mình đang được kiểm tra, đang chờ linh kiện, hay đã sửa xong, buộc phải chủ động nhắn tin hoặc gọi điện hỏi nhiều lần.
* **Mơ hồ về giá cả và tính xác thực**: Khách hàng không chắc chắn báo giá nhận được có phải là chính thức từ cửa hàng hay không, linh kiện thay thế gồm những gì và có phát sinh thêm chi phí ẩn nào khác không.
* **Mất mát tài liệu bảo hành**: Khách hàng dễ làm mất biên nhận hoặc phiếu bảo hành bằng giấy, dẫn đến việc bị từ chối bảo hành khi thiết bị gặp lại sự cố cũ.
* **Khó tra cứu lịch sử sửa chữa**: Khách hàng không có cách nào tự xem lại các thiết bị mình từng sửa tại cửa hàng đó đã được thay thế những gì và thời gian bảo hành còn lại bao lâu.

---

## 3. Giải pháp ServiceFlow
ServiceFlow được xây dựng để trở thành **hệ thống quản lý vận hành dịch vụ phía sau (Back-office Operations)** cho cửa hàng, chứ không nhằm thay thế các kênh liên lạc tự nhiên như Zalo hay Facebook.

```
[Khách hàng nhắn Zalo/FB] ➔ [Nhân viên tư vấn sơ bộ] ➔ [Tạo Phiếu trên ServiceFlow]
                                                               ⬇
[Nhận link/mã theo dõi trực tuyến] 🔀 [Cập nhật tiến độ & Ảnh minh chứng]
                                                               ⬇
[Xác nhận báo giá / Thanh toán] ➔ [Lưu lịch sử & Bảo hành điện tử]
```

### Cách thức hoạt động thực tế:
1. Khách hàng vẫn có thể tiếp cận cửa hàng qua các kênh quen thuộc (Zalo, Facebook, gọi điện hoặc đến trực tiếp).
2. Ngay khi tiếp nhận thiết bị, nhân viên sẽ tạo một **Phiếu dịch vụ (Service Request)** trên ServiceFlow, chụp ảnh tình trạng ban đầu của thiết bị và hệ thống sẽ tự động cấp một mã phiếu duy nhất (ví dụ: `REQ-2026-0001`).
3. Hệ thống tạo ra một đường **link theo dõi bảo mật (Hashed URL)** gửi cho khách hàng. Khách hàng không cần đăng ký tài khoản vẫn có thể click vào link để xem toàn bộ timeline xử lý, ảnh minh chứng lỗi, bảng báo giá chính thức, và bấm "Đồng ý" hoặc "Từ chối" trực tuyến.
4. Mọi hoạt động từ kiểm tra, báo giá, sửa chữa, chụp ảnh bàn giao, thanh toán cho đến kích hoạt bảo hành điện tử đều được ghi nhận tập trung và minh bạch trên ServiceFlow.

ServiceFlow mang lại giá trị cốt lõi: **Biến các thông tin hội thoại rời rạc thành quy trình dịch vụ rõ ràng, minh bạch và số hóa toàn bộ quá trình vận hành.**
