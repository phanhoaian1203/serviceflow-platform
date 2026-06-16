# Tổng quan Thiết kế Cơ sở dữ liệu (Database Overview)

Hệ thống **ServiceFlow** sử dụng cơ sở dữ liệu phi quan hệ **MongoDB Atlas (Document-based NoSQL)**. Lựa chọn này đem lại sự linh hoạt cao trong thiết kế schema cho các đối tượng dịch vụ có thuộc tính thay đổi động (ví dụ: mô tả thiết bị, linh kiện sửa chữa, các phiên bản báo giá).

---

## 1. Chiến lược Thiết kế (Database Design Strategy)

Hệ thống áp dụng phương pháp **Domain-first + Schema-by-feature** để phát triển cơ sở dữ liệu:
* **Không Migration EF Core truyền thống**: MongoDB không yêu cầu tạo bảng cứng trước. Cấu trúc dữ liệu sẽ tiến hóa dần theo từng Module tính năng được triển khai.
* **Embed vs Reference (Nhúng hay Tham chiếu)**:
  * *Embedding (Nhúng)*: Khuyên dùng cho dữ liệu có mối quan hệ chặt chẽ 1-N nhưng quy mô nhỏ, thường được truy vấn cùng nhau và có vòng đời phụ thuộc vào entity chính. (Ví dụ: các mốc lịch sử xử lý `timeline` và ảnh `attachments` được nhúng trực tiếp bên trong document của phiếu dịch vụ `serviceRequests`).
  * *Referencing (Tham chiếu)*: Dùng khi dữ liệu có thể phình to không giới hạn, hoặc cần chia sẻ truy cập độc lập từ nhiều màn hình. (Ví dụ: `workspaceId` được lưu dạng tham chiếu trong `serviceRequests` và `services`).

---

## 2. Danh sách các Collections dự kiến trong MVP

Dưới đây là thiết kế ở mức tổng quan (High-Level) các Collection sẽ được tạo lập dần qua các giai đoạn triển khai:

### 2.1. Phân hệ Authenticate
1. **`users`**: Lưu trữ tài khoản người dùng hệ thống (chủ shop, nhân viên, quản trị viên).
   * *Thuộc tính chính*: Email, PasswordHash, GlobalRole, IsActive, CreatedAt.
2. **`refreshTokens`**: Quản lý vòng đời token xác thực để hỗ trợ duy trì đăng nhập (Refresh Token).
   * *Thuộc tính chính*: UserId, TokenHash, ExpiresAt, IsRevoked.

### 2.2. Phân hệ Workspace (Cửa hàng)
3. **`workspaces`**: Lưu thông tin không gian làm việc của từng cửa hàng dịch vụ.
   * *Thuộc tính chính*: Name, Slug, LogoUrl, Phone, Address, BusinessHours, Settings.
4. **`workspaceMembers`**: Lưu trữ danh sách nhân sự thuộc từng cửa hàng.
   * *Thuộc tính chính*: WorkspaceId, UserId, WorkspaceRole (Owner, Manager, Staff), IsActive.

### 2.3. Phân hệ Service Catalog (Danh mục dịch vụ)
5. **`services`**: Danh sách dịch vụ sửa chữa của cửa hàng.
   * *Thuộc tính chính*: WorkspaceId, Name, Description, Price, EstimatedHours, DefaultWarrantyDays, IsActive.

### 2.4. Phân hệ Service Request (Phiếu dịch vụ & Sửa chữa)
6. **`serviceRequests`**: Lưu toàn bộ thông tin vòng đời của phiếu sửa chữa (Thực thể trung tâm).
   * *Thuộc tính chính*: Code (`REQ-2026-0001`), WorkspaceId, Customer (Họ tên, SĐT), DeviceDetails (Loại máy, Hãng, Model, Serial), Source (Zalo, Walk-in...), Status, AssignedStaffId, Evidence (Ảnh trước/sau), Timeline (Danh sách các sự kiện thao tác), TrackingToken.

### 2.5. Phân hệ Báo giá & Thanh toán
7. **`quotations`**: Lưu trữ báo giá gửi khách duyệt.
   * *Thuộc tính chính*: RequestId, WorkspaceId, Status (Draft, Sent, Accepted, Rejected), Items (Tên linh kiện/dịch vụ, Giá, Số lượng), Notes, Version.

### 2.6. Phân hệ Sau sửa chữa (Bảo hành, Đánh giá, Thông báo)
8. **`warranties`**: Lưu trữ bảo hành điện tử.
   * *Thuộc tính chính*: RequestId, CustomerPhone, ExpireAt, Status, Notes.
9. **`reviews`**: Đánh giá chất lượng của khách hàng sau khi hoàn tất sửa chữa.
   * *Thuộc tính chính*: RequestId, WorkspaceId, Rating (1-5), Comment, CreatedAt.
10. **`notifications`**: Thông báo đẩy nội bộ hệ thống dành cho nhân viên/quản lý.
    * *Thuộc tính chính*: UserId, Title, Content, IsRead, RedirectUrl, CreatedAt.
11. **`auditLogs`**: Nhật ký hoạt động toàn hệ thống phục vụ giám sát bảo mật.

---

## 3. Quản lý Index & Khởi tạo dữ liệu
* Hệ thống sẽ cấu hình tự động thông qua class `MongoIndexInitializer.cs` trong tầng Infrastructure để tạo các unique index (`users.email`, `workspaces.slug`, `serviceRequests.code`) và index kết hợp nhằm tăng tốc truy vấn cho dashboard.
* Class `DatabaseSeeder.cs` sẽ hỗ trợ tạo dữ liệu mẫu cho Platform Admin và dữ liệu cài đặt cơ bản khi hệ thống chạy lần đầu.
