# Kiến trúc dự án và Cấu trúc thư mục (Project Structure)

Tài liệu này đặc tả cấu trúc mã nguồn của toàn bộ dự án **ServiceFlow** và sơ đồ phụ thuộc giữa các tầng trong mô hình **Clean Architecture**.

---

## 1. Cấu trúc Monorepo tổng quan
```text
serviceflow-platform/
│
├── client/                 # Frontend ReactJS + Vite + TailwindCSS
│   └── README.md
│
├── server/                 # Backend ASP.NET Core Web API
│   ├── ServiceFlow.sln
│   ├── ServiceFlow.Api/
│   ├── ServiceFlow.Application/
│   ├── ServiceFlow.Domain/
│   ├── ServiceFlow.Infrastructure/
│   ├── ServiceFlow.UnitTests/
│   ├── ServiceFlow.IntegrationTests/
│   └── README.md
│
├── docs/                   # Tài liệu phân tích thiết kế hệ thống
│   ├── overview/           # Project overview, problem statement
│   ├── requirements/       # MVP scope, functional requirements
│   ├── workflows/          # State machines, workflow diagram
│   ├── architecture/       # Tài liệu kiến trúc phần mềm
│   └── database/           # Sơ đồ và thiết kế cơ sở dữ liệu
│
├── nginx/                  # File cấu hình Nginx cho Deploy
│   └── README.md
│
├── scripts/                # Script hỗ trợ setup, seed data, deploy
│
├── .github/
│   └── workflows/          # Workflow CI/CD (GitHub Actions)
│
├── .gitignore
├── .env.example
├── docker-compose.yml      # Cấu hình container local development
├── docker-compose.prod.yml # Cấu hình container production deploy
├── README.md
└── LICENSE
```

---

## 2. Kiến trúc Backend (ASP.NET Core Web API)
Mã nguồn phía server được tổ chức theo triết lý **Clean Architecture** (Kiến trúc sạch) nhằm cô lập nghiệp vụ cốt lõi khỏi các framework và tác nhân bên ngoài.

```
       ┌────────────────────────────────────────────────────────┐
       │                  ServiceFlow.Api                       │
       └────────────────────────┬───────────────────────────────┘
                                │
        ┌───────────────────────▼───────────────────────┐
        │                                               │
        │          ServiceFlow.Infrastructure           │
        │                                               │
        └───────┬───────────────────────────────┬───────┘
                │                               │
                │   ┌───────────────────────┐   │
                └───► ServiceFlow.Application◄──┘
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │  ServiceFlow.Domain   │
                    └───────────────────────┘
```

### 2.1. ServiceFlow.Domain (Tầng lõi nghiệp vụ)
* **Vai trò**: Chứa các thực thể (Entities), Value Objects, Enums, các hằng số hệ thống (Constants) và quy tắc nghiệp vụ cốt lõi không bao giờ thay đổi.
* **Nguyên tắc**: Không phụ thuộc vào bất kỳ thư viện hoặc project nào khác (không có project reference). Hoàn toàn độc lập với database (MongoDB) và ASP.NET Core Web API.

### 2.2. ServiceFlow.Application (Tầng logic ứng dụng)
* **Vai trò**: Chứa các Use Case (luồng nghiệp vụ cụ thể của hệ thống), các DTOs phục vụ truyền nhận dữ liệu qua API, các Validators kiểm tra định dạng dữ liệu đầu vào (FluentValidation), và cấu hình Mapping dữ liệu.
* **Tầm quan trọng**: Định nghĩa các **Abstractions (Interfaces)** cho tầng hạ tầng implement (ví dụ: `IUserRepository`, `IQuotationRepository`, `IJwtTokenGenerator`, `IFileStorageService`).
* **Sự phụ thuộc**: Chỉ reference duy nhất đến project `ServiceFlow.Domain`.

### 2.3. ServiceFlow.Infrastructure (Tầng hạ tầng kỹ thuật)
* **Vai trò**: Triển khai các interface từ tầng Application bằng các công nghệ thật như kết nối MongoDB Atlas (Repositories, DBContext), bảo mật mã hóa JWT/Password hash, upload ảnh lên Cloudinary và gửi Email qua SMTP.
* **Sự phụ thuộc**: Reference đến cả `ServiceFlow.Application` và `ServiceFlow.Domain`.

### 2.4. ServiceFlow.Api (Tầng giao diện API HTTP)
* **Vai trò**: Nhận request từ Client, kiểm tra tính hợp lệ (Filters), gọi Application Service xử lý, bắt lỗi ngoại lệ (Middlewares) và trả response chuẩn JSON. Chứa file `Program.cs` cấu hình Dependency Injection toàn hệ thống.
* **Sự phụ thuộc**: Reference đến `ServiceFlow.Application` và `ServiceFlow.Infrastructure` (phục vụ đăng ký DI).

---

## 3. Quy tắc Phụ thuộc Project (Project Reference Validation Rules)

Để bảo toàn kiến trúc Clean Architecture, các project reference phải tuân thủ nghiêm ngặt bảng ma trận sau:

| Project | Domain | Application | Infrastructure | Api | UnitTests | IntegrationTests |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Domain** | | | | | | |
| **Application** | 🟢 | | | | | |
| **Infrastructure** | 🟢 | 🟢 | | | | |
| **Api** | | 🟢 | 🟢 | | | | |
| **UnitTests** | 🟢 | 🟢 | | | | |
| **IntegrationTests** | 🟢 | 🟢 | 🟢 | 🟢 | | |

* **🟢 (Cho phép)**: Project hàng ngang được phép tham chiếu (reference) tới Project cột dọc.
* **Chỗ trống (Cấm)**: Không được phép tham chiếu chéo hoặc tham chiếu ngược (ví dụ: Application tuyệt đối không được tham chiếu tới Infrastructure).
