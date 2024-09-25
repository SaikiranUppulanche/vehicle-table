# Vehicle Data Table with SMS Feature

This project is a React-based application that displays vehicle data in a table fetched from an API. It includes the following features:

- A search bar to filter the data.
- Selectable rows using checkboxes.
- A phone number input field.
- A "Send SMS" button that sends selected vehicle data to the provided phone number using Twilio.
- Toast notifications for user feedback (success, error, warnings).
- Infinite scroll to load more data as the user scrolls down.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [CORS Policy Issue](#cors-policy-issue)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Technologies Used

- **React.js**: Frontend framework
- **Axios**: For making HTTP requests to APIs
- **React-Toastify**: For toast notifications
- **Twilio**: SMS service provider
- **Tailwind CSS**: For styling

## Features

1. **Vehicle Data Table**: Fetches data from an API and renders it in a table format.
2. **Search Bar**: Filters the data based on user input.
3. **Checkbox Selection**: Allows users to select specific rows.
4. **Phone Number Input**: Takes a 10-digit phone number for sending SMS.
5. **Send SMS**: Sends selected vehicle data to the entered phone number via Twilio.
6. **Toast Notifications**: Provides feedback for different actions (e.g., SMS sent, errors, etc.).
7. **Infinite Scrolling**: Loads more data as the user scrolls down.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/vehicle-data-sms.git
cd vehicle-data-sms
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

```bash
npm install
```

### 3. Run the Application

```bash
npm run dev
```

# How It Works

Fetching Data: The app fetches vehicle data from an external API and displays it in a table format.
Selecting Rows: Users can select rows using the checkboxes provided for each vehicle entry.
Phone Number Input: Users can input a valid 10-digit phone number in the input field.
Send SMS: Clicking the "Send SMS" button sends the selected vehicle data to the entered phone number using the Twilio API.
CORS: To allow cross-origin requests, CORS headers are included in the Twilio Function that handles SMS sending.
