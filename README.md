# ServiceFlow Platform

## Project Overview
ServiceFlow is a small business service operation platform designed for repair shops such as laptop, phone, and small electronic device repair services.
The system helps repair shops manage customer requests, staff assignment, service progress, quotations, manual payment tracking, media evidence, warranty, and operational analytics.

## Problem Statement
Many small repair shops currently manage customer requests through Zalo, Facebook, phone calls, paper notes, or spreadsheets. This makes it difficult to track request status, staff responsibility, quotation history, payment status, and warranty information.
ServiceFlow transforms these scattered customer interactions into structured service requests with clear workflow, timeline, quotation, evidence, and warranty tracking.

## Main Workflow
Customer contacts shop  
→ Shop creates service request  
→ Manager assigns staff  
→ Staff checks issue  
→ Shop sends quotation  
→ Customer approves quotation  
→ Staff processes service  
→ Shop updates payment  
→ Request is completed  
→ Warranty/review is recorded

## Tech Stack
* **Frontend**: ReactJS, Vite, TypeScript, TailwindCSS
* **Backend**: ASP.NET Core Web API
* **Database**: MongoDB Atlas
* **Media Storage**: Cloudinary
* **Deployment**: VPS, Docker, Nginx
* **CI/CD**: GitHub Actions

## Project Structure
```text
serviceflow-platform/
├── client/          # Frontend React Application
├── server/          # Backend Clean Architecture Solution
├── docs/            # Specifications and Workflow Documentation
├── nginx/           # Nginx Configuration Skeletons
├── scripts/         # Utility scripts (seeding, deployment)
└── .github/         # GitHub Actions CI/CD workflows
```

## Quick Start (Hướng dẫn chạy nhanh)
Chi tiết xem thêm tại [local-development.md](file:///d:/FullstackProject/serviceflow-platform/serviceflow-platform/docs/setup/local-development.md).

### Khởi chạy Backend:
```bash
cd server
dotnet restore
dotnet run --project ServiceFlow.Api
```
* **Swagger UI**: `http://localhost:5000/swagger`
* **Health Check**: `http://localhost:5000/api/health`

### Khởi chạy Frontend:
```bash
cd client
npm install
npm run dev
```
* **Frontend Local**: `http://localhost:5173`

## Roadmap
* **Phase 0**: Project planning and MVP scope (Completed)
* **Phase 1**: Project foundation (In Progress)
* **Phase 2**: Frontend and backend skeleton
* **Phase 3**: Backend core infrastructure
* **Phase 4**: Authentication
* **Phase 5**: Workspace and member management
* **Phase 6**: Service catalog
* **Phase 7**: Service request workflow
* **Phase 8**: Evidence upload
* **Phase 9**: Quotation and payment tracking
* **Phase 10**: Customer tracking portal
* **Phase 11**: Warranty, review, and notification
* **Phase 12**: Dashboard and analytics
* **Phase 13+**: Deployment and portfolio polish

## Current Status
Project foundation is being prepared (Phase 1).
