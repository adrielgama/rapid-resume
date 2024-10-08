# Resume Builder

![Resume Builder Banner](public/images/banner_readme.webp)

Welcome to the Resume Builder project! This application allows users to create and customize resumes by filling in various sections such as personal information, experience, education, skills, languages, and more. The application is designed to be highly flexible, supporting multiple areas of work and providing a seamless user experience.

## Table of Contents

- [Resume Builder](#resume-builder)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
  - [Usage](#usage)
    - [Adding Personal Information](#adding-personal-information)
    - [Managing Experience and Education](#managing-experience-and-education)
    - [Selecting Skills](#selecting-skills)
    - [Managing Languages](#managing-languages)
  - [Customization](#customization)
    - [Adding Custom Skills](#adding-custom-skills)
    - [Customizing Phone Input](#customizing-phone-input)
  - [Contributing](#contributing)
  - [Feature Improvements](#feature-improvements)
  - [License](#license)

## Features

- **Personal Information**: Add and edit your name, email, phone, location, and professional title.
- **Experience and Education**: Manage your professional experience and education history with easy-to-use forms.
- **Skills Selection**: Choose from a comprehensive list of skills based on your area of work. Add custom skills as needed.
- **Language Management**: Select and manage languages with proficiency levels.
- **Resume Preview**: Real-time preview of your resume as you fill in the sections.
- **Responsive Design**: Fully responsive and mobile-friendly interface.
- **International Phone Input**: Automatically format phone numbers based on the selected country.
- **Checkbox Features**: Easily toggle on/off features as needed.

## Getting Started

### Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adrielgama/rapid-resume.git
   cd rapid-resume
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   yarn install
   ```

### Running the Project

To run the project locally:

```bash
pnpm dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Usage

### Adding Personal Information

In the **Header** section, you can add your name, email, phone number, location, and professional title. The phone number input automatically formats based on the selected country.

### Managing Experience and Education

In the **Experience** and **Education** sections, you can add entries with details such as job title, company/institution, location, and periods of time. You can also include descriptions of your roles and achievements.

### Selecting Skills

In the **Skills** section, you can select relevant skills based on your area of work. The application provides a categorized list of skills, and you can also add custom skills if needed.

### Managing Languages

In the **Language** section, you can add languages you speak and specify your proficiency level. The selected languages will be displayed in the resume preview.

## Customization

### Adding Custom Skills

If the predefined list of skills doesn't cover all your needs, you can easily add custom skills in the **Skills** section. Just type the skill name and click "Add".

### Customizing Phone Input

The phone input field is designed to handle international phone numbers. It automatically formats the phone number based on the selected country. You can customize the list of supported countries or the default country in the code.

## Contributing

Contributions are welcome! If you have suggestions or want to contribute to the project, feel free to open an issue or submit a pull request. Please make sure to follow the [contributing guidelines](CONTRIBUTING.md).

## Feature Improvements

We are continually working on improving the Resume Builder. Here are some of the planned features and enhancements:

- [x] **Profile Page Security**: Implement authentication and authorization to restrict access to profile and edit pages.
- [x] **Optimize Step Components**: Implement lazy loading for the step components to improve performance by loading these components. 
- [ ] **Input Validation**: Implement input validation using Yup or Zod to ensure all required fields are correctly filled out.
- [ ] **Testing**: Add comprehensive testing to ensure the reliability of the application.
- [ ] **Data Storage**: Implement data storage in MongoDB for persistent resume data management.
- [ ] **Internationalization**: Add support for multiple languages using i18n, allowing users to create resumes in different languages.
- [ ] **Customizable Themes**: Enable users to select or create custom themes for their resumes.
- [ ] **Export Options**: Provide options to export resumes in various formats such as PDF, DOCX, etc.
- [ ] **Collaboration**: Allow multiple users to collaborate on a single resume.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

If you found this project helpful, consider buying me a coffee to support further development:

<a href="https://buymeacoffee.com/adrielgama" target="_blank">
  <img src="public/images/bmc-button.svg" alt="Buy Me a Coffee" width="200">
</a>


You can also scan the QR code to donate:

<img src="public/images/bmc_qr.webp" alt="Buy Me a Coffee QR Code" width="150" >

