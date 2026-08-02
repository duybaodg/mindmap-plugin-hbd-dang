# Mind Map

[English](README.md)

Mind Map là plugin Obsidian để tạo sơ đồ tư duy trực quan nhưng vẫn lưu dưới dạng ghi chú Markdown dễ đọc. Plugin hỗ trợ bố cục tự động, chỉnh sửa bằng bàn phím, ghi chú liên kết, kết nối và nhóm nút, hoàn tác/làm lại, cùng xuất ảnh hoặc PDF.

## Minh họa

![Tổng quan Mind Map](images%20demo/overview.png)
![Hướng dẫn Mind Map](images%20demo/Guide.png)
![Thêm ghi chú vào nút](images%20demo/Add%20note%20on%20Node.png)
![Kết nối các nút](images%20demo/Connect.png)
![Xuất sơ đồ tư duy](images%20demo/Download.png)

## Tính năng

- Tạo và chỉnh sửa sơ đồ tư duy ngay trong Obsidian
- Thêm, đổi tên, di chuyển, gộp, nhóm, kết nối, thu gọn và xóa nút
- Thêm ghi chú vào nút hoặc tạo ghi chú Markdown liên kết
- Kéo để di chuyển, phóng to/thu nhỏ, vừa khung nhìn và dùng bản đồ thu nhỏ
- Tự động lưu sơ đồ dưới dạng Markdown với YAML frontmatter
- Xuất sơ đồ thành PNG, JPEG hoặc PDF
- Hoạt động cục bộ, không gửi yêu cầu mạng hay dùng dịch vụ bên ngoài

## Cách dùng

Mở Command palette và chạy một trong các lệnh:

- **Mind map: Create new mind map**
- **Mind map: Open current file as mind map**
- **Mind map: Save current mind map**

Bạn cũng có thể chọn biểu tượng bản đồ trên ribbon để tạo sơ đồ mới.

Để mở lại sơ đồ đã lưu, mở ghi chú Markdown của sơ đồ, nhấn `Ctrl/Cmd+P`, rồi chạy **Mind map: Open current file as mind map**.

### Phím tắt

| Phím tắt | Thao tác |
| --- | --- |
| `Tab` | Thêm nút con |
| `Enter` | Thêm nút cùng cấp |
| `F2` | Đổi tên nút đang chọn |
| `Backspace` hoặc `Delete` | Xóa nút đang chọn |
| `Ctrl/Cmd+Z` | Hoàn tác |
| `Ctrl/Cmd+Shift+Z` | Làm lại |
| `Ctrl/Cmd+S` | Lưu |
| `Ctrl/Cmd+/` | Mở hướng dẫn |
| `Ctrl/Cmd++` hoặc `+` | Phóng to |
| `Ctrl/Cmd+-` hoặc `-` | Thu nhỏ |
| `Ctrl/Cmd+0` | Đặt lại mức thu phóng |
| Giữ `Space` và kéo | Di chuyển khung vẽ |

Nhấp chuột phải vào nút để sửa nhãn hoặc ghi chú, tạo/mở ghi chú liên kết, gỡ liên kết ghi chú hoặc xóa nút.

## Dữ liệu và quyền riêng tư

Mind Map lưu dữ liệu sơ đồ trong các tệp Markdown của vault. Plugin không gửi dữ liệu qua mạng và không dùng dịch vụ bên ngoài.

## Cài đặt

Sau khi được phát hành, hãy cài **Mind Map** từ **Settings → Community plugins** trong Obsidian.

Để cài thủ công, chép `main.js`, `manifest.json` và `styles.css` vào:

```text
<vault>/.obsidian/plugins/obsidian-mindmap/
```

Sau đó tải lại Obsidian và bật **Mind Map** trong **Community plugins**.

## Phát triển

```bash
npm install
npm test
npm run build
```

## Giấy phép

MIT
