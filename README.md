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

## Cấu trúc thư mục và ý nghĩa

```
bloodline-dna-frontend/
├── public/                 # Tài nguyên tĩnh như favicon, index.html
├── src/
│   ├── assets/             # Hình ảnh, fonts, media
│   ├── components/         # Các component React tái sử dụng UI
│   ├── constants/          # Các hằng số, config tĩnh dùng chung
│   ├── contexts/           # React Context quản lý state toàn cục
│   ├── hooks/              # Custom React hooks dự án
│   ├── modules/            # Các module hoặc tính năng lớn (feature)
│   ├── routes/             # Định nghĩa React Router các route
│   ├── utils/              # Các hàm helper chung
│   ├── App.tsx             # Component gốc ứng dụng
│   ├── main.tsx            # Điểm vào ứng dụng (render React vào DOM)
│   └── vite-env.d.ts       # Khai báo môi trường Vite
├── .editorconfig           # Quy chuẩn format editor
├── .eslintrc.cjs           # Cấu hình ESLint
├── .gitignore              # Các file/thư mục git sẽ bỏ qua
├── .prettierignore         # File ignore cho Prettier
├── .prettierrc             # Cấu hình Prettier
├── eslint.config.js        # File cấu hình ESLint (tùy dự án)
├── index.html              # HTML gốc, template của Vite
├── package.json            # Thông tin project & scripts
├── postcss.config.js       # Cấu hình PostCSS (dùng cho TailwindCSS)
├── tailwind.config.js      # Cấu hình TailwindCSS
├── tsconfig.app.json       # Cấu hình TypeScript cho app
├── tsconfig.json           # Cấu hình TypeScript chung
├── tsconfig.node.json      # Cấu hình TypeScript cho node scripts
├── vite.config.ts          # Cấu hình Vite
└── yarn.lock               # Khóa phiên bản package
```

---

## Quy trình quản lý code và branch

- **main**: nhánh ổn định, deploy production
- **develop**: nhánh phát triển chung
- **feature/\<tên-feature>**: nhánh riêng cho từng tính năng/task
- **hotfix/\<tên-hotfix>**: sửa lỗi nhanh trên main hoặc develop

### Quy trình làm việc

1. Cập nhật nhánh develop mới nhất:

```bash
git checkout develop
git pull origin develop
```

2. Tạo nhánh feature mới:

```bash
git checkout -b feature/<tên-feature>
```

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
