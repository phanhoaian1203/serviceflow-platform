# ServiceFlow Platform

## Project Overview
ServiceFlow is a lightweight service operations platform that helps small service businesses (such as repair shops, spas, photography studios, beauty salons, cleaning, and maintenance services) manage customer requests, bookings, quotations, work progress, payments, and after-service follow-up in one place.

While the system is designed to be industry-agnostic, the initial MVP focuses on a technology device repair shop use case to provide a concrete, fully implemented workflow for testing and demonstration.

## Problem Statement
Many small service businesses manage customer interactions through fragmented channels like Zalo, Facebook, phone calls, paper slips, or spreadsheets. This makes it difficult to track service progress, assign staff, manage quotation revisions, record payments, and handle after-service care or warranty requests.
ServiceFlow centralizes these operations into a unified platform with clean digital workflows, status tracking, secure online quotations, before/after evidence logging, and follow-up tools.

## Main Workflow
Customer submits request/booking  
→ Workspace receives & accepts request  
→ Manager/Owner assigns staff  
→ Staff reviews & prepares/inspects  
→ Business sends digital quotation/estimate  
→ Customer approves quotation/estimate  
→ Staff performs & completes service  
→ Customer pays & workspace records payment  
→ Service request is completed  
→ After-service follow-up, feedback, or warranty is tracked

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
