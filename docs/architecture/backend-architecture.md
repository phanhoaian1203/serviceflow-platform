# Kiến trúc Backend (Backend Architecture)

Dự án **ServiceFlow** được tổ chức theo triết lý **Clean Architecture** (Kiến trúc sạch) nhằm đảm bảo hệ thống có thể mở rộng, bảo trì dễ dàng và độc lập với các tác nhân bên ngoài (database, UI framework).

---

## 1. Các phân tầng trong Clean Architecture

```
                       ┌──────────────────────┐
                       │   ServiceFlow.Api    │
                       └──────────┬───────────┘
                                  │
      ┌───────────────────────────▼───────────────────────────┐
      │                                                       │
      │              ServiceFlow.Infrastructure               │
      │                                                       │
      └───────────┬───────────────────────────────┬───────────┘
                  │                               │
                  │   ┌───────────────────────┐   │
                  └───►ServiceFlow.Application◄───┘
                      └───────────┬───────────┘
                                  │
                      ┌───────────▼───────────┐
                      │  ServiceFlow.Domain   │
                      └───────────────────────┘
```

### 1.1. ServiceFlow.Domain
* **Trách nhiệm**: Chứa các thực thể cốt lõi (Entities), Value Objects, Enums và logic nghiệp vụ thuần túy không đổi.
* **Nguyên tắc**: Tuyệt đối không phụ thuộc vào bất kỳ thư viện hay tầng nào khác (không có project reference nào).

### 1.2. ServiceFlow.Application
* **Trách nhiệm**: Định nghĩa các Use Case nghiệp vụ cụ thể của hệ thống, xử lý luồng công việc (Request/Response), định nghĩa các Abstraction (Interface) để giao tiếp với cơ sở dữ liệu hoặc dịch vụ ngoài.
* **Sự phụ thuộc**: Chỉ tham chiếu đến dự án `ServiceFlow.Domain`.

### 1.3. ServiceFlow.Infrastructure
* **Trách nhiệm**: Triển khai chi tiết kỹ thuật các Abstraction từ tầng Application bằng cách tích hợp trực tiếp các công nghệ bên ngoài như MongoDB Driver để truy xuất CSDL Atlas, JWT để mã hóa token, hoặc SMTP gửi Email.
* **Sự phụ thuộc**: Tham chiếu đến `ServiceFlow.Application` và `ServiceFlow.Domain`.

### 1.4. ServiceFlow.Api
* **Trách nhiệm**: Tầng biên của hệ thống (Entry Point), nhận request HTTP từ Client, kiểm tra Middleware (Authen, CORS, Global Exception), gọi dịch vụ nghiệp vụ xử lý và trả response chuẩn JSON.
* **Sự phụ thuộc**: Tham chiếu đến `ServiceFlow.Application` và `ServiceFlow.Infrastructure` (phục vụ đăng ký Dependency Injection).

---

## 2. Thiết lập Dependency Injection (DI)

Dự án sử dụng cơ chế Extension Method để đóng gói việc đăng ký DI của từng phân tầng:

1. **Application**: Đăng ký các trình xử lý nghiệp vụ thông qua phương thức mở rộng `AddApplication()` tại `ServiceFlow.Application/DependencyInjection.cs`.
2. **Infrastructure**: Đăng ký các kết nối CSDL, dịch vụ gửi thư, hoặc bộ sinh Token thông qua phương thức `AddInfrastructure(configuration)` tại `ServiceFlow.Infrastructure/DependencyInjection.cs`.
3. **Api**: Nhập các phương thức mở rộng và đăng ký toàn bộ vào IoC container trong file `Program.cs`.
