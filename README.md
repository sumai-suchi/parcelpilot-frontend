<div align="center">

# 📦 ParcelPilot • Frontend Operating System
### Enterprise Multi-Role Logistics, Courier Fleet & Telemetry Engine

[![Next.js](https://img.shields.io/badge/Next.js-16.3_(Turbopack)-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Base_UI_Primitives-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Recharts](https://img.shields.io/badge/Recharts-Data_Viz-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://recharts.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Smooth_Physics-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Production_Live-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://parcelpilot-frontend-phi.vercel.app)

<br />

**[🌐 Live Production Web App](https://parcelpilot-frontend-phi.vercel.app)** • **[🚀 Backend API Gateway](https://parcel-pilot-dun.vercel.app/api/v1)** • **[🔑 Recruiter Test Credentials](#-role-based-demo-accounts--test-flight)** • **[🏗️ System Architecture](#️-frontend-architecture--design-system)**

</div>

---

## 🌟 Executive Overview

**ParcelPilot Frontend** is a production-grade, enterprise-scale logistics operating system and courier cockpit engineered with **Next.js 16 (App Router)** and **React 19**. 

Rather than a simple tracking interface, ParcelPilot orchestrates a complex, nationwide supply chain ecosystem spanning **5 distinct operational personas** (`ADMIN`, `OPERATIONS_MANAGER`, `HUB_MANAGER`, `COURIER`, and `CUSTOMER / MERCHANT`), unified under a cohesive **dark-mode telemetry design language** built on **shadcn/ui** and **Tailwind CSS v4**.

From sub-second **interactive freight tariff simulators** and **3D-calibrated volumetric weight calculators** to real-time **hub conveyor utilization telemetry**, **OTP-gated doorstep deliveries**, and **Stripe financial settlement**, ParcelPilot models real-world physical logistics operations with uncompromising engineering rigor.

---

## 💡 What Makes This Project Recruiter-Ready?

| Engineering Competency | Concrete Implementation in ParcelPilot |
|---|---|
| **Complex App Router Hierarchy** | Parallel route groups: `(dashboard)` role sub-trees, `(public)/(marketing)` high-converting landing pages, and `(public)/(authentication)` with Google OAuth. |
| **Granular Client-Side RBAC** | Dynamic role route protection, automatic dashboard re-routing, and authenticated navigation state. |
| **Performant Serverless State** | `@tanstack/react-query` v5 caching layer, automated cache invalidation on waybill transitions, and optimistic UI updates. |
| **Interactive Domain Engines** | Real-time freight cost simulator with digital waybill docket, dimensional formula calculator ($\frac{L \times W \times H}{5000}$), and postal zone heuristics. |
| **Enterprise Data Visualization** | Multi-axis `recharts` telemetry displaying live sorting throughput, revenue breakdowns, and linehaul fleet performance. |
| **Strict Type Safety & Build Quality** | 100% strict TypeScript types across 41 routes with zero build warnings, zero linter regressions, and instant Turbopack compilation. |

---

## 🏗️ Frontend Architecture & Design System

```mermaid
flowchart TD
    User([🌐 End User / Operator]) --> NextApp[⚡ Next.js 16 App Router]

    subgraph "Public Marketing & Telemetry Suite"
        Home["🏠 Telemetry Home (/)"]
        Pricing["💰 Rate Simulator (/pricing)"]
        Coverage["🗺️ Hub Directory (/coverage)"]
        Packaging["📦 Packaging & Volumetric (/packaging-guide)"]
        Help["💡 Knowledge Base & FAQs (/help)"]
        Contact["📡 Dispatch Control Console (/contact)"]
        About["🏢 Engineering Creed (/about-us)"]
    end

    subgraph "Authentication & Identity Guard"
        Auth[🔐 JWT / Refresh Auth + Google OAuth 2.0]
        OTP[📱 4-Digit Email Verification Form]
    end

    subgraph "Protected Role Consoles (RBAC)"
        Admin["👑 Admin Console (/admin)"]
        Ops["⚡ Operations Manager (/operation_manager)"]
        Hub["🏢 Hub Manager (/hub_manager)"]
        Courier["🛵 Courier Field App (/courior)"]
        Customer["👤 Merchant / Customer (/customer)"]
    end

    NextApp --> Public Marketing & Telemetry Suite
    NextApp --> Authentication & Identity Guard
    Authentication & Identity Guard --> Protected Role Consoles (RBAC)

    subgraph "Client Data Layer"
        RQ["⚡ TanStack React Query v5"]
        API["📡 Custom ofetch API Client"]
        RQ --> API
    end

    Protected Role Consoles (RBAC) --> Client Data Layer
    Public Marketing & Telemetry Suite --> Client Data Layer
    API --> Backend["🌐 ParcelPilot Express API Gateway (Vercel)"]
```

---

## 🚀 Key Feature Walkthrough

### 1. 🛡️ Public Marketing & Interactive Telemetry Suite
* **Interactive Freight Rate Simulator (`/pricing`)**: Split-view simulator with corridor selectors, dynamic weight slider (0.5 kg – 25 kg), COD collection toggle, and an **itemized digital waybill docket** with cryptographic barcode styling and instant pricing calculation.
* **Service Level Spec Matrix (`/pricing`)**: Technical comparison table contrasting Standard, Priority Express, and Enterprise tiers across delivery windows, pickup cutoffs, RTO fees, and webhook quotas.
* **Hub Directory & Telemetry Inspector (`/coverage`)**: Interactive split console with division filters (Dhaka, Chattogram, Sylhet, etc.), real-time **sorting capacity utilization gauges**, inbound merchant cutoff schedules, and nightly linehaul trucking departures.
* **Instant Postal Zone Validator (`/coverage`)**: Heuristic lookup engine allowing senders to validate district/postal code eligibility and same-day express feasibility.
* **Volumetric Weight Calculator (`/packaging-guide`)**: Real-time evaluation of Dimensional Weight:
  $$\text{Volumetric Weight (kg)} = \frac{\text{Length (cm)} \times \text{Width (cm)} \times \text{Height (cm)}}{5000}$$
  Evaluates whether dead scale weight or dimensional cubic weight governs billing, offering space-saving packing recommendations.
* **Regulatory Cargo Manifest (`/packaging-guide`)**: Dual-tab compliance manifest classifying **Strictly Prohibited Items** vs **Conditional & Restricted Cargo**.
* **Categorized Help Accordion & Search (`/help`)**: Fast knowledge search bar with suggested query chips and technical FAQ items (`[SYS-TRK-01]`, `[SYS-COD-01]`).
* **Dispatch Ticket Transmission Console (`/contact`)**: Interactive split console with department triage, urgency level selector (*Routine*, *Urgent*, *Critical Linehaul*), waybill attachment, and instantaneous ticket token generation.

---

### 2. 👑 Executive Admin Dashboard (`/admin`)
* **Fleet Command Center**: Overview of active vehicles, carrier assignments, and driver availability metrics.
* **Revenue & Financial Analytics**: Recharts-powered graphs itemizing freight revenue, COD escrow balances, and monthly payout disbursements.
* **Hub Topology Management**: Provisioning new regional sorting nodes and monitoring operational capacities nationwide.
* **Role Application Audit**: Internal review portal to evaluate driver, hub manager, and operations personnel onboarding applications.
* **User & Credential Governance**: Granular user status administration (Active, Suspended, Role modifications).

---

### 3. ⚡ Operations Manager Terminal (`/operation_manager`)
* **Live Dispatch Radar**: Real-time visibility into all active shipments across the national network.
* **Pending Approvals Queue**: Action center to approve inbound merchant shipment requests and assign initial pickup riders.
* **Hub-to-Hub Transfer Manifests**: Managing linehaul bag grouping, inter-district transfers, and truck departures.
* **Exception & RTO Handling**: Multi-attempt delivery resolution, address revisions, and return-to-origin routing.

---

### 4. 🏢 Hub Manager Sorting Console (`/hub_manager`)
* **Intake & Outbound Conveyor Sorting**: Optical barcode scanning interface for processing incoming and outbound shipments.
* **Live Inventory Audit**: Tracking parcels currently staged within local physical warehouse vaults.
* **Linehaul Bagging & Consolidation**: Bundling parcels into sealed linehaul transit containers dispatched to destination hubs.

---

### 5. 🛵 Courier Fleet Mobile App (`/courior`)
* **Pickup Run Manifest**: Optimized doorstep pickup route for incoming merchant shipments.
* **Delivery Execution Workflow**: Turn-by-turn recipient details, Cash-On-Delivery collection confirmation, and **cryptographic OTP security verification**.
* **Delivery Failure & Reschedule Protocol**: Structured failure logging (e.g. *Customer Unavailable*, *Address Incomplete*) with automated retry slotting.

---

### 6. 👤 Customer & Merchant Cockpit (`/customer`)
* **Multi-Step Shipment Booking**: Origin & destination inputs, package dimension inputs, insurance selection, and instant waybill generation.
* **Interactive Tracking Cockpit**: Real-time shipment status milestone timeline with checkpoint timestamps, assigned rider details, and current hub location.
* **Cashless Stripe Payment**: Integrated Stripe payment flow with automated invoice generation.
* **Financial Ledger & Delivery History**: Historical log of all dispatched parcels, recipient details, and settlement statuses.

---

## 🔑 Role-Based Demo Accounts (Test Flight)

Recruiters and hiring managers can explore each authenticated console using the pre-seeded credentials below:

| Persona Role | Target Portal | Email | Password | Access Capabilities |
|---|---|---|---|---|
| **Super Admin** | [`/admin`](https://parcelpilot-frontend-phi.vercel.app/admin) | `superadmin@gmail.com` | `Super@admin12345` | Nationwide fleet, financial revenue, hub provisioning, user admin |
| **Operations Manager** | [`/operation_manager`](https://parcelpilot-frontend-phi.vercel.app/operation_manager) | *Register / Seeded* | *Configured* | Nationwide dispatch radar, pending approvals, hub linehaul transfers |
| **Hub Manager** | [`/hub_manager`](https://parcelpilot-frontend-phi.vercel.app/hub_manager) | *Register / Seeded* | *Configured* | Warehouse inventory, conveyor sorting, linehaul bag grouping |
| **Courier / Driver** | [`/courior`](https://parcelpilot-frontend-phi.vercel.app/courior) | *Register / Seeded* | *Configured* | Mobile pickup queue, doorstep delivery execution, OTP validation |
| **Customer / Merchant** | [`/customer`](https://parcelpilot-frontend-phi.vercel.app/customer) | *Register / Self-Serve* | *Your Choice* | Booking creation, tracking cockpit, Stripe payment, shipment history |

*(Note: You can also use **Register** or **Google One-Tap Login** to instantly create a new Customer account, then use `/apply-for-role` to experience the role onboarding workflow).*

---

## 🛠️ Technology Stack & Architectural Decisions

| Layer / Concern | Technology | Engineering Rationale |
|---|---|---|
| **Core Framework** | [Next.js 16.3](https://nextjs.org/) + [React 19](https://react.dev/) | Utilizes Turbopack for ultra-fast HMR and App Router for granular layout nesting and route grouping. |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety, strict interface declarations for waybills, tariffs, and user roles. |
| **Data Fetching & Cache** | [@tanstack/react-query v5](https://tanstack.com/query) | Automated server-state caching, background revalidation, and zero stale UI states. |
| **Styling & Theme** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS `@theme` | Cutting-edge Tailwind v4 engine using high-performance OKLCH color palettes and inline variables. |
| **Component Primitives** | [shadcn/ui](https://ui.shadcn.com/) + [@base-ui/react](https://base-ui.com/) | Accessible, headless primitives with full keyboard navigation and zero runtime bloat. |
| **Data Visualization** | [Recharts 3.8](https://recharts.org/) | Declarative, SVG-based responsive data charts for hub sortation metrics and revenue ledgers. |
| **Animations** | [Framer Motion 14](https://www.framer.com/motion/) + [AOS](https://michalsnik.github.io/aos/) | Hardware-accelerated transitions and scroll-driven physics without layout thrashing. |
| **Icons & Imagery** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set matching the telemetry aesthetic. |
| **Code Hygiene** | [Biome 2.4](https://biomejs.dev/) | Lightning-fast linter and formatter enforcing strict frontend standards. |

---

## 💻 Getting Started Locally

### Prerequisites
* **Node.js**: `v20.x` or `v22.x`
* **Package Manager**: `npm`, `pnpm`, or `bun` (recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/parcelpilot-frontend.git
cd parcelpilot-frontend
```

### 2. Install Dependencies
```bash
bun install
# or
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root of the project:
```env
NEXT_PUBLIC_API_BASE=http://localhost:5000/api/v1
# Or point directly to the live cloud API:
# NEXT_PUBLIC_API_BASE=https://parcel-pilot-dun.vercel.app/api/v1

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 4. Run Development Server
```bash
bun dev
# or
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Build for Production
```bash
bun run build
# or
npm run build
```
The production bundle will verify all TypeScript types and prerender 41 static and dynamic pages with zero errors.

---

## 📂 Project Directory Structure

```
parcelpilot-frontend/
├── public/                     # Static assets, logos, and vector illustrations
├── src/
│   ├── api/                    # Type-safe API communication endpoints (ofetch client)
│   │   ├── auth.api.ts         # Login, registration, OTP, Google OAuth
│   │   ├── shipment.api.ts     # Waybill generation, tracking status query
│   │   ├── hub.api.ts          # Sorting hubs, linehauls, inventory
│   │   ├── courier.api.ts      # Pickup assignments, OTP delivery clearance
│   │   └── admin.api.ts        # Fleet, users, revenue analytics
│   ├── app/                    # Next.js 16 App Router
│   │   ├── (dashboard)/        # Protected RBAC Portals
│   │   │   ├── admin/          # Fleet, revenue, hubs, applications, users
│   │   │   ├── courior/        # Courier field dispatch & delivery tasks
│   │   │   ├── customer/       # Booking, tracking cockpit, payment history
│   │   │   ├── hub_manager/    # Warehouse inventory, linehauls, sorting
│   │   │   └── operation_manager/ # Active dispatch, approvals, transfers
│   │   ├── (public)/           # Public Marketing & Auth
│   │   │   ├── (authentication)/ # Login, Register, Email OTP Verification
│   │   │   └── (marketing)/    # High-converting telemetry landing pages
│   │   │       ├── about-us/   # Mission, pillars, engineering stack
│   │   │       ├── contact/    # Dispatch transmission console & HQ directory
│   │   │       ├── coverage/   # Sorting hub explorer & postal validator
│   │   │       ├── help/       # Knowledge base & categorized FAQs
│   │   │       ├── packaging-guide/ # Volumetric calculator & cargo manifest
│   │   │       └── pricing/    # Live freight simulator & SLA rate matrix
│   │   ├── globals.css         # Tailwind CSS v4 variables & OKLCH color system
│   │   └── layout.tsx          # Root HTML layout & global providers
│   ├── components/             # Reusable modular UI components
│   │   ├── dashboard/          # Specialized widgets for each operational role
│   │   ├── form/               # Validated input forms (TanStack Form + Zod)
│   │   ├── ui/                 # shadcn/ui primitives + marketing feature widgets
│   │   │   ├── about/          # Genesis, pillars, tech stack components
│   │   │   ├── contact/        # Dispatch ticket transmission & hub registry
│   │   │   ├── coverage/       # Hub explorer, corridor matrix, postal checker
│   │   │   ├── help/           # Knowledge search, FAQ accordions, escalation
│   │   │   ├── homepage/       # Hero, route journey, interactive tracker, ledger
│   │   │   ├── layout/         # Public Header and SystemFooter
│   │   │   ├── packaging-guide/# Volumetric engine, 4-step blueprint, manifest
│   │   │   └── pricing/        # Rate simulator, waybill docket, SLA matrix
│   ├── hooks/                  # TanStack Query custom mutation & query hooks
│   ├── types/                  # Domain TypeScript interfaces (Shipment, User, Hub, etc.)
│   └── utils/                  # Utility helpers and formatters
├── biome.json                  # Biome code hygiene rules
├── next.config.ts              # Next.js 16 runtime and Turbopack configuration
└── package.json                # Project dependencies and script definitions
```

---

## 📈 Engineering Standards & Quality Assurance

* **Zero Build Errors**: Tested and verified with `next build` across all 41 routes.
* **100% Responsive Design**: Tested seamlessly on mobile viewports (iPhone, Android), tablets (iPad), laptops, and ultrawide monitors.
* **Accessibility (a11y)**: Semantic HTML5 structure, ARIA compliance on Base UI primitives, and high-contrast color ratios in dark mode.
* **Defensive Error Handling**: Integrated toast notifications (`sonner`), validation schemas (`zod`), and fallback loading skeletons.

---

<div align="center">

### Built with precision for the modern supply chain.
**ParcelPilot • Redefining Logistics Operations**

</div>
