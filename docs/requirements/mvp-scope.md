# Phạm vi phiên bản MVP (MVP Scope) - ServiceFlow

Tài liệu này xác định ranh giới tính năng của phiên bản thử nghiệm đầu tiên (**Minimum Viable Product - MVP**) cho dự án ServiceFlow. Mục tiêu là tập trung phát triển các giá trị cốt lõi giúp cửa hàng quản lý quy trình dịch vụ hiệu quả nhất mà không bị quá tải về phạm vi tính năng.

---

## 1. Các phân hệ và Tính năng thuộc phạm vi MVP

### 1.1. Quản lý cửa hàng & Danh mục dịch vụ (Workspace & Service Catalog)
* **Thiết lập cửa hàng (Workspace Setup)**:
  * Cho phép chủ cửa hàng (Owner) đăng ký tài khoản và khởi tạo một Workspace riêng biệt.
  * Cập nhật thông tin cửa hàng: Tên cửa hàng, logo, số điện thoại, địa chỉ, giờ mở/đóng cửa và chính sách chung.
* **Quản lý danh mục dịch vụ (Service Catalog Management)**:
  * CRUD (Thêm, Đọc, Sửa, Ẩn/Hiện) danh sách dịch vụ cửa hàng cung cấp (ví dụ: *Vệ sinh máy, Thay màn hình, Cài hệ điều hành*).
  * Mỗi dịch vụ có: Tên dịch vụ, mô tả chi tiết, giá tham khảo, thời gian xử lý dự kiến và thời hạn bảo hành mặc định (ví dụ: 30 ngày, 90 ngày).

### 1.2. Quản lý nhân sự nội bộ (Staff Management)
* **Tài khoản nhân viên**: Chủ cửa hàng có thể tạo tài khoản cho nhân viên kỹ thuật (Staff/Technician).
* **Phân quyền cơ bản**:
  * *Owner/Manager*: Quản trị toàn bộ hệ thống, xem báo cáo doanh thu, cấu hình dịch vụ, phân công nhân viên.
  * *Staff/Technician*: Chỉ xem các phiếu được phân công, cập nhật ghi chú kỹ thuật, upload ảnh và đề xuất báo giá.
* **Theo dõi tải công việc (Workload)**: Hiển thị số lượng phiếu đang xử lý của từng nhân viên để Owner phân phối công việc hợp lý.

### 1.3. Tiếp nhận và Khởi tạo phiếu dịch vụ (Service Request Intake)
* **Kênh tiếp nhận đa dạng**: Hỗ trợ ghi nhận nguồn yêu cầu đến từ: *Zalo, Facebook, Gọi điện, Khách trực tiếp (Walk-in), hoặc Khách tự gửi qua Website*.
* **Tạo phiếu nhanh (Quick Creation)**: Nhân viên tạo phiếu dịch vụ thay cho khách tại quầy hoặc copy thông tin từ Zalo/Facebook vào hệ thống.
  * Thông tin bao gồm: Họ tên khách hàng, Số điện thoại, Tên thiết bị (ví dụ: *Laptop Dell XPS 13*), Số serial (nếu có), Mô tả lỗi ban đầu.
* **Hình ảnh minh chứng đầu vào**: Nhân viên chụp ảnh hiện trạng thiết bị khi tiếp nhận (trầy xước, nứt vỡ) và tải lên Cloudinary để làm bằng chứng pháp lý.
* **Mã định danh & Link theo dõi**:
  * Tự động sinh mã phiếu định dạng: `REQ-YYYY-NNNN` (Ví dụ: `REQ-2026-0001`).
  * Tạo liên kết theo dõi bảo mật **(Hashed URL)** duy nhất cho từng phiếu để gửi cho khách hàng (ví dụ qua tin nhắn Zalo/SMS). Khách hàng không cần đăng nhập vẫn truy cập được link này.

### 1.4. Quy trình Kiểm tra, Báo giá & Xác nhận trực tuyến
* **Chẩn đoán kỹ thuật**: Kỹ thuật viên đổi trạng thái phiếu sang "Đang kiểm tra" (Checking), ghi nhận lỗi phát hiện được và tải lên ảnh chụp lỗi linh kiện hỏng.
* **Lập báo giá (Quotation)**:
  * Cho phép nhân viên nhập bảng kê chi phí chi tiết (tiền mua linh kiện thay thế + tiền công sửa chữa).
  * Trạng thái báo giá: *Nháp (Draft)* ➔ *Chờ duyệt (Pending)*.
* **Khách hàng phê duyệt trực tuyến**:
  * Khách hàng mở link theo dõi, xem thông tin lỗi, hình ảnh lỗi và bảng báo giá.
  * Khách hàng bấm **"Đồng ý báo giá"** hoặc **"Từ chối báo giá"** trực tiếp trên web.
* **Báo giá bổ sung (Supplementary Quotation)**:
  * Trong quá trình sửa chữa nếu phát sinh lỗi mới, kỹ thuật viên có thể lập thêm báo giá bổ sung.
  * Hệ thống chuyển trạng thái phiếu về chờ duyệt phát sinh và yêu cầu khách xác nhận lại trước khi kỹ thuật viên tiếp tục làm việc.

### 1.5. Sửa chữa, Minh chứng kết quả & Đóng phiếu
* **Sửa chữa**: Kỹ thuật viên tiến hành xử lý sau khi khách đồng ý báo giá, cập nhật tiến độ công việc trên Timeline.
* **Ảnh minh chứng kết quả**: Kỹ thuật viên chụp ảnh thiết bị hoạt động bình thường hoặc linh kiện cũ đã tháo rời để tải lên hệ thống trước khi bàn giao.
* **Thanh toán thủ công**: Cho phép Owner hoặc nhân viên cập nhật tình trạng thanh toán dựa trên giao dịch thực tế (Chưa thanh toán, Đã đặt cọc, Đã thanh toán đủ).
* **Hoàn thành phiếu**: Ghi nhận hoàn thành dịch vụ, kích hoạt thời hạn bảo hành điện tử và đóng phiếu.
* **Thu thập đánh giá**: Khách hàng có thể chấm điểm đánh giá (1-5 sao) và để lại phản hồi về chất lượng sửa chữa.

### 1.6. Tra cứu Bảo hành điện tử
* **Cổng tra cứu công khai**: Khách hàng có thể truy cập trang tra cứu của cửa hàng, nhập Số điện thoại hoặc Mã phiếu để xem danh sách thiết bị từng sửa chữa.
* **Thông tin bảo hành**: Hiển thị rõ danh sách linh kiện/dịch vụ đã làm, ngày hoàn thành, thời gian bảo hành và trạng thái còn hạn hay đã hết hạn.
* **Yêu cầu bảo hành**: Khách hàng có thể bấm gửi yêu cầu bảo hành trực tuyến nếu thiết bị phát sinh lỗi lại.

### 1.7. Dashboard Báo cáo cho Chủ cửa hàng
* **Số liệu tổng quan**: Số lượng phiếu mới trong ngày, phiếu đang xử lý, phiếu chờ thanh toán.
* **Doanh thu**: Biểu đồ doanh thu theo tuần/tháng.
* **Phân tích kênh**: Tỷ lệ khách hàng đến từ các nguồn khác nhau (Zalo, Walk-in, Facebook...).
* **Đánh giá & Hiệu suất**: Điểm hài lòng trung bình của khách hàng và số lượng phiếu hoàn thành của từng nhân viên.

---

## 2. Nằm ngoài phạm vi MVP (Để lại phát triển ở các giai đoạn sau)

Để đảm bảo dự án hoàn thành đúng hạn và hoạt động ổn định, các chức năng nâng cao dưới đây sẽ **không** được thực hiện trong phiên bản MVP:

* **Tích hợp thanh toán Online**: Chưa tích hợp các cổng thanh toán Momo, VNPay, Paypal, hay chuyển khoản ngân hàng tự động qua QR VietQR API (Khách hàng chuyển khoản thủ công và cửa hàng tự xác nhận trên web).
* **Trò chuyện trực tiếp (Real-time Chat)**: Khách hàng và kỹ thuật viên trao đổi trực tiếp trên web (Tiếp tục sử dụng Zalo/Facebook Messenger để trò chuyện ngoài hệ thống).
* **Tích hợp Zalo/Facebook API**: Chưa tự động đồng bộ tin nhắn hay tự tạo phiếu tự động từ tin nhắn chat (Nhân viên copy thông tin thủ công vào ServiceFlow).
* **Hệ thống gửi thông báo tự động**: Chưa tự động gửi SMS hoặc tin nhắn Zalo ZNS khi trạng thái phiếu thay đổi (Cửa hàng copy link theo dõi và gửi thủ công cho khách).
* **Quản lý kho linh kiện (Inventory Ledger)**: Chưa quản lý chi tiết nhập-xuất-tồn kho linh kiện, mã vạch (Chỉ nhập giá linh kiện trực tiếp vào báo giá).
* **Hỗ trợ chuỗi nhiều chi nhánh**: Mỗi Workspace chỉ hỗ trợ 1 cửa hàng duy nhất.
