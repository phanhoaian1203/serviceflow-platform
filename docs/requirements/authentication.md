# Authentication System Requirements

Hệ thống xác thực và quản lý phiên làm việc của ServiceFlow được xây dựng dựa trên sự kết hợp giữa Access Token ngắn hạn và Refresh Token dài hạn.

## API Endpoints

### 1. Đăng ký tài khoản (`POST /api/v1/auth/register`)
- **Mô tả**: Tạo tài khoản người dùng hệ thống mới.
- **Dữ liệu đầu vào**:
  ```json
  {
    "fullName": "Ngọc Ánh",
    "email": "ngocanh@example.com",
    "password": "Password123!"
  }
  ```
- **Quy tắc kiểm tra (Validation)**:
  - `fullName`: Bắt buộc, từ 2 đến 100 ký tự.
  - `email`: Bắt buộc, định dạng email hợp lệ, độ dài tối đa 255 ký tự.
  - `password`: Bắt buộc, tối thiểu 8 ký tự, chứa ít nhất một chữ hoa, một chữ thường và một chữ số.
- **Dữ liệu trả về (Success - 200 OK)**:
  - Trả về Access Token trong JSON Response Body.
  - Thiết lập cookie `refreshToken` HttpOnly, Lax, Secure.

### 2. Đăng nhập (`POST /api/v1/auth/login`)
- **Mô tả**: Kiểm tra email/password, cấp phát cặp token mới.
- **Dữ liệu đầu vào**:
  ```json
  {
    "email": "ngocanh@example.com",
    "password": "Password123!"
  }
  ```
- **Dữ liệu trả về (Success - 200 OK)**:
  - Trả về Access Token và thông tin user trong body.
  - Thiết lập cookie `refreshToken`.
- **Trường hợp lỗi**:
  - Email không tồn tại hoặc sai password -> Trả lỗi HTTP 401 Unauthorized kèm thông điệp chung `Invalid email or password.` để tránh rò rỉ dữ liệu.

### 3. Làm mới token (`POST /api/v1/auth/refresh-token`)
- **Mô tả**: Sử dụng Refresh Token gửi kèm trong cookie để lấy Access Token mới và quay vòng (rotate) Refresh Token.
- **Dữ liệu đầu vào**: Không có request body. Trình duyệt tự động đính kèm cookie `refreshToken`.
- **Dữ liệu trả về (Success - 200 OK)**:
  - Access Token mới.
  - Thiết lập cookie `refreshToken` mới (Rotation).

### 4. Đăng xuất (`POST /api/v1/auth/logout`)
- **Mô tả**: Hủy Refresh Token hiện tại trong database và xóa cookie của trình duyệt.
- **Dữ liệu đầu vào**: Cookie `refreshToken`.
- **Dữ liệu trả về (Success - 200 OK)**:
  - Trả về kết quả thành công và xóa cookie.

### 5. Lấy thông tin hiện tại (`GET /api/v1/auth/me`)
- **Mô tả**: Lấy thông tin tài khoản đăng nhập hiện tại từ Access Token.
- **Dữ liệu đầu vào**: Header `Authorization: Bearer <accessToken>`.
- **Dữ liệu trả về (Success - 200 OK)**:
  ```json
  {
    "success": true,
    "message": "Current user loaded successfully.",
    "data": {
      "id": "...",
      "fullName": "Ngọc Ánh",
      "email": "ngocanh@example.com",
      "systemRole": "User"
    }
  }
  ```
