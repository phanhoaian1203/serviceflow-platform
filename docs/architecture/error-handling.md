# Cơ chế xử lý lỗi toàn cục (Global Error Handling)

Dự án **ServiceFlow** sử dụng một cơ chế xử lý lỗi tập trung (Centralized Exception Handling) thông qua ASP.NET Core Middleware. Cách tiếp cận này giúp hạn chế việc sử dụng khối lệnh `try-catch` lặp đi lặp lại ở tầng Controller, giữ cho code API luôn sạch sẽ và phản hồi lỗi nhất quán.

---

## 1. Luồng xử lý lỗi (Exception Handling Pipeline)

Khi bất kỳ phân tầng nào (Application, Infrastructure, Domain) ném ra một ngoại lệ (Exception), luồng thực thi sẽ lập tức ngắt và chuyển tiếp về `ExceptionHandlingMiddleware` đặt ở đầu request pipeline:

```
Request ──► Middleware Pipeline ──► Controller ──► Business Service
                                                      │ (Ném Exception)
Response ◄── [ExceptionMiddleware] ◄── Trả về lỗi ◄───┘
```

1. **Log lỗi**: Hệ thống ghi nhận log bao gồm chi tiết lỗi và StackTrace để phục vụ việc giám sát bằng Seq hoặc console.
2. **Ánh xạ Status Code**: Xác định loại Exception để chuyển đổi thành HTTP status code tương ứng (400, 401, 403, 404, 409, hoặc 500).
3. **Đóng gói Response**: Tạo một đối tượng `ApiResponse<object>.Fail(...)` chuẩn hóa chứa TraceId và trả về Client dưới định dạng JSON.

---

## 2. Các lớp Ngoại lệ Tự định nghĩa (Custom Exceptions)

Chúng tôi định nghĩa lớp cơ sở `AppException` kế thừa từ `Exception`, từ đó phát triển các exception đại diện cho các mã lỗi HTTP thường gặp ở tầng Application:

| Lớp Exception | HTTP Status | Mã lỗi nội bộ | Mô tả |
| :--- | :---: | :---: | :--- |
| **BadRequestException** | 400 | `BAD_REQUEST` | Dữ liệu đầu vào không hợp lệ hoặc tác vụ không thể thực hiện do vi phạm quy tắc. |
| **UnauthorizedException** | 401 | `UNAUTHORIZED` | Người dùng chưa xác thực (thiếu JWT hoặc token hết hạn). |
| **ForbiddenException** | 403 | `FORBIDDEN` | Người dùng đã xác thực nhưng không có quyền truy cập vào tài nguyên (ví dụ: nhân viên cố tình xóa workspace). |
| **NotFoundException** | 404 | `NOT_FOUND` | Không tìm thấy thực thể được yêu cầu (ví dụ: sai ID phiếu yêu cầu). |
| **ConflictException** | 409 | `CONFLICT` | Xung đột trạng thái dữ liệu (ví dụ: trùng lặp email đăng ký, trùng slug). |
| **Ngoại lệ khác (Exception)** | 500 | `INTERNAL_SERVER_ERROR` | Lỗi phát sinh ngoài ý muốn từ hệ thống hoặc driver database. |

---

## 3. Chính sách Logging và Dữ liệu nhạy cảm

Để đảm bảo an toàn thông tin (Security & Compliance):

* **Được phép log**:
  * Trạng thái khởi chạy ứng dụng (`Application started`).
  * Tên môi trường thực thi (`Development`, `Production`).
  * Chi tiết lỗi không nhạy cảm (như loại exception, tin nhắn lỗi, StackTrace, endpoint URL).
  * Trạng thái kết nối cơ sở dữ liệu (`MongoDB is healthy` / `Unhealthy`).
* **Tuyệt đối KHÔNG ghi log**:
  * Mật khẩu người dùng (`Password`).
  * Connection string đầy đủ chứa mật khẩu của MongoDB Atlas.
  * Khóa bí mật ký token JWT (`JwtSecret`).
  * Các mã truy cập (`AccessToken`, `RefreshToken`).
  * Mã API của Cloudinary, Email App Password.
