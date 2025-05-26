# README.md cho frontend `bloodline-dna-frontend`

````markdown
# Bloodline DNA Testing Service - Frontend

## Giới thiệu

Frontend hệ thống quản lý dịch vụ xét nghiệm ADN huyết thống, xây dựng bằng React, TypeScript, Vite, TailwindCSS.

---

## Yêu cầu môi trường

- Node.js >=16
- Yarn
- Trình duyệt hiện đại (Chrome, Firefox, Edge...)

---

## Cài đặt và chạy project

1. Clone repo về:

```bash
git clone https://github.com/your-org/bloodline-dna-frontend.git
cd bloodline-dna-frontend
```
````

2. Cài package:

```bash
yarn install
```

3. Chạy project:

```bash
yarn dev
```

Ứng dụng sẽ chạy trên `http://localhost:5173` (hoặc port do Vite chỉ định).

---

Dưới đây là nội dung bạn có thể copy vào phần `README.md` để mô tả **cấu trúc thư mục** của dự án frontend `Bloodline DNA Testing Service Management System`:

---

Dưới đây là phần **tổng hợp cấu trúc thư mục chi tiết** bạn có thể **copy dán vào `README.md`** để mô tả rõ ràng kiến trúc frontend của dự án **Bloodline DNA Testing Service Management System**:

---

## 📁 Cấu trúc thư mục frontend

Dự án sử dụng kiến trúc **feature-based modular architecture**, chia theo từng tính năng, dễ bảo trì và mở rộng trong tương lai.

```bash
bloodline-dna-frontend/
├── public/                         # File tĩnh (favicon, logo, robots.txt, etc.)
├── src/
│   ├── assets/                     # Tài nguyên chung (ảnh, fonts, icons,...)
│   ├── components/                 # UI components dùng toàn app (Button, Modal, Spinner,...)
│   ├── constants/                  # Các hằng số toàn cục (routes, enums, config,...)
│   ├── features/                   # Các module chức năng (feature-based)
│   │   ├── auth/                   # Đăng nhập, đăng ký, xác thực
│   │   │   ├── components/        # UI riêng cho auth
│   │   │   ├── pages/             # Trang login, register,...
│   │   │   ├── services/          # Gọi API liên quan auth
│   │   │   ├── hooks/             # Custom hooks riêng của auth
│   │   │   ├── slices/            # Redux slice / Zustand store (nếu dùng)
│   │   │   ├── types/             # Kiểu dữ liệu liên quan auth
│   │   │   └── index.ts           # Barrel exports
│   │   ├── customer/              # Người dùng đặt xét nghiệm
│   │   ├── appointment/           # Đặt lịch xét nghiệm
│   │   ├── dnaTest/               # Quản lý xét nghiệm và kết quả
│   │   ├── sampleTracking/        # Theo dõi mẫu xét nghiệm
│   │   ├── manager/               # Tính năng cho quản lý trung tâm
│   │   ├── admin/                 # Tính năng dành cho admin hệ thống
│   │   └── ...                    # (Mở rộng thêm nếu cần)
│   ├── hooks/                      # Custom hooks dùng toàn app (useDebounce, useAuth, etc.)
│   ├── layouts/                    # Bố cục chính (MainLayout, AuthLayout,...)
│   ├── pages/                      # Entry cho từng trang nếu cần mapping
│   ├── routes/                     # Cấu hình route, bảo vệ route,...
│   ├── services/                   # Gọi API chung (axios instance, interceptor,...)
│   ├── styles/                     # CSS/tailwind hoặc global styles
│   ├── utils/                      # Hàm tiện ích dùng chung (formatDate, validateEmail,...)
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point chính
│   └── vite-env.d.ts               # Cấu hình hỗ trợ cho Vite
├── .eslintrc.cjs                   # Cấu hình ESLint
├── .prettierrc                     # Cấu hình Prettier
├── package.json                    # Thông tin dependencies
├── tsconfig.json                   # Cấu hình TypeScript
└── README.md                       # Mô tả dự án, hướng dẫn cài đặt
```

---

### ✅ Nguyên tắc tổ chức

* **Tách rõ theo tính năng**: Mỗi module nằm trong `features/` chứa đầy đủ component, logic, API, hook, store, type riêng.
* **Không cần thư mục `shared/`**: Vì mọi thứ đã được chia rõ theo từng feature hoặc dùng chung thì nằm trong `components/`, `hooks/`, `utils/`.
* **Dễ scale**: Khi cần thêm tính năng mới (ví dụ: `billing`, `notifications`), chỉ cần tạo thêm thư mục trong `features/`.

---

📌 *Gợi ý*: Mỗi `features/<module>` có thể có file `index.ts` để `barrel export` giúp import code gọn hơn.

Bạn có thể dán nguyên block này vào README. Nếu muốn mình tạo sẵn file `README.md` markdown đúng chuẩn để paste vào VS Code, mình có thể gửi luôn!


## Quy trình quản lý code và branch

- **main**: nhánh ổn định, deploy production
- **develop**: nhánh phát triển chung
- **feature/\<tên-feature>**: nhánh riêng cho từng tính năng/task
- **hotfix/\<tên-hotfix>**: sửa lỗi nhanh trên main hoặc develop

### Quy trình làm việc
đầu tiên nè mấy ba mở terminal npm install --global yarn
git clone project về

1. Cập nhật nhánh develop mới nhất:

```bash
git checkout develop
git pull origin develop
```
yarn install

2. Tạo nhánh feature mới:

```bash
git checkout -b feature/<tên-feature>
```
yarn dev
3. Viết code, commit rõ ràng.

4. Đẩy nhánh lên repo:

```bash
git push -u origin feature/<tên-feature>
```

5. Tạo Pull Request để review và merge vào develop.

---

## Công cụ và chuẩn coding

- Dùng ESLint + Prettier để giữ style code chuẩn
- TailwindCSS để viết CSS tiện lợi, nhanh chóng
- Viết test (unit test, component test) trong thư mục phù hợp
- Chạy dev bằng `yarn dev` với hot reload của Vite

---

## Liên hệ

Mọi thắc mắc, vấn đề vui lòng liên hệ nhóm trưởng hoặc tạo issue trên GitHub.
