# Tổng quan Thiết kế Cơ sở dữ liệu (Database Design Overview)

Hệ thống **ServiceFlow** sử dụng cơ sở dữ liệu phi quan hệ **MongoDB Atlas** trên đám mây. MongoDB phù hợp với dự án nhờ cấu trúc tài liệu linh hoạt (JSON-like BSON documents), khả năng mở rộng tốt và lưu trữ hiệu quả các dữ liệu động như thông tin bảo hành, báo giá, hình ảnh trước/sau khi sửa chữa.

---

## 1. Cơ chế kết nối và Quản lý Database

* **Database Name**: `ServiceFlowDb` (môi trường development local và cloud).
* **Framework**: Sử dụng bộ thư viện chính thức **MongoDB.Driver** tích hợp trong tầng Infrastructure.
* **Quản lý kết nối**: Đọc an toàn thông qua biến môi trường hoặc User Secrets cục bộ cấu hình qua lớp `MongoDbSettings` và `MongoDbContext`.

---

## 2. Danh sách các Collection cốt lõi

MongoDB là cơ sở dữ liệu Schemaless (không bắt buộc lược đồ cứng nhắc), tuy nhiên dự án sẽ tổ chức dữ liệu theo các collection tài liệu sau:

| Tên Collection | Thực thể tương ứng | Mô tả |
| :--- | :--- | :--- |
| **users** | `User` | Thông tin tài khoản chủ cửa hàng, nhân viên và khách hàng. |
| **refreshTokens** | `RefreshToken` | Quản lý token cấp mới nhằm phục vụ phiên đăng nhập duy trì an toàn. |
| **workspaces** | `Workspace` | Thông tin cửa hàng sửa chữa (tên, slug đại diện, chủ sở hữu). |
| **workspaceMembers** | `WorkspaceMember` | Liên kết phân quyền thành viên vào cửa hàng (Vai trò: Owner, Staff). |
| **services** | `Service` | Danh mục dịch vụ/linh kiện cửa hàng cung cấp (tên, giá niêm yết). |
| **serviceRequests** | `ServiceRequest` | Phiếu yêu cầu dịch vụ (Trạng thái: Tiếp nhận, Đang sửa, Chờ thanh toán, Hoàn thành...). |
| **quotations** | `Quotation` | Báo giá chi tiết gửi đến khách hàng duyệt trước khi sửa chữa. |
| **notifications** | `Notification` | Danh sách thông báo đẩy gửi cho nhân viên/chủ cửa hàng/khách hàng. |
| **reviews** | `Review` | Đánh giá mức độ hài lòng của khách hàng sau khi nhận lại máy. |
| **warranties** | `Warranty` | Quản lý thông tin bảo hành điện tử dựa trên số điện thoại và mã phiếu. |
| **auditLogs** | `AuditLog` | Nhật ký ghi nhận các hành vi thay đổi trạng thái nhạy cảm (báo giá, thanh toán). |

---

## 3. Chiến lược lập chỉ mục (Indexing Strategy)

Để tối ưu hóa hiệu năng truy vấn dữ liệu khi quy mô phiếu sửa chữa tăng cao, chúng tôi xây dựng sẵn lớp khởi tạo chỉ mục chương trình `MongoIndexInitializer` với các index định hướng sau:

1. **users**:
   * Unique Index trên trường `email` (ngăn chặn đăng ký trùng lặp tài khoản).
2. **refreshTokens**:
   * Index trên trường `userId` (truy xuất nhanh token tương ứng).
3. **workspaces**:
   * Unique Index trên trường `slug` (đảm bảo URL định danh cửa hàng không trùng lặp).
4. **workspaceMembers**:
   * Compound Unique Index trên bộ đôi `{ workspaceId, userId }` (tránh thêm một nhân viên hai lần vào cùng một cửa hàng).
5. **serviceRequests**:
   * Compound Index trên bộ đôi `{ workspaceId, status }` (phục vụ lọc phiếu theo trạng thái tại Dashboard cửa hàng).
   * Compound Index trên bộ đôi `{ workspaceId, createdAt }` (sắp xếp phiếu sửa chữa mới nhất).
