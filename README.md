# Real-Time Bidding Platform

A real-time bidding platform built with Node.js, Express, Socket.io, and MySQL. This platform supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, and notifications.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)
- [Testing](#testing)
- [Project Structure](#project-structure)

## Features

- User authentication (registration, login)
- Role-based access control (user, admin)
- CRUD operations for auction items
- Real-time bidding and notifications using Socket.io
- Image upload functionality for auction items
- Search and filtering for auction items
- Pagination for auction items
- Notification system for bids

## Prerequisites

- Node.js (version 12 or higher)
- MySQL (or any SQL database)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ProjectNodeJsSocket.git
    cd ProjectNodeJsSocket
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_PASSWORD="oracle"
DATABASE_NAME="bidding_db"
JWT_SECRET=your_jwt_secret
