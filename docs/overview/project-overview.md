# Tổng quan dự án (Project Overview) - ServiceFlow

## 1. Giới thiệu dự án
**ServiceFlow** là một nền tảng quản lý vận hành dịch vụ tinh gọn (Service Operations Platform) dành cho các doanh nghiệp, cơ sở kinh doanh dịch vụ quy mô nhỏ. Mục tiêu của hệ thống là hỗ trợ số hóa toàn bộ quy trình từ lúc tiếp nhận yêu cầu, đặt lịch hẹn, quản lý tiến độ, gửi báo giá trực tuyến, thanh toán đến chăm sóc khách hàng và bảo hành sau dịch vụ trong một hệ thống hợp nhất.

Về định hướng dài hạn, ServiceFlow hỗ trợ linh hoạt cho nhiều loại hình kinh doanh dịch vụ khác nhau thông qua các cấu hình đặc thù (Presets/Workspaces) như:
* **Cửa hàng Sửa chữa** (Laptop, điện thoại, thiết bị điện tử)
* **Spa & Thẩm mỹ viện** (Chăm sóc da, massage, liệu trình trị mụn)
* **Studio Hình ảnh** (Chụp ảnh, quay phim, chỉnh sửa hình ảnh/video)
* **Salon Tóc & Làm đẹp** (Cắt tóc, làm nail, makeup)
* **Dịch vụ Vệ sinh & Bảo trì** (Vệ sinh căn hộ, bảo dưỡng thiết bị gia đình)

*Để triển khai nhanh MVP đầu tiên, quy trình nghiệp vụ của Cửa hàng Sửa chữa sẽ được sử dụng làm kịch bản mẫu chi tiết, tuy nhiên kiến trúc phần mềm, cơ sở dữ liệu và giao diện được thiết kế tổng quát để sẵn sàng mở rộng sang bất cứ mô hình dịch vụ nào.*

---

## 2. Công nghệ sử dụng (Technology Stack)

Hệ thống được xây dựng trên các nền tảng công nghệ hiện đại, đảm bảo tính mở rộng, hiệu năng cao và khả năng triển khai linh hoạt:

| Thành phần | Công nghệ lựa chọn | Vai trò & Lý do sử dụng |
| :--- | :--- | :--- |
| **Front-end** | ReactJS, Vite, TailwindCSS | * **ReactJS + Vite**: Tối ưu tốc độ tải trang, chia nhỏ component tái sử dụng, build nhanh.<br>* **TailwindCSS**: Xây dựng giao diện responsive mượt mà, tùy chỉnh giao diện nhanh chóng. |
| **Back-end** | ASP.NET Core Web API | * Cung cấp RESTful API hiệu năng cao, bảo mật mạnh mẽ.<br>* Sử dụng Clean Architecture giúp mã nguồn dễ bảo trì và kiểm thử.<br>* Tích hợp JWT Authentication để phân quyền người dùng. |
| **Database** | MongoDB Atlas | * Cơ sở dữ liệu tài liệu (NoSQL Document-based) linh hoạt.<br>* Phù hợp cho việc lưu trữ các phiếu dịch vụ có cấu trúc thuộc tính động (sử dụng metadata linh hoạt cho từng ngành như thiết bị sửa chữa, thông số buổi chụp studio, hay liệu trình spa) và các báo giá nhiều phiên bản (Quotation versions). |
| **Cloud / Deploy** | VPS, Docker, Nginx | * **Docker**: Đóng gói các dịch vụ Front-end, Back-end thành các container độc lập, dễ triển khai.<br>* **Nginx**: Làm reverse proxy điều hướng request, cân bằng tải và cấu hình chứng chỉ SSL.<br>* **VPS**: Môi trường lưu trữ ứng dụng thực tế với chi phí tối ưu. |
| **CI/CD Tools** | GitHub Actions | * Tự động hóa quy trình kiểm thử (linting, unit test) và đóng gói docker image, đẩy lên registry khi có mã nguồn mới. |
| **Other Tools** | Cloudinary, Swagger | * **Cloudinary**: Quản lý và tối ưu hóa việc lưu trữ hình ảnh minh chứng tình trạng dịch vụ (ảnh máy móc, hiện trạng vệ sinh, tệp tham chiếu).<br>* **Swagger (OpenAPI)**: Tự động tạo tài liệu đặc tả API trực quan giúp kiểm thử và tích hợp Front-end/Back-end dễ dàng. |

---

## 3. Các nhóm người dùng & Phân quyền (User Roles & Authorization)

Hệ thống ServiceFlow phân quyền rõ ràng thành 4 nhóm người dùng chính để đáp ứng nghiệp vụ vận hành thực tế:

```
                  ┌──────────────────────────────┐
                  │    Platform Admin (SaaS)     │
                  └──────────────┬───────────────┘
                                 │ Quản lý doanh nghiệp / Gói cước
                                 ▼
                  ┌──────────────────────────────┐
                  │   Owner / Manager (Quản lý)  │
                  └──────────────┬───────────────┘
                                 │ Phân công / Duyệt báo giá
                                 ▼
  ┌──────────────────────────────┴──────────────────────────────┐
  ▼                                                             ▼
 ┌──────────────────────────────┐              ┌──────────────────────────────┐
 │  Staff / Service Provider    │              │      Customer (Khách hàng)   │
 └──────────────────────────────┘              └──────────────────────────────┘
   Cập nhật tiến độ / Đính kèm ảnh               Gửi yêu cầu / Duyệt báo giá
```

### 3.1. Platform Admin (Quản trị viên nền tảng)
Quản lý cấp hệ thống đối với mô hình SaaS đa doanh nghiệp (Multi-tenant):
* Quản lý danh sách, duyệt hoạt động hoặc khóa các doanh nghiệp vi phạm chính sách.
* Cấu hình các gói dịch vụ (Free/Pro), theo dõi số lượng doanh nghiệp đăng ký sử dụng.
* Xem dashboard thống kê tổng thể hệ thống (số lượng request, doanh thu nền tảng).

### 3.2. Owner / Manager (Chủ / Quản lý cơ sở dịch vụ)
Người sở hữu không gian làm việc (Workspace) của cơ sở dịch vụ:
* Đăng ký, thiết lập hồ sơ doanh nghiệp (Tên, Loại hình dịch vụ, Logo, Địa chỉ, Số điện thoại, Giờ làm việc).
* Quản lý Danh mục dịch vụ (Service Catalog: dịch vụ cung cấp, giá tham khảo, thời hạn bảo hành/chăm sóc mặc định).
* Quản lý tài khoản nhân viên (Thêm mới, phân vai trò, cập nhật thông tin, khóa tài khoản).
* Xem toàn bộ danh sách phiếu dịch vụ, trực tiếp phân công nhân sự phụ trách (Staff/Service Provider).
* Xác nhận thanh toán hóa đơn thủ công (khi nhận tiền mặt hoặc chuyển khoản ngân hàng).
* Xem báo cáo doanh thu, hiệu suất xử lý của từng nhân viên và điểm đánh giá từ khách hàng.

### 3.3. Staff / Service Provider (Nhân viên / Người thực hiện dịch vụ)
Người trực tiếp xử lý các yêu cầu hoặc cung cấp dịch vụ cho khách:
* Xem danh sách các phiếu dịch vụ được giao phụ trách.
* Cập nhật trạng thái xử lý (Đang kiểm tra/chuẩn bị ➔ Chờ duyệt báo giá ➔ Đang thực hiện ➔ Chờ thanh toán...).
* Ghi chú chi tiết kết quả khảo sát, đánh giá ban đầu hoặc ghi chú kỹ thuật.
* Upload hình ảnh/tệp minh chứng tình trạng trước và sau khi làm việc lên Cloudinary.
* Đề xuất báo giá chi tiết (Bản nháp) gửi lên cho quản lý duyệt trước khi gửi khách.
* Báo cáo phát sinh sự cố trong quá trình thực hiện dịch vụ.

### 3.4. Customer (Khách hàng)
Người sử dụng dịch vụ của doanh nghiệp:
* Gửi yêu cầu dịch vụ hoặc đặt lịch trực tiếp từ trang web công khai của doanh nghiệp.
* Theo dõi tiến trình xử lý dịch vụ theo thời gian thực qua một **liên kết theo dõi bảo mật (Hashed URL)** duy nhất mà không bắt buộc phải tạo tài khoản.
* Xem bảng báo giá chi tiết, bấm "Xác nhận đồng ý" hoặc "Từ chối/Yêu cầu chỉnh sửa" trực tiếp trên giao diện web.
* Tra cứu thông tin bảo hành hoặc lịch sử chăm sóc điện tử bằng Số điện thoại hoặc Mã phiếu.
* Đánh giá chất lượng dịch vụ (số sao + nhận xét) sau khi hoàn tất.

---

## 4. Các khái niệm cốt lõi (Key Domain Concepts)

* **Không gian làm việc (Workspace)**: Mỗi cơ sở dịch vụ đăng ký sẽ có một phân vùng dữ liệu riêng biệt. Tất cả dịch vụ, nhân viên, khách hàng và cấu hình chỉ hiển thị trong phạm vi Workspace đó.
* **Danh mục dịch vụ (Service Catalog)**: Danh sách các dịch vụ chuẩn hóa của cơ sở (ví dụ: *Thay bàn phím laptop* đối với sửa chữa; *Chăm sóc da chuyên sâu* đối với spa; *Chụp ảnh sản phẩm* đối với studio). Mỗi dịch vụ quy định giá tham khảo, thời gian xử lý ước tính và thời gian hỗ trợ/bảo hành mặc định.
* **Yêu cầu dịch vụ / Phiếu dịch vụ (Service Request/Ticket)**: Đối tượng trung tâm chứa toàn bộ thông tin về một lần cung cấp dịch vụ. Gồm mã định danh duy nhất (ví dụ: `REQ-2026-0001`), thông tin đối tượng xử lý (thiết bị, liệu trình, gói chụp), mô tả, nguồn tiếp nhận, trạng thái hiện tại, nhân sự phụ trách và lịch sử thay đổi.
* **Báo giá / Ước tính chi phí (Quotation / Estimate)**: Chứa danh sách các hạng mục chi phí (Vật tư, linh kiện, tiền công thực hiện). Báo giá có trạng thái kiểm soát (Nháp ➔ Chờ duyệt ➔ Đã đồng ý ➔ Đã từ chối). Hệ thống hỗ trợ báo giá bổ sung khi phát sinh thêm yêu cầu trong quá trình thực hiện.
* **Tệp đính kèm / Bằng chứng dịch vụ (Attachments / Service Evidence)**: Tài liệu hoặc hình ảnh thực tế liên quan đến dịch vụ được đính kèm tại các thời điểm quan trọng: lúc tiếp nhận (hiện trạng thiết bị ban đầu, hiện trạng da trước liệu trình, brief của khách) và lúc hoàn thành (sản phẩm hoàn thiện, kết quả sau khi thực hiện).
* **Nhật ký hoạt động / Trục thời gian (Timeline / Audit Log)**: Ghi nhận tự động mọi sự kiện xảy ra đối với phiếu dịch vụ (ví dụ: *09:00 - Tạo phiếu*, *10:15 - Phân công cho nhân viên A*, *11:00 - Gửi báo giá cho khách*...). Đảm bảo tính minh bạch tối đa.
* **Chăm sóc sau dịch vụ / Bảo hành (After-service / Warranty / Follow-up)**: Thông tin hậu mãi hoặc bảo hành điện tử tự động kích hoạt sau khi phiếu dịch vụ hoàn tất, giúp theo dõi lịch nhắc hẹn chăm sóc tiếp theo hoặc thời hạn bảo hành thiết bị.
