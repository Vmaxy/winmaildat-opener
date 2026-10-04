# Winmail.dat Opener

A free, private, browser-based tool for opening and extracting attachments from `winmail.dat` and `ATT0001.dat` files.

🌐 **Website:** [winmaildatopener.com](https://winmaildatopener.com)

## ✨ Overview

**Winmail.dat Opener** helps you recover the real attachments hidden inside Outlook's `winmail.dat` files.

Instead of installing desktop software or uploading potentially sensitive email attachments to a server, the tool decodes supported TNEF files **directly in the browser**.

> 🔒 **Your file stays on your device. No file upload is required.**

The tool is designed to be fast, simple, and usable on desktop, tablet, and mobile devices.

## 🚀 Features

* 📂 Open `winmail.dat` files directly in your browser
* 📎 Support for common `ATT0001.dat` attachments
* 🔐 Client-side/local file processing
* 🚫 No account or sign-up required
* ☁️ No file upload required
* 📱 Mobile-friendly interface
* ⚡ Simple drag-and-drop or file picker workflow
* 📋 View recovered attachment names and sizes
* ⬇️ Download individual recovered files
* 📦 Download all recovered files as a ZIP
* 📏 Supports DAT files up to **150 MB**
* 🌍 Available in multiple languages

## 🔒 Privacy First

Winmail.dat files can contain sensitive information such as:

* Personal documents
* Business files
* Invoices
* Images
* Contact information
* Email-related data

For this reason, the decoder is designed to process the selected file **locally in the browser**.

The file bytes are not uploaded to a conversion server. The browser reads and decodes the TNEF container on the user's device.

This makes the tool useful when dealing with attachments that you don't want to send to an external file-processing service.

## 🧩 What is `winmail.dat`?

`winmail.dat` is commonly created when Microsoft Outlook sends email using **Transport Neutral Encapsulation Format (TNEF)**.

When an email client does not understand TNEF, the recipient may see a mysterious:

```text
winmail.dat
```

instead of the original PDF, image, document, or other attachment.

The actual attachments can be packaged inside the TNEF container.

Winmail.dat Opener extracts those recoverable files so they can be downloaded normally.

## 🛠️ How It Works

The workflow is intentionally simple:

```text
Email
  │
  ▼
winmail.dat
  │
  ▼
Select / Drop File
  │
  ▼
Browser-based TNEF Decoder
  │
  ▼
Recovered Attachments
  │
  ├── Download individual file
  │
  └── Download all as ZIP
```

### 1. Select the file

Save the `winmail.dat` or `ATT0001.dat` attachment from your email.

### 2. Decode locally

Select or drag the file into Winmail.dat Opener.

The browser reads and unpacks the supported TNEF container locally.

### 3. Recover your files

The tool displays the recoverable attachments along with their file names and sizes.

You can then download individual files or download everything together as a ZIP archive.

## 🖥️ Supported Platforms

Because the tool runs in a modern web browser, it can be used on:

* Windows
* macOS
* Linux
* Android
* iPhone
* iPad

No dedicated desktop application is required.

## 📏 File Limit

The current web application supports DAT files up to:

**150 MB**

This is intended to cover the normal `winmail.dat` attachments encountered through email.

## 🧪 Error Handling

The application handles files that cannot be decoded and provides an error state instead of silently producing incorrect results.

Possible reasons a file may not open include:

* The file is incomplete or corrupted
* The attachment is not actually a TNEF file
* The file contains unsupported TNEF data
* The original email service modified the attachment
* The file is not a `winmail.dat`/TNEF attachment

If a file fails, try downloading the original attachment again.

## 🛠️ Tech Stack

The project is built as a lightweight modern web application.

* **Astro**
* **JavaScript / TypeScript**
* **HTML**
* **CSS**
* **Client-side file processing**
* **TNEF decoding**
* **Cloudflare Pages**

## 📁 Project Structure

```text
.
├── public/
│   ├── _headers
│   └── ...
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── ...
├── package.json
├── astro.config.*
└── README.md
```

The exact structure may change as development continues.

## 💻 Local Development

### Requirements

* Node.js
* npm

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:4321
```

### Build the project

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## 🌐 Deployment

The production website is deployed using **Cloudflare Pages**.

Production site:

**https://winmaildatopener.com**

The project can be built with:

```bash
npm run build
```

and deployed through the configured Cloudflare deployment workflow.

## 🎯 Project Goals

Winmail.dat Opener was built around a few simple principles:

### 1. Zero friction

A user should be able to go from:

```text
"I have a winmail.dat file"
```

to:

```text
"I have my actual attachment"
```

in as few steps as possible.

### 2. Privacy

Email attachments can be sensitive. Local browser processing avoids unnecessarily sending those files to a remote conversion service.

### 3. Accessibility

The tool should work for people who don't understand TNEF, Outlook internals, or file formats.

### 4. Cross-platform support

The same web-based workflow should work across desktop and mobile browsers.

### 5. Keep it simple

Winmail.dat Opener focuses on one job:

> **Recover the files inside a winmail.dat attachment.**

## 🤝 Contributing

Contributions, bug reports, and improvements are welcome.

Before opening an issue, please check whether a similar issue already exists.

When reporting a bug, include:

* Browser and operating system
* Approximate file size
* File type/name
* Steps to reproduce
* Error message, if any

### ⚠️ Please don't upload private email attachments

If a problem involves a sensitive `winmail.dat` file, describe the problem without publicly sharing the file or its contents.

## 📄 License

This project is licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for the full license text.

## 🔗 Links

* 🌐 **Website:** https://winmaildatopener.com
* 📖 **How it works:** https://winmaildatopener.com/#how-it-works
* ❓ **FAQ:** https://winmaildatopener.com/#faq

## ⭐ Support

If Winmail.dat Opener helped you recover an attachment, consider giving the project a ⭐ on GitHub.

It helps others discover the project when they run into the surprisingly mysterious `winmail.dat` file.
