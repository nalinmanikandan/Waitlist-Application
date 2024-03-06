# Waitlist-Application

An application that helps potential customers to sign up to a
waiting list of a new iPhone product.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites-Frontend

Ensure you have the following prerequisites installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)

## Installation-Frontend

1. Clone the repository:

git clone https://github.com/your-username/your-repo.git](https://github.com/nalinmanikandan/Waitlist-Application.git)

2. Navigate to the project directory:

cd Frontend

3. Install dependencies:

npm install

## usage-Frontend

Start the development server:

npm start


# Spring Boot Backend

This is the backend component of the project, responsible for handling server-side logic.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Prerequisites

Ensure you have the following prerequisites installed on your machine:

- Java Development Kit (JDK): [Download JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
- Apache Maven: [Download Apache Maven](https://maven.apache.org/download.cgi)
- Database (if required): [Example: MySQL](https://dev.mysql.com/downloads/)

## Installation

1. Clone the repository:

   git clone https://github.com/nalinmanikandan/Waitlist-Application.git

Navigate to the backend project directory:

cd backend

Build the project using Maven:

mvn clean install

## Usage

Run the application:

java -jar target/backend-application.jar

The backend server will start, and the application will be accessible at http://localhost:8081.

## database schema

CREATE TABLE waitlist (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    position INT NOT NULL,
    referral_link VARCHAR(255) NOT NULL
);
