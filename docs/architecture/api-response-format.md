# Chuẩn định dạng phản hồi API (API Response Format)

Toàn bộ các endpoint của dự án **ServiceFlow** được cấu hình trả về một cấu trúc phản hồi JSON thống nhất để giúp phía Client (React) dễ dàng xử lý lỗi, hiển thị thông báo và thực hiện phân trang.

---

## 1. Cấu trúc ApiResponse<T>

Mỗi phản hồi từ API đều được bọc trong một phong bì JSON chuẩn:

```json
{
  "success": true,
  "message": "Thông báo trạng thái.",
  "data": {},
  "errors": null,
  "traceId": "..."
}
```

* **success** (boolean): Xác định tác vụ thực thi thành công (`true`) hay gặp lỗi (`false`).
* **message** (string): Tin nhắn mô tả ngắn gọn kết quả (phục vụ hiển thị toast/alert nhanh ở Client).
* **data** (T): Dữ liệu nghiệp vụ trả về từ endpoint.
* **errors** (array): Danh sách các chi tiết lỗi (đặc biệt hữu ích khi gặp lỗi Validation biểu mẫu).
* **traceId** (string): Mã định danh duy nhất của request phục vụ cho việc tra cứu log hệ thống khi gặp lỗi.

---

## 2. Các mẫu phản hồi cơ bản

### 2.1. Phản hồi thành công (Success Response)
```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {
    "serviceName": "ServiceFlow.Api",
    "version": "0.1.0",
    "environment": "Development"
  },
  "errors": null,
  "traceId": "0HN11124235235A:00000001"
}
```

### 2.2. Phản hồi lỗi hệ thống / Nghiệp vụ (Error Response)
Khi API ném ra lỗi hoặc ngoại lệ chưa được xử lý:
```json
{
  "success": false,
  "message": "Không tìm thấy tài nguyên yêu cầu.",
  "data": null,
  "errors": null,
  "traceId": "0HN11124235235A:00000002"
}
```

### 2.3. Phản hồi lỗi kiểm tra biểu mẫu (Validation Error Response)
Khi Client gửi dữ liệu thiếu hoặc không đúng định dạng:
```json
{
  "success": false,
  "message": "Dữ liệu đầu vào không hợp lệ.",
  "data": null,
  "errors": [
    {
      "field": "email",
      "message": "Địa chỉ Email không đúng định dạng.",
      "code": "INVALID_EMAIL"
    },
    {
      "field": "password",
      "message": "Mật khẩu phải dài tối thiểu 6 ký tự.",
      "code": "PASSWORD_TOO_SHORT"
    }
  ],
  "traceId": "0HN11124235235A:00000003"
}
```

---

## 3. Định dạng phân trang (Pagination Result)

Khi truy vấn các API danh sách (ví dụ: danh sách phiếu dịch vụ, danh sách workspace), thuộc tính `data` sẽ có cấu trúc như sau:

```json
{
  "success": true,
  "message": "Lấy danh sách thành công.",
  "data": {
    "items": [
      { "id": "1", "name": "Sửa chữa laptop Dell" },
      { "id": "2", "name": "Vệ sinh máy tính Asus" }
    ],
    "page": 1,
    "pageSize": 10,
    "totalItems": 45,
    "totalPages": 5
  },
  "errors": null,
  "traceId": "0HN11124235235A:00000004"
}
```
* **items** (array): Danh sách thực thể của trang hiện tại.
* **page** (int): Số thứ tự trang hiện tại (bắt đầu từ 1).
* **pageSize** (int): Số lượng phần tử tối đa trên mỗi trang.
* **totalItems** (long): Tổng số phần tử tìm thấy trong hệ thống.
* **totalPages** (long): Tổng số trang tương ứng.
* **totalPages = Ceiling(totalItems / pageSize)**.
