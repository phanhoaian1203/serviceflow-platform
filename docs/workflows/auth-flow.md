# Authentication Workflows

Tài liệu này chứa sơ đồ biểu diễn các luồng xác thực chính trong hệ thống ServiceFlow.

## 1. Đăng ký & Đăng nhập (Register & Login)

```mermaid
sequenceDiagram
    autonumber
    actor User as Khách hàng / Nhân viên
    participant FE as React Client
    participant BE as ASP.NET Core API
    participant DB as MongoDB

    User->>FE: Điền thông tin & Click Đăng nhập/Đăng ký
    FE->>BE: POST /api/v1/auth/login (Email, Password)
    Note over BE: Chuẩn hóa Email<br/>Mã hóa & Kiểm tra Password
    BE->>DB: Truy vấn thông tin User
    DB-->>BE: Kết quả User hợp lệ
    Note over BE: Sinh Access Token (JWT)<br/>Sinh Refresh Token (Base64)
    BE->>DB: Lưu băm Refresh Token (tokenHash)
    DB-->>BE: Xác nhận lưu thành công
    BE-->>FE: HTTP 200 OK (Trả AccessToken + User JSON)
    Note over BE,FE: Set cookie "refreshToken" HttpOnly, Lax
    Note over FE: Lưu AccessToken vào in-memory state
    FE-->>User: Chuyển hướng tới Dashboard
```

## 2. Tự động gia hạn phiên đăng nhập (Silent Token Refresh)

```mermaid
sequenceDiagram
    autonumber
    actor User as Khách hàng / Nhân viên
    participant FE as React Client
    participant BE as ASP.NET Core API
    participant DB as MongoDB

    User->>FE: Tải lại trang (F5 / App Start)
    Note over FE: AccessToken in-memory bị mất
    FE->>BE: POST /api/v1/auth/refresh-token (Tự động kèm Cookie refreshToken)
    Note over BE: Đọc refreshToken từ Cookie<br/>Băm token & so sánh DB
    BE->>DB: Tìm Refresh Token bằng tokenHash
    DB-->>BE: Trả về RefreshToken Entity
    Note over BE: Xác thực tính hợp lệ (Active, Chưa hết hạn)
    Note over BE: Rotate Token:<br/>1. Thu hồi token cũ<br/>2. Phát sinh token mới<br/>3. Sinh AccessToken mới
    BE->>DB: Lưu các thay đổi & token mới
    DB-->>BE: Xác nhận
    BE-->>FE: HTTP 200 OK (Trả AccessToken mới + User JSON)
    Note over BE,FE: Set cookie "refreshToken" mới HttpOnly, Lax
    Note over FE: Lưu AccessToken mới vào in-memory state
    FE-->>User: Tiếp tục duy trì giao diện Dashboard (Không cần đăng nhập lại)
```

## 3. Đăng xuất (Logout)

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng
    participant FE as React Client
    participant BE as ASP.NET Core API
    participant DB as MongoDB

    User->>FE: Bấm Đăng xuất (Logout)
    FE->>BE: POST /api/v1/auth/logout (Tự động kèm Cookie refreshToken)
    Note over BE: Đọc refreshToken từ Cookie<br/>Băm token & so sánh DB
    BE->>DB: Thu hồi Refresh Token (Set RevokedAt = Now)
    DB-->>BE: Xác nhận
    BE-->>FE: HTTP 200 OK (Xóa cookie "refreshToken")
    Note over FE: Xóa AccessToken và User khỏi in-memory state
    FE-->>User: Chuyển hướng về trang Đăng nhập (/login)
```
