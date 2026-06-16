# Tổng quan dự án (Project Overview) - ServiceFlow

## 1. Giới thiệu dự án
**ServiceFlow** là một nền tảng phần mềm hỗ trợ quản lý vận hành dịch vụ toàn diện (Service Operation Platform) được thiết kế dành riêng cho các cửa hàng dịch vụ quy mô nhỏ. Dự án tập trung giải quyết bài toán cốt lõi: **số hóa quy trình tiếp nhận, xử lý yêu cầu, báo giá, minh chứng bằng hình ảnh, thanh toán và bảo hành điện tử.**

Để tối ưu hóa nghiệp vụ thực tế và tạo ra một sản phẩm mẫu chất lượng, phiên bản đầu tiên của ServiceFlow sẽ tập trung chuyên sâu vào ngành sửa chữa thiết bị công nghệ: **ServiceFlow for Repair Shops** (dành cho tiệm sửa chữa laptop, điện thoại, máy ảnh, linh kiện điện tử nhỏ).

---

## 2. Công nghệ sử dụng (Technology Stack)

Hệ thống được xây dựng trên các nền tảng công nghệ hiện đại, đảm bảo tính mở rộng, hiệu năng cao và khả năng triển khai linh hoạt:

| Thành phần | Công nghệ lựa chọn | Vai trò & Lý do sử dụng |
| :--- | :--- | :--- |
| **Front-end** | ReactJS, Vite, TailwindCSS | * **ReactJS + Vite**: Tối ưu tốc độ tải trang, chia nhỏ component tái sử dụng, build nhanh.<br>* **TailwindCSS**: Xây dựng giao diện responsive mượt mà, tùy chỉnh giao diện nhanh chóng. |
| **Back-end** | ASP.NET Core Web API | * Cung cấp RESTful API hiệu năng cao, bảo mật mạnh mẽ.<br>* Sử dụng Clean/Layered Architecture giúp mã nguồn dễ bảo trì và kiểm thử.<br>* Tích hợp JWT Authentication để phân quyền người dùng. |
| **Database** | MongoDB Atlas | * Cơ sở dữ liệu tài liệu (NoSQL Document-based) linh hoạt.<br>* Phù hợp cho việc lưu trữ các phiếu dịch vụ có cấu trúc thuộc tính động (ví dụ: các thông số kỹ thuật khác nhau của từng loại thiết bị laptop, điện thoại) và các báo giá nhiều phiên bản (Quotation versions). |
| **Cloud / Deploy** | VPS, Docker, Nginx | * **Docker**: Đóng gói các dịch vụ Front-end, Back-end thành các container độc lập, dễ triển khai.<br>* **Nginx**: Làm reverse proxy điều hướng request, cân bằng tải và cấu hình chứng chỉ SSL.<br>* **VPS**: Môi trường lưu trữ ứng dụng thực tế với chi phí tối ưu. |
| **CI/CD Tools** | GitHub Actions | * Tự động hóa quy trình kiểm thử (linting, unit test) và đóng gói docker image, đẩy lên registry khi có mã nguồn mới. |
| **Other Tools** | Cloudinary, Swagger | * **Cloudinary**: Quản lý và tối ưu hóa việc lưu trữ hình ảnh minh chứng tình trạng thiết bị sửa chữa.<br>* **Swagger (OpenAPI)**: Tự động tạo tài liệu đặc tả API trực quan giúp kiểm thử và tích hợp Front-end/Back-end dễ dàng. |

---

## 3. Các nhóm người dùng & Phân quyền (User Roles & Authorization)

Hệ thống ServiceFlow phân quyền rõ ràng thành 4 nhóm người dùng chính để đáp ứng nghiệp vụ vận hành thực tế:

```
                  ┌──────────────────────────────┐
                  │    Platform Admin (SaaS)     │
                  └──────────────┬───────────────┘
                                 │ Quản lý cửa hàng / Gói cước
                                 ▼
                  ┌──────────────────────────────┐
                  │   Owner / Manager (Cửa hàng) │
                  └──────────────┬───────────────┘
                                 │ Phân công / Duyệt báo giá
                                 ▼
  ┌──────────────────────────────┴──────────────────────────────┐
  ▼                                                             ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  Staff / Tech (Kỹ thuật viên)│              │      Customer (Khách hàng)   │
└──────────────────────────────┘              └──────────────────────────────┘
  Cập nhật trạng thái / Upload ảnh              Gửi yêu cầu / Duyệt báo giá
```

### 3.1. Platform Admin (Quản trị viên nền tảng)
Quản lý cấp hệ thống đối với mô hình SaaS đa cửa hàng (Multi-tenant):
* Quản lý danh sách, duyệt hoạt động hoặc khóa các cửa hàng vi phạm chính sách.
* Cấu hình các gói dịch vụ (Free/Pro), theo dõi số lượng cửa hàng đăng ký sử dụng.
* Xem dashboard thống kê tổng thể hệ thống (số lượng request, doanh thu nền tảng).

### 3.2. Owner / Manager (Chủ / Quản lý cửa hàng)
Người sở hữu không gian làm việc (Workspace) của cửa hàng:
* Đăng ký, thiết lập thông tin cửa hàng (Tên, Logo, Địa chỉ, Số điện thoại, Giờ làm việc).
* Quản lý Danh mục dịch vụ (dịch vụ sửa chữa, giá tham khảo, thời hạn bảo hành).
* Quản lý tài khoản nhân viên (Thêm mới, cập nhật thông tin, khóa tài khoản).
* Xem toàn bộ danh sách phiếu dịch vụ, trực tiếp phân công nhân viên kỹ thuật phụ trách.
* Xác nhận thanh toán hóa đơn thủ công (khi nhận tiền mặt hoặc chuyển khoản ngân hàng).
* Xem báo cáo doanh thu, hiệu suất xử lý của từng nhân viên và điểm đánh giá từ khách hàng.

### 3.3. Staff / Technician (Nhân viên / Kỹ thuật viên)
Người trực tiếp xử lý các thiết bị lỗi:
* Xem danh sách các phiếu dịch vụ được giao phụ trách.
* Cập nhật trạng thái xử lý (Đang kiểm tra ➔ Chờ duyệt báo giá ➔ Đang xử lý ➔ Chờ thanh toán...).
* Ghi chú kết quả kiểm tra kỹ thuật chi tiết của thiết bị.
* Upload hình ảnh minh chứng tình trạng ban đầu và sau khi sửa chữa lên Cloudinary.
* Đề xuất báo giá chi tiết (Bản nháp) gửi lên cho quản lý duyệt trước khi gửi khách.
* Báo cáo phát sinh sự cố trong quá trình sửa chữa.

### 3.4. Customer (Khách hàng)
Khách hàng sử dụng dịch vụ của cửa hàng:
* Gửi yêu cầu sửa chữa trực tiếp từ trang web công khai của cửa hàng.
* Theo dõi tiến trình xử lý của thiết bị theo thời gian thực qua một **liên kết bảo mật (Hashed URL)** duy nhất mà không bắt buộc phải tạo tài khoản.
* Xem bảng báo giá chi tiết, bấm "Xác nhận đồng ý" hoặc "Từ chối" trực tiếp trên giao diện web.
* Tra cứu thông tin bảo hành điện tử của thiết bị bằng Số điện thoại hoặc Mã phiếu.
* Đánh giá chất lượng dịch vụ (số sao + nhận xét) sau khi hoàn tất.

---

## 4. Các khái niệm cốt lõi (Key Domain Concepts)

* **Cửa hàng (Workspace)**: Mỗi cửa hàng đăng ký sẽ có một phân vùng dữ liệu riêng biệt. Tất cả dịch vụ, nhân viên, khách hàng và cấu hình chỉ hiển thị trong phạm vi Workspace đó.
* **Dịch vụ sửa chữa (Service Catalog)**: Danh sách các dịch vụ chuẩn hóa của cửa hàng (ví dụ: *Thay bàn phím laptop*, *Sửa nguồn*, *Ép kính điện thoại*). Mỗi dịch vụ quy định giá tham khảo, thời gian xử lý ước tính và thời hạn bảo hành mặc định.
* **Phiếu dịch vụ (Service Request/Ticket)**: Đối tượng trung tâm chứa toàn bộ thông tin về một ca sửa chữa. Gồm mã định danh duy nhất (ví dụ: `REQ-2026-0001`), thông tin thiết bị, mô tả lỗi, nguồn tiếp nhận, trạng thái hiện tại và lịch sử thay đổi.
* **Báo giá (Quotation)**: Chứa danh sách các hạng mục chi phí (Linh kiện thay thế, tiền công kỹ thuật). Báo giá có trạng thái kiểm soát (Nháp ➔ Chờ duyệt ➔ Đã đồng ý ➔ Đã từ chối). Hệ thống hỗ trợ báo giá bổ sung khi phát sinh thêm lỗi trong quá trình sửa chữa.
* **Ảnh minh chứng (Evidence)**: Hình ảnh thực tế của thiết bị được đính kèm vào phiếu dịch vụ tại 2 thời điểm quan trọng: lúc tiếp nhận (để chứng minh hiện trạng trầy xước/hỏng hóc ban đầu) và lúc hoàn thành (chứng minh linh kiện đã thay mới và máy hoạt động bình thường).
* **Trục thời gian (Timeline)**: Nhật ký hoạt động tự động ghi nhận mọi sự kiện xảy ra đối với phiếu dịch vụ (ví dụ: *09:00 - Tạo phiếu*, *10:15 - Phân công cho kỹ thuật viên A*, *11:00 - Gửi báo giá cho khách*...). Đảm bảo tính minh bạch tối đa.
* **Bảo hành (Warranty)**: Thông tin bảo hành điện tử tự động kích hoạt sau khi phiếu hoàn tất. Lưu trữ chi tiết thời hạn bảo hành cho từng hạng mục sửa chữa.
