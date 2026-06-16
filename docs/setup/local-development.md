# Hướng dẫn thiết lập môi trường phát triển cục bộ (Local Development Setup)

Tài liệu này hướng dẫn cách chạy và phát triển dự án **ServiceFlow** trên máy tính cá nhân (local environment).

---

## 1. Yêu cầu hệ thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
* **.NET 10.0 SDK** hoặc mới hơn.
* **Node.js (v20.x hoặc mới hơn)** & **npm** (để chạy Frontend).
* **IDE/Editor**: khuyên dùng **Visual Studio 2022** hoặc **VS Code** (kèm extension C# Dev Kit và Volar/ESLint cho React).
* **Docker Desktop** (không bắt buộc, dùng để chạy thử nghiệm container).

---

## 2. Cài đặt và cấu hình

### Bước 1: Clone dự án và truy cập thư mục
```bash
git clone https://github.com/phanhoaian1203/serviceflow-platform.git
cd serviceflow-platform
```

### Bước 2: Thiết lập biến môi trường
* Ở thư mục gốc dự án, tạo một file tên `.env` từ file `.env.example` và điều chỉnh các giá trị phù hợp (đặc biệt là kết nối MongoDB và Cloudinary khi bước vào các phase sau).
* Ở thư mục `client/`, tạo một file tên `.env` và đảm bảo biến `VITE_API_BASE_URL` trỏ tới URL API local của backend.
  ```env
  VITE_API_BASE_URL=http://localhost:5000/api/v1
  VITE_APP_NAME=ServiceFlow
  ```

---

## 3. Khởi chạy ứng dụng

### 3.1. Chạy Backend (ASP.NET Core Web API)
Di chuyển vào thư mục `server/` và khởi chạy API:
```bash
cd server
dotnet restore
dotnet run --project ServiceFlow.Api
```
API sẽ khởi động mặc định tại địa chỉ: `http://localhost:5000`

### 3.2. Chạy Frontend (ReactJS + Vite)
Mở một terminal mới, di chuyển vào thư mục `client/` và chạy:
```bash
cd client
npm install
npm run dev
```
Frontend sẽ chạy mặc định tại địa chỉ: `http://localhost:5173`

---

## 4. Các đường dẫn truy cập quan trọng (Useful Links)

Sau khi khởi chạy thành công cả frontend và backend, bạn có các địa chỉ truy cập sau:

| Thành phần | Địa chỉ (URL) | Mô tả |
| :--- | :--- | :--- |
| **Frontend App** | `http://localhost:5173` | Giao diện web người dùng |
| **Backend Root** | `http://localhost:5000` | Địa chỉ gốc của Web API |
| **Swagger UI** | `http://localhost:5000/swagger` | Giao diện thử nghiệm API tương tác |
| **Health Check** | `http://localhost:5000/api/health` | Kiểm tra trạng thái hoạt động của Backend |
| **System Info** | `http://localhost:5000/api/v1/system/info` | Endpoint thông tin hệ thống (ApiResponse mẫu) |

---

## 5. Chạy bằng Docker Compose (Tùy chọn)

Nếu bạn muốn chạy toàn bộ ứng dụng thông qua Docker, hãy khởi động Docker Desktop và thực thi lệnh sau tại thư mục gốc của dự án:
```bash
docker compose up --build
```
* Container Frontend sẽ chạy trên port `5173`
* Container Backend sẽ chạy trên port `5000`
