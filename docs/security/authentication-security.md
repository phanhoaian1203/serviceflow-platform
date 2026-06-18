# Authentication Security Design

Tài liệu này chi tiết thiết kế bảo mật cho hệ thống xác thực của ServiceFlow.

## 1. Lưu trữ và Bảo mật Mật khẩu
- **Không lưu mật khẩu thô**: Mật khẩu của người dùng được mã hóa bằng thuật toán băm mật khẩu một chiều cực mạnh trước khi lưu vào cơ sở dữ liệu MongoDB.
- **ASP.NET Core Identity PasswordHasher**: Sử dụng lớp `PasswordHasher<T>` của Microsoft, sử dụng thuật toán PBKDF2 với băm SHA256, tự động sinh muối ngẫu nhiên (salt) cho mỗi mật khẩu băm để ngăn chặn các cuộc tấn công Rainbow Table.

## 2. Quản lý Access Token (JWT)
- **Token ngắn hạn (Short-lived Access Token)**: Access Token có hiệu lực trong **15 phút**. Việc rút ngắn hạn sử dụng giúp hạn chế rủi ro nếu token bị lộ.
- **In-memory Storage**: Access Token được trả về trong JSON body của API Response và được lưu trữ hoàn toàn trong bộ nhớ (in-memory state) của React client. Token này sẽ bị mất khi người dùng reload trang, tránh nguy cơ bị đánh cắp bởi các cuộc tấn công XSS đọc dữ liệu từ `localStorage` hoặc `sessionStorage`.
- **Claims tối giản**: Chỉ lưu trữ thông tin định danh tối giản (`sub` làm `UserId`, `email`, `jti`, và `systemRole`). Không nhét thông tin nhạy cảm khác vào payload token.

## 3. Quản lý Refresh Token & Cookie bảo mật
- **HttpOnly Cookie**: Refresh Token được đính kèm vào trình duyệt dưới dạng Cookie HttpOnly.
  - `HttpOnly = true`: Ngăn chặn các đoạn mã JavaScript (XSS) truy cập vào token này.
  - `Secure = true` (ở Production): Cookie chỉ được gửi qua kết nối HTTPS an toàn.
  - `SameSite = Lax`: Chặn gửi cookie trong các truy vấn chéo trang (CSRF protection) nhưng vẫn đảm bảo trải nghiệm đăng nhập liền mạch khi chuyển hướng thông thường.
  - `Path = /`: Cookie chỉ có giá trị cho toàn bộ website.
- **Không lưu Refresh Token thô**: Cơ sở dữ liệu MongoDB chỉ lưu trữ băm SHA256 của Refresh Token (`tokenHash`). Trong trường hợp database bị rò rỉ, kẻ tấn công cũng không thể sử dụng mã băm này để lấy Access Token mới.
- **Quy trình xoay vòng Token (Refresh Token Rotation)**:
  - Mỗi khi khách hàng xin cấp Access Token mới thông qua Refresh Token hiện tại, Backend sẽ ngay lập tức **thu hồi (revoke)** Refresh Token cũ, đánh dấu trường `ReplacedByTokenHash`, và cấp phát một cặp Access Token & Refresh Token hoàn toàn mới.
  - Cơ chế này giúp phát hiện các hành vi trộm cắp token: Nếu một Refresh Token đã bị thu hồi đột ngột được gửi lên hệ thống, Backend có thể đánh dấu phiên đăng nhập đó bị thỏa hiệp và thu hồi toàn bộ chuỗi token liên đới của user đó.

## 4. Kiểm soát lỗi đăng nhập (Credential Enumeration Mitigation)
- Khi xác thực thất bại tại API Đăng nhập, Backend luôn trả về thông điệp lỗi chung: `Invalid email or password.`
- Tránh trả về các thông báo chi tiết như `"Email does not exist"` hoặc `"Wrong password"` để chặn việc kẻ xấu dò quét danh sách email có tài khoản trên hệ thống.
