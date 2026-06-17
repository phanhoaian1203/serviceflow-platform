# Hướng dẫn thiết lập MongoDB Atlas và Cấu hình User Secrets trên Visual Studio

Tài liệu này hướng dẫn chi tiết cách thiết lập database MongoDB Atlas trên đám mây, kết nối bằng MongoDB Compass, và cấu hình thông tin kết nối bảo mật bằng công cụ **User Secrets** tích hợp sẵn trong **Visual Studio** để phục vụ việc phát triển local mà không sợ lộ mã bảo mật.

---

## 1. Thiết lập MongoDB Atlas

### 1.1. Tạo Tài khoản và Cluster
1. Truy cập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) và đăng ký tài khoản miễn phí.
2. Tạo một **Project** mới (ví dụ: `ServiceFlow`).
3. Tạo một **Database Deployments (Cluster)** mới: chọn gói **M0 (Free)** để được miễn phí, chọn Cloud Provider gần bạn nhất (ví dụ: AWS Singapore) và nhấn **Create**.

### 1.2. Tạo Database User
1. Ở menu bên trái, chọn **Database Access** dưới mục **Security**.
2. Chọn **+ Add New Database User**.
3. Chọn phương thức xác thực **Password**.
4. Thiết lập **Username** (ví dụ: `serviceflow_dev`) và nhập mật khẩu an toàn. Nhớ lưu lại thông tin này!
5. Thiết lập quyền hạn (Database User Privileges) là **Read and write to any database**.
6. Nhấn **Add User** để hoàn tất.

### 1.3. Cấu hình IP Allowlist (Network Access)
1. Ở menu bên trái, chọn **Network Access** dưới mục **Security**.
2. Chọn **+ Add IP Address**.
3. Nhấp chọn **Allow Access From Anywhere** (địa chỉ `0.0.0.0/0`) để cho phép kết nối từ mọi nơi (tiện lợi cho học tập và phát triển local), hoặc chọn **Add Current IP Address** để chỉ cho phép máy tính hiện tại của bạn.
4. Nhấn **Confirm** và đợi trạng thái chuyển sang **Active**.

### 1.4. Lấy Connection String
1. Quay lại trang **Database** ở mục **Deployment**.
2. Chọn nút **Connect** bên cạnh Cluster của bạn.
3. Chọn phương thức kết nối:
   * **Compass**: Để lấy link kết nối bằng ứng dụng desktop MongoDB Compass.
   * **Driver**: Chọn ngôn ngữ **C#** và phiên bản thích hợp để lấy link kết nối của ứng dụng .NET.
4. Đường dẫn kết nối sẽ có định dạng tương tự:
   `mongodb+srv://serviceflow_dev:<password>@your-cluster.mongodb.net/?retryWrites=true&w=majority`
   *(Thay thế `<password>` bằng mật khẩu của user database bạn vừa tạo ở bước 1.2)*

---

## 2. Hướng dẫn cấu hình User Secrets trên Visual Studio (Màu tím)

Để bảo vệ Connection String không bị đẩy lên GitHub, ASP.NET Core hỗ trợ tính năng **User Secrets** trong môi trường Development. Visual Studio tím cung cấp giao diện đồ họa rất trực quan để thao tác. Hãy làm theo các bước dưới đây:

### Bước 1: Mở Solution bằng Visual Studio
Khởi động Visual Studio và mở file solution `ServiceFlow.slnx` của dự án.

### Bước 2: Truy cập tính năng Quản lý User Secrets
1. Trong cửa sổ **Solution Explorer**, tìm đến project **`ServiceFlow.Api`**.
2. Nhấp chuột phải (Right-click) vào project **`ServiceFlow.Api`**.
3. Trong menu đổ xuống, tìm và chọn **`Manage User Secrets`** (hoặc **`Quản lý Bí mật Người dùng`** nếu bạn dùng ngôn ngữ tiếng Việt).

![Manage User Secrets Menu](https://raw.githubusercontent.com/dotnet/docs/main/docs/core/tutorials/media/manage-user-secrets.png) *(Hình minh họa menu của Visual Studio)*

### Bước 3: Nhập Connection String vào File Secrets.json
1. Visual Studio sẽ tự động tạo và mở ra một file có tên là `secrets.json`. File này được lưu ở thư mục hệ thống người dùng (Appdata) của Windows, hoàn toàn nằm ngoài thư mục source code dự án nên **không bao giờ lo bị Git commit**.
2. Hãy sao chép và dán cấu hình JSON sau vào file `secrets.json`:

```json
{
  "MongoDb": {
    "ConnectionString": "mongodb+srv://serviceflow_dev:MẬT_KHẨU_THẬT_CỦA_BẠN@your-cluster.mongodb.net/?retryWrites=true&w=majority",
    "DatabaseName": "ServiceFlowDb"
  }
}
```

> [!WARNING]
> Thay thế `MẬT_KHẨU_THẬT_CỦA_BẠN` bằng mật khẩu thật của User Database MongoDB Atlas và thay thế địa chỉ cluster bằng địa chỉ cluster thật của bạn.

### Bước 4: Lưu File và Hoàn tất
1. Nhấn tổ hợp phím **`Ctrl + S`** để lưu lại file `secrets.json`.
2. Bạn có thể đóng file này lại. Khi ứng dụng khởi chạy ở local dưới môi trường `Development`, .NET runtime sẽ tự động gộp các cấu hình bí mật này vào hệ thống và kết nối cơ sở dữ liệu bình thường.
