<a id="readme-top"></a>

[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://larakit.dipankarjana.com">
    <img src="https://larakit.dipankarjana.com/android-chrome-192x192.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Larakit</h3>

  <p style="text-align: center">
    A Laravel 11.x Sales Dashboard Starter Kit
    <br />
    <a href="https://larakit.dipankarjana.com/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Larakit](http://larakit.dipankarjana.com/image.jpg)](https://larakit.dipankarjana.com)

A lightweight and customizable Sales Dashboard starter kit built with Laravel Breeze, Inertia.js, and React. This kit provides the essential tools and UI components needed to quickly set up a modern sales management system.

Features:
* Authentication & Authorization (Laravel Breeze)
* User & Role Management
* Organization Management
* Sales Tracking & Analytics
* Dashboard with Charts & Reports
* Dark Mode & Responsive UI
* OAuth with Laravel Socialite

<p style="text-align: right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* [![Laravel][Laravel.com]][Laravel-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
  ```sh
  git clone https://github.com/iamdipankarj/larakit.git
  ```
3. Install NPM packages
  ```sh
  yarn install
  ```
4. Start Vite Server
  ```sh
  yarn dev
  ```
5. Start PHP Server
  ```sh
  php artisan serve
  ```
6. Start PHP Server on Local Network

  * Get your LAN ip by running ifconfig (Mac/Linux) or ipconfig (Windows)
  * Make sure to change `APP_URL`, `SALES_API_BASE` and `APP_URL` to your LAN ip, e.g `http://192.168.0.57:8000`.
  * Google OAuth login may not work on local area network due to restrictions on the OAuth policies of google. As a work around, you'd need to create a local only domain like `larakit.test` to be able to add it on google oauth client credentials.
  ```sh
  php artisan serve --host=0.0.0.0 --port=8000
  ```
  ```sh
  yarn dev --host 192.168.0.57 --port 5174
  ```

<p style="text-align: right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Dipankar Jana - [@iamdipankarj](https://twitter.com/iamdipankarj) - iamdipankarj@gmail.com

Project Link: [https://github.com/iamdipankarj/larakit](https://github.com/iamdipankarj/larakit)

<p style="text-align: right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/iamdipankarj/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
